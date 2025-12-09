class Node {
	constructor(val, next = null, prev = null) {
		this.val = val;
		this.next = next;
		this.prev = prev;
	}
}

class DoublyLinkedList {
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
			let list = "";
			let curr = this.head;
			while (curr) {
				list += curr.val + " ";
				curr = curr.next;
			}
			console.log(list);
		}
	}

	printReverse() {
		if (this.isEmpty()) {
			console.log("Empty");
		} else {
			let list = "";
			let curr = this.tail;
			while (curr) {
				list += curr.val + " ";
				curr = curr.prev;
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
			this.head.prev = node;
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
			node.prev = this.tail;
			this.tail = node;
		}
		this.size++;
	}

	insert(value, index) {
		if (index < 0 || index > this.size) {
			return null;
		}
		if (index === 0) {
			this.prepend(value);
		} else if (index === this.size) {
			this.append(value);
		} else {
			const node = new Node(value);
			let prev;
			if (index <= Math.floor(this.size / 2)) {
				prev = this.head;
				for (let i = 0; i < index - 1; i++) {
					prev = prev.next;
				}
			} else {
				prev = this.tail;
				for (let i = this.size - 1; i > index - 1; i--) {
					prev = prev.prev;
				}
			}
			node.next = prev.next;
			node.prev = prev;
			prev.next = node;
			node.next.prev = node;
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
			this.head.prev = null;
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
			this.tail = this.tail.prev;
			this.tail.next = null;
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
			let removedNode;
			let prev;
			if (index <= Math.floor(this.size / 2)) {
				prev = this.head;
				for (let i = 0; i < index - 1; i++) {
					prev = prev.next;
				}
			} else {
				prev = this.tail;
				for (let i = this.size - 1; i > index - 1; i--) {
					prev = prev.prev;
				}
			}
			removedNode = prev.next;
			prev.next = removedNode.next;
			prev.next.prev = prev;
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
		} else {
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
			prev.next.prev = prev;
			this.size--;
			return value;
		}
	}

	search(value) {
		if (this.isEmpty()) {
			return -1;
		}
		let curr = this.head;
		for (let i = 0; i < this.size; i++) {
			if (curr.val === value) {
				return i;
			}
			curr = curr.next;
		}

		return -1;
	}
}

const list = new DoublyLinkedList();
list.prepend(10);
list.append(20);
list.append(30);
console.log(list.getSize());
list.insert(15, 1);
list.print();
