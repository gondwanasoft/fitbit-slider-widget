# fitbit-app-slider

![examples](screenshot.png#center)

Construction
-
Widgets need to be constructed before they can be used and display correctly. There are three ways to do this:

* Set `auto-construct` to `true` in `config.js`
* Call `constructSlider()` to construct a specific slider
* Call `constructSliders()` to construct all sliders within a specific element

Using `auto-construct` is easiest, since no additional and non-standard coding is required. The only disadvantage of using `auto-construct` is that it searches the whole of `document` for sliders. This can be quite slow if your `document` is large, in which case one of the manual construction approaches should be used.