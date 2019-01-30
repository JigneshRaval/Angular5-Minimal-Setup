// al-intro-overlay.service.ts

import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { RemoteService, DomStorageFallbackService } from '@alight/uicore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class DemoService {
    // private userName = 'Jignesh Raval';

    constructor(
        private http: HttpClient,
        private remoteService: RemoteService,
        private domStorageFB: DomStorageFallbackService
    ) { }

    // Example : covering Private function
    // ==========================
    public bindOnGMCClose(introTourDataObj) {
        window['alIntroOverlay'] = () => {
            if (introTourDataObj) {
                if (Object.keys(introTourDataObj).length) {
                    this.somePrivateFunction();
                } else {
                    this.anotherPrivateFunction();
                }
            }
        };
    }

    private somePrivateFunction() {
        console.log('Private function executed...');
    }

    private anotherPrivateFunction() {
        console.log('Another Private function executed...');
    }

    // Example
    // ==========================
    public demo() {
        console.log('getIntroOverlayTextData called.');
        const endPointUrl = 'channel/widgetconfigurations/channel/widgetConfigurations/takeatouroverlay';
        try {

            return this.remoteService.request('get', {
                restOfUrl: '',
                endPoint: endPointUrl,
                isSecure: true,
                contentType: 'application/json'
            }).map((response) => {
                return response;
            }).catch((error: any) => {
                return Observable.throw('Demo : Error in getting data for Intro Overlay text.');
            });

        } catch (error) {
            console.log('Error in executing try block');
        }
    }

    // Example
    // ==========================
    public demo2() {
        const endPointUrl = 'https://jsonplaceholder.typicode.com/todos/1';
        try {
            /* const req = new HttpRequest('GET', endPointUrl, {
                reportProgress: true
            }); */
            // return this.http.request(req);
            return this.http.get(endPointUrl).map((response) => {
                return response;
            }).catch((error: any) => {
                return Observable.throw({ status: 500, statusText: 'Server Error' });
            });

        } catch (error) {
            console.log('Error in executing try block');
        }
    }

    // Example
    // ==========================
    public isEligibleForOverlay() {
        let displayOverlay = false;

        if (sessionStorage.getItem('IntroOverlayConfig')) {
            let IntroOverlayConfig = JSON.parse(sessionStorage.getItem('IntroOverlayConfig'));

            if (!(IntroOverlayConfig.IS_ECS_ADMIN) && IntroOverlayConfig.IS_INTRO_OVERLAY_ENABLED) {
                displayOverlay = true;
            } else {
                displayOverlay = false;
            }
        }

        return displayOverlay;
    }
}
