function runPythonCode(angle, power){
    var armCode_edit = `
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
    
    
    console.log(armCode_edit);
    serviceSPIKE.writeProgram('arm_edit.py', armCode_edit, 0);
    setTimeout(() => {
        runCode();
    }, 3500);
    
    
}

