# Description
This is a basic queue, it is essentially an array with some additional methods to make it easier to control work flow. Since it is an array with no validation it allows the developer to put whatever they want in it, from strings to nested arrays.

The queue can be initialized with an array and a call back that will execute whenever an op is attempted while the queue is frozen. The call back will receive the queue as the first and only variable its passed, this was done as convenience in case any form of logging was needed or perhaps a simple way of pausing data streams. This call back is set at the class level and is not intended to be set separately by every queue op. 

The queue methods all return `false` if the queue is frozen, so handling of individual operations / retrying an operation should be done based on the response from the method not using the call back.

The project is documented with jsdoc and all the documentation can be found on the github page: https://tastypackets.github.io/basic-queue/

# Setup

## Install
`yarn add basic-queue` or `npm install --save basic-queue`

## Import
```javascript
const BasicQueue = require('basic-queue');
```

## Construction
Basic operation examples, see the API documentation for full detials. https://tastypackets.github.io/basic-queue/
```javascript
// A new empty queue
const myQueue = new BasicQueue();

// A new queue with a default array of values
const myQueue2 = new BasicQueue([1,2,3]);

// A new queue with a default array and a call back to execute when an op is attempted while frozen
const myQueue3 = new BasicQueue([1,2,3], (q) => {
  console.log('Queue is frozen')
  console.log(`The queue size is ${q.queue.length}`)
});

// Add an item
myQueue.add({text: 'Hello World'})

// Get an item
const nextItem = myQueue.getNext() // This will be {text: 'Hello World'}
```

# Testing
Run the mocha test script to test the library, using yarn it would be `yarn test`.
