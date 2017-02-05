
// Starting the sliders
function ttSlider(initClass,width,height,background,automiliseconds) {

  this._initClass = initClass;
  this._width = width;
  this._height = height;
  this._background = background;
  this._automiliseconds = automiliseconds;
  this.sliders;

  // Checking if the object has been used before in order to avoid creating two memory acceses
  if (typeof ttSlider._initialized == "undefined") {

    // ------- METHODS
    // *************************************************************************
    // * Function: getSliders                                                  *
    // * Description: It fills a variable with the different sliders with      *
    // * the object class. It also checks if there are empty attributes and    *
    // * sets a default value for them.                                        *
    // *************************************************************************
    ttSlider.prototype.getSliders = function () {

      // Getting all the sliders with this class
      this.sliders = document.getElementsByClassName(this._initClass);
      if( typeof this._width == "undefined" ) {
        ttSlider._width = "100%";
      }

      if( typeof this._height == "undefined" ) {
        ttSlider._height = "100%";
      }

      if( typeof this._background == "undefined" ) {
        ttSlider._background = "transparent";
      }

    }

    // *************************************************************************
    // * Function: checkEmpty                                                  *
    // * Description: It checks if there are empty sliders and show a message. *
    // *************************************************************************
    ttSlider.prototype.checkEmpty = function () {

      for(i=0;i<this.sliders.length;i++) {

        if(this.sliders[i].querySelectorAll('.item').length === 0) {
          this.sliders[i].innerHTML = "Please, fill the slider with slides.";
        }

      }

    }

    // *************************************************************************
    // * Function: shapeSliders                                                *
    // * Description: It gets the different attributes of the slider to draw   *
    // * it in the desired way.                                                *
    // *************************************************************************
    ttSlider.prototype.shapeSliders = function () {

      for(i=0;i<this.sliders.length;i++) {

        this.sliders[i].style.width = this._width;
        this.sliders[i].style.height = this._height;
        this.sliders[i].style.backgroundColor = this._background;
        this.sliders[i].style.overflow = 'hidden';
        this.sliders[i].style.position = 'relative';

        // Entering slides in a div for dividing from arrows
        var items = document.createElement("div");
        items.className = "items";
        items.style.width = "100%";
        items.style.height = "100%";

        this.sliders[i].insertBefore(items, this.sliders[i].firstChild);

        slides = this.sliders[i].querySelectorAll('.item');

        for(j=0;j<slides.length;j++) {
          slide = slides[j];
          this.sliders[i].querySelector('.items').appendChild(slide);
        }

        // Arrows
        var self = this;

        var arrows = document.createElement("div");
        arrows.className = "arrows";
        arrows.style.position = "absolute";
        arrows.style.top = "0px";
        arrows.style.left = "0px";
        arrows.style.width = "100%";
        arrows.style.height = "100%";

        var arrowRight = document.createElement("div");
        arrowRight.className = "arrow-right";
        arrowRight.style.position = "absolute";
        arrowRight.style.top = "50%";
        arrowRight.style.width = "64px";
        arrowRight.style.height = "64px";
        arrowRight.style.right = "0px";
        arrowRight.style.fontSize = "40px";
        arrowRight.style.cursor = "pointer";
        arrowRight.style.background = "transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAA0klEQVR4nO3ZsTEEYQCG4WcwSNQglGkABWjjKrmekAuQKUADGiBkCDACLty943+fmY12Zvd/vw2XJEmSJEkyocN1H+A32zO95wx32MX1TO/cGKd4xtvntVzraWZ2giff8UONsIMHP+OHGuEIjxqhERpBI6AR0AhoBDQCGgGNgEYAx3i1eoTF+o42vX1cWR1/g4O1nW5iQ8fvKb744g0Wf6n44oeLv1D8ePE7/kD81oTPfsH9inu3OPfx1+jfW9rALz+3pYHjvywMHJ8kSZIkSTbHO15j0hKRJw94AAAAAElFTkSuQmCC') no-repeat left top";

        var clickRight = function(cArrow) {
          arrowRight.onclick = function() {
            var arrowSlider = cArrow.parentNode.parentNode;
            self.moveRight(arrowSlider);
          }
        }
        clickRight(arrowRight);

        var arrowLeft = document.createElement("div");
        arrowLeft.className = "arrow-left";
        arrowLeft.style.position = "absolute";
        arrowLeft.style.top = "50%";
        arrowLeft.style.width = "64px";
        arrowLeft.style.height = "64px";
        arrowLeft.style.left = "0px";
        arrowLeft.style.fontSize = "40px";
        arrowLeft.style.cursor = "pointer";
        arrowLeft.style.background = "transparent url('data:image/png;base64,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') no-repeat left top";

        var clickLeft = function(cArrow) {
          arrowLeft.onclick = function() {
            var arrowSlider = cArrow.parentNode.parentNode;
            self.moveLeft(arrowSlider);
          }
        }
        clickLeft(arrowLeft);

        arrows.appendChild(arrowRight);
        arrows.appendChild(arrowLeft);

        this.sliders[i].appendChild(arrows);

        // Starting the automatic movement if it's set
        if(typeof automiliseconds != "undefined") {
          this.automaticMove(this.sliders[i],this._automiliseconds);
        }

      }
      // this.clickArrows();

    }

    // *************************************************************************
    // * Function: shapeSlides                                                 *
    // * Description: It sets the css properties for the slides, in order to   *
    // * create the slider.                                                    *
    // *************************************************************************
    ttSlider.prototype.shapeSlides = function () {

      var cSlides;
      var cSlidesLeft;
      var cSlidesMove;

      // Getting sliders
      for(i=0;i<this.sliders.length;i++) {

        // Getting slides
        cSlides = this.sliders[i].querySelectorAll('.item');
        cSlidesLeft = 0; // Starting the position to 0
        cSlidesMove = this.sliders[i].offsetWidth;

        for(j=0;j<cSlides.length;j++) {

          cSlides[j].style.width = '100%';
          cSlides[j].style.height = '100%';
          cSlides[j].style.backgroundColor = '#888';
          cSlides[j].style.position = 'absolute';
          cSlides[j].style.left = cSlidesLeft+'px';

          cSlidesLeft += cSlidesMove;

        }

      }

    }

    // *************************************************************************
    // * Function: moveLeft                                                    *
    // * Description: It moves the sliders one position to the left.           *
    // * PARAMS:                                                               *
    // * @ cSlider - The object of the slider to move                          *
    // *************************************************************************
    ttSlider.prototype.moveLeft = function(cSlider) {

      var cSlides = cSlider.querySelectorAll('.item'); // Getting the slides of the slider
      var cSlidesMove = parseInt(cSlider.offsetWidth); // Getting the width for making the movement
      var first = false;
      var cSlidesEnd,cSlidesLeft;

      cSliderPos = this.checkCurrent(cSlider);

      if( cSliderPos == 0 ) {

        first = true;

      }

      for(i=0;i<cSlides.length;i++) {

        if( first == true ) {

          cSlidesLeft = parseInt(cSlides[i].offsetLeft);
          cSlidesEnd = cSlidesLeft+(cSlidesMove*-(cSlides.length-1));
          this.animateMove(cSlides[i],cSlidesLeft,cSlidesEnd,200);

        } else {

          cSlidesLeft = parseInt(cSlides[i].offsetLeft);
          cSlidesEnd = cSlidesLeft+cSlidesMove;
          this.animateMove(cSlides[i],cSlidesLeft,cSlidesEnd,200);

        }


      }

    }

    // *************************************************************************
    // * Function: moveRight                                                   *
    // * Description: It moves the sliders one position to the right.          *
    // * PARAMS:                                                               *
    // * @ cSlider - The object of the slider to move                          *
    // *************************************************************************
    ttSlider.prototype.moveRight = function(cSlider) {

      var cSlides = cSlider.querySelectorAll('.item'); // Getting the slides of the slider
      var cSlidesMove = parseInt(cSlider.offsetWidth); // Getting the width for making the movement
      var last = false;
      var cSlidesEnd,cSlidesLeft;

      cSliderPos = this.checkCurrent(cSlider);

      if( cSliderPos == (cSlides.length-1) ) {

        last = true;

      }

      for(i=0;i<cSlides.length;i++) {


        if( last == true ) {

          cSlidesLeft = parseInt(cSlides[i].offsetLeft);
          cSlidesEnd = cSlidesMove*i;
          this.animateMove(cSlides[i],cSlidesLeft,cSlidesEnd,200);

        } else {

          cSlidesLeft = parseInt(cSlides[i].offsetLeft);
          cSlidesEnd = cSlidesLeft-cSlidesMove;
          this.animateMove(cSlides[i],cSlidesLeft,cSlidesEnd,200);

        }


      }

    }

    // *************************************************************************
    // * Function: animateMove                                                 *
    // * Description: It creates a smooth animation of movement.               *
    // * PARAMS:                                                               *
    // * @ cSlide - The element to move                                        *
    // * @ startPoint - The start position                                     *
    // * @ endPoint - The end position                                         *
    // * @ time - the amount of miliseconds the animation will last            *
    // *************************************************************************
    ttSlider.prototype.animateMove = function (cSlide,startPoint,endPoint,time) {

      var cSlidePos;
      var cEndPoint = endPoint;
      var cDiff = startPoint - cEndPoint; // Distancia a recorrer
      var cSlideW;
      var ppm;
      var i = 1;
      var arrowRight,arrowLeft;

      arrowRight = cSlide.parentNode.parentNode.querySelector('.arrow-right');
      arrowLeft = cSlide.parentNode.parentNode.querySelector('.arrow-left');
      arrowRight.style.pointerEvents = "none";
      arrowLeft.style.pointerEvents = "none";

      if( typeof time == 'undefined' ) { // Default time for animation is 500ms
        time = 200;
      }

      // Calculating the amount of pixels to move per milisecond
      cSlideW = endPoint-startPoint;
      ppm = ((cSlideW)/(time));
      cSlidePos = startPoint;
      cSlidePos += ppm;

      var myMove = setInterval( function() {

        // Disabling the arrows while making the transition


        cSlide.style.left = cSlidePos+"px";
        //console.log("Abajo:"+cEndPointO+" Actual:"+cSlidePos+" Arriba:"+cEndPoint);
        cSlidePos += ppm;
        i++;

        if( i > time ) {
          // We stop the intervals when the slider reachs the destiny
          clearInterval(myMove);
          // We allow the arrows again
          arrowRight.style.pointerEvents = "auto";
          arrowLeft.style.pointerEvents = "auto";
        }

      }, 1);

    }

    // *************************************************************************
    // * Function: checkCurrent                                                *
    // * Description: It returns the current slide being displayed.            *
    // * PARAMS:                                                               *
    // * @ cSlider - The slider to check                                       *
    // *************************************************************************
    ttSlider.prototype.checkCurrent = function (cSlider) {

      var pos = 0;
      var cSlides;
      var counter = 0;

      cSlides = cSlider.querySelectorAll('.item');
      cSlidesW = cSlides[0].offsetWidth;
      cSlidesL = cSlides[0].offsetLeft;

      while( ( counter * -cSlidesW ) > (cSlidesL) ) {

        counter++;

      }

      pos = counter;

      return pos;

    }

    // *************************************************************************
    // * Function: moveSlider                                                  *
    // * Description: It moves the slider to a concrete position.              *
    // * PARAMS:                                                               *
    // * @ cSlider - The slider to move                                        *
    // * @ pos - The position you want to move the slider to                   *
    // * @ animation - whether you want an animation for the movement, boolean *
    // *************************************************************************
    ttSlider.prototype.moveSlider = function (cSlider,pos,animation) {

      // Getting slides
      cSlides = cSlider.querySelectorAll('.item');
      cSlidesMove = cSlider.offsetWidth;
      cSlidesLeft = (-pos)*cSlidesMove; // Starting the position to 0

      for(j=0;j<cSlides.length;j++) {

        this.moveSlide(cSlides[j],cSlidesLeft);

        cSlidesLeft += cSlidesMove;

      }

    }

    // *************************************************************************
    // * Function: moveSlide                                                   *
    // * Description: It moves a slide to a concrete position.                 *
    // * PARAMS:                                                               *
    // * @ cSlide - The slide to move                                          *
    // * @ left - The left position in pixels for the slide                    *
    // *************************************************************************
    ttSlider.prototype.moveSlide = function (cSlide,left) {

      cSlides[j].style.left = cSlidesLeft+'px';

    }

    // *************************************************************************
    // * Function: automaticMove                                               *
    // * Description: It moves the slider automatically every x miliseconds.   *
    // * PARAMS:                                                               *
    // * @ cSlider - The slider to receive the automatic move                  *
    // * @ miliseconds - Miliseconds between automatic moves.                  *
    // *************************************************************************
    ttSlider.prototype.automaticMove = function (cSlider,miliseconds) {

      var self = this;
      var autoMove = setInterval( function() {
        self.moveRight(cSlider);
      }, miliseconds);

    }

    // We reboot the slides when the window is resized
    window.addEventListener("resize", this.shapeSlides.bind(this));

  }
  ttSlider._initialized = true;

  // Initializing the methods
  this.getSliders();
  this.checkEmpty();
  this.shapeSliders();
  this.shapeSlides();

}
