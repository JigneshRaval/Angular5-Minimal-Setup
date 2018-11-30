# Unit testing using Angular + Jasmin + Karma

```
const compiled = fixture.debugElement.nativeElement;
expect(compiled.querySelector('.typo-redesign')).not.toBe(null);

it('should verify Image only Templates', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.ah-tile-img')).not.toBe(null);
    expect(compiled.querySelector('.ah-tile-img')).not.toBe(null);
});
```

## Events
```
it( 'should close on info container click', () => {
    spyOn( component, 'closeInfoLayer' );
    const el: HTMLElement = fixture.debugElement.query(By.css('.dpm-info__layerContainer')).nativeElement;
    const mockEvent: Event = <Event><any>{
      srcElement: {
        classList: el.classList
      },
      stopPropagation: <any>( ( e: any ) => { /**/ }),
      preventDefault: <any>( ( e: any ) => { /**/ }),
    };

    component.onLayerContainerClick( mockEvent );
    expect( component.closeInfoLayer ).toHaveBeenCalled();
  });
```

## Errors and Solutions

### I get the error 'Error: Can't resolve all parameters for ActivatedRoute: (?, ?, ?, ?, ?, ?, ?, ?).'
```
const fakeActivatedRoute = {
    snapshot: { data: {} }
}
{ provide: ActivatedRoute, useClass: fakeActivatedRoute },
```
OR

```
class MockRouter {
  navigate = jasmine.createSpy('navigate');
}
```

TestBed.configureTestingModule({
  declarations: [MyComponent],
  providers: [
    {provide: Router, useClass: MockRouter}
  ]
});

### Error : angular 4 unit testing error `TypeError: ctor is not a constructor`
#### Solution :
Here is an example that fires the error : providers: [{provide: OrderService, useClass: new OrderServiceMock()}]
The correct declaration is : providers : [{provide: OrderService, useValue: new OrderServiceMock()}]

### Error : TypeError: Cannot read property 'root' of undefined

#### Solution: Add ActivatedRoute
```
TestBed.configureTestingModule({
    providers: [
        {
            provide: APP_BASE_HREF, useValue: '/'
        },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: Router, useValue: mockRouter },
    ],
    schemas: [NO_ERRORS_SCHEMA]
}).compileComponents();
```
Full Example of Component testing having Routes:

Version : 1
--------------------
// styleguide-tabs.component.spec.ts

