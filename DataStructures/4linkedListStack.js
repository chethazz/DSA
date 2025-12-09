const LinkedList = require("./8.1linkedListTail");

class LinkedListStack {
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

	push(value) {
		this.list.prepend(value);
	}

	pop() {
		return this.list.removeFromFront();
	}

	peek() {
		return this.list.head.val;
	}
}

const stack = new LinkedListStack();

stack.push(20);
stack.push(30);
stack.push(40);
stack.push(50);
stack.pop();
console.log(stack.peek());
stack.print();
