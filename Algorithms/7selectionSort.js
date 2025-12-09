// Go through the array and find lowest value(initially arr[i] is lowest)
// Swap arr[i] with lowest value
// Go through array as many as Array.prototype.length

// Big O(n^2)
function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let lowestIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[lowestIndex]) {
                lowestIndex = j;
            }
        }
        let temp = arr[i];
        arr[i] = arr[lowestIndex];
        arr[lowestIndex] = temp;
    }

    return arr;
}

const arr = [7, 12, 9, 11, 3, 3];
console.log(selectionSort(arr));