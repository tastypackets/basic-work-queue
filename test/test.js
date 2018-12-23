const assert = require('assert');
const BasicQueue = require('../index').BasicQueue;

describe('Basic Operations', function() {
    describe('#constructor()', function() {
        it('Should return a valid BasicQueue object', function() {
            assert(new BasicQueue() instanceof BasicQueue);
        });
        it('Should have the initial array passed', function() {
            // Check that passed array to constructor is assigned to the queue
            assert.strictEqual(new BasicQueue(['1']).queue[0], '1');
        });
    });
    describe('#getters & setters', function() {
        it('Should be able to get queue', function() {
            assert.strictEqual(Array.isArray(new BasicQueue().queue), true);
        });
        it('Should be able to set the queue', function() {
            const q = new BasicQueue();

            // Set queue to a new array
            const newArray = [1]
            q.queue = newArray;
            assert.strictEqual(q.queue, newArray);
        });
        it('Should not be able to set the queue to anything other than an array', function() {
            const q = new BasicQueue(['only item']);

            // Try to set to a number
            q.queue = 1;
            assert.strictEqual(Array.isArray(q.queue), true);

            // Try to set to a string
            q.queue = 'string';
            assert.strictEqual(Array.isArray(q.queue), true);

            // Try to set to a object
            q.queue = {};
            assert.strictEqual(Array.isArray(q.queue), true);

            // Try to set to a function
            q.queue = function(){};
            assert.strictEqual(Array.isArray(q.queue), true);
        });
        it('Should be able to check if queue is frozen', function() {
            const q = new BasicQueue();

            assert.strictEqual(q.frozen, false);

            // Freeze the queue
            q.freeze();
            assert.strictEqual(q.frozen, true);
        });
    });

    describe('#add()', function() {
        it('Should be able to add new items', function() {
            const q = new BasicQueue();
            q.add('1');
            assert.strictEqual(q.queue[0], '1');
            q.add('2');
            assert.strictEqual(q.queue[1], '2');
        });
        it('Should be able to add many types of items', function() {
            const q = new BasicQueue();
            q.add('1')
            q.add('2')
            q.add(3);
            assert.strictEqual(typeof q.queue[0], 'string');
            assert.strictEqual(typeof q.queue[2], 'number');
            q.add({test: 'test'});
            assert.strictEqual(typeof q.queue[3], 'object');
        });
    });

    describe('#addToBeginning()', function() {
        it('Should be able to add new items to beginning of queue', function() {
            const q = new BasicQueue();
            assert.strictEqual(q.addToBeginning(1).success, true)
            assert.strictEqual(q.queue[0], 1);
            assert.strictEqual(q.addToBeginning(2).success, true)
            assert.strictEqual(q.addToBeginning(3).success, true)
            assert.strictEqual(q.addToBeginning(4).success, true)
            assert.strictEqual(q.queue[0], 4);
            assert.strictEqual(q.queue[3], 1);
            assert.strictEqual(q.queue.length, 4);
        });
        it('Should be able to add many types of items', function() {
            const q = new BasicQueue();
            q.add('1')
            q.add('2')
            q.add(3);
            assert.strictEqual(typeof q.queue[0], 'string');
            assert.strictEqual(typeof q.queue[2], 'number');
            q.add({test: 'test'});
            assert.strictEqual(typeof q.queue[3], 'object');
        });
    });

    describe('#getNext()', function() {
        it('Should be able to get next item in queue', function() {
            const q = new BasicQueue([1 , 2, 3]);
            assert.strictEqual(q.getNext()[0], 1);
            assert.strictEqual(q.queue.length, 2);
            assert.strictEqual(q.queue[0], 2);
        });
        it('Should be able to get multiple next items in queue', function() {
            const q = new BasicQueue([1 , 2, 3]);
            const items = q.getNext(2);
            assert.strictEqual(items[0], 1);
            assert.strictEqual(items.length, 2);
            assert.strictEqual(q.queue.length, 1);
        });
    });

    describe('#getLast()', function() {
        it('Should be able to get next last item in queue', function() {
            const q = new BasicQueue([1 , 2, 3]);
            assert.strictEqual(q.getLast()[0], 3);
            assert.strictEqual(q.queue.length, 2);
            assert.strictEqual(q.queue[0], 1);
        });
        it('Should be able to get multiple of the last items in queue', function() {
            const q = new BasicQueue([1 , 2, 3, 4, 5, 6]);
            const items = q.getLast(2);
            assert.strictEqual(items[0], 6);
            assert.strictEqual(items.length, 2);
            assert.strictEqual(q.queue.length, 4);

            const items2 = q.getLast(3);
            assert.strictEqual(items2[0], 4);
            assert.strictEqual(items2[2], 2);
            assert.strictEqual(q.queue.length, 1);
        });
    });

    describe('#remove()', function() {
        it('Should be able to remove items', function() {
            const q = new BasicQueue([1 , 2, 3]);
            assert.strictEqual(q.remove(2).success, true);
            assert.strictEqual(q.queue[1], 3);
        });
        it('Should require exact equality to remove', function() {
            const exactObj = {test: 'test'};
            const q = new BasicQueue([exactObj, 2, '3']);

            // Try to remove similar obj
            assert.strictEqual(q.remove({test: 'test'}).message, 'Unable to locate item.')
            assert.strictEqual(q.queue[0], exactObj)

            // Try to remove exact obj
            assert.strictEqual(q.remove(exactObj).success, true)
            assert.strictEqual(q.queue[0], 2)
        });
    });
  });
