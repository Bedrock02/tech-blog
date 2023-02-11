---
title: 'Counter Button Of Doom'
metaDesc: 'I stumbled during a technical interview. "Create a Counter that increments on click and decrements every second.'
date: 'Feb 10, 2023'
tags:
  - Interview
  - React
  - WebApis
---

Everyone has their days, and during this one technical interview, my brain was scrambled. I will walk through my initial approach, the reasons why it was wrong, and what I should have done. Here was the exercise:


> Using React, create a Counter that increments upon clicking a button. For every second the counter will also be decrementing by 1.


## Starting With A Win
![inhale the confidence gif](https://media.giphy.com/media/E72zBwfDfxRwLu5vbB/giphy.gif)
Initially, this seemed straightforward. I started by creating a component that updates a state variable upon click. This I can do in my sleep no problem (only because every tutorial on the planet uses this example).

```typescript
const Counter = () => {
  const [counter, setCounter] = useState<number>(0);

  /*
  * Callback that is responsible for 
  * incrementing the state by 1
  */
  const handleClick = () => {
    setCounter(counter + 1)
  }
  
  return (
    // When button is clicked we trigger 'handleClick'
    <button onClick={handleClick}>
      {counter}
    </button>
  );
}
```

## Now For The Hard Part
> For every second that passes the counter will decrement by 1.

To approach this second requirement I thought a function outside of my component can handle this logic. The reason is I wanted to use setTimeout to trigger a delayed state change and from past experiences when using setTimeout you need to keep in mind your scope and time of execution. To understand this better read this [post](https://medium.com/@axionoso/watch-out-when-using-settimeout-in-for-loop-js-75a047e27a5f)


```typescript
const countDown = (
  setCounter: (num: number) => void,
  value: number
) => {
  setTimeout(() => {
    // Don't go into negative values
    if (value > 0) {
      setCounter(value - 1)
    }
    // Decrement again
    countDown(setCounter, value)
  }, 1000)
}

const Counter = () => {
  ...
  
  useEffect(() => {
    countDown(setCounter, counter)
  }, [])
  
  ...
}
```
##### What is happening here:
1. Countdown function takes in a "setter" function and a value that will represent the current value.
2. Countdown function triggers a setTimeout for 1000ms. After 1000ms, the callback passed into the setTimeout will be pushed onto the execution stack of the [event loop](https://andreassujono.medium.com/tricky-event-loop-macrotask-and-microtask-question-506956b0a26d).
3. The function inside the setTimeout will call setCounter with a value of `value - 1` if the current value is greater than 0.
4. Countdown then gets called again with the same setCounter and value.
5. To tie it all together I kicked it off in a useEffect within the Counter component


##### Why It Is Wrong: Initial Render
On the initial render we are calling `countDown` and passing in `setCounter` and the current value for `counter` which on mount initially is 0.

```typescript
useEffect(() => {
    countDown(setCounter, counter)
  }, [])
```

Since the initial counter is 0, we are **never** decrementing the counter and we are continuously calling `countDown` with the same values. At no point are we getting the latest value of `counter`.

### Pass Me The Shovel
I zeroed in on the fact that I needed to pass in an updated value of `counter` and continued to dig myself into a deeper hole.


```typescript
const countDown = (
  setCounter: (num: number) => void,
  getCounter: () => number,
) => {
  setTimeout(() => {
    // Don't go into negative values
    const currentNumber = getCounter()
    if (currentNumber > 0) {
      setCounter(currentNumber - 1)
    }
    // Decrement again
    countDown(setCounter, getCounter)
  }, 1000)
}

const Counter = () => {
  ...
  
  const getCounter = () => counter

  useEffect(() => {
    countDown(setCounter, getCounter)
  }, [])

  ...
}
```

##### What is happening here
1. We updated the `countDown` method to take in another function called `getCounter`, instead of the `counter` which was of type `number`.
2. We used `getCounter` to fetch the current value of `counter`.
3. In our component `getCounter` acts as a getter function that retrieves the value of `counter`.

##### Why It Is Wrong: Old References
When the state of a react component updates, it gets re-rendered. During that re-rendering process functions are re-initialized. Therefore, when the state gets updated, `getCounter` is now an entirely new function.

Hence, the function that is passed into `countDown` is never updated and never provides the current true value of `counter`.

Regardless, on the initial mount, `countDown` gets the value of zero and will never trigger an update. This update has no impact and we reached our point of doom.

![dog reaching for what he things is a bone](https://media.giphy.com/media/IPCdx3czj7OcU/giphy-downsized-large.gif)


## The Solution

```typescript
const countDown = (decrementCounter: () => void) => {
  setInterval(decrementCounter, 1000)
}

const Counter = () => {
  const [counter, setCounter] = useState<number>(0);
  
  useEffect(() => {
    countDown(() => {
      setCounter((currentValue) => {
        return currentValue > 0 ? currentValue - 1 : currentValue
      })
    })  
  }, [])
  
  const handleClick = () => {
    setCounter(counter + 1)
  }
  
  return (
    <button onClick={handleClick}>
      {counter}
    </button>
  );
}

const attachNode = document.getElementById('main'); 
ReactDOM.render(<Counter />, attachNode)
```

See implementation on: [CodePen](https://codepen.io/bedrock02/pen/RwBXwgE)

#### SetInterval
```typescript
setInterval(decrementCounter, 1000)
```
While I was recursively calling `countDown` to trigger another setTimeout call, I could have used [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval). `setInterval` takes in the same parameters as `setTimeout`; a callback function, and a number representing milliseconds. This will invoke the callback after every 1000ms. This makes our code easier to understand as it then becomes a one liner.

#### setCounter Callback
```typescript
setCounter((currentValue) => {
        return currentValue > 0 ? currentValue - 1 : currentValue
      })
```
The `setState` function returned from the `useState` callback can be used in two different ways.

1. Passing in a value
2. Passing in a function that determines the next state based on the previous state.

Previously, we were calling the `setCounter` function and passing a value. If we use the callback, we will always have the previous state without having to reference a value or create a getter function. All we do is move the logic of when to decrement within the `setCounter` callback and ensure that the setInterval is given a function that will invoke the new `setCounter`


## Takeaways
- `setInterval` is best for code you want to repeat after a certain number of milliseconds.
- `setState` can take in a value or a callback that returns a calculated value
- Re-renders will instantiate variables and functions. Passing these as references can be risky
