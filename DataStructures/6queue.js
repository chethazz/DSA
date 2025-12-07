class Queue {
	constructor() {
		this.items = {};
		this.rear = 0;
		this.front = 0;
	}

	isEmpty() {
		return this.rear === this.front;
	}

	size() {
		return this.rear - this.front;
	}

	enqueue(value) {
		this.items[this.rear++] = value;
	}

	dequeue() {
		if (this.isEmpty()) return null;
		const item = this.items[this.front];
		delete this.items[this.front++];
		if (this.isEmpty()) {
			this.front = 0;
			this.rear = 0;
		}
		return item;
	}

	peek() {
		return this.isEmpty() ? null : this.items[this.front];
	}

	print() {
		console.log(this.items);
	}
}


module.exports = Queue;

// const queue = new Queue();
// console.log(queue.isEmpty());
// queue.enqueue(10);
// queue.enqueue(20);
// queue.enqueue(20);

// console.log(queue.size());
// queue.print();
// console.log(queue.dequeue());
// console.log(queue.peek());

// dequeue() is Big O(n)
class QueueUnoptimized {
	constructor() {
		this.items = [];
	}

	enqueue(element) {
		this.items.push(element);
	}

	dequeue() {
		return this.items.shift();
	}

	isEmpty() {
		return this.items.length === 0;
	}

	peek() {
		if (!this.isEmpty()) {
			return this.items[0];
		}
		return null;
	}

	size() {
		return this.items.length;
	}

	print() {
		console.log(this.items.toString());
	}
}

// const queue = new Queue();

// console.log(queue.isEmpty())
// queue.enqueue(10);
// queue.enqueue(20);
// console.log(queue.size());
// queue.print()

// console.log(queue.dequeue())
// console.log(queue.peek())
