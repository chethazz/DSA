function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let elementToInsert = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > elementToInsert) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = elementToInsert;
    }

    return arr;
}

const arr = [4, 10, 4, 1, 3, 2, 0];
console.log(insertionSort(arr));