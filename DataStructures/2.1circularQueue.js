class CircularQueue {
	constructor(capacity) {
		this.items = new Array(capacity);
		this.front = -1;
		this.rear = -1;
		this.capacity = capacity;
		this.currentLength = 0;
	}

	isFull() {
		return this.currentLength === this.capacity;
	}

	isEmpty() {
		return this.currentLength === 0;
	}

	enqueue(value) {
		if (!this.isFull()) {
			this.rear = (this.rear + 1) % this.capacity;
			this.items[this.rear] = value;
			this.currentLength++;
			if (this.front === -1) {
				this.front = this.rear;
			}
		}
	}

	dequeue() {
		if (this.isEmpty()) return null;
		const item = this.items[this.front];
		this.items[this.front] = null;
		this.currentLength--;
		this.front = (this.front + 1) % this.capacity;
		if (this.isEmpty()) {
			this.front = -1;
			this.rear = -1;
		}
		return item;
	}

	peek() {
		if (this.isEmpty()) return null;
		return this.items[this.front];
	}

	print() {
		if (this.isEmpty()) {
			console.log("Empty");
		} else {
			let str = "";
			let i = this.front;
			while (i !== this.rear) {
				str += this.items[i] + " ";
				i = (i + 1) % this.capacity;
			}
			str += this.items[i];
			console.log(str);
		}
	}
}

const q = new CircularQueue(4);

q.enqueue(10);
q.enqueue(20);
q.enqueue(30);
q.enqueue(40);

q.enqueue(10);
q.print();
