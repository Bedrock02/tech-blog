---
title: 'Revisiting My Portfolio'
metaDesc: 'The pains and takeaways of revisiting your personal portfolio.'
date: 'Jan 22, 2023'
tags:
  - gatsby
  - refactor
  - javascript
---

The year 2022 was the season for layoffs. Tech companies adjusted their spending, changed their priorities, reduce their org count by at least 5%. In December 2022, I was laid off and I knew it was time to dust off my portfolio and make some improvements. Below are some of the issues I came across and my personal takeaways.


## Stale Tech
The last time I worked on my portfolio was back in June of 2021. While it may not seem long, for tech a year of no updates is too long.

You know your code is in a bad state when [dependabot](https://github.com/dependabot) opens a list of package updates. My portfolio is written using [Gatsby](https://www.gatsbyjs.com/). The code was sitting on version 2 of Gatsby and since then it has had 3 major version bumps.

I now use [Typescript](https://www.typescriptlang.org/), and my portfolio is just straight javascript. For this project, react files had an file extension of `.js`. Today, I use `.jsx` or `.tsx` to describe react components and `.js` or `.ts` for javascript modules.

Lastly, my code has improved in quality. I can better identify how to reduce the amount of code I need to write, how to better structure files, and how to best approach problems.


## Do I Have To Migrate?
The portfolio was sitting on Gatsby V2, but I didn't want to upgrade the version. I didn't want to make any major changes. I wanted to just get in and get out ([FIFO](https://www.investopedia.com/terms/f/fifo.asp)).

Before I could commit any new code I was unable to run my portfolio locally. I was getting the following error:

`error UNHANDLED REJECTION error:0308010C:digital envelope routines::unsupported
`

StackOverflow led me to a temporary solution of using a `NODE_OPTION`; openssl-legacy-provider.

```javascript
{
    ...
    "build": "export NODE_OPTIONS=--openssl-legacy-provider && gatsby build"
}
```

This was only temporary and allowed me to develop on my local machine. Once I pushed up my code to the production environment on [Netlify](https://www.netlify.com/), I continued to build failures. These build failures blocked me from updating my portfolio.

### Time To Migrate
The migration was unavoidable. I had a better chance of having my project in stable condition if I just migrated to Gatsby V5. Luckily Gatsby had great migration docs. Updating Gatsby to V5 wasn't bad.

What was difficult was updating the [semantic-ui-less](https://github.com/Semantic-Org/Semantic-UI-LESS) package to work well with the new version of Gatsby. My assets were not compiling properly so I ended up copying a script and following the steps provided on another blog.

See the migration changes here:
###### Note: There is clean-up code in the PR.
- [Gatsby V2 to V4](https://github.com/Bedrock02/Portfolio/commit/d881e107d043b3c4f192d916eba5e3cc3178e045)
- [Gatsby V4 to V5](https://github.com/Bedrock02/Portfolio/commit/38d02a73d1bbfa8655bc48d65b55baf7db08c1cc#diff-cbda65a593b0a8c66a6a5225e8eb3396e4735255e4304bcc07219380561a9288)

## Tools Are Your Friends
When I started this project I didn't add any eslint tooling. So this was the perfect time to do so. I recommend following some articles on how you can [add eslint and other tools like prettier](https://dev.to/knowankit/setup-eslint-and-prettier-in-react-app-357b) to your project. If you are not coding with a linter you are doing a disservice to yourself.

Since I wasn't using Typescript I reverted to using `PropTypes` as a way to describe what my component should be expecting as input and the type of that input. Typing my props was the only thing I was able to do. In the future I would like to add typing and support Typescript `{ts, tsx}` files.

## UI Limitations
As I added content to my portfolio, I wanted to add UI components like [chips](https://www.infragistics.com/products/indigo-design/help/components/chips). I quickly realized that semantic-ui hasn't been making much improvements or providing new components. Anything that didn't exist as a component I would have to build myself (not trying to do that).


## Takeaways
- Revisit published projects and keep them up to date ( small updates over time ).
- Version migrations can be a pain, however not updating will make your code open to vulnerabilities and grow brittle over time.
- New tech is going to be introduced, so use your site to start learning new languages or concepts.
- When picking out a library or tool, review what features it supports and how much popularity it has with developers.
