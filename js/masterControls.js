/*
masterControls.js
Gabriel Sessions
Purpose: Add functions to gamemaster page to allow total control over the game
- Accessible only after sign-in
- Can connect to the SPIKE Prime Using Service Dock
- Can force robot to execute a throw
- Add people to a game and reset a game
- Execute/Stop SPIKE Prime Code
- Upadate Lobby with Incoming Users
- Start a Game of Tic Tac Throw!
*/

//Airtable and SPIKE Prime Setup

var AirtableElement = document.getElementById("service_airtable");
var myAirtable = AirtableElement.getService();
var spikeService;
var serviceSPIKE;

AirtableElement.setAttribute("apikey", "key" + "WJDyynbH3CDv8W");
AirtableElement.setAttribute("baseid", "app" + "IsR76sJVPHgo60");
AirtableElement.setAttribute("tablename", "Shooter");
AirtableElement.init();

var AirtableElement2 = document.getElementById("service_airtable2");
var myAirtable2 = AirtableElement2.getService();

AirtableElement2.setAttribute("apikey", "key" + "WJDyynbH3CDv8W");
AirtableElement2.setAttribute("baseid", "app" + "IsR76sJVPHgo60");
AirtableElement2.setAttribute("tablename", "playerID");
AirtableElement2.init();

var currentIDList = '';
var playersList = [];

var checkForLaunchInterval;

var curMasterAngle = 0;
var curMasterPower = 50;

window.onload = function(){
    console.log()
    
}

//Initializes SPIKE Prime and unhides all secure content
function bootSPIKE (){

    if (sha256(curPassword) != secure_password){
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }

    spikeService = document.createElement("service-spike");
    spikeService.innerHTML = `<service-spike align = center id = "service_spike"></service-spike>`;
    document.getElementById('spikeBox').append(spikeService);

    serviceSPIKE = document.getElementById("service_spike").getService();

    serviceSPIKE.executeAfterInit(async function() {
        console.log(armCode);
        
    })

    serviceSPIKE.init();

    //document.getElementById('service_spike').classList.add('center');

    document.getElementById('controls').hidden = false;

    //Wait for airtable to fully load
    //Gets names currently in lobby and marked as players
    setTimeout(() => {
        getNames();

        console.log(myAirtable.getEntryValue('Player1'));
        playersList.push(myAirtable.getEntryValue('Player1'));
        playersList.push(myAirtable.getEntryValue('Player2'));
        playersList.push(myAirtable.getEntryValue('Player3'));

        checkForLaunch();
    }, 200);  

}

//Send robot commands to airtable, python code should detect a changed value
function controlRobot(){
    var angle = Math.round(document.getElementById('fname').value);
    var speed = Math.round(document.getElementById('lname').value);

    //validity check, must be a valid number
    if (angle > 180 || angle < -180 || speed < 0 || speed > 100){
        alert("An invalid angle or speed value was entered, please try again!");
    }
    else{
        myAirtable.setEntryValueStrict('Angle', angle);
        myAirtable.setEntryValueStrict('Power', speed);
    }
    

}

function runCode(){
    serviceSPIKE.executeProgram(0);
}

function stopCode(){
    serviceSPIKE.stopCurrentProgram();
}

//Constantly checks if the name list has changed and will make updates to the player table
function getNames(){
   
    var gatherNamesInterval = setInterval(() => {
        //console.log(myAirtable.getEntryValue('Lobby'));
        var listOfIDs = myAirtable.getEntryValue('Lobby');
        if (listOfIDs != currentIDList){
            updateNameList(currentIDList, listOfIDs);
            
        }

    }, 200);
    
    
}

//Adds a new row for users that join the lobby
function updateNameList(oldIDList, newIDList){
    let oldListArray = oldIDList.split(',');
    let newListArray = newIDList.split(',');
    //let lenDiffs = newListArray.length - oldListArray.length;

    //last entry is an empty String ans is removed
    oldListArray.pop();
    newListArray.pop();
    
    
    for(let i = oldListArray.length; i < newListArray.length; i++){
        let curValue = newListArray[i];

        /*
        if (typeof(curValue) != Number){
            break;
        }
        */

        addNewTableRow(curValue);
    }

    currentIDList = newIDList;
    
}

