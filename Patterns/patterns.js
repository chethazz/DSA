function hollowRightHalfPyramid(rows) {
    for (let i = 0; i < rows; i++) {
        let row = "";
        for (let j = 0; j <= i; j++) {
            if (j === 0 || i === j || i === rows - 1) {
                row += "* ";
            } else {
                row += "  ";
            }
        }
        console.log(row);
    }
}

function hollowLeftHalfPyramid(rows) {
    for (let i = 0; i < rows; i++) {
        let row = "";
        for (let j = 0; j < rows - 1 - i; j++) {
            row += "  ";
        }
        for (let k = 0; k <= i; k++) {
            if (k === 0 || k === i || i === rows - 1) {
                row += "* ";
            } else {
                row += "  ";
            }
        }
        console.log(row);
    }
}

function hollowFullPyramid(rows) {
    for (let i = 0; i < rows; i++) {
        let row = "";
        for (let j = 0; j < rows - 1 - i; j++) {
            row += " ";
        }
        for (let k = 0; k <= i; k++) {
            if (k === 0 || i === k || i === rows - 1) {
                row += "* ";
            } else {
                row += "  ";
            }
        }
        console.log(row);
    }
}

function hollowInvertedRightHalfPyramid(rows) {
    for (let i = 0; i < rows; i++) {
        let row = "";
        for (let j = 0; j < rows - i; j++) {
            if (i === 0 || j === 0 || j === rows - 1 - i) {
                row += "* ";
            } else {
                row += "  ";
            }
        }
        console.log(row);
    }
}

function hollowInvertedLeftHalfPyramid(rows) {
    for (let i = 0; i < rows; i++) {
        let row = "";
        for (let j = 0; j < i; j++) {
            row += "  ";
        }
        for (let k = 0; k < rows - i; k++) {
            if (i === 0 || k === 0 || k === rows - 1 - i) {
                row += "* ";
            } else {
                row += "  ";
            }
        }
        console.log(row);
    }
}

function hollowInvertedFullPyramid(rows) {
    for (let i = 0; i < rows; i++) {
        let row = "";
        for (let j = 0; j < i; j++) {
            row += " ";
        }
        for (let k = 0; k < rows - i; k++) {
            if (k === 0 || i === 0 || k === rows - 1 - i) {
                row += "* ";
            } else {
                row += "  ";
            }
        }
        console.log(row);
    }
}

function rightLeaningRhombus(rows) {
    for (let i = 0; i < rows; i++) {
        let row = "";
        for (let j = 0; j < rows - i - 1; j++) {
            row += "  ";
        }
        for (let k = 0; k < rows; k++) {
            row += "* ";
        }
        console.log(row);
    }
}

function leftLeaningRhombus(rows) {
    for (let i = 0; i < rows; i++) {
        let row = "";
        for (let j = 0; j < i; j++) {
            row += "  ";
        }
        for (let k = 0; k < rows; k++) {
            row += "* ";
        }
        console.log(row);
    }
}

function pascalsTriangle(rows) {
    for (let i = 1; i <= rows; i++) {
        let row = "";
        for (let j = 0; j < rows - i; j++) {
            row += " ";
        }
        let num = 1;
        for (let k = 1; k <= i; k++) {
            row += num + " ";
            num = num * (i - k) / k;
        }
        console.log(row);
    }
}