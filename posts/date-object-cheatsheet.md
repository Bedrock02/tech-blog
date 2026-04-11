---
title: 'Javascript Date Object Cheatsheet'
metaDesc: 'A comprehensive guide to JavaScript Date object methods and best practices for working with dates in JavaScript.'
date: 'April 11, 2026'
tags:
  - javascript
  - date
  - engineering
---

For whatever reason, I always have trouble remembering the methods of the Date object in JavaScript. So here's a cheatsheet for myself and anyone else who might find it useful.

## Different Ways to Create a Date

```javascript
// Current date and time
const now = new Date();

// Specific date and time
const specificDate = new Date('2023-10-15');
const specificDate2 = new Date(2023, 9, 15); // Note: month is 0-indexed

// Unix timestamp (milliseconds since Jan 1, 1970)
const timestamp = new Date(1697400000000);
```

## Comparing Dates
Whenever I am asked to compare dates I tend to forget how to identify the older date vs the new date. I'll often think that the larger date is the newer date, but that's not always the case. 

If we were to sort an array of dates the older would come first the newer dates will be towards the end of the array.

I rather think about it as numbers so getting the milliseconds since epoch and comparing those numbers makes more sense to me.

```javascript
const date1 = new Date('2023-10-15');
const date2 = new Date('2023-10-16');

console.log(date1.getTime()); // 1697313600000
console.log(date2.getTime()); // 1697399999999

// Compare dates
console.log(date1 < date2); // true - date1 is older
console.log(1697313600000 < 1697399999999); // true

console.log(date1 > date2); // false - date1 is not newer
console.log(1697313600000 > 1697399999999); // false

console.log(date1 === date2); // false - they are not the same date
console.log(1697313600000 === 1697399999999); // false

// Check if dates are the same day
const isSameDay = date1.toDateString() === date2.toDateString();
console.log(isSameDay); // false
```

## Operations on Dates
```javascript
// Add days to a date
const date = new Date('2023-10-15');
const newDate = new Date(date);
newDate.setDate(date.getDate() + 5);
console.log(newDate); // 2023-10-20

// Subtract days from a date
const date2 = new Date('2023-10-15');
const newDate2 = new Date(date2);
newDate2.setDate(date2.getDate() - 5);
console.log(newDate2); // 2023-10-10
```

## Time elapse between dates
Since we have npm libraries that do the heavy lifting for us, I rarely have to calculate the time elapsed between dates manually. During interviews this comes up often and I always have to think about it for a bit.

- In 1 Day there are 24 hours
- In 1 Hour there are 60 minutes
- In 1 Minute there are 60 seconds
- In 1 Second there are 1000 milliseconds

Convert milliseconds to days:
- milliseconds / 1000 = seconds
- seconds / 60 = minutes
- minutes / 60 = hours
- hours / 24 = days

```javascript
const date1 = new Date('2023-10-15');
const date2 = new Date('2023-10-16');

const timeElapsed = date2 - date1;
console.log(timeElapsed); // 86400000 (milliseconds in a day)

const timeAdded = date1 + 86400000;
console.log(timeAdded); // 1697313600000 (milliseconds in a day)

// How many days since two dates
const daysElapsed = timeElapsed / (1000 * 60 * 60 * 24);
console.log(daysElapsed); // 1

// Display how many years months and days between two dates
const years = Math.floor(daysElapsed / 365);
const months = Math.floor((daysElapsed % 365) / 30);
const days = Math.floor((daysElapsed % 365) % 30);
console.log(`${years} years, ${months} months, ${days} days`);
```

## Formatting Dates
```javascript
const date = new Date('2023-10-15');

// Format as YYYY-MM-DD
const formattedDate = date.toISOString().split('T')[0];
console.log(formattedDate); // 2023-10-15

// Format as MM/DD/YYYY
const formattedDate2 = date.toLocaleDateString('en-US');
console.log(formattedDate2); // 10/15/2023

// Format as DD/MM/YYYY
const formattedDate3 = date.toLocaleDateString('en-GB');
console.log(formattedDate3); // 15/10/2023

// Format with time
const formattedDate4 = date.toLocaleString('en-US');
console.log(formattedDate4); // 10/15/2023, 12:00:00 AM
```

## Timezone Handling
```javascript
// Get current time in UTC
const utcDate = new Date().toUTCString();
console.log(utcDate); // Mon, 15 Oct 2023 00:00:00 GMT

// Get current time in local timezone
const localDate = new Date().toString();
console.log(localDate); // Mon Oct 15 2023 00:00:00 GMT+0000 (Coordinated Universal Time)
```

# Resources
- [MDN Date Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [Date and Time Formatting](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
