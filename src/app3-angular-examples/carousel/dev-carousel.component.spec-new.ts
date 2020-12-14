import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlCarouselComponent } from './carousel.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
// const rx = require('./../../shared/rxjs-operators.ts');
// import { Data } from './../../models/cache.data';
// import { AlValidators } from './../../models/al.validation';
import { UUID } from './../../models/UUID.model';

describe('Component: AlCarouselComponent', () => {
    let component: AlCarouselComponent;
    let fixture: ComponentFixture<AlCarouselComponent>;
    let el: DebugElement;
    // let dotsEl: DebugElement[];
    // let slidesEl: DebugElement[];

    // Keep this in seperate file
    // let data = new Data({});
    // const alValidator = AlValidators;
    // let uuid = new UUID();
    UUID.UUID();
    window.crypto.getRandomValues = undefined;
    UUID.UUID();
    // --------------------- //

    // let el = fixture.debugElement.nativeElement as HTMLElement;
    let presetCarouselImages = function () {
        component.carouselDataItems = [
            {
                slideCaption: 'Carousel with Slideshow function. The Javascript is optimized for accessibility.',
                slideURL: '#Carousel',
                slideImage: 'http://creativeoverflow.net/wp-content/uploads/2016/11/mountain-20.jpg',
                slideImageAltText: 'Image Alternative text'
            },
            {
                slideCaption: 'Slide_2',
                slideURL: '#Carousel',
                slideImage: 'http://creativeoverflow.net/wp-content/uploads/2016/11/mountain-24.jpg',
                slideImageAltText: 'Image Alternative text'
            },
            {
                slideCaption: 'Slide_3',
                slideURL: '#Carousel',
                slideImage: 'http://creativeoverflow.net/wp-content/uploads/2016/11/mountain-21.jpg',
                slideImageAltText: 'Image Alternative text'
            },
            {
                slideCaption: 'Slide_4',
                slideURL: '#Carousel',
                slideImage: 'http://creativeoverflow.net/wp-content/uploads/2016/11/mountain-18.jpg',
                slideImageAltText: 'Image Alternative text'
            }
        ];
    };

    let setSliderImages = function () {
        let imageContent = '';
        component.carouselDataItems.forEach((value, index) => {
            imageContent += [
                '<figure class="carousel__slide" attr.data-slide-index="' + index + '" aria-hidden="true" role="tabpanel">',
                '<a class="carousel__link tile-wrapperLink" href="' + value.slideURL + '">',
                '<div class="carousel__image">',
                '<img src="' + value.slideImage + '" alt="' + value.slideImageAltText + '" />',
                '</div>',
                '<figcaption class="carousel__slide__content" *ngIf="' + value.slideCaption + '">' + value.slideCaption + '</figcaption>',
                '</a>',
                '</figure>'
            ].join('');
        });
        let container = el.children[0];
        container.nativeElement.innerHTML = imageContent;
    };

    beforeEach(async(() => {
        // refine the test module by declaring the test component
        TestBed.configureTestingModule({
            declarations: [AlCarouselComponent]
        }).compileComponents();
    }));
    beforeEach(() => {
        // create component and test fixture
        fixture = TestBed.createComponent(AlCarouselComponent);
        // get test component from the fixture
        component = fixture.componentInstance;
        fixture.detectChanges();
        el = fixture.debugElement.query(By.css('.carousel__container'));
        presetCarouselImages();
        setSliderImages();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        let value = '20';
        component.uuid = value;
        expect(component.uuid).toContain('carousel_');
        let height = 400;
        component.carouselHeight = height;
        expect(component.carouselHeight).toEqual(height);
    });


    it('Should call initCarousel', () => {
        component.initCarousel();
    });

    it('Should call slideLeft', () => {
        component.initCarousel();
        component.slideLeft();
    });

    it('Should call slideRight', () => {
        component.initCarousel();
        component.slideRight();
        let container = By.css('[data-slide-index="' + component.slideIndex + '"]');
        fixture.debugElement.query(container);
        component.currentSlideObject = fixture.debugElement.nativeElement.querySelector('.carousel__slide__content');
        component.currentSlideObject.click();
    });

    it('Should call _swipeSetup', () => {
        component.initCarousel();
        component._swipeSetup();
    });

    it('Should call removeAllAnimEventHandlers', () => {
        component.initCarousel();
        component.removeAllAnimEventHandlers();
    });
    it('Should click on the dots within carousel', () => {
        component.initCarousel();
        component.dots[0].click();
    });

    it('Should call ngOnDestroy', () => {
        component.autoPlayInterval = null;
        component.slideTransitionDuration = null;
        component.autoPlay = null;
        component.allSlides = null;
        component.dots = null;
        component.slideIndex = 1;
        component.initCarousel();
        component.slideIndex = 1;
        component.lengthOfSlides = 1;
        component.slideLeft();
        component.slideRight();
        component.playSlideShow();
        component.dots = null;
        component._updateCurrentSlideDot();
        component.ngOnDestroy();

        fixture.detectChanges();
    });

    it('Should call adjustContenCarouselHeight', () => {
        component.fitToContent = true;
        expect(component.fitToContent).toBe(true);
        component.initCarousel();
        component.adjustContenCarouselHeight();
    });

});
