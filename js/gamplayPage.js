var gameplayPage = `<style>
body {
  
}
.range-input {
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  background:#eee;
  padding:10px 20px;
  display:flex;
  align-items:center;
  border-radius:10px;
}
.range-input input {
  -webkit-appearance:none;
  width:200px;
  height:2px;
  background:#4471ef;
  border:none;
  outline:none;
}
.range-input input::-webkit-slider-thumb {
  -webkit-appearance:none;
  width:20px;
  height:20px;
  background:#eee;
  border:2px solid #4471ef;
  border-radius:50%;
}
.range-input input::-webkit-slider-thumb:hover {
  background:#4471ef;
}
.range-input .value {
  color:#4471ef;
  text-align:center;
  font-weight:600;
  line-height:40px;
  height:40px;
  overflow:hidden;
  margin-left:10px;
}
.range-input .value div {
  transition:all 300ms ease-in-out;
}
</style>

<div class="range-input">
  <input type="range" min="0" max="100" value="0" step="5">
  <div class="value">
    <div></div>
  </div>
</div>

`