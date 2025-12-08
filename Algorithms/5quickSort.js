function quickSort(arr, left, right) {
    if (left < right) {
        const pivot = partition(arr, left, right);
        quickSort(arr, pivot + 1, right);
        quickSort(arr, left, pivot - 1);
    }
    return arr;
}

function partition(arr, left, right) {
    let pivot = arr[left];
    let i = left;
    let j = right;

    while (i <= j) {
        while (pivot >= arr[i]) {
            i++;
        }
        while (pivot < arr[j]) {
            j--;
        }
        if (i < j) {
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    let temp = arr[left];
    arr[left] = arr[j];
    arr[j] = temp;
    return j;
}

const arr = [1, 10, 4, 3, 2, 0];
console.log(quickSort(arr, 0, arr.length - 1));
console.log(arr);