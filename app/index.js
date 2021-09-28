import document from 'document'
import './widgets/slider'

const mySliderEl = document.getElementById('mySlider')
const mySlider2El = document.getElementById('mySlider2')
const labelEl = document.getElementById('label')

mySliderEl.onchange = mySliderChange

function mySliderChange(val) {
  labelEl.text = `${(val)}, ${(mySlider2El.value)}` // lazy way to show how to get a slider's value without a listener
}

//document.getElementsByClassName('marker').forEach(el => {el.style.fill = 'white'})
mySlider2El.track.style.fill = "blue";
mySliderEl.track.style.fill = "red";
//mySlider2El.x = 20;
mySliderEl.track_bg.style.fill = "white";
mySliderEl.marker.cx = 50;//this gets overwritten by redraw, iGuess
mySlider2El.track.x = 100;//this gets applied
mySlyderEl.track.y = 200;// this does NOT get applied. why? somewhere hardcoded relation?
mySliderEl.y = 150;
