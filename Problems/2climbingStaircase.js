// Given a staircase of n steps, count the number of distinct ways 
// to climb to the top. You can either climb 1 step or 2 steps at a time

// Hint: We can only climb to n from n-1 or n-2
// So no of ways to climb n = no of ways to climb n-1 + no of ways to climb n-2

// Big O(n)
function climbingStaircase(noOfSteps) {
    let noOfWays = [1, 2];

    for(let i=2; i<noOfSteps; i++) {
        noOfWays[i] = noOfWays[i-1] + noOfWays[i-2]
    }

    return noOfWays[noOfSteps - 1];
}

console.log(climbingStaircase(4))