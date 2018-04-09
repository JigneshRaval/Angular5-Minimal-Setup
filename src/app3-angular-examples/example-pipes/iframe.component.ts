import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'iframe-component',
    template: `
        <div>
            <h3>Iframe Url using [innerHTML] property binding. ( Not working )</h3>
            <div id="getIframe" [innerHTML]="htmlSnippet"></div>
        </div>

        <div>
            <h3>Iframe Url using @Pipe() ( Working but with some URLs which allows )</h3>
            <iframe id="iframe1" width="300" height="100" [src]="dangerouseUrl | safeUrlPipe2: 'resourceUrl'" sandbox="allow-same-origin allow-scripts allow-popups allow-forms" style="border: 1px solid red; width: 300px; height: 150px;"></iframe>
        </div>

        <div>
            <h3>Iframe Url using element.setAttribute  ( Not working )</h3>
            <iframe id="iframe2" width="300" height="100" style="border: 1px solid green; width: 300px; height: 150px;"></iframe>
        </div>

        <div>
            <h3>Iframe Url using element.setAttribute  ( Not working )</h3>
            <iframe [src]="iframeUrl"></iframe>
        </div>
    `
})
export class IframeComponent implements AfterViewInit {
    iframeUrl;
    htmlSnippet = '<iframe width="300" height="100" src="https://tutorialedge.net/typescript/angular/angular-modules-tutorial/" style="border: 1px solid green; width: 300px; height: 150px;"></iframe>';

    dangerouseUrl = 'https://tutorialedge.net/typescript/angular/angular-modules-tutorial/';

    constructor(private _element: ElementRef, private sanitizer: DomSanitizer) { }

    ngAfterViewInit() {
        this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://tutorialedge.net/typescript/angular/angular-modules-tutorial/")

        // Set iframe url using setAttribute function
        this._element.nativeElement.querySelector('#iframe2').setAttribute('src', this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerouseUrl));
    }
}
