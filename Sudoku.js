
function boardmaker(puzzle_str){

    const matrix = [];


    for (let i = 0; i < 81; i++) {
        if (i%9==0) {
            matrix[parseInt(i/9)] = [];

        }
        let row = parseInt(i/9);
        let column = i%9;

            if (puzzle_str[i]==0) {matrix[row][column]=null} else
            matrix[row][column]=puzzle_str[i];
        
    }
    return matrix
}


function puzzle_checker(matrix){
//matrix[1][8]="5"
//check rows
    for (let row = 0; row < 9; row++){
        let value = matrix[row].filter((item) => item !== null);
        if (value.length !== (new Set(value)).size){
            return false
        }
    }

    //check columns
    for (let column = 0; column < 9; column++){
        let value = matrix.map((x) => x[column]);
        value = value.filter((item) => item !== null);
        if (value.length !== (new Set(value)).size){
            return false
        }
    }
    
//check squares
for (let i = 0; i < 9; i+=3) {
    
    for (let j = 0; j < 9; j+=3) {
        let value = [matrix[i][j],matrix[i+1][j],matrix[i+2][j],matrix[i][j+1],matrix[i][j+2],matrix[i+1][j+1],matrix[i+2][j+2],matrix[i+2][j+1],matrix[i+1][j+2]];
        value = value.filter((item) => item !== null);
        if (value.length !== (new Set(value)).size){
            return false
        }
    }
  }

 return true
}



function depthfirstsearch(matrix){

const flatmatrix = matrix.flat()

if (!flatmatrix.includes(null)){

    return matrix
}
    
let index = flatmatrix.indexOf(null)
let row = parseInt(index/9);
let column = index%9;

let matrixcopy = matrix.map(row => [...row])

for (let i = 1; i <10; i++){


    matrixcopy[row][column]=i.toString()
    if (puzzle_checker(matrixcopy)) {

    let idc = depthfirstsearch(matrixcopy)
        if (idc !== undefined) {
            return idc
                
            }
        }
    }

}


function readboard(){

    let puzzle_str = ""

for ( let i = 0 ; i<81; i++){
let cell = document.getElementById(`cell-${i}`).value
console.log(cell)
if (cell == "") {puzzle_str+="0"

        }

else {puzzle_str+=cell

    }

}
return boardmaker(puzzle_str)
}


function writeboard(matrix){
    const flatmatrix = matrix.flat()

for (i in flatmatrix){
document.getElementById(`cell-${i}`).value = flatmatrix[i]

    }
    
}




function solve(){let matrix = readboard()
console.log(matrix)
    let answer = depthfirstsearch(matrix)
console.log(answer)
    writeboard(answer)
    



}


function easyinput(){writeboard(boardmaker(document.getElementById('input_1').value))}

function random(){}





