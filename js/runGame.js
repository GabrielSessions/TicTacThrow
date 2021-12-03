
//updates playerNumber if added to a player spot
function checkIfAddedToGame(){
    var checkPlayerNum = setInterval(() => {
        if (gev('Player1') == playerID){
            playerNumber = 1;
        }
        else if (gev('Player2') == playerID){
            playerNumber = 2;
        }
        else if (gev('Player3') == playerID){
            playerNumber = 3;
        }
        else{
            playerNumber = 0;
        }
    }, 500);
}

//gev = myAirtable.getEntryValue
function gev(val){
    return myAirtable.getEntryValue(val);
}

function checkIfGameStarted(){
    var gameStart = setInterval(() => {
        if (gev('GameStarted') && playerNumber > 0){
            console.log('Game Started!');
            clearInterval(gameStart);
            clearInterval(checkPlayerNum);
        }
    }, 300);
}