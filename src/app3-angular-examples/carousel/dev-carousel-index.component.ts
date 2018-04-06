import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'carousel-new-index',
    template: `
        <!-- Carousel : Multiple slides -->
            <dev-carousel uuid [carouselDataItems]="carouselItems2" [autoPlayInterval]="2000" [carouselHeight]="400" [carouselBrandClass]="''">
                <!-- START : Carousel slides -->
                <figure *ngFor="let slide of carouselItems2; let i = index" class="carousel__slide" attr.data-slide-index="{{i}}" aria-hidden="true"
                    role="tabpanel">
                    <a class="carousel__link tile-wrapperLink" href="{{slide.slideURL}}">
                        <div class="carousel__image">
                            <img src="{{slide.slideImage}}" alt="{{slide.slideImageAltText}}" />
                        </div>
                        <figcaption class="carousel__slide__content" *ngIf="slide.slideCaption">{{slide.slideCaption}}</figcaption>
                    </a>
                </figure>
                <!-- END : Carousel slides -->
            </dev-carousel>

            <!-- Carousel : Multiple slides -->
            <dev-carousel [autoPlay]="false" uuid [carouselDataItems]="carouselItems3" [autoPlayInterval]="1500" [carouselHeight]="400" [carouselBrandClass]="''">
                <!-- START : Carousel Slides -->
                <figure *ngFor="let slide of carouselItems3; let i = index" class="carousel__slide" attr.data-slide-index="{{i}}" aria-hidden="true"
                    role="tabpanel">
                    <a class="carousel__link" href="{{slide.slideURL}}">
                        <div class="carousel__image">
                            <img src="{{slide.slideImage}}" alt="{{slide.slideImageAltText}}" />
                        </div>
                        <figcaption class="carousel__slide__content" *ngIf="slide.slideCaption">{{slide.slideCaption}}</figcaption>
                    </a>
                </figure>
                <!-- END : Carousel Slides -->
            </dev-carousel>
    `
})
export class CarouselNewIndex {
    carouselItems: any[];
    carouselItems2: any[];
    carouselItems3: any[];

    constructor() {
        // Carousel slide data
        this.carouselItems = [
            {
                slideCaption: 'Single Slide Example', slideURL: '#Carousel',
                slideImage: 'http://creativeoverflow.net/wp-content/uploads/2016/11/mountain-18.jpg',
                slideImageAltText: 'Image Alternative text'
            }
        ];

        this.carouselItems2 = [
            {
                slideCaption: 'Carousel with Slideshow function. The Javascript is optimized for accessibility.', slideURL: '#Carousel',
                slideImage: 'http://creativeoverflow.net/wp-content/uploads/2016/11/mountain-20.jpg',
                slideImageAltText: 'Image Alternative text'
            },
            { slideCaption: 'Slide_2', slideURL: '#Carousel', slideImage: 'http://creativeoverflow.net/wp-content/uploads/2016/11/mountain-24.jpg' },
            { slideCaption: 'Slide_3', slideURL: '#Carousel', slideImage: 'http://creativeoverflow.net/wp-content/uploads/2016/11/mountain-21.jpg' },
            { slideCaption: 'Slide_4', slideURL: '#Carousel', slideImage: 'http://creativeoverflow.net/wp-content/uploads/2016/11/mountain-18.jpg' }
        ];

        this.carouselItems3 = [
            {
                slideCaption: 'Slide_1', slideURL: '#Carousel',
                slideImage: 'https://s-media-cache-ak0.pinimg.com/736x/8c/48/bb/8c48bb4fa5ad569b553a783d9a502670--autumn-love-autumn-fall.jpg',
                slideImageAltText: 'Image Alternative text'
            },
            {
                slideCaption: 'Carousel with Slideshow function. The Javascript is optimized for accessibility.', slideURL: '#Carousel',
                slideImage: 'https://s-media-cache-ak0.pinimg.com/736x/8c/48/bb/8c48bb4fa5ad569b553a783d9a502670--autumn-love-autumn-fall.jpg'
            },
            {
                slideCaption: 'Slide_3', slideURL: '#Carousel',
                slideImage: 'https://s-media-cache-ak0.pinimg.com/736x/e9/74/57/e974572fb8a4f600d2a98e0cf3c12c4e--tree-swings-cool-swings.jpg'
            }
        ];

    }
}
