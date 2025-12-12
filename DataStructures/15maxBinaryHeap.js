class Heap {
    constructor() {
        this.data = [];
    }

    getParentIndex(i) {
        return Math.floor((i - 1) / 2);
    }

    getLeftChildIndex(i) {
        return i * 2 + 1;
    }

    getRightChildIndex(i) {
        return i * 2 + 2;
    }

    swap(i1, i2) {
        const temp = this.data[i1];
        this.data[i1] = this.data[i2];
        this.data[i2] = temp;
    }

    push(value) {
        this.data[this.data.length] = value;
        this.heapifyUp();
    }

    heapifyUp() {
        let currentIndex = this.data.length - 1;

        while (currentIndex > 0) {
            const parentIndex = this.getParentIndex(currentIndex);
            if (this.data[currentIndex] > this.data[parentIndex]) {
                this.swap(currentIndex, parentIndex);
                currentIndex = parentIndex;
            } else {
                return;
            }
        }
    }

    poll() {
        const maxValue = this.data[0];
        this.data[0] = this.data[this.data.length - 1];
        this.data.length--;

        this.heapifyDown();
        return maxValue;
    }

    heapifyDown() {
        let currentIndex = 0;

        while (this.data[this.getLeftChildIndex(currentIndex)] !== undefined) {
            let biggestChildIndex = this.getLeftChildIndex(currentIndex);
            const rightChildIndex = this.getRightChildIndex(currentIndex);

            if (
                this.data[rightChildIndex] !== undefined &&
                this.data[rightChildIndex] > this.data[biggestChildIndex]
            ) {
                biggestChildIndex = rightChildIndex;
            }

            if (this.data[currentIndex] < this.data[biggestChildIndex]) {
                this.swap(currentIndex, biggestChildIndex);
                currentIndex = biggestChildIndex;
            } else {
                return;
            }
        }
    }
}


const heap = new Heap();
console.log(heap);
heap.push(25);
heap.push(5);
heap.push(40);
heap.push(70);
heap.push(90);
heap.push(44);
heap.poll();

console.log(heap.data.join(", "));