// al-intro-overlay.component.spec.ts

// Angular Imports
// =============================
import { async, TestBed, getTestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Injectable } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Component Imports
// =============================
export const LoggingConstants = {
    IS_IDB_ENABLED_IN_BROWSER: true, // For checking Indexed Db is enabled or not in case DOM storage disabled/Private browsing etc.
    INFO: 'INFO',
    DEBUG: 'DEBUG',
    ERROR: 'ERROR',
    WARN: 'WARN',
    FATAL: 'FATAL',
};
import {
    RemoteService,
    LoggingService,
    UIStorageService,
    LocalCacheService,
    CacheStorageService,
    IDBService,
    AppUtility,
    IUrlOptions,
    LoggingStartupConfigService,
    AppStartupService,
    DomStorageFallbackService
} from '@alight/uicore';
import { DemoService } from './unit-test-demo.service';


let mockData;

let mockResponse = [
    {
        'asset': {
            'AH_OVERLAY_ASSET_GRP': {
                'INTRO_OVERLAY_DATATILE_CONTENT_REDESIGN_ASSET': {
                    'assetType': 'text',
                    'assetValue': 'Prevent others from seeing your personal information by choosing the eye icon to hide or show your amounts.',
                    'assetKey': 'INTRO_OVERLAY_DATATILE_CONTENT_REDESIGN'
                },
                'INTRO_OVERLAY_DATATILE_HEADING_REDESIGN_ASSET': {
                    'assetType': 'text',
                    'assetValue': 'Show or Hide Amounts',
                    'assetKey': 'INTRO_OVERLAY_DATATILE_HEADING_REDESIGN'
                },
                'INTRO_OVERLAY_HEADING_ASSET': {
                    'assetType': 'text',
                    'assetValue': 'Want to Take a Tour?',
                    'assetKey': 'INTRO_OVERLAY_HEADING'
                },
                'INTRO_OVERLAY_CONTENT_ASSET': {
                    'assetType': 'text',
                    'assetValue': 'Check Out Key Features!',
                    'assetKey': 'INTRO_OVERLAY_CONTENT'
                },
                'INTRO_OVERLAY_START_TOUR_ASSET': {
                    'assetType': 'text',
                    'assetValue': 'Take a Tour',
                    'assetKey': 'INTRO_OVERLAY_START_TOUR'
                },
                'INTRO_OVERLAY_SKIP_TOUR_ASSET': {
                    'assetType': 'text',
                    'assetValue': 'Skip',
                    'assetKey': 'INTRO_OVERLAY_SKIP_TOUR'
                },
                'INTRO_OVERLAY_NEXT_BUTTON_ASSET': {
                    'assetType': 'text',
                    'assetValue': 'Next',
                    'assetKey': 'INTRO_OVERLAY_NEXT_BUTTON'
                },
                'INTRO_OVERLAY_DONE_BUTTON_ASSET': {
                    'assetType': 'text',
                    'assetValue': 'Done',
                    'assetKey': 'INTRO_OVERLAY_DONE_BUTTON'
                },
                'INTRO_OVERLAY_SKIP_LABEL_ASSET': {
                    'assetType': 'text',
                    'assetValue': 'Skip Tutorial',
                    'assetKey': 'INTRO_OVERLAY_SKIP_LABEL'
                },
                'INTRO_OVERLAY_ACCT_ROLE_HEADING_ASSET': {
                    'assetType': 'text',
                    'assetValue': 'Role',
                    'assetKey': 'INTRO_OVERLAY_ACCT_ROLE_HEADING'
                },
                'INTRO_OVERLAY_ACCT_ROLE_CONTENT_ASSET': {
                    'assetType': 'text',
                    'assetValue': 'Switch roles. Toggle between your multiple roles to access information relevant to each.',
                    'assetKey': 'INTRO_OVERLAY_ACCT_ROLE_CONTENT'
                },
                'INTRO_OVERLAY_CHAT_HEADING_ASSET': {
                    'assetType': 'text',
                    'assetValue': 'Chat',
                    'assetKey': 'INTRO_OVERLAY_CHAT_HEADING'
                },
                'INTRO_OVERLAY_CHAT_CONTENT_ASSET': {
                    'assetType': 'text',
                    'assetValue': 'Quickly connect to the support center to get answers to your questions.',
                    'assetKey': 'INTRO_OVERLAY_CHAT_CONTENT'
                },
                'INTRO_OVERLAY_CONTACTUS_HEADING_ASSET': {
                    'assetType': 'text',
                    'assetValue': 'Contact Us ',
                    'assetKey': 'INTRO_OVERLAY_CONTACTUS_HEADING'
                },
                'INTRO_OVERLAY_CONTACTUS_CONTENT_ASSET': {
                    'assetType': 'text',
                    'assetValue': 'Need help? Start here to find FAQs or contact the support center.',
                    'assetKey': 'INTRO_OVERLAY_CONTACTUS_CONTENT'
                },
                'INTRO_OVERLAY_GMC_HEADING_ASSET': {
                    'assetType': 'text',
                    'assetValue': 'Message Center',
                    'assetKey': 'INTRO_OVERLAY_GMC_HEADING'
                },
                'INTRO_OVERLAY_GMC_CONTENT_ASSET': {
                    'assetType': 'text',
                    'assetValue': 'Stay informed. Access important messages and updates in your Secure Mailbox, or learn of any actions you need to take.',
                    'assetKey': 'INTRO_OVERLAY_GMC_CONTENT'
                },
                'INTRO_OVERLAY_DATATILE_HEADING_ASSET': {
                    'assetType': 'text',
                    'assetValue': 'Show/Hide Values',
                    'assetKey': 'INTRO_OVERLAY_DATATILE_HEADING'
                },
                'INTRO_OVERLAY_DATATILE_CONTENT_ASSET': {
                    'assetType': 'text',
                    'assetValue': 'Viewing this page in front of a lot of people? Click this button to cover up your personal information.',
                    'assetKey': 'INTRO_OVERLAY_DATATILE_CONTENT'
                }
            }
        }
    }
];

