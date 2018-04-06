import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';

//@Injectable()
export class CarouselUtility {
    public isBrowserTabfocused = new BehaviorSubject(true);

    public hidden = 'hidden';

    public visibilityChange = 'visibilitychange';

    public visibilityState = 'visibilityState';

    //isBrowserTabfocused$ = this.isBrowserTabfocused.asObservable();

    constructor( @Inject(DOCUMENT) private document: any) {
        this._window().addEventListener('focus', () => {
            this.setPageVisibility(true);
        }, false);

        this._window().addEventListener('blur', () => {
            this.setPageVisibility(false);
        }, false);

        this.checkPageVisibility();

        // Warn if the browser doesn't support addEventListener or the Page Visibility API
        if (typeof this.document.addEventListener === 'undefined' || typeof this.document[this.hidden] === 'undefined') {
            if (console) {
                console.log('This demo requires a modern browser that supports the Page Visibility API.');
            }
        } else {
            // Handle page visibility change
            this.document.addEventListener(this.visibilityChange, this.handleVisibilityChange.bind(this), false);
        }
    }

    // Service message commands
    public setPageVisibility(data) {
        // console.log('Observable :', Observable.of(this.isBrowserTabfocused));
        this.isBrowserTabfocused.next(data);
    }

    public checkPageVisibility() {
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
    public handleVisibilityChange() {
        if (document.hidden) {
            this.setPageVisibility(false);
        } else {
            this.setPageVisibility(true);
        }
    }

    public _window(): any {
        // return the native window obj
        return window;
    }
}
