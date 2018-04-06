import { Component } from '@angular/core';

@Component({
    selector: 'example3-carousel-main-component',
    template: `
        <!-- Carousel : Multiple slides -->
        <carousel-component [autoPlay]="true" uuid [carouselDataItems]="carouselItems3" [autoPlayInterval]="1500" [carouselHeight]="400" [carouselBrandClass]="'tile brand-tile3-c'">
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
        </carousel-component>
    `
})
export class Example3CarouselMainComponent {
    public carouselItems3: any;

    constructor() {
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
