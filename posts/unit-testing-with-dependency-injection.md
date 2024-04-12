---
title: 'From Unit Testing to Dependency Injection'
metaDesc: 'How dependency injection in Go can make your unit testing easier to work with'
date: 'April 12, 2024'
tags:
  - unit testing
  - go
  - refactor
---

I recently had the chance to work on a Go Microservice. We had recently developed two new endpoints for this microservice. Although everything seemed to be functioning smoothly, there was one issue: lack of test coverage!

Having previously worked with JavaScript and used Jest as my testing tool, I was accustomed to being able to mock any aspect of the code.

#### Mocking out a module
```javascript
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
```

#### Mocking a non-default export
```javascript
jest.mock('some/module/', () => ({
  ...jest.requireActual('some/module/'),
  getSomeFunction: jest.fn()
  __esModule: true,,
}));
```

Working with Go put me in unfamiliar territory, and it didn't appear there was a straightforward method to mock an imported function as easily as Jest allows in JavaScript.


### The Endpoint
```go
func (h *ProductRESTController) PostProduct(c *gin.Context) {

	var request struct {
		ProductNumber string `json:"product_number" validate:"required"`
		Email        string `json:"email" validate:"required,email"`
	}

	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request body",
		})
		return
	}
	validate := validator.New()

  if err := validate.Struct(requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request body",
		})
		return
  }

	data, err := FetchS3Object(request.ProductNumber)
	if !isValid(c, data, err) {
		return
	}

	item := map[string]*dynamodb.AttributeValue{
		"user_email": {
			S: aws.String(request.Email),
		},
		"created_date": {
			S: aws.String(time.Now().Format(time.RFC3339)),
		},
	}

	input := &dynamodb.PutItemInput{
		TableName: aws.String(tableName),
		Item:      item,
	}
	
	dynamoSvc := InitDynamoDB()
	_, err = dynamoSvc.PutItem(input)

	if err != nil {
		fmt.Print(err.Error())
	}

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    data,
	})
}

```
This endpoint employed a function named FetchS3Object, which internally created an S3 client and retrieved data. Subsequently, we processed the data and stored a portion of it in a Dynamo database. The remaining code pertaining to this functionality primarily focuses on validating the incoming body and ensuring the integrity of the data fetched from S3.


### Dependency Inejction
So when unit testing these endpoints I don't want to test the other imported functions we are using. I wanted to mock out the following.

1. DynamoDB Client
2. S3 Client

By mocking these imported tools, I can concentrate on how my endpoints validate incoming data and handle scenarios involving invalid or missing data.

After reviewing how other developers handle mocking modules, it appeared that I could either create a wrapper function that accepts the library as an argument or inject the libraries directly into the Controller. I deemed a wrapper function to be excessive, so I opted for Dependency Injection.

> Dependency injection is a programming technique where an object or function is provided with the objects or functions it needs, rather than creating them internally.[Wiki](https://en.wikipedia.org/wiki/Dependency_injection)

## Injection at Creation
```go
// DynamoDB.go
type Service struct {
	Db dynamodbiface.DynamoDBAPI
}

// Product.go
type ProductRESTController struct{
	FetchS3Object func(string) (models.Product, error)
	dynamoSvc *dynamodbUtils.Service
}

func NewProductRESTController(getObj func(string) (models.Product, error), dynamoInstance *dynamodbUtils.Service) *ProductRESTController {
	return &PRoductController{
		FetchS3Object: getObj,
		dynamoSvc: dynamoInstance,
	}
}

// routes.go
dynamoSvc :=dbUtils.InitDynamo()
product := controllers.NewProductController(s3Client.FetchS3Object, dynamoSvc)
```

Firstly, we create a function that accepts dependencies and initializes a new controller with those dependencies as properties. When defining the controller, we simply instantiate it and pass in those dependencies.

Returning to our code within the controller, we can now utilize the libraries that are integrated into the controller and eliminate any direct instantiations.

```go
func (h *ProductRESTController) PostProduct(c *gin.Context) {
.......
.......
// ----- old -----
	data, err := fetchS3Object(request.ProductNumber)
	.....
	.....
	dynamoSvc := InitDynamoDB()
	_, err = dynamoSvc.PutItem(input)

// ----- end old -----

// ----- new  -----
  data, err := h.FetchS3Object(request.ProductNumber)
	.....
	.....
	_, err = h.dynamoSvc.Db.PutItem()
// ----- end new  -----
```

### Why is this easier for testing purposes?

```go
func SuccessfulProduct(ProductNumber string) (models.Product error) {
	completeProductData := models.Product{
		ProductNumber: "3453453",
		ProductName: "klujyghfd",
	}
	return completeProductData, nil
}

var mockDbService = &dynamodbUtils.Service{
	Db: &DynamodbMockClient{},
}

func TestPostProduct_200(t *testing.T) {
	mockFetchS3Object := SuccessfulProduct
	gin.SetMode(gin.TestMode)
	controller := NewProductRESTController(mockGetS3Object, mockDbService)
	router := SetUpRouter()
	router.POST("/product/", controller.PostReport)
	body := map[string]interface{}{
		"product_number": "2342423",
		"email": "fulano@gmail.com",
	}
	response := performRequest(router, "POST", "/product/", body)
	assert.Equal(t, http.StatusOK, response.Code)
}
```

With the implemented changes, mocking out dependencies is simplified. I devised a mock struct, named `mockDbService`, which contains a mock or empty client. The function responsible for returning S3 data is transformed into a mocked function where I explicitly define the returned value.

This approach enables me to concentrate solely on the endpoint's behavior. The key functionalities I aim to test are:
1. Whether my endpoint correctly processes a valid body.
2. How it handles a partially valid body.
3. Its response when provided with an invalid body.

### Wrap up
We're not only offering a superior testing approach, but also crafting cleaner code and ensuring modularity by making modules independent from other services. The controller shouldn't concern itself with initialization; its focus should be solely on usage: "How do I utilize it? What APIs are available to me?"