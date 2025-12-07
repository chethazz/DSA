class HashTable {
	constructor(size) {
		this.table = new Array(size);
		this.size = size;
	}

	_hash(key) {
		let total = 0;
		for (let i = 0; i < key.length; i++) {
			total += key.codePointAt(i);
		}
		return total % this.size;
	}

	set(key, value) {
		let index = this._hash(key);
		const bucket = this.table[index];
		if (!bucket) {
			this.table[index] = [[key, value]];
		} else {
			const sameKeyItem = bucket.find((item) => item[0] === key);
			if (sameKeyItem) {
				sameKeyItem[1] = value;
			} else {
				bucket.push([key, value]);
			}
		}
	}

	get(key) {
		let index = this._hash(key);
		const bucket = this.table[index];
		if (bucket) {
			const sameKeyItem = bucket.find((item) => item[0] === key);
			if (sameKeyItem) {
				return sameKeyItem[1];
			}
		}

		return undefined;
	}

	remove(key) {
		let index = this._hash(key);
		const bucket = this.table[index];
		if (bucket) {
			this.table[index] = bucket.filter((item) => item[0] !== key);
			if (!this.table[index].length) {
				this.table[index] = undefined;
			}
		}
	}

	display() {
		for (let i = 0; i < this.table.length; i++) {
			if (this.table[i]) {
				console.log(i, this.table[i]);
			}
		}
	}
}

const table = new HashTable(50);
table.set("name", "Chethas");
table.set("mane", "Nithaj");
table.set("age", 25);
table.set("bge", 25);
table.set("agf", 35);
table.remove("mane");
table.set("name", "Diana");
table.display();
