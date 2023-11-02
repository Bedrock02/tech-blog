---
title: 'Tackling Form Submission: Overlooking the Simplest Solutions'
metaDesc: 'When hitting enter goes wrong'
date: 'Nov 1, 2023'
tags:
  - HTML
  - Material UI
---

As developers, we've all encountered  "I'm so stupid" or the "Wait, why isn't this working?" moments. Often, in our haste to piece together components, we overlook the simplest details.

One moment recently hit me while setting up a sign-in and sign-up page for a side project. Eager to speed up the development process, I opted for [Material UI components](https://mui.com/material-ui/). With a bit of copy-paste, and a few tweaks, I had a simple login and account creation form.

```javascript
const SignInForm = ({ onSubmit }: Props) => {
  const { handleSubmit, control, register } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });
  return (
    <FormControl>
      <InputText
        required
        name="email"
        control={control}
        label="Email"
        register={register("email", { pattern: EMAIL_REGEX })}
      />
      <InputText 
        required
        name="password"
        control={control}
        label="Password"
        type="password"
      />
      <Button type="submit" onClick={handleSubmit(onSubmit)}>Submit</Button>
    </FormControl>
  );
};
```

Typically, form submission happens via two primary methods: the manual "Submit" button or the convenient "Enter" key on the keyboard. I prefer the latter for its ease of use once the form is completed.

Hitting "Enter" failed to submit the form. I tried explicitly adding a submit type to the button within the form, and when that didn't work, I resorted to adding an onSubmit to the FormControl component. Frustrated, I turned to the browser's debugger tool for a closer look at the page's rendered elements.

```html
<div class="MuiFormControl-root css-1nrlq1o-MuiFormControl-root">
  ...
</div>
```

That's when the epiphany struck: I had been expecting form behavior from a component that technically wasn't a form. The FormControl was rendering a div element, not a form element, as I had assumed.

```javascript
const SignInForm = ({ onSubmit }: Props) => {
  const { handleSubmit, control, register } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });
  return (
    <form>
      <FormControl>
        <InputText
          required
          name="email"
          control={control}
          label="Email"
          register={register("email", { pattern: EMAIL_REGEX })}
        />
        <InputText 
          required
          name="password"
          control={control}
          label="Password"
          type="password"
        />
        <Button type="submit" onClick={handleSubmit(onSubmit)}>Submit</Button>
      </FormControl>
    </form>
  );
};
```

The solution was embarrassingly straightforward: encase the entire component within a form element. With this simple adjustment, I finally had a functional form, and the "Enter" key triggered the submission flawlessly.

## Takeaways
- `form` element must be used when creating forms (duh)
- Don't assume third party components will provide everything you need
- All developers have their dumb moments
