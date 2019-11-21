# Unit testing using Angular + Jasmin + Karma

```javascript
const compiled = fixture.debugElement.nativeElement;
expect(compiled.querySelector('.typo-redesign')).not.toBe(null);

it('should verify Image only Templates', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.tile-img')).not.toBe(null);
    expect(compiled.querySelector('.tile-img')).not.toBe(null);
});
```

## Events

```javascript
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

```javascript
const fakeActivatedRoute = {
    snapshot: { data: {} }
}
{ provide: ActivatedRoute, useClass: fakeActivatedRoute },
```

OR

```javascript
class MockRouter {
  navigate = jasmine.createSpy('navigate');
}
```

```javascript
TestBed.configureTestingModule({
  declarations: [MyComponent],
  providers: [
    {provide: Router, useClass: MockRouter}
  ]
});
```

### Error : angular 4 unit testing error `TypeError: ctor is not a constructor`

#### Solution:

Here is an example that fires the error : providers: [{provide: OrderService, useClass: new OrderServiceMock()}]
The correct declaration is : providers : [{provide: OrderService, useValue: new OrderServiceMock()}]

### Error : TypeError: Cannot read property 'root' of undefined

#### Solution: Add ActivatedRoute

```javascript
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
```javascript
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
import { AlCoreModuleLibrary, AppUtility } from '@mylight/uicore';
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
```

Version : 2
--------------------

```javascript
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
import { AlCoreModuleLibrary, AppUtility } from '@mylight/uicore';
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
```

--------------------------------
https://stackoverflow.com/questions/39577920/angular-2-unit-testing-components-with-routerlink/39579009#39579009
----------------
https://stackoverflow.com/questions/47201037/angular-unit-testing-error-cannot-match-any-routes-url-segment-home-adviso?rq=1
Start with

`import { RouterTestingModule } from '@angular/router/testing';`

Then, in your Testbed

`imports: [RouterTestingModule]`

Now you should be able to unit test your component

EDIT

To make a spy on your routing, what you have to do is

spyOn(component.router, 'navigate').and.returnValue(true);

And you expect will look like

`expect(component.router.navigate).toHaveBeenCalledWith('/home/advisor');`

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

#### Another approch:

```javascript
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
```

#### viewChild example

http://qaru.site/questions/279867/angular-2-unit-testing-viewchild-is-undefined

```javascript
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
```

#### LocalStorage Testing

REF : https://gist.github.com/wzr1337/b3fe4abcc46588aa8fcb

```javascript
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
```

#### ARRAY

https://www.reddit.com/r/javascript/comments/5bggb3/testing_multiple_objects_in_array_karma_jasmine/

```javascript
it ('should foo in the bar', function() {
     for (var i = 0, n = foo.length, i < n; i++) {
          expect(foo.bar[i]).toEqual('barFoo');
    }
});
```

If it's an array of primitives (e.g. strings)/we aren't asserting a key in an object (looks like this from the example) and the array isn't too long (e.g. 6 items), then use deep equality:

`expect(foo.bar).to.deep.equal(['barFoo', 'barFoo', 'barFoo', 'barFoo', 'barFoo', 'barFoo']);`

The reasoning is:

    Error messages from assertion library should tell you what's wrong (e.g. different lengths) as well as values so you can visually check

    My personal opinion is that expectations should rarely be dynamically generated; they should be clear/obvious to debug and not doing the same logic as the source code (as that would be redundant and unnecessary -- same as verifying true === true)

For an array of objects, use something like _.pick and compare to a hardcoded expectation

For long arrays, use new Array(100).fill('barFoo')

For dynamic length arrays, the test shouldn't be asserting values of dynamic length. You are probably missing mock data somewhere

### Unit testing angular 5 component with @ViewChild

You can do something like this.

1. Create a spy object for the ChildComponent like this.

`const childComponent: jasmine.createSpyObj('ChildComponent', ['childMethod']);`

2. Then in the test set the component's child component property to the spy that you have created.

  `component.childComponent =  childComponent;`

Your test file should lokk like this.

```javascript
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
```

#### events

REF: https://github.com/ariya/phantomjs/issues/11289

```javascript
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
```

##### Example 2 : REF: https://github.com/ariya/phantomjs/issues/11289

```javascript
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
```

##### Example 3:

You should be able to `spyOn` the `document.getElementById` and return the useful properties (i.e. value here). Like this,

```javascript
spyOn(document, "getElementById").and.callFake(function() {
    return {
        value: 'test'
    }
});
```

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

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
// auth.service.ts

export class AuthService {
  isAuthenticated(): Promise<boolean> {
    return Promise.resolve(!!localStorage.getItem('token'));
  }
}
```

```javascript
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

