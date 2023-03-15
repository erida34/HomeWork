
let currentMatrix = [
    [1,2,3],
    [4,5,6],
    [7,9,9]
];

function determinant(matrix) {
    if(matrix.length !== matrix[0].length)
        return 'Not supported';
    if(matrix.length === 1 && matrix[0].length === 1){
        return matrix[0][0];
    }
    let result = 0;

    for(let i = 0; i < matrix[0].length; i++){
        let mantissa = [];
        for(let j = 1; j < matrix.length; j++){
            mantissa.push([]);
            for(let k = 0; k < matrix[j].length; k++){
                if(k !== i)
                    mantissa[j-1].push(matrix[j][k]);
            }

        }
        result += (-1)**i * matrix[0][i] * determinant(mantissa);
    }
    return result;
}

console.log(determinant(currentMatrix))