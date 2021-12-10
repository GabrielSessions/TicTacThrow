
NONE  = 0
RED   = 1
GREEN = 2
BLUE  = 3

# Assume input int[4][4]
def isWin(board):
    for r in range(0, 4):
        for c in range(0, 4):
          # I changed the next three lines
          tempVal = threeInRow(board, r, c)
          if tempVal != 0:
            return tempVal
    return NONE

def threeInRow(board, row, col):
    currColor = board[row][col]
    if currColor != NONE and (inDiagonal(board, row, col, 3, currColor) or inRow(board, row, col, 3, currColor) or inCol(board, row, col, 3, currColor)):
        return currColor # I changed this
    else:
        return NONE # I changed This

def inDiagonal(board, row, col, distance, color):
    if distance == 0:
        return True 
    
    if row < 0 or row > 3 or col < 0 or col > 3:
        return False

    if board[row][col] == color and inDiagonal(board, row + 1, col + 1, distance - 1, color):
        return True 
    else:
        return False

def inRow(board, row, col, distance, color):
    if distance == 0:
        return True 
    
    if row < 0 or row > 3 or col < 0 or col > 3:
        return False
    
    if board[row][col] == color and inRow(board, row + 1, col, distance - 1, color):
        return True 
    else:
        return False

def inCol(board, row, col, distance, color):
    if distance == 0:
        return True 
    
    if row < 0 or row > 3 or col < 0 or col > 3:
        return False
    
    if board[row][col] == color and inRow(board, row, col + 1, distance - 1, color):
        return True 
    else:
        return False
