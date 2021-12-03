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

//keeps track of who's in the lobby



//Initializes SPIKE Prime and unhides all secure content
function bootSPIKE (){
    spikeService = document.createElement("service-spike");
    spikeService.innerHTML = `<service-spike align = center id = "service_spike"></service-spike>`;
    document.getElementById('spikeBox').append(spikeService);

    var serviceSPIKE = document.getElementById("service_spike").getService();
    serviceSPIKE.executeAfterInit(async function() {
        spikeService.writeProgram("arm.py", armCode, 0);
        
    })

    serviceSPIKE.init();

    //document.getElementById('service_spike').classList.add('center');

    document.getElementById('controls').hidden = false;

    //Wait for airtable to fully load
    setTimeout(() => {
        getNames();
    }, 200);
    
    
    

}

//Send robot commands to airtable, python code should detect a changed value
function controlRobot(){
    var angle = Math.round(document.getElementById('fname').value);
    var speed = Math.round(document.getElementById('lname').value);

    //validity check, must be a valid number
    if (angle > 90 || angle < -90 || speed < 0 || speed > 100){
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
        console.log(myAirtable.getEntryValue('Lobby'));
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
    let lenDiffs = newListArray.length - oldListArray.length;

    oldListArray.pop();
    newListArray.pop();

    console.log(oldListArray);
    console.log(newListArray);
    
    
    for(let i = oldListArray.length; i < newListArray.length; i++){
        let curValue = newListArray[i];

        console.log(typeof(curValue));

        /*
        if (typeof(curValue) != Number){
            break;
        }
        */

        addNewTableRow(curValue);
    }

    currentIDList = newIDList;
    
}


function addNewTableRow(userID){
    let newTableRow = document.createElement('tr');

    let newCol1 = document.createElement('th');
    newCol1.innerHTML = myAirtable2.getEntryValue(userID);
    let newCol2 = document.createElement('th'); 
    newCol2.innerHTML = userID;
    let newCol3 = document.createElement('th');
    newCol3.innerHTML = "placeholder";

    newTableRow.append(newCol1);
    newTableRow.append(newCol2);
    newTableRow.append(newCol3);

    document.getElementById('playerTable').append(newTableRow);
}