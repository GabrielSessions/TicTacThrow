var gameplayPage = `
<style>
/*
* {
  box-sizing: border-box;
}
*/

.column1 {
  float: left;
  width: 45%;
  padding: 10px;
  height: auto; /* Should be removed. Only for demonstration */
  display: inline-block
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
.column2{
    float: left;
    width: 45%;
    padding: 10px;
    height: auto; /* Should be removed. Only for demonstration */
    display: inline-block
    margin-right: auto;
    margin-left: auto;
    text-align: center;

}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
  }
}




.slider {
    -webkit-appearance: none;
    width: 50%;
    height: 15px;
    border-radius: 5px;  
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
  }
  
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%; 
    background: #1100fc;
    cursor: pointer;
  }
  
  .slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #04AA6D;
    cursor: pointer;
  }
  .inlineSlider{
    display: inline-block;
}

   .arrow{
       font-size:36px;
       text-align: center;
   }
</style>


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

<div id = 'arrow'>
↑
</div>


<script>

    

</script>
`