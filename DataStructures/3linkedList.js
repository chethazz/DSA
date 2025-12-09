class Node {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}

class LinkedList {
	constructor() {
		this.head = null;
		this.size = 0;
	}

	isEmpty() {
		return this.size === 0;
	}

	getSize() {
		return this.size;
	}

	// O (1)
	prepend(value) {
		const node = new Node(value);
		node.next = this.head;
		this.head = node;
		this.size++;
	}

	// O (n)
	append(value) {
		const node = new Node(value);
		if (this.isEmpty()) {
			this.head = node;
		} else {
			let prev = this.head;
			while (prev.next) {
				prev = prev.next;
			}
			prev.next = node;
		}
		this.size++;
	}

	insert(value, index) {
		if (index < 0 || index > this.size) {
			return;
		}
		if (index === 0) {
			this.prepend(value);
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

	removeFrom(index) {
		if (index < 0 || index >= this.size) {
			return null;
		}

		let removedNode;
		if (index === 0) {
			removedNode = this.head;
			this.head = this.head.next;
		} else {
			let prev = this.head;
			for (let i = 0; i < index - 1; i++) {
				prev = prev.next;
			}
			removedNode = prev.next;
			prev.next = removedNode.next;
		}
		this.size--;
		return removedNode.value;
	}

	removeValue(value) {
		if (this.isEmpty()) {
			return null;
		}
		if (value === this.head.value) {
			this.head = this.head.next;
			this.size--;
			return value;
		} else {
			let prev = this.head;
			while (prev.next && prev.next.value !== value) {
				prev = prev.next;
			}
			if (prev.next) {
				const removedNode = prev.next;
				prev.next = removedNode.next;
				this.size--;
				return value;
			}
			return null;
		}
	}

	search(value) {
		if (this.isEmpty()) {
			return -1;
		}
		let i = 0;
		let curr = this.head;
		while (curr) {
			if (curr.value === value) {
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
		while (curr) {
			let next = curr.next;
			curr.next = prev;
			prev = curr;
			curr = next;
		}
		this.head = prev;
	}

	print() {
		if (this.isEmpty()) {
			console.log("List is empty");
		} else {
			let curr = this.head;
			let str = "";
			while (curr) {
				str += curr.value + " ";
				curr = curr.next;
			}
			console.log(str);
		}
	}
}

const list = new LinkedList();

console.log(list.isEmpty());
console.log(list.getSize());
list.append(10);
list.append(20);
list.append(30);
list.append(40);
// list.insert(15, 1);
// list.insert(25, 3)
// list.insert(5, 0)
// list.removeFrom(3);
// list.removeValue(20);
list.print();
// console.log(list.getSize());
// console.log(list.search(30))
list.removeFrom(3);
list.print();