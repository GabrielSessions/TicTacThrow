//Safeguard against writing the same program multiple times
var doNotWriteCode = false;

function runPythonCode(angle, power){
    var armCode_edit = `
# MicroPython for LEGO Hardware (LEGO Education's SPIKE Prime)
from spike import PrimeHub, LightMatrix, Button, StatusLight, ForceSensor, MotionSensor, Speaker, ColorSensor, App, DistanceSensor, Motor, MotorPair
from spike.control import wait_for_seconds, wait_until, Timer

# Initializing Motors
hub = PrimeHub()
angle = Motor('B')
power = Motor('F')

# Value to set (Where the gotten angle should go) 
# TEMPORARY VALUES V
speedVal =  ${power}
angleVal =  ${angle}

# Set up
angle.run_to_position(0, 'shortest path', 50)
power.run_to_position(360 - 45, 'shortest path', 100)

# Launch
angle.run_to_position((int)((360 + (-angleVal * 56 / 12) ) % 360 ), 'shortest path', 50)
power.run_to_position(90, 'clockwise', speedVal)

# Reset
angle.run_to_position(0, 'shortest path', 50)
power.run_to_position(360 - 45, 'shortest path', 100) 
   `;
    
    
    serviceSPIKE.stopCurrentProgram();
    if (!doNotWriteCode){
        doNotWriteCode = true;
        serviceSPIKE.writeProgram('arm_edit.py', armCode_edit, 0);
        setTimeout(() => {
            runCode();
            doNotWriteCode = false;
        }, 3500);
        console.log(armCode_edit);
    }
    
    
    
    
}

