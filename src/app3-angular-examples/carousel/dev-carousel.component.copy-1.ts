import { Component, OnInit, AfterViewInit, ElementRef, Input, Renderer2, ChangeDetectorRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
    selector: 'dev-carousel',
    templateUrl: './dev-carousel.component.html'
})
export class DevCarouselComponent implements OnInit, AfterViewInit {

    public carouselContainer: any;

    public slideIndex = 0;

    public lengthOfSlides = 1;

    public currentSlideObject: any;

    public slideChangeInterval: any;

    public animationEnd;

    public hasArrows: boolean = false;

    public isPlaying: boolean = false;

    public dots: any[];

    public _carouselHeight = 250; // Minimum carousel height + 34px for carousel controls height

    public _uuid: string;

    public currentSlide: any;

    public targetSlide: any;

    public slides: any;

    public currentClass: string;

    public targetClass: string;

    public isTabFocused = true;

    // Set the name of the "hidden" property and the change event for visibility
    public hidden;
    public visibilityChange;
    public visibilityState;

    @Input() ariaLabels = {
        'previousSlideButtonLabel': 'Previous Slide',
        'nextSlideButtonLabel': 'Next Slide',
        'playButtonLabel': 'Play',
        'pauseButtonLabel': 'Pause',
        'dotNavButtonLabel': 'Select this link to go item',
        'carouselControlSectionLabel': 'Carousel controls'
    };

    @Input() autoPlay: boolean = true;

    @Input() carouselDataItems: any[];

    @Input() autoPlayInterval: number = 3000;

    @Input() carouselBrandClass: string;

    @Input() get carouselHeight() {
        return this._carouselHeight;
    }
    set carouselHeight(value: number) {
        this._carouselHeight = value;
    }

    // Accessiility : GET/SET unique ids for accessibility purpose
    @Input() get uuid() {
        return 'al-carousel_' + this._uuid;
    }
    set uuid(value) {
        this._uuid = 'al-carousel_' + Math.random().toString(36).substring(2);
    }

    constructor(
        private _el: ElementRef,
        private renderer: Renderer2,
        private cdr: ChangeDetectorRef,
        @Inject(DOCUMENT) private document: any
    ) {
        this.checkPageVisibility();
    }

    ngOnInit() {

        this.carouselContainer = this._el.nativeElement.firstElementChild;

        window.addEventListener('focus', () => {
            // tween resume() code goes here
            setTimeout(function () {
                console.log('focus');
            }, 300);

            this.isTabFocused = true;
            console.log('window Focus :', this.isTabFocused);
        }, false);

        window.addEventListener('blur', () => {

            setTimeout(function () {
                console.log('Blur');
            }, 300);

            this.isTabFocused = false;
            console.log('Window Blur :', this.isTabFocused);
        }, false);

        //startSimulation and pauseSimulation defined elsewhere

        // Warn if the browser doesn't support addEventListener or the Page Visibility API
        if (typeof this.document.addEventListener === 'undefined' || typeof this.document[this.hidden] === 'undefined') {
            console.log('This demo requires a modern browser that supports the Page Visibility API.');
        } else {
            // Handle page visibility change
            document.addEventListener(this.visibilityChange, this.handleVisibilityChange.bind(this), false);
        }

        // document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this), false);
    }

    checkPageVisibility() {
        if (typeof this.document.hidden !== 'undefined') {
            this.hidden = 'hidden';
            this.visibilityChange = 'visibilitychange';
            this.visibilityState = 'visibilityState';
        } else if (typeof this.document.mozHidden !== 'undefined') {
            // Firefox up to v17
            this.hidden = 'mozHidden';
            this.visibilityChange = 'mozvisibilitychange';
            this.visibilityState = 'mozVisibilityState';
        } else if (typeof this.document.webkitHidden !== 'undefined') {
            // Chrome up to v32, Android up to v4.4, Blackberry up to v10
            this.hidden = 'webkitHidden';
            this.visibilityChange = 'webkitvisibilitychange';
            this.visibilityState = 'webkitVisibilityState';
        }
    }

