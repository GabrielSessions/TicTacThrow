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


//loading screen when waiting to join game
function loading(){
    username = document.getElementById('fname').value;

    console.log(username);

    document.getElementById('nameForm').remove();

    document.getElementById('loader').removeAttribute ('hidden');
    document.getElementById('subheadLoad').removeAttribute ('hidden');

    addNameToLobby();
}

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
}

function checkIfKicked(){
    var kickInterval = setInterval(() => {
        if (myAirtable.getEntryValue('Lobby').indexOf(playerID) == -1){
            window.location.href = "players.html"
        }
    }, 500);
}