// Angular Imports
// =============================
import { async, ComponentFixture, TestBed, inject, fakeAsync, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { DebugElement } from '@angular/core';
// import { Location } from '@angular/common';
import { APP_BASE_HREF, Location, CommonModule } from '@angular/common';

import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { BrowserModule, By } from '@angular/platform-browser';

// Component Imports
// =============================
import { AlCoreModuleLibrary, AppUtility } from '@alight/uicore';
import { StyleGuideTabs } from './styleguide-tabs.component';
import { MedicalTabContentComponent } from './medical-tab.component';
import { HealthTabContentComponent } from './health-tab.component';
import { PrescriptionDrugTabContentComponent } from './prescriptiondrug-tab.component';
import { DentalTabContentComponent } from './dental-tab.component';


fdescribe('StyleGuideTabs', () => {
    let component: StyleGuideTabs;
    let fixture: ComponentFixture<StyleGuideTabs>;
    // let debugElement: DebugElement;
    let router: Router;
    let location: Location;
    const fakeActivatedRoute = {
        snapshot: { data: {} }
    }
    let mockRouter = {
        navigate: jasmine.createSpy('navigate')
    };
    let routes: Routes = [
        { path: '', component: MedicalTabContentComponent, outlet: 'medical' },
        {
            path: 'Tabs',
            component: StyleGuideTabs,
            children: [
                { path: '', component: MedicalTabContentComponent, outlet: 'medical' },
                { path: 'medical', component: MedicalTabContentComponent, outlet: 'medical' },
                { path: 'healthaccounts', component: HealthTabContentComponent, outlet: 'healthaccounts' },
                { path: 'prescriptiondrug', component: PrescriptionDrugTabContentComponent, outlet: 'prescriptiondrug' },
                { path: 'dental', component: DentalTabContentComponent, outlet: 'dental' }
            ]
        }
    ];


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                CommonModule,
                // RouterModule.forRoot(routes),
                RouterTestingModule.withRoutes(routes),
                AlCoreModuleLibrary.forRoot()
            ],
            declarations: [
                StyleGuideTabs,
                MedicalTabContentComponent,
                HealthTabContentComponent,
                PrescriptionDrugTabContentComponent,
                DentalTabContentComponent
            ],
            providers: [
                {
                    provide: APP_BASE_HREF, useValue: '/'
                },
                { provide: ActivatedRoute, useValue: fakeActivatedRoute },
                { provide: Router, useValue: mockRouter },
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        /* router = TestBed.get(Router);
        location = TestBed.get(Location); */
        // fixture = TestBed.createComponent(StyleGuideTabs);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StyleGuideTabs);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create StyleGuide Tabs Component', () => {
        async(inject([Router, Location], (router: Router, location: Location) => {
            fixture = TestBed.createComponent(StyleGuideTabs);
            component = fixture.debugElement.componentInstance;
            expect(component).toBeTruthy();
            /* const navigateSpy = spyOn((<any>component).router, 'navigate');
            fixture.detectChanges();
            expect(navigateSpy).toHaveBeenCalledWith(['/Tabs', { outlets: { medical: ['medical'] } }]); */
            expect(location.path()).toEqual('/Tabs/(healthaccounts:healthaccounts)');
            expect(location.path()).toEqual('/Tabs/(prescriptiondrug:prescriptiondrug)');
            expect(location.path()).toEqual('/Tabs/(dental:dental)');
            expect(location.path()).toEqual('/Tabs/(medical:medical)');
            console.log('after expect');
        }));
    });

    /* it('should be able to navigate to `/`', fakeAsync(() => {
        const injector = getTestBed();
        const router1 = injector.get(Router);
        const fixture1 = TestBed.createComponent(StyleGuideTabs);
        fixture1.detectChanges();
        // initial navigation
        router1.navigate(['/'])
            .then(() => {
                expect(router1.url).toEqual('/');
            });
    })); */


    it('should call "switchToDocumentTab" function:', () => {
        fixture.componentInstance.switchToDocumentTab(event);
    });


    it('should copy code to clipboard:', () => {
        const btnCopyCode = fixture.debugElement.query(By.css('.styleguide-box__code button'));
        btnCopyCode.triggerEventHandler('click', (event) => {
            fixture.componentInstance.copyToClipboard(event);
        });
        fixture.detectChanges();
    });

    it('should toggle display code:', () => {
        const btnShowCode = fixture.debugElement.query(By.css('.styleguide__show-code'));
        btnShowCode.triggerEventHandler('click', (event) => {
            fixture.componentInstance.toggleCodeBlock(event);
        });
        fixture.detectChanges();
        // expect(btnShowCode.nativeElement.innerText).toContain('Copied');
        // expect(btnShowCode.nativeElement.classList).toContain('isCoppied');
    });

});

Version : 2
--------------------
// styleguide-tabs.component.spec.ts

