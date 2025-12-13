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