```javascript
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

### Structural Directive unit testing

```javascript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { IDBService } from '../services/indexdb/idb.service';
import { AppUtility } from '../utils/utility';

@Directive({
    selector: '[checkEligiblity]',
})
export class CheckEligibilityDirective {

    eligibility: boolean = false;
    pageName: string;
    @Input() params: string;
    pageData: any = {};
    selName: string;

    constructor(private idbService: IDBService,
        private appUtility: AppUtility,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
      ) {
      }
    @Input()
    set checkEligiblity(val) {
        this.pageName = 'ag_'+this.appUtility.getPageNameFromURL()+'_params';
        let value = this.checkEligibility(this.pageName, val);
        if (value) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }

    checkEligibility(pageNam, selector) {
        this.idbService.getRecordFromObjStore('PageEligibilityData', pageNam).subscribe(
            (pageData) => {
                try {
                    if (pageData) {
                        if (pageData[0]['asset'][pageNam][selector].assetValue) {
                            this.eligibility = pageData[0]['asset'][pageNam][selector].assetValue;
                        } else {
                            this.eligibility = pageData[0]['asset'][pageNam][selector].assetValue;
                        }
                    }
                } catch (error) {
                    console.error('Error in calling service.', error);
                    return false;
                }
            },
            (error) => {
                console.error('Error in calling service.', error);
                return false;
            });
            return this.eligibility;
    }
}

```

```javascript
/* tslint:disable:no-unused-variable */

// widget-eligiblity.directive.spec.ts

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, CUSTOM_ELEMENTS_SCHEMA, Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { IDBService } from '../services/indexdb/idb.service';
import { AppUtility } from '../utils/utility';
import { Observable } from 'rxjs/Observable';
import { DomStorageFallbackService } from '../services/DomStorageFallback.service';


// Directive Imports
// =============================
import { WidgetEligibilityDirective } from './widget-eligiblity.directive';


// MockData
// =============================
let mockData;

let mockResponse = [{
    "asset": {
        "ag_login_params": {
            "app-iva": {
                "assetType": "ui",
                "assetValue": "design",
                "assetKey": "node"
            }
        }

    }
}];

// MockComponent
// =============================
@Component({
    template: `<demo-component *checkEligiblity="'app-iva'"></demo-component> `
})
class MockComponent {
    constructor() { }
}


fdescribe('CheckEligibilityDirective', () => {
    let component: MockComponent;
    let fixture: ComponentFixture<MockComponent>;
    let inputEl: DebugElement;
    let directive: any;
    let testBedService: IDBService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MockComponent,
                CheckEligibilityDirective
            ],
            providers: [
                DomStorageFallbackService,
                CheckEligibilityDirective,
                TemplateRef,
                ViewContainerRef,
                { provide: AppUtility, useClass: MockAppUtilityService },
                { provide: IDBService, useClass: MockIDBService },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });

        fixture = TestBed.createComponent(MockComponent);
        component = fixture.componentInstance;
        testBedService = TestBed.get(IDBService);

        // let inputElement: DebugElement = fixture.debugElement.query(By.directive(WidgetEligibilityDirective));
        // directive = fixture.debugElement.injector;

        fixture.detectChanges();

    }));

    it('should call checkEligibility() function with valid data', () => {
        mockData = mockResponse;
    });

    it('should call checkEligibility() function with assetValue = null', () => {
        mockResponse[0]['asset']['ag_login_params']['app-iva'].assetValue = null;
        mockData = mockResponse
    });

    it('should call checkEligibility() function : cover catch block', () => {
        mockData = "test";
    });

    it('should call checkEligibility() function with error : Cover subscribe error block', () => {
        mockData = null;
    });

});


// Mock IndexedDB Services
// ==============================
@Injectable()
class MockIDBService {
    cc = false;
    constructor() { }

    public getRecordFromObjStore(store, pageNam): any {

        if (mockData) {
            return Observable.of(mockData);
        } else {
            return Observable.throw('Error in calling getRecordFromObjStore() from idb service.');
        }
    }
}


// Mock appUtility Services
// ==============================
@Injectable()
class MockAppUtilityService {
    constructor() { }

    public getPageNameFromURL(): any {
        return 'login';
    }

}
```

### Attribute Directive unit testing

```javascript
// tab-accessibility.directive.ts

import { Directive, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[alTabAccessibility]'
})
export class AlTabAccessibilityDirective implements AfterViewInit {

    public tabs = [];
    public tabOrientation: any;

