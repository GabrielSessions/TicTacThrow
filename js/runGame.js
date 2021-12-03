function checkIfAddedToGame(){
    var checkPlayerNum = setInterval(() => {
        if (gev('Player 1') == playerID){
            playerNumber = 1;
        }
        else if (gev('Player 2') == playerID){
            playerNumber = 2;
        }
        else if (gev('Player 3') == playerID){
            playerNumber = 3;
        }
    }, 500);
}

//gev = myAirtable.getEntryValue
function gev(val){
    return myAirtable.getEntryValue(val);
}