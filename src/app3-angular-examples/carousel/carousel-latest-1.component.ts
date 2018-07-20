import { Component, OnInit, AfterViewInit, ElementRef, EventEmitter, Input, Renderer2, ChangeDetectorRef, OnDestroy, Output } from '@angular/core';

@Component({
    selector: 'al-carousel',
    templateUrl: './al-carousel.component.html'
})
export class AlCarouselComponent implements OnInit, AfterViewInit, OnDestroy {

    public carouselContainer: any;

    public slideIndex: number = 0;

    public lengthOfSlides: number = 1;

    public currentSlideObject: any;

    public slideChangeInterval: any;

    public animationEnd;

    public hasArrows: boolean = false;

    public isPlaying: boolean = false;

    public dots: any[];

    public _carouselHeight: number = 250; // Minimum carousel height + 34px for carousel controls height

    public _uuid: string;

    initialized: boolean = false;

    public classForCurrentSlide: string = '';

    public classForTargetSlide: string = '';

    public targetSlide: any;

    public allSlides: any;

    @Input() slideTransitionDuration: number = 0.5;

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

    // Events
    @Output() afterSlideChange: EventEmitter<any> = new EventEmitter();

    @Output() onCarouselPause: EventEmitter<any> = new EventEmitter();

    @Output() onCarouselStart: EventEmitter<any> = new EventEmitter();

    constructor(private _el: ElementRef, private renderer: Renderer2, private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.initialized = true;

    }

    ngAfterViewInit() {
        this.carouselContainer = this._el.nativeElement.firstElementChild;
        this.initCarousel();
    }

    public initCarousel() {
        // start at [data-slide-index]
        this.slideIndex = this.carouselContainer.getAttribute('data-slide-index') ? parseInt(this.carouselContainer.getAttribute('data-slide-index'), 10) : 0;

        // All Slides in single carousel
        this.allSlides = this.carouselContainer.querySelectorAll('.al-carousel__slide');

        // Bind Animation event handlers
        this.completeAnimationHandlerForTargetSlide = this.completeAnimationHandlerForTargetSlide.bind(this);
        this.completeAnimationHandlerForCurrentSlide = this.completeAnimationHandlerForCurrentSlide.bind(this);

        // Set animation duration, if provided by user input. Default duration is 0.5s
        if (this.allSlides) {
            if (this.slideTransitionDuration) {
                [].forEach.call(this.allSlides, (slide, index) => {
                    this.renderer.setStyle(slide, 'animation-duration', Number(this.slideTransitionDuration) + 's');
                });
            }
        }

        // store length of total slides
        this.lengthOfSlides = this.carouselContainer.querySelectorAll('.al-carousel__slide').length;

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
    pauseSlideShow(event) {
        this.isPlaying = false;
        clearInterval(this.slideChangeInterval);
        this.removeAllAnimEventHandlers();

        // Emit event on Carousel Pause
        this.onCarouselPause.emit({ event: event, ui: this, message: 'Carousel Paused' });
    }

    // Pause slideshow
    playSlideShow() {
        this.isPlaying = true;
        let interval = this.autoPlayInterval;
        if (typeof interval !== 'number') {
            interval = Number(interval);
        }

        if (this.slideTransitionDuration) {
            interval += (Number(this.slideTransitionDuration) * 1000);
        }

        this.slideChangeInterval = setInterval(() => {
            this.slideRight();
        }, interval);

        // Emit event on Carousel Play
        this.onCarouselStart.emit({ ui: this, message: 'Carousel Started' });
    }

    // Go to specific slide
    goToSlide(event) {
        /* istanbul ignore if */
        if (event && event.target && event.target.nodeName === 'A') {
            this.pauseSlideShow(event);
            let jumpTo = parseInt(event.target.getAttribute('data-slide-index'), 10);
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
        this.pauseSlideShow(event);
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

        this.classForCurrentSlide = class_for_current;
        this.classForTargetSlide = class_for_target;

        // anim out current
        let current_slide = this.currentSlideObject;

        this.renderer.addClass(current_slide, class_for_current);
        this.renderer.removeClass(current_slide, 'active');
        this.renderer.setAttribute(current_slide, 'aria-hidden', 'true'); // Accessiility

        // remove
        current_slide.addEventListener(this.animationEnd, this.completeAnimationHandlerForCurrentSlide, true);

        /* current_slide.addEventListener(this.animationEnd, (event) => {
            this.renderer.removeClass(current_slide, class_for_current);
            current_slide.removeEventListener(this.animationEnd, () => { });
        }); */

        // anim in next
        let target_slide = this.carouselContainer.querySelector('.al-carousel__slide[data-slide-index="' + this.slideIndex + '"]');
        this.targetSlide = target_slide;

        this.renderer.addClass(target_slide, class_for_target);
        this.renderer.addClass(target_slide, 'active');
        this.renderer.setAttribute(target_slide, 'aria-hidden', 'false'); // Accessiility

        // remove
        current_slide.addEventListener(this.animationEnd, this.completeAnimationHandlerForTargetSlide, true);

        /* current_slide.addEventListener(this.animationEnd, (event) => {
            this.renderer.removeClass(target_slide, class_for_target);
            // remove top level class
            this.renderer.removeClass(carousel, 'preventDoubleTap');
            target_slide.removeEventListener(this.animationEnd, function () { });
        }); */

        // update current slide
        this._updateCurrentSlideObj();

    }

    // AnimationEnd Event handler for Current Slide
    completeAnimationHandlerForCurrentSlide(event) {
        this.renderer.removeClass(event.target, this.classForCurrentSlide);
        event.target.removeEventListener(this.animationEnd, this.completeAnimationHandlerForCurrentSlide, true);
    }

    // AnimationEnd Event handler for Target Slide
    completeAnimationHandlerForTargetSlide(event) {
        this.renderer.removeClass(this.targetSlide, this.classForTargetSlide);
        // remove top level class
        this.renderer.removeClass(this.carouselContainer, 'preventDoubleTap');
        event.target.removeEventListener(this.animationEnd, this.completeAnimationHandlerForTargetSlide, true);

        // Emit event after slide change
        this.afterSlideChange.emit({ event: event, ui: this, message: 'Slide change animation complete.' })
    }

    // Remove animation event handlers from all the slides, on Click of Pause button
    removeAllAnimEventHandlers() {
        if (this.allSlides) {
            [].forEach.call(this.allSlides, (slide, index) => {
                slide.removeEventListener(this.animationEnd, this.completeAnimationHandlerForCurrentSlide, true);
                slide.removeEventListener(this.animationEnd, this.completeAnimationHandlerForTargetSlide, true);
            });
        }
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
        let el = document.createElement('fakeelement');
        let animations = {
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

    ngOnDestroy() {
        this.initialized = false;
        if (this.slideChangeInterval) {
            clearInterval(this.slideChangeInterval);
        }
    }

}
