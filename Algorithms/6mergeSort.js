// Big O(nlogn)

// logn (recursively dividing problem to half)
function mergeSort(arr) {
    if(arr.length < 2) return arr

    const mid = Math.floor(0 + arr.length)/2
    const leftArray = arr.slice(0, mid);
    const rightArray = arr.slice(mid)
    return merge(mergeSort(leftArray), mergeSort(rightArray))
}

// linear (loop)
function merge(leftArr, rightArr) {
    let sortedArr = [];
    while(leftArr.length && rightArr.length) {
        if(leftArr[0] <= rightArr[0]) {
            sortedArr.push(leftArr.shift())
        } else {
            sortedArr.push(rightArr.shift())
        }
    }
    return [...sortedArr, ...leftArr, ...rightArr];
}

const arr = [1, 3,2, 5, 6, 4, 6]

console.log(mergeSort(arr))