    // If the page is hidden, pause the carousel;
    // if the page is shown, play the carousel
    handleVisibilityChange() {
        this.document.title = this.document[this.visibilityState];
        if (document.hidden) {
            // this.isTabFocused = false;
            if (this.autoPlay && this.isPlaying) {
                this.pauseSlideShow();
            }
            console.log('On Blur :', this.isPlaying);
        } else {
            // this.isTabFocused = true;
            if (this.lengthOfSlides > 1) {
                if (this.autoPlay && !this.isPlaying) {
                    this.playSlideShow();
                }
            }
            console.log('On Focus :', this.isPlaying);
        }
    }

    ngAfterViewInit() {
        this.initCarousel();
    }

    public initCarousel() {
        // start at [data-slide-index]
        this.slideIndex = this.carouselContainer.getAttribute('data-slide-index') ? parseInt(this.carouselContainer.getAttribute('data-slide-index'), 10) : 0;

        // store length of total slides
        this.lengthOfSlides = this.carouselContainer.querySelectorAll('.al-carousel__slide').length;
        this.slides = this.carouselContainer.querySelectorAll('.al-carousel__slide');
        // Get all dot navigation elements
        this.dots = this.carouselContainer.querySelectorAll('.al-carousel__dot');

        // Accessiility : Set various ARIA roles and properties
        this.setARIAProps();

        // starting obj
        this._updateCurrentSlideObj();

        /* istanbul ignore if */
        if (this.currentSlideObject) {
            this.renderer.addClass(this.currentSlideObject, 'active');
            this.renderer.setAttribute(this.currentSlideObject, 'aria-hidden', 'false');
        }

        // animation end event to use
        this.animationEnd = this.whichAnimationEvent();

        // add swipe detection
        /* istanbul ignore if */
        if (this.lengthOfSlides > 1) {
            this._swipeSetup();

            if (this.autoPlay) {
                this.playSlideShow();
            }
            this.cdr.detectChanges();
        }

    }

    _updateCurrentSlideObj() {
        // get current slide from DOM
        this.currentSlideObject = this.carouselContainer.querySelector('.al-carousel__slide[data-slide-index="' + this.slideIndex + '"]');

        // keep dots concurrent with slides
        this._updateCurrentSlideDot();
    }

    _updateCurrentSlideDot() {
        // update dots
        if (this.dots) {
            for (let i = 0; i < this.dots.length; i++) {
                /* istanbul ignore next */
                if (i === this.slideIndex) {
                    this.renderer.addClass(this.dots[this.slideIndex], 'active');
                    this.renderer.setAttribute(this.dots[this.slideIndex], 'aria-selected', 'true');
                } else {
                    this.renderer.removeClass(this.dots[i], 'active');
                    this.renderer.setAttribute(this.dots[i], 'aria-selected', 'false'); // Accessiility
                }
                // let n = i;
            }
        }
    }

    // slide Carousel one item to _L
    slideLeft() {
        // if index == 0, set to length, else index--
        /* istanbul ignore if */
        if (this.slideIndex === 0) {
            this.slideIndex = this.lengthOfSlides - 1;
        } else {
            this.slideIndex -= 1;
        }
        this._slide('_L');
    }

    // slide Carousel one item to _R
    slideRight() {
        // if index == max, set to 0, else index++
        /* istanbul ignore if */
        if (this.slideIndex === this.lengthOfSlides - 1) {
            this.slideIndex = 0;
        } else {
            this.slideIndex += 1;
        }
        this._slide('_R');
    }

    // Play Slideshow
    pauseSlideShow() {
        this.isPlaying = false;
        clearInterval(this.slideChangeInterval);
    }

    // Pause slideshow
    playSlideShow() {
        this.isPlaying = true;
        this.toggleAnimationEvents();

        this.slideChangeInterval = setInterval(() => {
            this.slideRight();
        }, this.autoPlayInterval);
    }

