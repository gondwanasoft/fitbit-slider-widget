import * as config from './config';
import { constructWidgets, getConfig } from './widget_utils';


export const constructSlider = el => {
  el.class = el.class;    // bring forward (ie, trigger) application of CSS styles
  //const slider = document.getElementById('slider');
  //el.class = slider.class;
  const track_bgEl = el.getElementById('track_bg')
  const trackEl = el.getElementById('track');
  const markerEl = el.getElementById('marker');

  // Construct an object that provides controlled access to markerEl:
  // This is shockingly over-engineered, but fairly safe!
  const markerPublic = {  // the public interface
    markerStyle: {}       // we give this a 'fill' property soon
  }
  Object.defineProperty(markerPublic, 'style', {
    get() {return markerPublic.markerStyle;}
  });
  Object.defineProperty(markerPublic.markerStyle, 'fill', {
    set(newValue) {markerEl.style.fill = newValue;}
  });

  // TODO check for fix relations and put in redraw
  //track_bgEl.x = trackEl.x

 //adds ALL properties to sub-elements To access them from js
  Object.defineProperty(el, 'track_bg',{
    get() {return track_bgEl;}
  });
  Object.defineProperty(el, 'track',{
    get() {return trackEl;}
  });
  /*Object.defineProperty(el, 'marker',{
    get() {return markerEl;}
  });*/
  Object.defineProperty(el, 'marker',{
    get() {return markerPublic;}  // we don't give the caller markerEl, so they can't change things we don't want them to
  });

  console.log(trackEl.parent.id + " fill: " + trackEl.style.fill);

  //hardcode all x at el.x: no changes from js on subs.x
  el.redraw = () => {
    track_bgEl.x = trackEl.x = markerEl.cx = 0//markerEl.r/2;
  }
  el.redraw();

  let _value = 0
  let _listener   // onchange event listener (handler)

  // Because the following attributes are set only when the widget is constructed, they won't respond to subsequent changes.
  let _min = 0, _max = 100

  const config = getConfig(el);
  for (const name in config) {
    const value = Number(config[name]);   // convert to Number here because the only allowed values are numbers
    switch(name) {
      case 'min':
        _min = value;
        break;
      case 'max':
        _max = value;
        break;
    }
  }
  //adjust rounding differences
  _min -= _max / 66;
  _max += _max / 66;

  el.getElementById('touch').onmousemove = onMouseMove

  function onMouseMove(evt) {    // TODO 1 take radius and track width into account
    // TODO 2 inefficient: precompute infrequently-changing values
    // TODO 1 screenX doesn't seem to register whole range of values
    // TODO 2 implement 'step' and round to it
    trackEl.width = evt.screenX - el.x
    markerEl.cx = evt.screenX - el.x
    //console.log(JSON.stringify(el.children));
    //console.log("markerEl: "+ JSON.stringify(markerEl))

    _value = Math.round((evt.screenX - el.x) / el.width * (_max - _min) + _min)
    //console.log(`x=${evt.screenX} el=${el.x} val=${value}`)
    if (_listener) _listener(_value)
  }


  Object.defineProperty(el, 'onchange', {
    set: function(listener) {
      _listener = listener
    }
  });

  Object.defineProperty(el, 'value', {
    get: function() {
      return _value
    }
  });
}


export const constructSliders = parentEl => {
  // Constructs all slider widgets within parentEl ElementSearch.
  constructWidgets('slider', constructSlider);
}

if (config.autoConstruct) constructSliders();

//WHY??: Unhandled exception: ReferenceError: mySliderEl2 is not defined  ? at app/index.js:8,1// working anyway  // TODO B try mySlider2El :P