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
mySliderEl.track_bg.style.fill = "orange";
mySlider2El.track_bg.style.fill = "white";
mySliderEl.marker.cx = 50;//hardcoded at El.x, butgets overwritten by redraw in function
mySlider2El.track.x = 100;//hardcoded at El.x, butgets overwritten by redraw in function
mySliderEl.track.y = 200;// this does NOT get applied. why? somewhere hardcoded relation? aaaah , guess the setting in symbol fix it?? // TODO B try mySlider :P
mySliderEl.y = 250;// also NOT applied from here
