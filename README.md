Welcome to the ttSlider wiki!

ttSlider is a really easy to use Javascript library for creating your own sliders. It doesn't require any CSS.

# Starting the slider

In order to start using the slider, you just need to create a new object like this.

    var mySlider = new ttSlider('tt-slider','100%','500px','#c3c3c3',4000);

The parameters are:

var mySlider = new ttSlider(class of the element to transform in a slider, width, height, background color, miliseconds for automatic intervals);

## HTML

In the HTML document you need to set the slider like this:

    <div class="tt-slider">
      <div class="item">Content of the first slide</div>
      <div class="item">Content of the second slide</div>
      <div class="item">Content of the third slide</div>
    </div>

Notice that the class of every slide is "item". Without this class it won't be recognized as a slide.
