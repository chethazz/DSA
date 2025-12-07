class Stack {
	constructor() {
		this.items = [];
	}

	push(value) {
		return this.items.push(value);
	}

	pop() {
		return this.items.pop();
	}

	size() {
		return this.items.length;
	}

	isEmpty() {
		return this.items.length === 0;
	}

	peek() {
		if (this.isEmpty()) {
			return "Stack is empty";
		}
		return this.items[this.items.length - 1];
	}

	print() {
		console.log(this.items.join("\n"));
	}

	clear() {
		this.items.length = 0;
	}
}

const stack = new Stack();

console.log(stack.isEmpty());
console.log(stack.push(10));
console.log(stack.push(20));
console.log(stack.peek());
console.log(stack.size());
stack.print();
console.log(stack.pop());
