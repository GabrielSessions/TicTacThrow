var checkPlayerNum;

var curAngle;
var curPower;

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


    //Gets values from sliders and displays them
    //Changes arrow size and direction using these values
    document.getElementById("myRange1").oninput = function() {
        curAngle = document.getElementById("myRange1").value;
        document.getElementById("angle_display").innerHTML = "Angle: " + curAngle + " deg";

        document.getElementById('arrow').style.setProperty('transform', 'rotate('+ curAngle +'deg)')

    }

    document.getElementById("myRange2").oninput = function() {
        curPower = document.getElementById("myRange2").value;
        document.getElementById("power_display").innerHTML = "Power: " + curPower;

        document.getElementById('arrow').style.setProperty('font-size', curPower * 1.6 + 30);
    }

    
    

    

    
    
}
