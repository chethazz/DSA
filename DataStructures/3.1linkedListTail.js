class Node {
	constructor(val, next = null) {
		this.val = val;
		this.next = next;
	}
}

class LinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
		this.size = 0;
	}

	isEmpty() {
		return this.size === 0;
	}

	getSize() {
		return this.size;
	}

	print() {
		if (this.isEmpty()) {
			console.log("Empty");
		} else {
			let curr = this.head;
			let list = "";
			while (curr) {
				list += curr.val + " ";
				curr = curr.next;
			}
			console.log(list);
		}
	}

	prepend(value) {
		const node = new Node(value);
		if (this.isEmpty()) {
			this.head = node;
			this.tail = node;
		} else {
			node.next = this.head;
			this.head = node;
		}
		this.size++;
	}

	append(value) {
		const node = new Node(value);
		if (this.isEmpty()) {
			this.head = node;
			this.tail = node;
		} else {
			this.tail.next = node;
			this.tail = node;
		}
		this.size++;
	}

	insert(value, index) {
		if (index > this.size || index < 0) {
			return;
		}
		if (index === 0) {
			this.prepend(value);
		} else if (index === this.size) {
			this.append(value);
		} else {
			const node = new Node(value);
			let prev = this.head;
			for (let i = 0; i < index - 1; i++) {
				prev = prev.next;
			}
			node.next = prev.next;
			prev.next = node;
			this.size++;
		}
	}

	removeFromFront() {
		if (this.isEmpty()) {
			return null;
		}
		const value = this.head.val;
		if (this.size === 1) {
			this.head = null;
			this.tail = null;
		} else {
			this.head = this.head.next;
		}
		this.size--;
		return value;
	}

	removeFromEnd() {
		if (this.isEmpty()) {
			return null;
		}
		const value = this.tail.val;
		if (this.size === 1) {
			this.head = null;
			this.tail = null;
		} else {
			let prev = this.head;
			while (prev.next !== this.tail) {
				prev = prev.next;
			}
			prev.next = null;
			this.tail = prev;
		}
		this.size--;
		return value;
	}

	removeFrom(index) {
		if (index < 0 || index >= this.size) {
			return null;
		}
		if (index === 0) {
			return this.removeFromFront();
		} else if (index === this.size - 1) {
			return this.removeFromEnd();
		} else {
			let prev = this.head;
			for (let i = 0; i < index - 1; i++) {
				prev = prev.next;
			}
			const removedNode = prev.next;
			prev.next = removedNode.next;
			this.size--;
			return removedNode.val;
		}

	}

	removeValue(value) {
		if (this.isEmpty()) {
			return null;
		}
		if (this.head.val === value) {
			return this.removeFromFront();
		}
		let prev = this.head;
		while (prev.next && prev.next.val !== value) {
			prev = prev.next;
		}

		if (!prev.next) {
			return null;
		}

		if (prev.next === this.tail) {
			return this.removeFromEnd();
		}

		const removedNode = prev.next;
		prev.next = removedNode.next;
		this.size--;
		return value;
	}

	search(value) {
		if (this.isEmpty()) {
			return -1;
		}

		let i = 0;
		let curr = this.head;
		while (curr) {
			if (curr.val === value) {
				return i;
			}
			curr = curr.next;
			i++;
		}

		return -1;
	}

	reverse() {
		let prev = null;
		let curr = this.head;
		this.tail = this.head;
		while (curr) {
			let next = curr.next;
			curr.next = prev;
			prev = curr;
			curr = next;
		}
		this.head = prev;
	}
}

module.exports = LinkedList;

// const list = new LinkedList();
// list.prepend(20);
// list.prepend(10);
// list.append(30);

// console.log(list.search(30));
// list.print();
