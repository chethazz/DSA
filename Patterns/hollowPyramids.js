function hollowRightHalfPyramid(rows) {
    for (let i = 0; i < rows; i++) {
        let row = "";
        for (let j = 0; j <= i; j++) {
            if (j === 0 || j === i || i === rows - 1) {
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
        for (let k = 0; k < rows - 1 - i; k++) {
            row += "  ";
        }
        for (let j = 0; j <= i; j++) {
            if (j === 0 || j === i || i === rows - 1) {
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
        for (let k = 0; k < rows - 1 - i; k++) {
            row += " ";
        }
        for (let j = 0; j <= i; j++) {
            if (j === 0 || j === i || i === rows - 1) {
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
        for (let k = 0; k < i; k++) {
            row += "  ";
        }
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

function hollowInvertedFullPyramid(rows) {
    for (let i = 0; i < rows; i++) {
        let row = "";
        for (let k = 0; k < i; k++) {
            row += " ";
        }
        for (let j = 0; j < rows - i; j++) {
            if (j === 0 || i === 0 || j === rows - 1 - i) {
                row += "* ";
            } else {
                row += "  ";
            }
        }
        console.log(row);
    }
}