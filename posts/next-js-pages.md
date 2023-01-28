---
title: 'Build Optimization: Let Pages Be Pages'
metaDesc: 'Next.Js will make sure that you have valid pages and that components under `/page` return an html structure or component.'
date: 'Jan 27, 2023'
tags:
  - nextjs
  - javascript
---

This blog is built using Next.js and Tailwind CSS. During the process of building the site, I started to accumulate a large list of tailwind properties on my components. To keep the code legible and clean, I decided to refactor the way I was styling my components. What I learned was that Next.Js has opinions on where you put your code to better optimize the build.

## The Problem
Using Tailwind CSS started to see how easy it was to accumulate styling properties. The more properties that were added, the longer that line of code became. Below is an example of what I had before the refactor.

```javascript
// index.tsx
const Home = () => {
    return (
        <div className=" bg-stone-200 border-2 content-center drop-shadow-lg flex flex-col h-50"></div>
    )

}
```

## The Solution
For the refactor I wanted to achieve the following:
- Group tailwind properties per element
- Easy way to maintain the collection of styles
- Provide a cleaner way to apply those styles

I mapped the array of properties to a specific key and made sure to convert the array of properties into a string before exporting the styles. Using that mapping of styles, I could then easily look up the style I wanted to apply for that particular element.

```typescript
const styles = {
    container: [
        'bg-stone-200',
        'border-2',
        'content-center',
        'drop-shadow-lg',
        'flex',
        'flex-col',
        'h-50',
    ]
}

type tailWindCollections = {[key: string]: string[]}
type tailWindStrings = {[key: string]: string}

/**
 * Converts the values (arrays) of the map into a string
 * */
const generateTailWindStrings = (styles: tailWindCollections): tailWindStrings => {
    return Object.entries(styles).reduce( (map: tailWindStrings, entry) => {
        const [key, value] = entry;
        map[key] = value.join(' ');
        return map;
    }, {});
};

const homeStyles = generateTailWindStrings(styles)

const Home = () => {
    return (
        <div className={homeStyles.container}></div>
    )
}
```

## Separation of Concerns
I don't want components and styles to live in the same file. The function `generateTailWindStrings` is put into a lib folder and is used as a utility function, the styles map will live in a `<component>.styles.ts` file and the component will stay as the `<component>.tsx` file.

##### Example:
```bash
- pages
    - index.tsx
    - index.styles.ts
```

By separating the two files I can easily find styles for a specific component. We can import the styles object and apply the classes to HTML elements.

```javascript
// index.tsx
import homeStyles from './index.styles'
const Home = () => {
    return (
        <div className={homeStyles.container}>
            <p>Some Text here</p>
        </div>
    )
}

export default Home
```

## Build Optimization Failed
After moving all component styles to their file and testing locally, I decided to push my code to production. I was surprised to find the following error.

![Build Optimization Error](/images/next-error-no-component.png)

Next.Js did not like the fact that I had a `.ts` file not returning a React Component. The built-in [routing](https://nextjs.org/docs/routing/introduction) mechanism expects that every file under `/pages` should be exporting a react component.

## The HotFix
To get a successful build and keep my styles in a separate file I had to remove the styles from `/pages`. One approach could be putting the styles file in a folder called `styles` or `components`. However, with this approach, the file is not located next to the component that requires those styles.

##### Approach 1:
```bash
- pages
    - index.tsx
- styles
    - index.styles.ts

```

If we go back to `index.tsx`, we can make improvements that will keep both the component and the styles in the same directory without triggering build-time errors. We would need to clean up the `page` by importing a component found outside of the `/page` directory.

##### Approach 2:
```bash
// file structure
- pages
    - index.tsx
- components
    - homeSection.tsx
    - homeSection.styles.ts
```

```javascript
// index.tsx
import HomeSection from 'components/HomeSection/homeSection'

const Home = () => <HomeSection />

export default Home
```

```javascript
// homeSection.tsx
import homeStyles from './home.styles'

const HomeSection = () => {
    return (
        <div className={homeStyles.container}>
            <p>Some Text here</p>
        </div>
    )
}
export default HomeSection
```

## Takeaways
- Tailwind is a great tool to use for styling HTML elements, but can easily grow out of control if you end up using a lot of properties.
- Next.Js performs built-in optimizations as long as you follow the documentation. Any page within the pages directory expects a React Component to render.