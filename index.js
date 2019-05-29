/** This is a basic queue for managing work flows */
class BasicQueue {
    /**
     * Create a basic queue
     * @param {Array} initialQueue Initial array of values
     * @param {Function} frozenCB Call back to execute when an op is run while queue is frozen
     */
    constructor(initialQueue = [], frozenCB) {
        this._queue = Array.isArray(initialQueue) ? initialQueue : [];
        this._frozen = false;
        this._frozenCB = typeof frozenCB === 'function' ? frozenCB : null;
    };

    set queue(newQueue) {
        if(Array.isArray(newQueue))
            this._queue = newQueue;
    }

    /** @type {Array} */
    get queue() {
        return this._queue;
    }

    /** @type {string} */
    get length() {
        return this._queue.length;
    }

    set frozen(boolean) {
        if(typeof boolean === 'boolean')
            this._frozen = boolean;
    }

    /** @type {Boolean} */
    get frozen() {
        return this._frozen;
    }

    set frozenCB(cb) {
        if(typeof cb === 'function')
            this._frozenCB = cb;
    }

    /** @type {Function} */
    get frozenCB() {
        return this._frozenCB;
    }

    /** Freezes the queue */
    freeze() {
        this._frozen = true;
    }
    
    /** Unfreeze the queue */
    unfreeze() {
        this._frozen = false;
    }

    /** Checks if frozen and executes CB if one is provided 
     *  Internal FN designed for lib use
     * @returns {Boolean} Indicates if it was frozen
    */
   freezeCheck() {
        if(!this.frozen)
            return false;

        if(this.frozenCB)
            this.frozenCB(this);
        
        return true;
    }

    /**
     * Adds one item to the end of the queue
     * @param {*} item Item to be added to queue
     * @returns {Boolean} Indicates if it was successful 
     */
    add(item) {
        if(this.freezeCheck())
            return false;

        this._queue.push(item);
        return true;
    }

    /**
     * Add one item to the beginning of the queue
     * @param {*} item Item to be added to queue
     * @returns {Boolean} Indicates if it was successful 
     */
    addToBeginning(item) {
        if(this.freezeCheck())
            return false;

        this._queue.splice(0, 0, item);
        return true;
    }

    /**
     * Gets the next items in queue
     * @param {Number} qty The quantity to be returned starting from index 0
     * @returns {(Array|Boolean)} Returns an array of values or false if frozen
     */
    getNext(qty = 1) {
        if(this.freezeCheck())
            return false;

        return this.getIndex(0, qty);
    }

    /**
     * Gets the last item from the queue
     * @param {Number} qty The quantity to be returned
     * @returns {(Array|Boolean)} Returns an array of values or false if frozen
     */
    getLast(qty = 1) {
        if(this.freezeCheck())
            return false;

        return this.getIndex(qty * -1, qty).reverse();
    }

    /** Gets all items currently in the queue */
    getAll() {
        if(this.freezeCheck())
            return false;

        return this.getIndex(0, this.length);
    }

    /**
     * Take an item out of the queue at a specific index
     * @param {Number} index The index to start at
     * @param {Number} qty The number of records to retrieve
     * @returns {(Array|Boolean)} Returns an array of values or false if frozen
     */
    getIndex(index = 0, qty = 1) {
        if(this.freezeCheck())
            return false;

        return this._queue.splice(index,qty);
    }

    /**
     * Locates the item and removes it from the queue
     * @param {*} item Must be the EXACT item (===) comparison done
     * @returns {Boolean} Indicates if the item was removed or not
     */
    remove(item) {
        if(this.freezeCheck())
            return false;

        const index = this._queue.findIndex(qItem => qItem === item);
        if(index === -1)
            return false;

        return this.removeIndex(index);
    }

    /**
     * Remove one item based on the array index
     * @param {Number} index Index of the item to be removed
     * @returns {Boolean} Indicates if the item was removed or not
     */
    removeIndex(index = 0, qty = 1) {
        // Use get index, but only return if false
        if(!this.getIndex(index, qty))
            return false;

        // Return success
        return true;
    }
}

module.exports = BasicQueue;