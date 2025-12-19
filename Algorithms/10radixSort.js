// Big O(d*(n + k))
// d - no of digits
// k - radix

function radixSort(arr) {
    const max = Math.max(...arr);

    for (let place = 1; Math.floor(max / place) > 0; place *= 10) {
        const bins = Array.from({ length: 10 }, () => new Array());

        for (let num of arr) {
            const lastDigit = Math.floor(num / place) % 10;
            bins[lastDigit].push(num);
        }

        let index = 0;
        for (let bin of bins) {
            for (let num of bin) {
                arr[index++] = num;
            }
        }
    }
}

const arr = [237, 146, 259, 348, 152, 163, 235, 48, 36, 62];

radixSort(arr);
console.log(arr)