// Angular Imports
// =============================
import { async, ComponentFixture, TestBed, inject, fakeAsync, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { DebugElement } from '@angular/core';
// import { Location } from '@angular/common';
import { APP_BASE_HREF, Location, CommonModule } from '@angular/common';

import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { BrowserModule, By } from '@angular/platform-browser';

// Component Imports
// =============================
import { AlCoreModuleLibrary, AppUtility } from '@alight/uicore';
import { StyleGuideTabs } from './styleguide-tabs.component';
import { MedicalTabContentComponent } from './medical-tab.component';
import { HealthTabContentComponent } from './health-tab.component';
import { PrescriptionDrugTabContentComponent } from './prescriptiondrug-tab.component';
import { DentalTabContentComponent } from './dental-tab.component';


fdescribe('StyleGuideTabs', () => {
    let component: StyleGuideTabs;
    let fixture: ComponentFixture<StyleGuideTabs>;
    // let debugElement: DebugElement;
    /* let router: Router;
    let location: Location; */
    const fakeActivatedRoute = {
        snapshot: { data: {} }
    };

    /* let mockRouter = {
        navigate: jasmine.createSpy('navigate')
    }; */

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                CommonModule,
                // RouterModule.forRoot(routes),
                RouterTestingModule.withRoutes([]),
                AlCoreModuleLibrary.forRoot()
            ],
            declarations: [
                StyleGuideTabs,
                MedicalTabContentComponent,
                HealthTabContentComponent,
                PrescriptionDrugTabContentComponent,
                DentalTabContentComponent
            ],
            providers: [
                {
                    provide: APP_BASE_HREF, useValue: '/'
                },
                { provide: ActivatedRoute, useValue: fakeActivatedRoute },
                // { provide: Router, useValue: mockRouter },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(StyleGuideTabs);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StyleGuideTabs);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create StyleGuide Tabs Component', () => {
        async(inject([Router, Location], (router: Router, location: Location) => {
            fixture = TestBed.createComponent(StyleGuideTabs);
            component = fixture.debugElement.componentInstance;
            expect(component).toBeTruthy();
            /* expect(location.path()).toEqual('/Tabs/(healthaccounts:healthaccounts)');
            expect(location.path()).toEqual('/Tabs/(prescriptiondrug:prescriptiondrug)');
            expect(location.path()).toEqual('/Tabs/(dental:dental)');
            expect(location.path()).toEqual('/Tabs/(medical:medical)'); */
        }));
    });

    it('should call "switchToDocumentTab" function:', () => {
        fixture.componentInstance.switchToDocumentTab(event);
    });

    it('should call "switchToRequestsTab" function:', () => {
        fixture.componentInstance.switchToRequestsTab(event);
    });

    it('should call "openNextTab" function:', () => {
        fixture.componentInstance.openNextTab(event);
    });

    it('should call "openPrevTab" function:', () => {
        fixture.componentInstance.openPrevTab(event);
    });

    it('should call "tabClick" function on click of Medical tab:', () => {
        const event = {
            originalEvent: {
                target: {
                    innerText: 'Medical'
                }
            }
        };

        fixture.componentInstance.tabClick(event);
        // expect(location.path()).toEqual('/Tabs/(healthaccounts:healthaccounts)');
        // expect(mockRouter.navigate).toHaveBeenCalledWith(['/Tabs', { outlets: { medical: ['medical'] } }]);
    });

    it('should call "tabClick" function on click of Health tab:', () => {
        const event = {
            originalEvent: {
                target: {
                    innerText: 'Health'
                }
            }
        }
        fixture.componentInstance.tabClick(event);
    });

    it('should call "tabClick" function on click of Prescription Drug tab:', () => {
        const event = {
            originalEvent: {
                target: {
                    innerText: 'Prescription Drug'
                }
            }
        }
        fixture.componentInstance.tabClick(event);
    });

    it('should call "tabClick" function on click of Dental tab:', () => {
        const event = {
            originalEvent: {
                target: {
                    innerText: 'Dental'
                }
            }
        }
        fixture.componentInstance.tabClick(event);
    });

    it('should call "tabClick" function on click of Prescription Drug tab:', () => {
        const event = {
            originalEvent: {
                target: {
                    innerText: ''
                }
            }
        }
        fixture.componentInstance.tabClick(event);
    });


    it('should copy code to clipboard:', () => {
        const btnCopyCode = fixture.debugElement.query(By.css('.styleguide-box__code button'));
        btnCopyCode.triggerEventHandler('click', (event) => {
            fixture.componentInstance.copyToClipboard(event);
        });
        fixture.detectChanges();
    });

    it('should toggle display code:', () => {
        const btnShowCode = fixture.debugElement.query(By.css('.styleguide__show-code'));
        btnShowCode.triggerEventHandler('click', (event) => {
            fixture.componentInstance.toggleCodeBlock(event);
        });
        fixture.detectChanges();
        // expect(btnShowCode.nativeElement.innerText).toContain('Copied');
        // expect(btnShowCode.nativeElement.classList).toContain('isCoppied');
    });

});

