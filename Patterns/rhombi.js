function rightLeaningRhombus(rows) {
    for (let i = 0; i < rows; i++) {
        let row = "";
        for (let k = 0; k < rows - 1 - i; k++) {
            row += "  ";
        }
        for (let j = 0; j < rows; j++) {
            row += "* ";
        }
        console.log(row);
    }
}

function leftLeaningRhombus(rows) {
    for (let i = 0; i < rows; i++) {
        let row = "";
        for (let k = 0; k < i; k++) {
            row += "  ";
        }
        for (let j = 0; j < rows; j++) {
            row += "* ";
        }
        console.log(row);
    }
}