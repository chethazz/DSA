class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        const priority = element[1];
        let pushed = false;
        for (let i = 0; i < this.items.length; i++) {
            if (priority < this.items[i][1]) {
                this.items.splice(i, 0, element);
                pushed = true;
                break;
            }
        }
        if (!pushed) {
            this.items.push(element);
        }
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
        console.log(this.items);
    }
}

const queue = new Queue();
queue.enqueue(["Chethas", 10]);
queue.enqueue(["Aron", 5]);
queue.enqueue(["Rahul", 1]);
queue.dequeue();
queue.print();