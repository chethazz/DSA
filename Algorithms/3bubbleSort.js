const arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

function bubbleSort(arr) {
    let swapped = true;
    let n = arr.length;

    while (swapped) {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
        n--;
    }

    return arr;
}

console.log(bubbleSort(arr));