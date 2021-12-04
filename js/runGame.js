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
    document.getElementById('waitingText').innerHTML = "<h3 align = center>Hello, " + username + "! You are Player " + playerNumber + "</h3><br><br>";
    document.getElementById('loader').remove();

    var gamePlayDiv = document.createElement('div');




    gamePlayDiv.innerHTML = gameplayPage;


    

    document.body.appendChild(gamePlayDiv);

    //slider code starts here
    let rangeInput = document.querySelector(".range-input input");
    let rangeValue = document.querySelector(".range-input .value div");

    let start = parseFloat(rangeInput.min);
    let end = parseFloat(rangeInput.max);
    let step = parseFloat(rangeInput.step);

    for(let i=start;i<=end;i+=step){
    rangeValue.innerHTML += '<div>'+i+'</div>';
    }

    rangeInput.addEventListener("input",function(){
    let top = parseFloat(rangeInput.value)/step * -40;
    rangeValue.style.marginTop = top+"px";
    });

    //slider code ends here

    
    
}

//Start function chain
