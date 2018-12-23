/** This is a basic queue for processing async requests */
class BasicQueue {
    /**
     * Create a basic queue
     * @param {Array} initialQueue Initial array of values
     */
    constructor(initialQueue = []) {
        this._queue = Array.isArray(initialQueue) ? initialQueue : [];
        this._frozen = false;
        this._frozenErrorMsg = {success: false, message: 'Queue is currently frozen, no ops allowed.'};
    };

    set queue(newQueue) {
        if(Array.isArray(newQueue))
            this._queue = newQueue;
    };

    get queue() {
        return this._queue;
    };

    get frozen() {
        return this._frozen;
    }

    /**
     * Gets the next items in queue
     * @param {Number} qty The quantity to be retruend starting from index 0
     */
    getNext(qty = 1) {
        if(this._frozen)
            return this._frozenErrorMsg;

        return this.getIndex(0, qty);
    }

    /**
     * Gets the last item from the queue
     * @param {Number} qty The quantity to be retruend
     */
    getLast(qty = 1) {
        if(this._frozen)
            return this._frozenErrorMsg;

        return this.getIndex(qty * -1, qty).reverse();
    }

    /**
     * Take an item out of the queue at a specific index
     * @param {Number} index The index to start at
     * @param {Number} qty The number of records to retrieve
     */
    getIndex(index, qty = 1) {
        if(this._frozen)
            return this._frozenErrorMsg;

        // If the index is the start or end no need to freeze queue
        if(index === 0 || index === -1)
            return this._queue.splice(index,qty);

        this.freeze();
        const items = this._queue.splice(index,qty);
        this.unfreeze();
        return items;
    }

    /** Freezes the queue */
    freeze() {
        this._frozen = true;
    };

    /** Unfreeze the queue */
    unfreeze() {
        this._frozen = false;
    };

    /**
     * Adds one item to the end of the queue
     * @param {*} item Item to be added to queue
     */
    add(item) {
        if(this._frozen)
            return this._frozenErrorMsg;

        this._queue.push(item);
        return {success: true, message: 'Added item to end of queue.'};
    };

    /**
     * Add one item to the begnning of the queue
     * @param {*} item Item to be added to queue
     */
    addToBeginning(item) { //TODO: This needs to handle multiple items
        if(this._frozen)
            return this._frozenErrorMsg;

        this._queue.splice(0, 0, item);
        return {success: true, message: 'Added item to end of queue.'};
    };

    /**
     * Locates the item and removes it from the queue
     * @param {*} item Must be the EXACT item (===) comparison done
     */
    remove(item) {
        if(this._frozen)
            return this._frozenErrorMsg;

        const index = this._queue.findIndex(qItem => qItem === item);
        if(index === -1)
            return {success: false, message: 'Unable to locate item.'};

        return this.removeIndex(index);
    }

    /**
     * Remove one item based on the array index
     * @param {Number} index Index of the item to be removed
     */
    removeIndex(index) {
        if(this._frozen)
            return this._frozenErrorMsg;

        this.freeze();
        this._queue.splice(index, 1);
        this.unfreeze();
        return {success: true, message: `Item removed from array at position ${index}.`};
    };
}

module.exports.BasicQueue = BasicQueue;