--------------------------------
https://stackoverflow.com/questions/39577920/angular-2-unit-testing-components-with-routerlink/39579009#39579009
----------------
https://stackoverflow.com/questions/47201037/angular-unit-testing-error-cannot-match-any-routes-url-segment-home-adviso?rq=1
Start with

import { RouterTestingModule } from '@angular/router/testing';

Then, in your Testbed

imports: [RouterTestingModule]

Now you should be able to unit test your component

EDIT

To make a spy on your routing, what you have to do is

spyOn(component.router, 'navigate').and.returnValue(true);

And you expect will look like

expect(component.router.navigate).toHaveBeenCalledWith('/home/advisor');
-------------
https://stackoverflow.com/questions/39791773/angular-2-unit-testing-with-router
----------
const event = new MouseEvent('click');
spyOn(event, 'preventDefault');
---------------
https://codereview.stackexchange.com/questions/32573/spyon-click-events-and-check-call-function

it ('spy on behavior', function () {
    var spy = spyOn(app.navigation, 'init');
    app.navigation.init();
    expect(spy).toHaveBeenCalled();
});
-------------
it('should call onClick method', () => {
  const onClickMock = spyOn(component, 'onClick');
  fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null);
  expect(onClickMock).toHaveBeenCalled();
});
-----------------
let datePickerElem = fixture.debugElement.query(By.css('.ui-datepicker')).nativeElement;
datePickerElem.innerHTML = datePickerHtml;
async(inject([AppUtility], (appUtility: AppUtility) => {
	appUtility.SetDisabledOtherDayLinkCalendar(datePickerElem);
}));
-------------
https://stackoverflow.com/questions/22604644/jasmine-async-callback-was-not-invoked-within-timeout-specified-by-jasmine-defa

beforeEach(fakeAsync (() => {

//your code

}));



describe('Intilalize', () => {
        it('should have a defined component', fakeAsync(() => {
            createComponent();
            expect(_AddComponent.ngOnInit).toBeDefined();
        }));
    });
------------
https://codereview.stackexchange.com/questions/165209/jasmine-unit-test-that-triggers-mouse-events-in-angular-4

 function triggerEvents(debugElement: DebugElement, eventName: string, object: any){
            debugElement.triggerEventHandler(eventName, object);
        }

    function expectAndReset(spy: Function, object: any, spyObj: jasmine.Spy) {
        expect(spy).toHaveBeenCalledWith(object);
        spyObj.calls.reset();
    }

    it('test the move event', inject([MyService], (service: MyService) => {
        let spyObj = spyOn(service.x, 'emit');
        spyObj.and.callThrough();
        triggerEvents(de[0],'mousedown', { pageX: 10, pageY: 10 });
        triggerEvents(de[0],'mousemove', { pageX: 40, pageY: 20 });
        expectAndReset(service.x.emit,{ x: 30, y: 10 },spyObj);
        triggerEvents(de[0],'mousemove', { pageX: 45, pageY: 25 });
        expectAndReset(service.x.emit,{ x: 35, y: 15 },spyObj);
        triggerEvents(de[0],'mousemove', { pageX: 50, pageY: 30 });
        expectAndReset(service.x.emit,{ x: 40, y: 20 },spyObj);

    }));

