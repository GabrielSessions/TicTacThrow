//Airtable and SPIKE Prime Setup

var AirtableElement = document.getElementById("service_airtable");
var myAirtable = AirtableElement.getService();
var spikeService;
var serviceSPIKE;

AirtableElement.setAttribute("apikey", "key" + "WJDyynbH3CDv8W");
AirtableElement.setAttribute("baseid", "app" + "IsR76sJVPHgo60");
AirtableElement.setAttribute("tablename", "Shooter");
AirtableElement.init();

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



}

function controlRobot(){
    var angle = Math.round(document.getElementById('fname').value);
    var speed = Math.round(document.getElementById('lname').value);

    if (angle > 90 || angle < -90 || speed < 0 || speed > 100){
        alert("An invalid angle or speed value was entered, please try again!");
    }

    myAirtable.setEntryValueStrict('Angle', angle);
    myAirtable.setEntryValueStrict('Power', speed);

}

function runCode(){
    serviceSPIKE.executeProgram(0);
}

function stopCode(){
    serviceSPIKE.stopCurrentProgram();
}