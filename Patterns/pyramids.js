function rightHalfPyramid(rows) {
    for (let i = 0; i < rows; i++) {
        let row = "";
        for (let j = 0; j <= i; j++) {
            row += "* ";
        }
        console.log(row);
    }
}

function leftHalfPyramid(rows) {
    for (let i = 0; i < rows; i++) {
        let row = "";
        for (let k = 0; k < rows - 1 - i; k++) {
            row += "  ";
        }
        for (let j = 0; j <= i; j++) {
            row += "* ";
        }
        console.log(row);
    }
}

function fullPyramid(rows) {
    for (let i = 0; i < rows; i++) {
        let row = "";
        for (let k = 0; k < rows - 1 - i; k++) {
            row += " ";
        }
        for (let j = 0; j <= i; j++) {
            row += "* ";
        }
        console.log(row);
    }
}

function invertedRightHalfPyramid(rows) {
    for(let i=0; i<rows; i++) {
        let row = "";
        for(let j=0; j<rows-i; j++) {
            row += "* ";
        }
        console.log(row);
    }
}

function invertedLeftHalfPyramid(rows) {
    for (let i = 0; i < rows; i++) {
        let row = "";
        for (let k = 0; k < i; k++) {
            row += "  ";
        }
        for (let j = 0; j < rows - i; j++) {
            row += "* ";
        }
        console.log(row);
    }
}

function invertedFullPyramid(rows) {
    for(let i=0; i<rows; i++) {
        let row = "";
        for(let k=0; k<i; k++) {
            row += " ";
        }
        for(let j=0; j<rows - i; j++) {
            row += "* ";
        }
        console.log(row);
    }
}