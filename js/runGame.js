var checkPlayerNum;

//updates playerNumber if added to a player spot
function checkIfAddedToGame(){
    checkPlayerNum = setInterval(() => {
        //console.log("checkPlayerNum");
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
        
        //If the player is in the game and GameStarted is true, the main game page will load
        if (gev('GameStarted') && playerNumber > 0){
            clearInterval(checkPlayerNum);
            checkPlayerNum = null;
            gamePage();
        }

    }, 500);
}

//gev = myAirtable.getEntryValue
function gev(val){
    return myAirtable.getEntryValue(val);
}


//Removes all elements off page except title
function gamePage(){
    
    //console.log(document.getElementById('waitingText').innerHTML);
    document.getElementById('waitingText').innerHTML = "<h3 align = center>You are Player " + playerNumber + "</h3>";
    document.getElementById('loader').remove();
    
    
}

//Start function chain
