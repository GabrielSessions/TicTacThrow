
const NONE  = 0
const RED   = 1
const GREEN = 2
const BLUE  = 3

// Assume input int[4][4]
function isWin(board){
    for (let r = 0; r < 4; r++){
        for (let c = 0; c < 4; c++){
            
            let tempVal = threeInRow(board, r, c);

            if (tempVal != 0){
                return tempVal;
            }
        }
    }
    return null;
}

function threeInRow(board, row, col){
    currColor = board[row][col]
    if (currColor != null && (inDiagonal(board, row, col, 3, currColor) || inRow(board, row, col, 3, currColor) || inCol(board, row, col, 3, currColor))){
        return currColor;
    } 
    else{
        return null; // I changed This
    }
        
}

function inDiagonal(board, row, col, distance, color){
    if (distance == 0){
        return true;
    }
         
    
    if (row < 0 || row > 3 || col < 0 || col > 3){
        return false;
    }
        

    if (board[row][col] == color && inDiagonal(board, row + 1, col + 1, distance - 1, color)){
        return true;
    }
   
    else{
        return false;
    }
        
}
    

function inRow(board, row, col, distance, color){
    if (distance == 0){
        return true;
    } 
    
    if (row < 0 || row > 3 || col < 0 || col > 3){
        return false;
    }
    
    if (board[row][col] == color && inRow(board, row + 1, col, distance - 1, color)){
        return true;
    }
         
    else{
        return false;
    }
}
function inCol(board, row, col, distance, color){
    if (distance == 0){
        return true;
    }  
    
    if (row < 0 || row > 3 || col < 0 || col > 3){
        return false;
    }
        
    
    if (board[row][col] == color && inRow(board, row, col + 1, distance - 1, color)){
        return true;
    }
         
    else{
        return false;
    }
}