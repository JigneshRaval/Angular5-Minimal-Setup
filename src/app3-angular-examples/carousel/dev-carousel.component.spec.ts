import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DevCarouselComponent } from './dev-carousel.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Component: DevCarouselComponent', () => {
    let component: DevCarouselComponent;
    let fixture: ComponentFixture<DevCarouselComponent>;
    let el: DebugElement;
    let dotsEl: DebugElement[];
    let slidesEl: DebugElement[];

    // let el = fixture.debugElement.nativeElement as HTMLElement;

    beforeEach(async(() => {
        // refine the test module by declaring the test component
        TestBed.configureTestingModule({
            declarations: [DevCarouselComponent]
        }).compileComponents();

        // create component and test fixture
        fixture = TestBed.createComponent(DevCarouselComponent);

        // get test component from the fixture
        component = fixture.componentInstance;
        el = fixture.debugElement.nativeElement.firstElementChild.firstElementChild;
        dotsEl = fixture.debugElement.queryAll(By.css('.carousel__dot'));
        slidesEl = fixture.debugElement.queryAll(By.css('.carousel__slide'));

        it('should create', () => {
            expect(component).toBeTruthy();
            component.ngOnInit();
            expect(component.ngOnInit()).toBeDefined();
            expect(component.ngOnInit()).toHaveBeenCalled();
            component.carouselContainer = fixture.debugElement.nativeElement.firstElementChild.firstElementChild;
        });

        it('should call ngAfterViewInit function', async(() => {
            component.carouselDataItems = [
                {
                    slideCaption: 'Carousel with Slideshow function. The Javascript is optimized for accessibility.',
                    slideURL: '#Carousel',
                    slideImage: 'http://creativeoverflow.net/wp-content/uploads/2016/11/mountain-20.jpg', slideImageAltText: 'Image Alternative text'
                },
                {
                    slideCaption: 'Slide_2',
                    slideURL: '#Carousel',
                    slideImage: 'http://creativeoverflow.net/wp-content/uploads/2016/11/mountain-24.jpg'
                },
                {
                    slideCaption: 'Slide_3',
                    slideURL: '#Carousel',
                    slideImage: 'http://creativeoverflow.net/wp-content/uploads/2016/11/mountain-21.jpg'
                },
                {
                    slideCaption: 'Slide_4',
                    slideURL: '#Carousel',
                    slideImage: 'http://creativeoverflow.net/wp-content/uploads/2016/11/mountain-18.jpg'
                }
            ];
            component.ngAfterViewInit();
            expect(component.ngAfterViewInit()).toBeDefined();
            expect(component.ngAfterViewInit()).toHaveBeenCalled();

            component.initCarousel();
            expect(component.initCarousel()).toHaveBeenCalled();

            component._updateCurrentSlideObj();
            expect(component._updateCurrentSlideObj()).toHaveBeenCalled();
        }));

        it('should get carouselHeight', function () {
            expect(component.carouselHeight).toBe(50);
        });

        it('should set carouselHeight', function () {
            component.carouselHeight = 250;
            fixture.detectChanges();
            expect(component._carouselHeight).toBe(component.carouselHeight);
        });

        it('should get uuid value', function () {
            expect(component.uuid).toBe('carousel_9mpy8ouiu46');
        });

        it('Should set uuid value', () => {
            component.uuid = '9mpy4oriu46';
            fixture.detectChanges();
            expect(component._uuid).toBe('carousel_9mpy8ouiu46');
        });

        it('should call _updateCurrentSlideDot() function', function () {
            component._updateCurrentSlideDot();
            expect(component._updateCurrentSlideDot()).toHaveBeenCalled();
            expect(dotsEl.length).toBeGreaterThan(0);
        });

        it('should call slideLeft function when slideindex is 0', function () {
            component.slideIndex = 0;
            component.slideLeft();
            expect(component.slideLeft()).toHaveBeenCalled();
            expect(component._slide('_L')).toHaveBeenCalledWith('_L');
        });

        it('should call slideLeft function when slideindex is greater then 0', function () {
            component.slideIndex = 4;
            component.slideLeft();
            expect(component.slideLeft()).toHaveBeenCalled();
            expect(component._slide('_L')).toHaveBeenCalledWith('_L');
        });

        it('should call slideRight() function', function () {
            expect(component.slideRight()).toBeDefined();
            expect(component._slide('_R')).toHaveBeenCalledWith('_R');
        });

        it('should call slide() function with value Right', function () {
            let dir = '_R';
            component._slide(dir);
            expect(component.whichAnimationEvent()).toHaveBeenCalled();
            expect(function () { component._slide(dir); }).toHaveBeenCalledWith(dir);
        });

        it('should call playSlideShow function', function () {
            component.playSlideShow();
            expect(component.playSlideShow()).toBeDefined();
            expect(component.slideRight()).toHaveBeenCalled();
        });

        it('should call setARIAProps function', function () {
            component.setARIAProps();
            expect(component.setARIAProps()).toBeDefined();
            expect(slidesEl).toBeTruthy();
            expect(component.setARIAProps()).toHaveBeenCalled();
        });

        it('should call _handleSwipe function', function () {
            component._handleSwipe(-186);
            expect(component._handleSwipe(-186)).toHaveBeenCalledWith(-186);
        });

        it('should call _handleSwipe function with positive value', function () {
            component._handleSwipe(186);
            expect(function () { component._handleSwipe(186); }).toHaveBeenCalledWith(186);
        });

        it('should call pauseSlideShow function', function () {
            component.pauseSlideShow(event);
            expect(component.pauseSlideShow(event)).toBeUndefined();
        });

        it('should call goToSlide() function', function () {
            expect(Event && EventTarget && EventTarget.name === 'BUTTON').toBeTruthy();
            expect(component.goToSlide(event)).toHaveBeenCalled();
        });

        it('should call onKeyDownGoToSlide() function', function () {
            expect(component.onKeyDownGoToSlide(event)).toHaveBeenCalled();
            expect(component.pauseSlideShow(event)).toHaveBeenCalled();
        });

        it('should call _swipeSetup() function', function () {
            expect(component._swipeSetup()).toHaveBeenCalled();
        });

        it('should call whichAnimationEvent() function', function () {
            expect(component.whichAnimationEvent()).toHaveBeenCalled();
        });
    }));
});
