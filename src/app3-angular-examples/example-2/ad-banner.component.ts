// Ref : https://angular.io/guide/dynamic-component-loader

import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { AdItem } from './ad-item';
import { AdDirective } from './ad.directive';

@Component({
    selector: 'ad-banner-component',
    template: `
        <div class="dynamic-banner">
            <h3>Advertisement</h3>
            <ng-template adHostDirective></ng-template>
        </div>
    `,
    styles: [`
        .dynamic-banner {
            border: 1px solid #CCC;
            padding: 1em;
        }
    `]
})
export class AdBannerComponent implements OnInit, OnDestroy {
    @Input() ads: AdItem[];
    currentIndex: number = -1;
    interval: any;
    @ViewChild(AdDirective) adHostDirective: AdDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnInit() {
        this.loadComponent();
        this.getAds();
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }

    loadComponent() {
        this.currentIndex = (this.currentIndex + 1) % this.ads.length;
        let adItem = this.ads[this.currentIndex];

        let viewContainerRef = this.adHostDirective.viewContainerRef;
        viewContainerRef.clear();

        // console.log('viewContainerRef :', viewContainerRef);

        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

        let componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.data = adItem.data;
    }

    getAds() {
        this.interval = setInterval(() => {
            this.loadComponent();
        }, 3000)
    }
}
