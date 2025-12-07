const LinkedList = require("./8.1linkedListTail");

class LinkedListQueue {
    constructor() {
        this.list = new LinkedList();
    }

    isEmpty() {
        return this.list.isEmpty();
    }

    getSize() {
        return this.list.getSize();
    }

    print() {
        return this.list.print();
    }

    enqueue(value) {
        this.list.append(value);
    }

    dequeue() {
        return this.list.removeFromFront();
    }

    peek() {
        return this.list.head.val;
    }
}

const queue = new LinkedListQueue();

queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);

console.log(queue.dequeue());
queue.print();
console.log(queue.getSize());