Another approch:
 function triggerEvents(debugElement: DebugElement, eventName: string, object: any) {
            debugElement.triggerEventHandler(eventName, object);
        }

        function expectAndReset(spy: Function, object: any, spyObj: jasmine.Spy) {
            expect(spy).toHaveBeenCalledWith(object);
            spyObj.calls.reset();
        }

        it('test the move event', inject([MyService], (service: MyService) => {
            let spyObj = spyOn(service.x, 'emit');
            spyObj.and.callThrough();
            triggerEvents(de[0], 'mousedown', { pageX: 10, pageY: 10 });
            for (let i = 0; i <= 10; i += 5) {
                triggerEvents(de[0], 'mousemove', { pageX: 40 + i, pageY: 20 + i });
                expectAndReset(service.x.emit, { x: 30 + i, y: 10 + i }, spyObj);
            }

        }));
-------------- Phantomjs error (karma.config.js)

captureTimeout: 210000,
    browserDisconnectTolerance: 3,
    browserDisconnectTimeout: 210000,
    browserNoActivityTimeout: 210000,

--------------- styleguide-calendar

function triggerEvents(eventName: string, object: any) {
        debugElement.triggerEventHandler(eventName, object);
    }
	it('Should call "datetryfun()" function:', () => {
        /* const event = new MouseEvent('click');
        spyOn(event, 'preventDefault'); */
        let elem = fixture.debugElement.query(By.css('p-calendar'));
        triggerEvents('click', component.datetryfun);
        // fixture.componentInstance.datetryfun(event);
        fixture.detectChanges();
    });

----------------- SetTimeout

it('mock setTimeout test', () => {
  jest.useFakeTimers();
  setTimeout(() => {console.log('TIME IS UP');}, 1000);
  jest.runAllTimers();
});
OR ===
it('mock setTimeout test', (done) => {
  setTimeout(() => {
    console.log('TIME IS UP');
    done();
  }, 1000);
});

2:==========
I tried with await new Promise(resolve => setTimeout(resolve, 1)); and it worked.

it('should trigger onChange', async () => {
    const pin = shallow(<PINInput />);

    pin.find('input').forEach((input, idx) => input.simulate('change', { target: { value: idx.toString() } }));

    await new Promise(resolve => setTimeout(resolve, 1));
    expect(pin.state('value')).toBe('0123');
});

-------------------- viewChild example
http://qaru.site/questions/279867/angular-2-unit-testing-viewchild-is-undefined
--
import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { Component, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ExampleComponent } from './test.component';
import { TimepickerModule, TimepickerComponent } from 'ng2-bootstrap/ng2-bootstrap';

describe('Example Test', () => {
  let exampleComponent: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, TimepickerModule.forRoot()],
      declarations: [
        ExampleComponent
      ]
    });
    fixture = TestBed.createComponent(ExampleComponent);
  });

  it('should recognize a timepicker', async(() => {
    fixture.detectChanges();
    const timepickerChild: TimepickerComponent = fixture.componentInstance.timepickerChild;
    console.log('timepickerChild', timepickerChild);
    expect(timepickerChild).toBeDefined();
  }));
});

--------------- LocalStorage Testing
REF : https://gist.github.com/wzr1337/b3fe4abcc46588aa8fcb

/// <reference path="../../library.test.d.ts"/>
import * as angular from "angular"; angular;
import * as mocks from "angular-mocks/ngMock"; mocks;

