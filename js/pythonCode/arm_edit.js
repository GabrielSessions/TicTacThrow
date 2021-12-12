//JS Version
/*
let delay = 3000;

function runPythonCode(angle, power){
    console.log("runPythonCode");
    let angleMotor = new serviceSPIKE.Motor('A');
    let powerMotor = new serviceSPIKE.Motor('B');

    let angleVal = angle;
    let powerVal = power;

    //TODO: If this works remove angle changing code in the masterControls file
    
    if (angleVal > 180){
        angleVal = angleVal - 360;
    }
    

    let curAngleA = angleMotor.get_position();
    if (curAngleA > 180){
        angleMotor.run_to_degrees_counted(360 - angleVal, -20);
    }
    else{
        angleMotor.run_to_degrees_counted(angleVal, 20);
    }

    //turnToAngle(angleVal, powerVal, angleMotor, powerMotor)
    
}

function turnToAngle(angle, power, motorA, motorB){
    
    setTimeout(() => {
        console.log("Turn To Angle");
        if (angle > 0){
            motorA.run_to_degrees_counted(angle, 20);
        }
        else if (angle < 0){
            motorA.run_to_degrees_counted(Math.abs(angle), 20);
        }
    }, delay);
    
    //setToThrow(angle, power, motorA, motorB);
}

//Sets the motor position top zero
function setToThrow(angle, power, motorA, motorB){
    
    setTimeout(() => {
        console.log("Set To Throw");
        var curPosition = motorB.get_position();
        if (curPosition > 180){
            motorB.run_to_degrees_counted(360 - curPosition, -20, throwBall(angle, power, motorA, motorB));
        }
        else{
            motorB.run_to_degrees_counted(curPosition, 20, throwBall(angle, power, motorA, motorB));
        }
    }, delay);
    
   throwBall(angle, power, motorA, motorB);
    

}

//Throws ball
function throwBall(angle, power, motorA, motorB){

    setTimeout(() => {
        console.log("Throw Ball");
        motorB.run_to_degrees_counted(90, power, resetSystem(angle, power, motorA, motorB));
    }, delay);
    

}

//Resets the arm to initial position
function resetSystem(angle, power, motorA, motorB){
    setTimeout(() => {
        console.log("Reset");
        motorB.run_to_degrees_counted(-90, 20);
        if (angle > 0){
            motorA.run_to_degrees_counted(angle, -20);
        }
        else{
            motorA.run_to_degrees_counted(angle, 20);
        }
    }, delay);
    
    
}
*/

//PYTHON Version


function runPythonCode(angle, power){
    var armCode_edit = `# MicroPython for LEGO Hardware (LEGO Education's SPIKE Prime)
    from spike import PrimeHub, LightMatrix, Button, StatusLight, ForceSensor, MotionSensor, Speaker, ColorSensor, App, DistanceSensor, Motor, MotorPair
    from spike.control import wait_for_seconds, wait_until, Timer

    # Initializing Motors
    hub = PrimeHub()
    angle = Motor('A')
    power = Motor('B')

    # Values to set (Angle and speed)
    speedVal = ${power}
    angleVal = ${angle}
    

    # Set up
    angle.run_to_position(0, 'shortest path', 20)
    power.run_to_position(0, 'shortest path', 20)

    # Launch
    angle.run_to_position(angleVal, 'shortest path', 10)
    power.run_to_position(90, 'clockwise', speedVal)

    # Reset
    angle.run_to_position(0, 'shortest path', 20)
    power.run_to_position(0, 'shortest path', 20)`;
    
    
    console.log(armCode_edit);
    serviceSPIKE.writeProgram('arm_edit.py', armCode_edit, 0);
    setTimeout(() => {
        runCode();
    }, 3500);
    
    
}



