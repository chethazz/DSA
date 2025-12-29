const res = [];
const solution = [];
function backtrack(params) {
    if (baseCase) {
        res.push([...solution]);
        return;
    }

    for (const choice of choices) {
        if (!violatesConstraints) {
            makeChoice;
            backtrack(updatedParams);
            undoChoice;
        }
    }
}