describe('feat(localStorage Mock): ', function() {

  beforeAll(() => {
    angular.module('mock-module',[])
  });

  // --- snip ---
  // Mock localStorage
  beforeEach(() => {
    var store = {};

    spyOn(localStorage, 'getItem').and.callFake( (key:string):String => {
     return store[key] || null;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key:string):void =>  {
      delete store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
      return store[key] = <string>value;
    });
    spyOn(localStorage, 'clear').and.callFake(() =>  {
        store = {};
    });
  });

  // --- snap ---

  beforeEach(()=> {
      angular.mock.module('mock-module');
  });

  it('should set an Item', () => {
    expect(localStorage.setItem('foo', 'bar')).toBe('bar'); // bar
    expect(localStorage.getItem('foo')).toBe('bar'); // bar
  });

  it('should return null for non existing items', () => {
    expect(localStorage.getItem('foo')).toBeNull(); // null
  });

  it('should set and remove Item', () => {
    expect(localStorage.setItem('foo', 'bar')).toBe('bar'); // bar
    expect(localStorage.removeItem('foo')).toBeUndefined(); // undefined
    expect(localStorage.getItem('foo')).toBeNull(); // null
  });

  it('should clear the storage', () => {
    expect(localStorage.setItem('foo', 'bar')).toBe('bar'); // bar
    expect(localStorage.setItem('bar', 'foo')).toBe('foo'); // foo
    expect(localStorage.clear()).toBeUndefined(); // undefined
    expect(localStorage.getItem('foo')).toBeNull(); // null
    expect(localStorage.getItem('bar')).toBeNull(); // null
  });
});
-------------- ARRAY
https://www.reddit.com/r/javascript/comments/5bggb3/testing_multiple_objects_in_array_karma_jasmine/

it ('should foo in the bar', function() {
     for (var i = 0, n = foo.length, i < n; i++) {
          expect(foo.bar[i]).toEqual('barFoo');
    }
});
If it's an array of primitives (e.g. strings)/we aren't asserting a key in an object (looks like this from the example) and the array isn't too long (e.g. 6 items), then use deep equality:

expect(foo.bar).to.deep.equal(['barFoo', 'barFoo', 'barFoo', 'barFoo', 'barFoo', 'barFoo']);

The reasoning is:

    Error messages from assertion library should tell you what's wrong (e.g. different lengths) as well as values so you can visually check

    My personal opinion is that expectations should rarely be dynamically generated; they should be clear/obvious to debug and not doing the same logic as the source code (as that would be redundant and unnecessary -- same as verifying true === true)

For an array of objects, use something like _.pick and compare to a hardcoded expectation

For long arrays, use new Array(100).fill('barFoo')

For dynamic length arrays, the test shouldn't be asserting values of dynamic length. You are probably missing mock data somewhere

------------------ Unit testing angular 5 component with @ViewChild


You can do something like this.

Create a spy object for the ChildComponent like this.

const childComponent: jasmine.createSpyObj('ChildComponent', ['childMethod']);

Then in the test set the component's child component property to the spy that you have created.

  component.childComponent =  childComponent;

Your test file should lokk like this.

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChildComponent } from './child.component';
import { ParentComponent } from './parent.component';

describe('ParentComponent', () => {

    let component: Parentcomponent;
    let fixture: ComponentFixture<Parentcomponent>;

    const childComponent: jasmine.createSpyObj('ChildComponent', ['childMethod']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ ParentComponent, ChildComponent ],
            schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
});

beforeEach(() => {
    fixture = TestBed.createComponent(TaskListPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
});

    it('should invoke childMethod when parentMethod is invoked', () => {
        component.childComponent =  childComponent;
        component.parentMethod();
        expect(childComponent.childMethod).toHaveBeenCalled();
    });

});

------------ events
REF: https://github.com/ariya/phantomjs/issues/11289
function emit(el, eventName) {
        var event;
        if (document.createEvent) {
            event = new Event(eventName);
            el.dispatchEvent(event);
        } else {
            event = document.createEventObject();
            el.fireEvent('on' + eventName, event);
        }
    }

Example 2 : REF: https://github.com/ariya/phantomjs/issues/11289
=========
// <input id="my-input-element" type="text" value="foo"/>
var evt, node = document.getElementById('my-input-element');

