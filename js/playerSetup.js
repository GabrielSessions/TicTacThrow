/*
playerSetup.js
Gabriel Sessions
Purpose: Sets up remote user interface.
- Takes in user's name and generates a player ID based on logon time
- Allows users to join a lobby and generates a loading animation
*/


var username = '';
var playerID = String(Date.now());
var playerNumber = 0;

//airtable set up

var AirtableElement = document.getElementById("service_airtable");
var myAirtable = AirtableElement.getService();

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

//Checks if cookie is stored
//If cookie is found, player ID will be set to the stored value
//All cookies are stored as Strings
//If no cookie found, playerID stored into a cookie so user does not have to sign in again
window.onload = function() {
    let cookieVal = getCookie('id');
    console.log(typeof(cookieVal) + ", " + cookieVal);

    if (cookieVal.length > 1){
        playerID = cookieVal;
        

        //automatically add to lobby
        document.getElementById('nameForm').remove();
        document.getElementById('loader').removeAttribute ('hidden');
        document.getElementById('subheadLoad').removeAttribute ('hidden');

        //check if user needs to be re-added to the game
        checkIfKicked();
        checkIfAddedToGame();

    }
    
};


//loading screen when waiting to join game
function loading(){

    setCookie('id', playerID);

    username = document.getElementById('fname').value;


    console.log(username);

    document.getElementById('nameForm').remove();

    document.getElementById('loader').removeAttribute ('hidden');
    document.getElementById('subheadLoad').removeAttribute ('hidden');

    addNameToLobby();
}


//Adds Player ID to list
function addNameToLobby(){
    var oldList = myAirtable.getEntryValue('Lobby');
    var newList = '';

    if (oldList == "null"){
        newList = playerID + ",";
    }
    else{
        newList = oldList + playerID + ",";
    }
    
    myAirtable.setEntryValueStrict('Lobby', newList);

    myAirtable2.createEntry(playerID, username);

    checkIfKicked();

    //Function is in runGame.js
    checkIfAddedToGame();
}

function checkIfKicked(){
    var kickInterval = setInterval(() => {
        if (myAirtable.getEntryValue('Lobby').indexOf(playerID) == -1){
            deleteAllCookies();
            setTimeout(() => {
                window.location.href = "players.html";
            }, 500);
            
        }
    }, 1500);
}


