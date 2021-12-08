
NONE  = 0
RED   = 1
GREEN = 2
BLUE  = 3

# Assume input int[4][4]
def isWin(board):
    for r in range(0, 4):
        for c in range(0, 4):
            if threeInRow(board, r, c):
                return True
    return False


def threeInRow(board, row, col):
    currColor = board[row][col]
    if currColor != NONE and (inDiagonal(board, row, col, 3, currColor) or inRow(board, row, col, 3, currColor) or inCol(board, row, col, 3, currColor)):
        return True
    else:
        return False

# Checks if diagonal, from top right corner
def inDiagonal(board, row, col, distance, color):
    if distance == 0:
        return True 
    
    if row < 0 or row > 3 or col < 0 or col > 3:
        return False

    if board[row][col] == color and inDiagonal(board, row + 1, col + 1, distance - 1, color):
        return True 
    else:
        return False

# Checks if row, from top right corner
def inRow(board, row, col, distance, color):
    if distance == 0:
        return True 
    
    if row < 0 or row > 3 or col < 0 or col > 3:
        return False
    
    if board[row][col] == color and inRow(board, row + 1, col, distance - 1, color):
        return True 
    else:
        return False

# Checks if column, from top right corner
def inCol(board, row, col, distance, color):
    if distance == 0:
        return True 
    
    if row < 0 or row > 3 or col < 0 or col > 3:
        return False
    
    if board[row][col] == color and inRow(board, row, col + 1, distance - 1, color):
        return True 
    else:
        return False
