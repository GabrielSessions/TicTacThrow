/*
runGame.js
Gabriel Sessions
Purpose: Loads and generates game elements for the user to play the game.
- Adds the user to a game if directed by the gamemaster
- Loads input interface when game starts
- Visualization of inputs using an input
- Submission of power/angle combinations to shoot a ball (sent to masterControls.js)
*/


var checkPlayerNum;

var curAngle = 0;
var curPower = 50;

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
    document.getElementById('waitingText').innerHTML = "<h3 align = center id = 'playerNumDisplay'>Hello, " + username + "! You are Player " + playerNumber + " &#11044</h3><br><br>";
    document.getElementById('waitingText').setAttribute('style', 'color: rgb('+ 255 * (playerNumber==1) + ', ' + 255 * (playerNumber==2) + ', '+ 255 * (playerNumber==3) + ');');
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


    checkIfTurn();
    
}


//Sends launch data to airtable
function launchBall(){
    const timeDelay = 5000; //5 Seconds

    myAirtable.setEntryValueStrict('Angle', parseInt(curAngle));
    myAirtable.setEntryValueStrict('Power', parseInt(curPower));

    if (playerNumber == 3){
        progressBar(5000);
        document.getElementById('launchbutton1').disabled = true;
        setTimeout(() => {
            myAirtable.setEntryValueStrict('Turn', 1);
            document.getElementById('launchbutton1').disabled = false;
        }, timeDelay);
        
    }
    
    else{
        progressBar(5000);
        document.getElementById('launchbutton1').disabled = true;
        setTimeout(() => {
            myAirtable.setEntryValueStrict('Turn', playerNumber + 1);
            document.getElementById('launchbutton1').disabled = false; 
        }, timeDelay);
        
    }
    
    myAirtable.setEntryValueStrict('startLaunch', true);
}


function progressBar(totalTime){
    var progressBarDiv = document.createElement('div');
    progressBarDiv.setAttribute('id', 'pBarDiv');
    progressBarDiv.setAttribute('style', 'text-align:center');
    progressBarDiv.innerHTML = "<br><br>"

    var progressBar = document.createElement('progress');
    progressBar.setAttribute('id', 'pBar');
    progressBar.setAttribute('style', 'width: 30%; height: 24px;')
    progressBar.value = 0;
    progressBar.max = 100;

    progressBarDiv.append(progressBar);
    document.body.appendChild(progressBarDiv);

    increment_pb(totalTime);


}

//Steadily increases progress in progress bar
function increment_pb(totalTime){
    var pbElement = document.getElementById('pBar');
    setTimeout(() => {
        if (pbElement.value < 100){
            pbElement.value = pbElement.value + 1;
            increment_pb(totalTime);
        }
        else{
            document.getElementById('pBarDiv').remove();
        }
    }, (totalTime/100));

}

//If it's the player's turn, launch is enabled
//If turn ended, launch capabilities are disabled
function checkIfTurn(){
    var doNotRepeatStallTimer = false;
    var stallTimer = true;
    checkTurnInterval = setInterval(() => {
        curTurn = myAirtable.getEntryValue('Turn');

        if (curTurn == playerNumber ){
            if (document.getElementById('launchbutton1').hidden){
                document.getElementById('launchbutton1').hidden = false;
                document.getElementById('launchbutton2').hidden = true;
                //doNotRepeatStallTimer = false;
                
            }
        }

        /*
        else if (curTurn == playerNumber && stallTimer & doNotRepeatStallTimer){
            doNotRepeatStallTimer = true;
            setTimeout(() => {
                stallTimer = false;
            }, 4000);
        }
        */

        else{
            if (document.getElementById('launchbutton2').hidden){
                document.getElementById('launchbutton1').hidden = true;
                document.getElementById('launchbutton2').hidden = false;
                stallTimer = true;
            }
        }

    }, 500);
}