//Adds a row to the lobby chart with username and ID
function addNewTableRow(userID){    
    

    let newTableRow = document.createElement('tr');
    newTableRow.setAttribute('id', "row" + userID);

    let newCol1 = document.createElement('th');
    newCol1.innerHTML = myAirtable2.getEntryValue(userID);
    let newCol2 = document.createElement('th'); 
    newCol2.innerHTML = userID;
    let newCol3 = document.createElement('th');
    newCol3.innerHTML = '<button type = "button" onclick = "addToGame('+ userID +')">Add to Game</button> <br><br>';
    newCol3.innerHTML += '<button type = "button" onclick = "kick('+ userID +')">Kick from Lobby</button>';

    newTableRow.append(newCol1);
    newTableRow.append(newCol2);
    newTableRow.append(newCol3);

    document.getElementById('playerTable').append(newTableRow);
}

//Adds the selected player to a game if there is avaliable space
//Player ID is entered into open spot
function addToGame (playerID){
    var inGame = false;
    console.log(playerID);
    switch(playerID){
        case myAirtable.getEntryValue('Player1'):
            inGame = true;
            break;
        case myAirtable.getEntryValue('Player2'):
            inGame = true;
            break;
        case myAirtable.getEntryValue('Player3'):
            inGame = true;
            break;
    }

    if (myAirtable.getEntryValue('Player1') == 0 && !inGame){
        myAirtable.setEntryValueNotStrict('Player1', playerID);
        playersList[0] = playerID;
    }
    else if(myAirtable.getEntryValue('Player2') == 0 && !inGame){
        myAirtable.setEntryValueNotStrict('Player2', playerID);
        playersList[1] = playerID;
    }
    else if(myAirtable.getEntryValue('Player3') == 0 && !inGame){
        myAirtable.setEntryValueNotStrict('Player3', playerID);
        playersList[2] = playerID;
    }
    else if (inGame){
        alert('This player is already in the game.')
    }
    else{
        alert('There are no open spots left.');
    }

}

//Removes player from playerID list and gamemaster view
function kick(playerID){
    var oldList = myAirtable.getEntryValue('Lobby');
    document.getElementById("row" + playerID).remove();
    
}

//Removes all players from the lobby and all entries from playerID table
function resetLobby(){
    var listOfIDs = myAirtable.getEntryValue('Lobby');
    let arrayOfIDs = listOfIDs.split(',');
    arrayOfIDs.pop();
    //console.log(myAirtable.getEntryValue('Player1'));
    myAirtable.setEntryValueStrict('Lobby', 'null');
    myAirtable.setEntryValueStrict('Player1', 0);
    myAirtable.setEntryValueStrict('Player2', 0);
    myAirtable.setEntryValueStrict('Player3', 0);
    myAirtable.setEntryValueStrict('Turn', 0);
    myAirtable.setEntryValueStrict('GameStarted', false);
    myAirtable.setEntryValueStrict('startLaunch', false);

    for (let i = 0; i < arrayOfIDs.length; i++){
        try{
            myAirtable2.deleteEntry(arrayOfIDs[i]);
            document.getElementById('row' + arrayOfIDs[i]).remove();
        }

        catch{
            console.log("an ID not found error occured");
        }
        
    }

}


//Changes start variable to true and picks a random starting player
function startGame(){
    //console.log(myAirtable.getEntryValue('GameStarted'));
    myAirtable.setEntryValueStrict('GameStarted', true);

    //random starting 1st player
    var turnNum = Math.floor(Math.random()*3 + 1);
    myAirtable.setEntryValueStrict('Turn', turnNum);

    //Delete Lobby (currently disabled command) 
    //document.getElementById('controlPlayers').hidden = true;

}

//Sets GameStarted var to false
function stopGame(){
    myAirtable.setEntryValueStrict('GameStarted', false);
    resetLobby();
}


//If startLaunch is true, then matching python code will be uploaded and run
function checkForLaunch(){
    checkForLaunchInterval = setInterval(() => {
       
        curMasterAngle = myAirtable.getEntryValue('Angle');
        curMasterPower = myAirtable.getEntryValue('Power');

        if (myAirtable.getEntryValue('startLaunch')){
            
            myAirtable.setEntryValueStrict('startLaunch', false);

            
            if (curMasterAngle < 0){
                curMasterAngle = 360 + curMasterAngle;
            }
            

            console.log(curMasterAngle);

            runPythonCode(curMasterAngle, curMasterPower);
        }
        else{
            //console.log('nope');
        }
    }, 500);
}