    toggleAnimationEvents() {
        // console.log('toggleAnimationEvents:');

        [].forEach.call(this.slides, (slide, index) => {
            // console.log(slide, index);
            if (this.animationEnd) {
                slide.addEventListener(this.animationEnd, this.completeAnimationFunc.bind(this), false);
                //slide.addEventListener(this.animationEnd, this.completeAnimationFunc2.bind(this), false);
            }
        });
    }

    completeAnimationFunc(event) {
        // console.log('1 : Transition complete!  This is the callback, no library needed!');
        this.renderer.removeClass(this.currentSlide, this.currentClass);

        setTimeout(() => {
            this.renderer.removeClass(this.targetSlide, this.targetClass);
            this.renderer.removeClass(this.carouselContainer, 'preventDoubleTap');
            event.target.removeEventListener(this.animationEnd, this.completeAnimationFunc);
        }, 0);



        // remove
        /*current_slide.addEventListener(this.animationEnd, (event) => {
            this.renderer.removeClass(current_slide, class_for_current);
            current_slide.removeEventListener(this.animationEnd, () => { });
        });*/
    }

    completeAnimationFunc2(event) {
        console.log('2 : Transition complete!  This is the callback, no library needed!');
        this.renderer.removeClass(this.targetSlide, this.targetClass);
        this.renderer.removeClass(this.carouselContainer, 'preventDoubleTap');
        this.targetSlide.removeEventListener(this.animationEnd, this.completeAnimationFunc2, false);

        // remove
        /* current_slide.addEventListener(this.animationEnd, (event) => {
            this.renderer.removeClass(target_slide, class_for_target);
            // remove top level class
            this.renderer.removeClass(carousel, 'preventDoubleTap');
            target_slide.removeEventListener(this.animationEnd, function () { });
        }); */
    }

    // Go to specific slide
    goToSlide(event) {
        /* istanbul ignore if */
        if (event && event.target && event.target.nodeName === 'A') {
            this.pauseSlideShow();
            const jumpTo = parseInt(event.target.getAttribute('data-slide-index'), 10);
            if (jumpTo === this.slideIndex || jumpTo > this.lengthOfSlides || jumpTo < 0) {
                return false;
            } else if (jumpTo > this.slideIndex) {
                this.slideIndex = jumpTo;
                this._slide('_R');
            } else {
                this.slideIndex = jumpTo;
                this._slide('_L');
            }
        }
    }

    // Accessiility : Navigate between slides using Left and right arrow keys
    onKeyDownGoToSlide(event) {
        this.pauseSlideShow();
        /* istanbul ignore if */
        if (event && event.target && event.target.nodeName === 'A') {
            if (event.keyCode === 37) {
                // Left Arrow Key
                this.slideLeft();
            } else if (event.keyCode === 39) {
                // Right Arrow Key
                this.slideRight();
            }
        }
    }

    // Accessiility : Set various ARIA roles and properties
    setARIAProps() {
        let slides = this.carouselContainer.querySelectorAll('.al-carousel__slide');
        /* istanbul ignore if */
        if (slides) {
            for (let i = 0; i < slides.length; i++) {
                slides[i].setAttribute('id', this._uuid + '_tabpanel_0_' + i);
                slides[i].setAttribute('data-slide-index', i);
                slides[i].setAttribute('aria-hidden', true);
                slides[i].setAttribute('role', 'tabpanel');

                if (slides.length > 1) {
                    slides[i].setAttribute('aria-describedby', this._uuid + '_tab_0_' + i);
                }
            }
        }

    }

