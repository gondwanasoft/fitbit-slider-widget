import * as config from './config';
import { constructWidgets, getConfig } from './widget_utils';

export const constructSlider = el => {
  el.class = el.class;    // bring forward (ie, trigger) application of CSS styles

  const trackEl = el.getElementById('track');
  const markerEl = el.getElementById('marker');
  
  //props sub-elements
  Object.defineProperty(el, 'fill', {
    get: () => {
      return el._fill;
    },
    set : (val) =>  {
      if (el._fill === val)
      return
      el._fill = val
      el.redraw()
    }
  });
  Object.defineProperty(el, 'opacity', {
    get: () => {
      return el._opacity;
    },
    set : (val) =>  {
      if (el._opacity === val)
      return
      el._opacity = val
      el.redraw()
    }
  });
  

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
   
    _value = Math.round((evt.screenX - el.x) / el.width * (_max - _min) + _min)
    console.log(`x=${evt.screenX} el=${el.x} val=${value}`)
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
