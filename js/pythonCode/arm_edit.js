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
    angle.run_to_position(0, 'shortest path', 50)
    power.run_to_position(0, 'shortest path', 50)

    # Launch
    angle.run_to_position(angleVal, 'shortest path', 10)
    power.run_to_position(90, 'clockwise', speedVal)

    # Reset
    angle.run_to_position(0, 'shortest path', 50)
    power.run_to_position(0, 'shortest path', 50)`;

    console.log(armCode_edit);
    serviceSPIKE.writeProgram('arm_edit.py', armCode_edit, 0);
    setTimeout(() => {
        runCode();
    }, 3500);
    
    
}