// Have to use dispatchEvent/fireEvent because jQuery.trigger will not
// fire an event attached via addEventListener. Each environment has an
// unusual way to trigger a keyup event.
if (node.dispatchEvent) {
  // Sane browsers
  try {
    // Chrome, Safari, Firefox
    evt = new KeyboardEvent('keyup');
  } catch (e) {
    // PhantomJS (wat!)
    evt = document.createEvent('KeyboardEvent');
    evt.initEvent('keyup', true, false);
  }
  evt.keyCode = 32;
  node.dispatchEvent(evt);
} else {
  // IE 8
  evt = document.createEventObject('KeyboardEvent');
  evt.keyCode = 32;
  node.fireEvent('onkeyup', evt);
}
Example 3:
===========

You should be able to spyOn the document.getElementById and return the useful properties (i.e. value here). Like this,

spyOn(document, "getElementById").and.callFake(function() {
    return {
        value: 'test'
    }
});

And then if you want, you can expect it to have been called,

expect(document.getElementById).toHaveBeenCalledWith('...')

------------------ For Loop
REf : https://tosbourn.com/using-loops-in-jasmine/

describe('this is my looping test!', function() {
  var input = [1,2,3];
  var output = [10, 20, 30];

  function test_my_times_ten(input, output) {
    it('should multiply ' + input + ' by 10 to give ' + output, function() {
      expect(input * 10).toEqual(output)
    });
  }

  for(var x = 0; x < input.size; x++) {
    test_my_times_ten(input[x], output[x]);
  }
});
------------- SERVICE Testing
it(`should get results from the web method`, async(inject( [ LookupsService, HttpTestingController ], (service: LookupsService, backend: HttpTestingController) => {

      service.getHubs().subscribe((hubs : KeyValuePair<number>[]) => {
        // This code never seems to run...
        console.log(hubs.length);
        expect(hubs.length).toBeGreaterThan(0);
      });
  })));

  Example 2:
=========
it('should return a resolved Promise', async(inject([ErrorService], (service: ErrorService) => {
        service.getErrorMessages().then((value) => {
            console.log('Service running =', value);
            component.errorMessages = value;
            console.log('Service running =', component.errorMessages.length);
            expect(component.errorMessages.length).toBeDefined();
            expect(component.errorMessages.length).toBe(3);
        });
        console.log('***** END: "StyleGuide Validation" Component test case execution...');
    })));
Example 3:
===========
https://stackoverflow.com/questions/40886281/testing-angular-2-service-that-returns-a-promise
Use async, which will wrap it a zone, waiting for all asynchronous tasks to complete before the test completes.

import { async } from '@angular/core/testing';

                                   // !!!!!!!
it('should return a resolved Promise', async(inject([DataService], (service: DataService)=>{
  service.getCars().then((value) => {
    expect(value.length).toBe(3);
  });
})));

Also another option is to not use inject at all. You can just get services from the TestBed. It's alot cleaer

let service: DataService;

beforeEach(() => {
  const injector = TestBed.configureTestingModule({});
  service = injector.get(DataService);
});

No need for inject, and it's a lot less verbose. You can now use done. Or if you want, still do it the Angular way, and use async.
## Testing Asynchronous Code
REF.: https://codecraft.tv/courses/angular/unit-testing/asynchronous/

### No Async call:
```
it('Button label via jasmine.done', () => {
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Login');
    spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));
    component.ngOnInit();
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Logout');
});
```

### Sync Call using DONE
```
it('Button label via jasmine.done', (done) => {
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Login');
    let spy = spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));
    component.ngOnInit();

    spy.calls.mostRecent().returnValue.then(() => {
        fixture.detectChanges();
        expect(el.nativeElement.textContent.trim()).toBe('Logout');
        done();
    });
});
```

