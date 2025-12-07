// Big O(mn)

function cartesianProduct(arr1, arr2) {
    const result = [];
    for(let a=0; a<arr1.length; a++) {
        for(let b=0; b<arr2.length; b++) {
            result.push([arr1[a], arr2[b]]);
        }
    }

    return result;
}

const arr1 = [1, 2, 3];
const arr2 = [4, 5];

console.log(cartesianProduct(arr1, arr2))