/* let mockPreferencesData = {
    orgName: 'earth',
    pageName: 'gmc',
    preferenceId: '18826575',
    preferences: {
        'ah-overlay': { name: 'ah-overlay', readOnly: false, values: ['done'] }
    },
    responseMessage: 'SUCCESS',
    widgetInstanceIdentifier: 'ahintrooverlay_WAR_ahintrooverlayportlet'
}; */

@Injectable()
class RemoteServiceStub {
    request(requestType: string, urlOptions: IUrlOptions, body?: any, key?: string) {
        if (requestType) {
            if (requestType === 'none') {
                return Observable.throw('Error');
            }
        }
        if (urlOptions) {
            if (!urlOptions.endPoint) {
                return Observable.throw('Error');
            }
        }
        if (mockData) {
            if (Object.keys(mockData).length > 0) {
                return Observable.of(mockData);
            } else {
                return Observable.throw('Error');
            }
        } else {
            return Observable.of(mockData);
        }
    }

    clearAll_IDBStores() {
    }
}

describe('DemoService', () => {
    let service;
    let injector: TestBed;
    let introTourDataObj = {};
    let httpMock: HttpTestingController;
    const { AH_OVERLAY_ASSET_GRP } = mockResponse[0].asset;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                CommonModule,
                HttpModule,
                HttpClientTestingModule,
            ],
            declarations: [
            ],
            providers: [
                RemoteService,
                LoggingService,
                UIStorageService,
                LocalCacheService,
                CacheStorageService,
                IDBService,
                AppUtility,
                DomStorageFallbackService,
                LoggingStartupConfigService,
                AppStartupService,
                DemoService,
                { provide: RemoteService, useClass: RemoteServiceStub }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        });

        TestBed.compileComponents().then(() => {
            // Method 1 : way to inject service
            injector = getTestBed();
            httpMock = injector.get(HttpTestingController);

            // Method 2 : way to inject service
            // httpMock = TestBed.get(HttpTestingController);
        });

    }));

    // Method 3 : way to inject service
    beforeEach(inject([DemoService], (demoService: DemoService) => {
        service = demoService;
    }));

    afterEach(() => {
        httpMock.verify();
    });

    beforeAll(() => {
        window['alIntroOverlay'] = () => {
            if (introTourDataObj) {
                if (Object.keys(introTourDataObj).length) {
                    service.setIntroOverlayEligibility(service.isEligibleForOverlay());
                } else {
                    service.setIntroOverlayEligibility(false);
                }
            }
        };

        sessionStorage.setItem('lr_json_data', '{"groupid":14091839,"companyid":10154,"orgid":14091838,"clientid":"19920","lineage":"19920_1.0","userDetails":{"roleTypes":{"TBA":["E"],"Workday":[]},"locale":"en_US","fname":"John","lname":"Doe544000135","authenticated":true,"fullName":"John Doe544000135","entryPoint":"LOGON","ecsAdmin":false},"locale":"en_US","orgName":"earth","sessionExpiryTime":15}');

        // sessionStorage.setItem('IntroOverlayConfig', '{"ADOPT_UPOINT_RELEASE_53":true,"IS_ECS_ADMIN":false,"IS_INTRO_OVERLAY_ENABLED":true}');

        mockData = mockResponse;

        introTourDataObj = {
            introTour: {
                heading: AH_OVERLAY_ASSET_GRP.INTRO_OVERLAY_HEADING_ASSET.assetValue,
                content: AH_OVERLAY_ASSET_GRP.INTRO_OVERLAY_CONTENT_ASSET.assetValue,
                buttons: [{
                    startLabel: AH_OVERLAY_ASSET_GRP.INTRO_OVERLAY_START_TOUR_ASSET.assetValue
                },
                {
                    skipLabel: AH_OVERLAY_ASSET_GRP.INTRO_OVERLAY_SKIP_TOUR_ASSET.assetValue
                }]
            },
            buttonsLables: {
                nextlabel: AH_OVERLAY_ASSET_GRP.INTRO_OVERLAY_NEXT_BUTTON_ASSET.assetValue,
                donelabel: AH_OVERLAY_ASSET_GRP.INTRO_OVERLAY_DONE_BUTTON_ASSET.assetValue,
                skiplabel: AH_OVERLAY_ASSET_GRP.INTRO_OVERLAY_SKIP_LABEL_ASSET.assetValue,
            },
            steps: [{
                step: 'intro-id-account-role',
                position: 'arrow-tl',
                heading: AH_OVERLAY_ASSET_GRP.INTRO_OVERLAY_ACCT_ROLE_HEADING_ASSET.assetValue,
                content: AH_OVERLAY_ASSET_GRP.INTRO_OVERLAY_ACCT_ROLE_CONTENT_ASSET.assetValue
            },
            {
                step: 'intro-id-chat',
                position: 'arrow-tr',
                heading: AH_OVERLAY_ASSET_GRP.INTRO_OVERLAY_CHAT_HEADING_ASSET.assetValue,
                content: AH_OVERLAY_ASSET_GRP.INTRO_OVERLAY_CHAT_CONTENT_ASSET.assetValue,
            }]
        };
    });

    it('should be defined', async(inject([DemoService], (demoService) => {
        console.log('***** START: "DemoService"');
        console.log('DemoService 1 ===================');
        expect(demoService).toBeDefined();
    })));


    // cover bindOnGMCClose() function
    // ===============================

    it('should call "bindOnGMCClose()" function: cover if condition', async(inject([DemoService], (demoService) => {
        console.log('AlIntroOverlayService 11 ===================');
        service.bindOnGMCClose(introTourDataObj);
        window['alIntroOverlay']();
    })));

    /* it('should call "bindOnGMCClose()" function: cover if "introTourDataObj" is blank', async(inject([DemoService], (DemoService) => {
        console.log('AlIntroOverlayService 12 ===================');
        introTourDataObj = {};
        service.bindOnGMCClose(introTourDataObj);
        window['alIntroOverlay']();
    })));

    it('should call "bindOnGMCClose()" function: cover else condition', async(inject([DemoService], (DemoService) => {
        console.log('AlIntroOverlayService 13 ===================');
        introTourDataObj = null;
        service.bindOnGMCClose(introTourDataObj);
        window['alIntroOverlay']();
    }))); */

    // demo()
    // ===============================

    it('should check "RemoteService.reuqest()" to be undefined: "getIntroOverlayTextData()" to be undefined ', async(inject([DemoService], (demoService) => {
        console.log('DemoService 20 ===================');
        mockData = mockResponse;
        demoService.demo().subscribe(data => {
            expect(data).toBeDefined();
        });
        // expect(demoService.demo()).toBeUndefined();
        console.log('***** END: "DemoService"');
    })));

    it('should check "RemoteService.reuqest()" to be undefined: "getIntroOverlayTextData()" to be undefined ', async(inject([DemoService, RemoteService], (demoService, rService) => {
        console.log('DemoService 20 ===================');
        rService.request = () => {
            return Observable.throw('Error');
        };
        demoService.demo().subscribe(
            data => data,
            (error) => {
                return Observable.throw('Error in getting data for Intro Overlay text.');
            }
        );
        console.log('***** END: "DemoService"');
    })));

    it('should check "RemoteService.reuqest()" to be undefined: "getIntroOverlayTextData()" to be undefined ', async(inject([DemoService, RemoteService], (demoService, rService) => {
        console.log('DemoService 20 ===================');
        rService.request = undefined;
        demoService.demo();
        console.log('***** END: "DemoService"');
    })));

    // demo2()
    // ===============================

    it('should throw an error if trying to search for not supported `what`', () => {
        service.demo2 = () => new Error('test');
        service.demo2();
    });

    /**
     * Mocking : You can use the HttpTestingController to mock requests and the flush method to provide dummy values as responses. As the HTTP request methods return an Observable, we subscribe to it and create our expectations in the callback methods:
     * REF: https://medium.com/netscape/testing-with-the-angular-httpclient-api-648203820712
     * REF: https://blog.craftlab.hu/testing-http-requests-in-angular-has-never-been-easier-dfe53c267522
     */
    it('should call "demo2()"', async(() => {
        console.log('DemoService 20 ===================');
        service.demo2().subscribe(data => {
            expect(data).toBeTruthy();
        });

        const mockReq = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos/1');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');

        mockReq.flush(mockData);

        // We also run HttpTestingController#verify to make sure that there are no outstanding requests:
        httpMock.verify();
    }));

    /**
     * Dealing with errors : In this case we're using the error callback of the subscribe method. We also use the expectNone matcher to confirm that the request wasn't made:
     * REF: https://dev.to/alisaduncan/intercepting-http-requests---using-and-testing-angulars-httpclient
     */
    it('should throw an error if trying to search for not supported `what`', () => {
        service.demo2().subscribe(() => fail('should fail with 500 status'), error => {
            expect(error).toBeTruthy();
            expect(error.status).toEqual(500);
        });

        const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos/1');
        expect(req.request.method).toEqual('GET');

        req.flush({ errorMessage: 'Error' }, { status: 500, statusText: 'Server Error' });
        httpMock.verify();
    });


    // isEligibleForOverlay()
    // ===============================

    it('should call "isEligibleForOverlay()" function', () => {
        sessionStorage.setItem('IntroOverlayConfig', '{"ADOPT_UPOINT_RELEASE_53":true,"IS_ECS_ADMIN":false,"IS_INTRO_OVERLAY_ENABLED":true}');
        service.isEligibleForOverlay();
    });

    it('should call "isEligibleForOverlay()" function', () => {
        sessionStorage.removeItem('IntroOverlayConfig');
        service.isEligibleForOverlay();
    });

    it('should call "isEligibleForOverlay()" function', () => {
        sessionStorage.setItem('IntroOverlayConfig', '{"ADOPT_UPOINT_RELEASE_53":true,"IS_ECS_ADMIN":true,"IS_INTRO_OVERLAY_ENABLED":true}');
        service.isEligibleForOverlay();
    });

});