### Async and whenStable:
```
it('Button label via async() and whenStable()', async(() => {
  fixture.detectChanges();
  expect(el.nativeElement.textContent.trim()).toBe('Login');
  spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));
  fixture.whenStable().then(() => {
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Logout');
  });
  component.ngOnInit();
}));
```
### fakeAsync and tick:
```
it('Button label via fakeAsync() and tick()', fakeAsync(() => {
  expect(el.nativeElement.textContent.trim()).toBe('');
  fixture.detectChanges();
  expect(el.nativeElement.textContent.trim()).toBe('Login');
  spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));
  component.ngOnInit();

  tick();
  fixture.detectChanges();
  expect(el.nativeElement.textContent.trim()).toBe('Logout');
}));
```
Like async we wrap the test spec function in a function called fakeAsync.
We call tick() when there are pending asynchronous activities we want to complete.

The tick() function blocks execution and simulates the passage of time until all pending asynchronous activities complete.

So when we call tick() the application sits and waits for the promise returned from isAuthenticated to be resolved and then lets execution move to the next line.
fakeAsync does have some drawbacks, it doesn’t track XHR requests for instance.

### Complete Example: https://codecraft.tv/courses/angular/unit-testing/asynchronous/

```
// auth.service.ts

export class AuthService {
  isAuthenticated(): Promise<boolean> {
    return Promise.resolve(!!localStorage.getItem('token'));
  }
}
```

```
// login.component.ts

import {Component} from '@angular/core';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-login',
  template: `
  <a>
    <span *ngIf="needsLogin">Login</span>
    <span *ngIf="!needsLogin">Logout</span>
  </a>
`
})
export class LoginComponent implements  OnInit {

  needsLogin: boolean = true;

  constructor(private auth: AuthService) {
  }

  ngOnInit()  {
    this.auth.isAuthenticated().then((authenticated) => {
      this.needsLogin = !authenticated;
    })
  }
}
```

```
/* tslint:disable:no-unused-variable */
import {TestBed, async, whenStable, fakeAsync, tick, ComponentFixture} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {AuthService} from "./auth.service";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('Component: Login', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let el: DebugElement;

  beforeEach(() => {

    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [AuthService]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(LoginComponent);

    // get test component from the fixture
    component = fixture.componentInstance;

    // UserService provided to the TestBed
    authService = TestBed.get(AuthService);

    //  get the "a" element by CSS selector (e.g., by class name)
    el = fixture.debugElement.query(By.css('a'));
  });

  it('Button label via fakeAsync() and tick()', fakeAsync(() => {
    expect(el.nativeElement.textContent.trim()).toBe('');
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Login');

    spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));

    component.ngOnInit();
    // Simulates the passage of time until all pending asynchronous activities complete
    tick();
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Logout');
  }));

  it('Button label via async() and whenStable()', async(() => {
    // async() knows about all the pending promises defined in it's function body.
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Login');
    spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));

    fixture.whenStable().then(() => {
      // This is called when ALL pending promises have been resolved
      fixture.detectChanges();
      expect(el.nativeElement.textContent.trim()).toBe('Logout');
    });

    component.ngOnInit();

  }));

  it('Button label via jasmine.done', (done) => {
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Login');

    // Make the authService return a promise that resolves to true
    let spy = spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));
    // We trigger the component to check the authService again
    component.ngOnInit();

    // We now want to call a function when the Promise returned from authService.isAuthenticated() is resolved
    spy.calls.mostRecent().returnValue.then(() => {
      // The needsChanged boolean has been updated on the Component so to update the template we trigger change detection
      fixture.detectChanges();
      // Now the label is Logout
      expect(el.nativeElement.textContent.trim()).toBe('Logout');
      // We tell jasmine we are done with this test spec
      done();
    });
  });
});
```

## Tutorials Referances
[Angular: Unit Testing Jasmine, Karma (step by step)]
(https://medium.com/frontend-fun/angular-unit-testing-jasmine-karma-step-by-step-e3376d110ab4)
