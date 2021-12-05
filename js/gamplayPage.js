var gameplayPage = `

<div class = "row">

<div id = "slider1" class = "column1">
    <div class="slidecontainer">
        <input type="range" min="-45" max="45" value="0" class="slider" id="myRange1"><br><br>
        <h2 id = "angle_display">Angle: 0<span id = "angle_value"></span> deg</h2>
    </div>
</div>

<div id = "slider2" class = "column2">
    <div class="slidecontainer">
        <input type="range" min="1" max="100" value="50" class="slider" id="myRange2"> <br><br>
        <h2 id = "power_display">Power: 50<span id = "power_value"></span></h3>
    </div>
</div>
</div>

<div style = "margin-left: auto; margin-right: auto">
  <div id = 'arrow' class = "arrow">
    &#8593;
  </div>
</div>

<br><br>
<div style = "margin-left: auto; margin-right: auto; text-align:center">
  <button id = "launchbutton1" class = "launchbutton1" type = "button" onclick = "launchBall()" hidden>Launch <img src = "img/rocket_button_img.png" style = "height: 24px; width: auto;"></img></button>
  <button id = "launchbutton2" class = "launchbutton2" type = "button" onclick = "console.log('error')" disabled>Please Wait For Your Turn <div class="loader"></div></button>
</div>


`