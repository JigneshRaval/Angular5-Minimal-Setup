import { Component, OnInit } from '@angular/core';
import { AdItem } from './ad-item';
import { AdService } from './ad.service';

@Component({
    selector: 'example2-main-component',
    template: `
        <div>
            <ad-banner-component [ads]="ads"></ad-banner-component>
        </div>
    `
})
export class Example2MainComponent implements OnInit {
    ads: AdItem[];

    constructor(private adService: AdService) { }

    ngOnInit() {
        this.ads = this.adService.getAds();
        console.log(this.ads);
    }
}
