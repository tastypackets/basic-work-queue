# Description
This is a basic queue, it is essentially an array with some additional methods to make it easier to control work flow. Since it is an array with no validation it allows the developer to put whatever they want in it, from strings to nested arrays.

# Setup

## Install
`yarn add basic-queue` or `npm install --save basic-queue`

## Import
```javascript
const BasicQueue = require('basic-queue');
```

## Construction
```javascript
// A new empty queue
const myQueue = new BasicQueue();

// A new queue with a default array of values
const myQueue2 = new BasicQueue([1,2,3]);

```

# Testing
Run the mocha test script to test the library, using yarn it would simply `yarn test`.