	/**
	 * Sliding Controls
	 * Main movement/animation fn. Applies next/prev & active classes to correct .al-carousel__slide's.
	 * @param dir animation direction : To left or To right
	 */
    /* istanbul ignore next */
    _slide(dir) {
        // add preventDoubleTap to prevent double press
        let carousel = this.carouselContainer;
        carousel.className += ' preventDoubleTap';

        // set diretion-based vars. these classes apply left/right css animations
        let class_for_current = dir === '_R' ? 'prev' : 'next';
        let class_for_target = dir === '_R' ? 'next' : 'prev';

        this.currentClass = class_for_current;
        this.targetClass = class_for_target;

        // console.log('class_for_current :', class_for_current, "==", 'class_for_target :', class_for_target);
        // anim out current
        let current_slide = this.currentSlideObject;
        this.currentSlide = this.currentSlideObject;

        this.renderer.addClass(current_slide, class_for_current);
        this.renderer.removeClass(current_slide, 'active');
        this.renderer.setAttribute(current_slide, 'aria-hidden', 'true'); // Accessiility

        // remove
        /*current_slide.addEventListener(this.animationEnd, (event) => {
            this.renderer.removeClass(current_slide, class_for_current);
            current_slide.removeEventListener(this.animationEnd, () => { });
        });*/

        // anim in next
        const target_slide = this.carouselContainer.querySelector('.al-carousel__slide[data-slide-index="' + this.slideIndex + '"]');
        this.targetSlide = this.carouselContainer.querySelector('.al-carousel__slide[data-slide-index="' + this.slideIndex + '"]');
        this.renderer.addClass(target_slide, class_for_target);
        this.renderer.addClass(target_slide, 'active');
        this.renderer.setAttribute(target_slide, 'aria-hidden', 'false'); // Accessiility

        // remove
        /* current_slide.addEventListener(this.animationEnd, (event) => {
            this.renderer.removeClass(target_slide, class_for_target);
            // remove top level class
            this.renderer.removeClass(carousel, 'preventDoubleTap');
            target_slide.removeEventListener(this.animationEnd, function () { });
        }); */

        // update current slide
        this._updateCurrentSlideObj();

    }

	/**
	 * Swipe Detection
	 */
    _swipeSetup() {
        let carousel = this,
            touchsurface = this.carouselContainer,
            startX,
            startY,
            dist,
            threshold = 150, // required min distance traveled to be considered swipe
            allowedTime = 400, // maximum time allowed to travel that distance
            elapsedTime,
            startTime;
        /* istanbul ignore next */
        touchsurface.addEventListener('touchstart', function (e) {
            let touchobj = e.changedTouches[0];
            dist = 0;
            startX = touchobj.pageX;
            startY = touchobj.pageY;
            startTime = new Date().getTime(); // record time when finger first makes contact with surface
        });
        /* istanbul ignore next */
        touchsurface.addEventListener('touchend', function (e) {
            let touchobj = e.changedTouches[0];
            dist = touchobj.pageX - startX; // get total dist traveled by finger while in contact with surface
            elapsedTime = new Date().getTime() - startTime; // get time elapsed
            // check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
            let swipeBool = (elapsedTime <= allowedTime && Math.abs(dist) >= threshold && Math.abs(touchobj.pageY - startY) <= 100);

            if (swipeBool) {
                carousel._handleSwipe(dist);
            }

        }, false);
    }

    _handleSwipe(dist) {
        /* istanbul ignore if */
        if (dist <= 0) {
            this.slideRight();
        } else {
            this.slideLeft();
        }
    }

	/**
	 * Utilities
	 */
    whichAnimationEvent() {
        const el = document.createElement('fakeelement');
        const animations = {
            'animation': 'animationend',
            'OAnimation': 'oAnimationEnd',
            'MozAnimation': 'animationend',
            'WebkitAnimation': 'webkitAnimationEnd'
        };

        for (let t in animations) {
            /* istanbul ignore if */
            if (el.style[t] !== undefined) {
                return animations[t];
            }
        }
    }

    /* From Modernizr */
    whichTransitionEvent() {
        const el = document.createElement('fakeelement');
        const transitions = {
            'transition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
        };

        for (let t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
            }
        }
    }

}