    // Key reference
    public keys = {
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        delete: 46
    };

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngAfterViewInit() {
        let tabs: any;

        let tabNav = this.el.nativeElement.querySelector('ul[role="tablist"]:first-child');
        tabs = tabNav.querySelectorAll('li');

        this.tabs = Array.from(tabs);

        this.tabOrientation = this.el.nativeElement.getAttribute('orientation');

        if (this.tabs && this.tabs.length > 0) {
            this.tabs.forEach((item, index) => {
                item.addEventListener('keydown', this.keydownEventListener.bind(this));
                item.index = index;
            });
        }
    }

    // Handle keydown on tabs
    keydownEventListener(event: any) {
        const key = event.keyCode;

        switch (key) {
            // On press of "End" key -> Activate last tab
            // case this.keys.end:
            //     event.preventDefault();
            //     this.activateTab(this.tabs[this.tabs.length - 1]);
            //     break;

            // // On press of "Home" key -> Activate first tab
            // case this.keys.home:
            //     event.preventDefault();
            //     this.activateTab(this.tabs[0]);
            //     break;

            // // up and down arrow keys in keydown event
            // // when Tab orientation or alignment is vertical ( on Left or Right )
            // case this.keys.up:
            //     // because we need to prevent page scroll >:)
            //     if (this.tabOrientation) {
            //         event.preventDefault();
            //         this.activatePrevTab(event);
            //     }
            //     break;

            // case this.keys.down:
            //     // because we need to prevent page scroll >:)
            //     if (this.tabOrientation) {
            //         event.preventDefault();
            //         this.activateNextTab(event);
            //     }
            //     break;

            // left and right arrow keys in keydown event
            // when Tab orientation or alignment is horizontal ( on Top or Bottom )
            case this.keys.left:
                if (!this.tabOrientation) {
                    this.activatePrevTab(event);
                }
                break;

            case this.keys.right:
                if (!this.tabOrientation) {
                    this.activateNextTab(event);
                }
                break;
        }
    }

    // Activates any given tab panel
    activateTab(tab: any, setFocus?: boolean) {
        setFocus = setFocus || true;

        // Display tab content by executing click event, when tab gets focus
        // tab.click();

        // Set focus when required
        if (setFocus) {
            tab.querySelector('a').focus();
        }
    }

    // Activate previous tab on press of "Left" arrow key
    activatePrevTab(event: any) {
        const index = event.target.parentNode.index;
        if ((index - 1) === (this.tabs.length)) {
            this.activateTab(this.tabs[0]);
        } else if (index === 0) {
            this.activateTab(this.tabs[(this.tabs.length - 1)]);
        } else {
            this.activateTab(this.tabs[(index - 1)]);
        }
    }

    // Activate next tab on press of "Right" arrow key
    activateNextTab(event: any) {
        const index = event.target.parentNode.index;
        if ((index + 1) === (this.tabs.length)) {
            this.activateTab(this.tabs[0]);
        } else {
            this.activateTab(this.tabs[(index + 1)]);
        }
    }

}

// Keyboard Support ( https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/examples/tabs/tabs-1/tabs.html )
// Key          function
// ========     ========================================================
// Tab	        When focus moves into the tab list, places focus on the active tab element.
//              When the tab list contains the focus, moves focus to the next element in the tab sequence, which is the tabpanel element.
// Right Arrow	Moves focus to the next tab.
//              If focus is on the last tab, moves focus to the first tab.
//              Activates the newly focused tab.
// Left Arrow	Moves focus to the previous tab.
//              If focus is on the first tab, moves focus to the last tab.
//              Activates the newly focused tab.
// Home         Moves focus to the first tab and activates it.
// End          Moves focus to the last tab and activates it.
```

```javascript
/* tslint:disable:no-unused-variable */

// tab-accessibility.directive.spec.ts

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AlTabAccessibilityDirective } from './tab-accessibility.directive';

@Component({
    template: `<p-tabview alTabAccessibility>
	<div class="ui-tabview ui-widget ui-widget-content ui-corner-all ui-tabview-top">
		<ul p-tabviewnav="" role="tablist" class="ui-tabview-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all">
      <li role="tab" class="ui-state-default ui-corner-top ui-tabview-selected ui-state-active" aria-expanded="true" aria-selected="true">
        <a href="#">
          <span class="ui-tabview-title">Tab I</span>
        </a>
      </li>
      <li role="tab" class="ui-state-default ui-corner-top">
        <a href="#">
          <span class="ui-tabview-title">Tab II</span>
        </a>
      </li>
    </ul>

		<div class="ui-tabview-panels">
			<div class="ui-tabview-menu">
				<a class="ui-tabview-menu-link" href="javascript:void(0);">Choose an Option</a>
			</div>
			<p-tabpanel header="Tab I">
				<div class="ui-tabview-panel ui-widget-content" role="tabpanel" style="display: block;" aria-hidden="false">
					The story begins as Don Vito Corleone, the head of a New York Mafia family, overseeshis daughter's wedding. His beloved son
					ichael has just come home from the war, but does not intend to become part of his father's business. T hrough Michael's
					life the nature of the family business becomes clear. The business of the family is just like the head of the family,
					kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the
					good of the family.
				</div>
			</p-tabpanel>
			<p-tabpanel header="Tab II">
				<div class="ui-tabview-panel ui-widget-content" role="tabpanel" style="display: none;" aria-hidden="true">
					Francis Ford Coppola's legendary continuation and sequel to his landmark 1972 film, The_Godfather parallels the young Vito
					Corleone's rise with his son Michael's spiritual fall, deepening The_Godfather's depiction of the dark side of the
					American dream. In the early 1900s, the child Vito flees his Sicilian village for America after the local Mafia kills
					his family. Vito struggles to make a living, legally or illegally, for his wife and growing brood in Little Italy,
					killing the local Black Hand Fanucci after he demands his customary cut of the tyro's business. With Fanucci gone,
					Vito's communal stature grows.
				</div>
			</p-tabpanel>
		</div>
	</div>
</p-tabview>`
})
class MockTabsComponent {
}

describe('AlTabAccessibilityDirective', () => {
    let component: MockTabsComponent;
    let fixture: ComponentFixture<MockTabsComponent>;
    let inputEl: DebugElement;
    let directive: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MockTabsComponent,
                AlTabAccessibilityDirective
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });

        fixture = TestBed.createComponent(MockTabsComponent);
        component = fixture.componentInstance;
        let inputElement: DebugElement = fixture.debugElement.query(By.directive(AlTabAccessibilityDirective));
        directive = inputElement.injector.get(AlTabAccessibilityDirective);

        inputEl = fixture.debugElement.query(By.css('ul[role="tablist"]:first-child'));
        fixture.detectChanges();
    }));

    it('should call ngAfterViewInit()', () => {
        directive.ngAfterViewInit();
    });

    // Left arrow key press event
    // ========================================
    it('should call keydownEventListener() tabOrientation should be available for left arrow key', () => {
        directive.tabOrientation = 'left';
        expect(directive.tabOrientation).toBe('left');
        const event = {
            keyCode: 37,
            target: {
                parentNode: {
                    index: 0
                }
            }
        };
        directive.keydownEventListener(event);
    });

    it('should call keydownEventListener() for left arrow key', () => {
        const event = {
            keyCode: 37,
            target: {
                parentNode: {
                    index: 0
                }
            }
        };
        directive.keydownEventListener(event);
    });

    it('should call keydownEventListener() index should be equal to tabs length', () => {
        const event = {
            keyCode: 37,
            target: {
                parentNode: {
                    index: 1
                }
            }
        };
        directive.keydownEventListener(event);
    });


    // Right arrow key press event
    // ========================================
    it('should call keydownEventListener() tabOrientation should be available for right arrow key', () => {
        directive.tabOrientation = 'left';
        expect(directive.tabOrientation).toBe('left');
        const event = {
            keyCode: 39,
            target: {
                parentNode: {
                    index: 0
                }
            }
        };
        directive.keydownEventListener(event);
    });

    it('should call keydownEventListener() for right arrow key', () => {
        const event = {
            keyCode: 39,
            target: {
                parentNode: {
                    index: 0
                }
            }
        };
        directive.keydownEventListener(event);
    });

    it('should call keydownEventListener() index should be equal to tabs length', () => {
        const event = {
            keyCode: 39,
            target: {
                parentNode: {
                    index: 1
                }
            }
        };
        directive.keydownEventListener(event);
    });

});
```

## Tutorials Referances
[Angular: Unit Testing Jasmine, Karma (step by step)]
(https://medium.com/frontend-fun/angular-unit-testing-jasmine-karma-step-by-step-e3376d110ab4)

Introduction to Unit Testing in Angular
https://alligator.io/angular/introduction-unit-testing/

Testing Angular with Jasmine and Karma (Part 1)
https://scotch.io/tutorials/testing-angular-with-jasmine-and-karma-part-1

Angular: Unit Testing Jasmine, Karma (step by step)
https://medium.com/frontend-fun/angular-unit-testing-jasmine-karma-step-by-step-e3376d110ab4

https://github.com/blacksonic/angular-testing-ground/blob/master/src/app/testing-http-services/github.service.spec.ts

Testing HTTP requests in Angular has never been easier
https://blog.craftlab.hu/testing-http-requests-in-angular-has-never-been-easier-dfe53c267522

Testing with the Angular HttpClient API
https://medium.com/netscape/testing-with-the-angular-httpclient-api-648203820712

Testing HttpClient Requests in Angular
https://alligator.io/angular/testing-httpclient/
