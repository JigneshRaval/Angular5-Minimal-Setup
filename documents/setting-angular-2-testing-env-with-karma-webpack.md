# Setting up Angular 2 Testing Environment with Karma and webpack

https://medium.com/lacolaco-blog/setting-up-angular-2-testing-environment-with-karma-and-webpack-e9b833befd99

This article will explain how to create an environment for Angular 2 testing. It uses Karma, webpack and some useful stuffs. And it focuses on simplicity and ease to use. Let’s understand it step by step.
1. Create an Application (no tests)
```
> npm init -y

> npm i -S @angular/{core,common,compiler,platform-browser,platform-browser-dynamic} rxjs zone.js core-js

> npm i -D typescript webpack@~2.1.0-beta awesome-typescript-loader angular2-template-loader raw-loader node-static @types/node

> $(npm bin)/tsc --init

> touch webpack.config.js index.html

> mkdir src

> touch src/main.ts src/app.module.ts src/app.component.ts src/app.component.html
```
app.component.ts:
```
import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html'
})
export class AppComponent { }
```
app.module.ts:
```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule,
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})
export class AppModule { }
```
main.ts:
```
import 'core-js';
import 'zone.js/dist/zone';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
```
tsconfig.json:
```
{
    "compilerOptions": {
        "module": "es2015",
        "target": "es5",
        "noImplicitAny": false,
        "sourceMap": true,
        "moduleResolution": "node",
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "lib": [
            "es2015", "dom"
        ],
        "types": [
            "node"
        ]
    },
    "awesomeTypeScriptLoaderOptions": {
        "useWebpackText": true
    }
}
```

webpack.config.js:
```
module.exports = () => {
    return {
        entry: {
            main: './src/main.ts'
        },
        output: {
            path: './dist',
            filename: '[name].bundle.js'
        },
        resolve: {
            extensions: ['.js', '.ts', '.html']
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loaders: [
                        'awesome-typescript-loader',
                        'angular2-template-loader'
                    ]
                },
                {
                    test: /\.html$/,
                    loader: 'raw'
                }
            ]
        },
        devtool: 'inline-source-map'
    };
};
```

package.json (scripts only):

```javascript
"scripts": {
    "build": "webpack",
    "start": "static ."
},
```

Yay, We’ve created an awesome application quickly.

## Setting up Karma runner

To make testing environment, we have to set up Karma test runner at first. Follow the command below:

> npm i -D karma jasmine

> $(npm bin)/karma init

This is the starting point of karma.config.js

```javascript
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
    ],
    exclude: [
    ],
    preprocessors: {
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity
  })
}

// Example 2:
// ===================

// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  const basepath = process.cwd();
  console.log('Process path: ', process.cwd(), '===== Dirname: ', __dirname);
  config.set({
    basePath: basepath,
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-ie-launcher'),
      require('karma-safari-launcher'),
      require('karma-phantomjs-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    files: [
      { pattern: 'src/test.ts', watched: false },
      { pattern: 'src/al-assets/js/*.json', watched: true, served: true, included: false },
      "src/al-assets/js/jquery.min.js",
      "src/al-assets/js/highlight.pack.js",
      "src/al-assets/js/amcharts.js",
      "src/al-assets/js/pie.js",
      "src/al-assets/js/serial.js"
    ],
    client: {
      codeCoverage: config.angularCli.codeCoverage,
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    captureTimeout: 210000,
    browserDisconnectTolerance: 15,
    browserDisconnectTimeout: 210000,
    browserNoActivityTimeout: 210000,
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS', 'Chrome', 'Firefox', 'Safari', 'IE'],
    singleRun: false
  });
};

```

Add test file

First step, let’s make a test file and add it into karma runner. Create test/main.js as following:
```
describe('Meaningful Test', () => {
    it('1 + 1 => 2', () => {
        expect(1 + 1).toBe(2);
    });
});
```
And update files property in karma configuration:
```
files: [
  { pattern: 'test/main.js' }
],
```
At last, add “test” npm-script in package.json:
```
"scripts": {
    "build": "webpack",
    "start": "static .",
    "test": "karma start"
},
```

Let’s execute “npm test” command.

Okey! Setting up karma runner is done! Let’s go to next step.
Use modules and karma-webpack

Now, our test is only one file. So after now, all tests have to be written in test/main.js or add new file into karma configuration every times… Really?

No! Don’t worry, guys. We can separate tests as modules and bundle it to the single test file. No updates on karma configuration by per test.

Let’s get it started. Install karma-webpack and karma-sourcemap-loader at first:

> npm i -D karma-webpack karma-sourcemap-loader

And then, update our karma.config.js. Look at preprocessors and webpack property. webpack preprocessor executes webpack bundling using test/main.js as an entry point. And webpack property is an configuration for the bundling.
```
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      { pattern: 'test/main.js', watched: false }
    ],
    exclude: [
    ],
    preprocessors: {
      'test/main.js': ['webpack']
    },
    webpack: require('./webpack.config')({env: 'test'}),
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity
  })
}
```
Execute “npm test” again and see logs.
```
> karma start

webpack: wait until bundle finished:
Hash: 1130517a944241558f1f
Version: webpack 2.1.0-beta.25
Time: 3069ms

Asset     Size  Chunks             Chunk Names
main  2.19 MB       0  [emitted]  main
test/main.js  6.55 kB       1  [emitted]  test/main.js
chunk    {0} main (main) 1.77 MB [entry] [rendered]
[0] ./~/core-js/modules/_export.js 1.6 kB {0} [built]
[1] ./~/@angular/core/index.js 355 bytes {0} [built]
...
```
webpack runs! karma-webpack is a very easy way to integrate Karma and webpack. So now, let’s make the second test in test/sub.js:
```
describe('sub test', () => {
    it('always fails', () => {
        expect(0).toBe(1);
    });
});
```
And import that in test/main.js:
```
describe('Meaningful Test', () => {
    it('1 + 1 => 2', () => {
        expect(1 + 1).toBe(2);
    });
});

import './sub';
```

test/sub.js contains the test fails always. In this state, try to run test once.
```
Chrome 54.0.2840 (Mac OS X 10.11.6) sub test always fails FAILED

Expected 0 to be 1.

at Object.it (test/main.js:74:19)

Chrome 54.0.2840 (Mac OS X 10.11.6): Executed 2 of 2 (1 FAILED) (0.045 secs / 0.014 secs)
```

As you can see, the test failed. It’s expected totally. But there is an important thing. Can you notice a weird information in that error logs?

Yes, it’s a stack trace. Despite we wrote failing test at test/sub.js, that error is logged as `at Object.it (test/main.js:74:19)`. It’s because of webpack bundling. That stack trace, `(test/main.js:74:19)`, points at the line of the bundled file. It needs sourcemap information to show stack traces as we expect.

Install karma-sourcemap-loader, which is a preprocessor for loading sourcemap into karma.

> npm i -D karma-sourcemap-loader

Next, update karma.config.js to add “sourcemap” into preprocessors.

```javascript
// karma.config.js

preprocessors: {
    'test/main.js': ['webpack', 'sourcemap']
},
```

```javascript
It’s ready! Let’s fail our test again and see error logs.

Chrome 54.0.2840 (Mac OS X 10.11.6) sub test always fails FAILED

Expected 0 to be 1.

at Object.it (webpack:///test/sub.js:3:0 <- test/main.js:74:19)

Chrome 54.0.2840 (Mac OS X 10.11.6): Executed 2 of 2 (1 FAILED) (0.03 secs / 0.007 secs)
```

Woohoo! That’s a perfect stack trace. We’ve got an environment to execute karma tests with webpack. But this is a starting point. Next step is setting up Angular testing.
Setting up Angular Testing

Currently we have the entry point for testing bundle but it’s a JavaScript file. Let’s create src/main.spec.ts and update test/main.js to import it. (no longer use test/sub.js).

src/main.spec.ts:

```javascript
// src/main.spec.ts:

describe('main test', () => {
    it('always fails', () => {
        expect(0).toBe(1);
    });
});
```

test/main.js:

`require('../src/main.spec.ts');`

And install type definitions of Jasmine and add it into “types” property of tsconfig.json.

> npm i -D @types/jasmine

tsconfig.json:
```javascript
// tsconfig.json

{
    "compilerOptions": {
        "module": "es2015",
        "target": "es5",
        "noImplicitAny": false,
        "sourceMap": true,
        "moduleResolution": "node",
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "lib": [
            "es2015", "dom"
        ],
        "types": [
            "node",
            "jasmine"
        ]
    },
    "awesomeTypeScriptLoaderOptions": {
        "useWebpackText": true
    }
}
```

Run tests. As below, sourcemap is working well even if tests are written in TypeScript.

```javascript
Chrome 54.0.2840 (Mac OS X 10.11.6) main test always fails FAILED

Expected 0 to be 1.

at Object.<anonymous> (webpack:///src/main.spec.ts:3:18 <- test/main.js:74:19)

Chrome 54.0.2840 (Mac OS X 10.11.6): Executed 1 of 1 (1 FAILED) ERROR (0.034 secs / 0.006 secs)
```
Initializing Angular TestBed

Angular testing uses TestBed. We have to initialize it at the first of the test runner. In addition, importing polyfills and zone.js is needed:

Update src/main.spec.ts as following:

```javascript
// src/main.spec.ts

// Example 1:
// ========================
import 'core-js'; // ES6 + reflect-metadata
// zone.js
import 'zone.js/dist/zone';
import 'zone.js/dist/proxy';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/async-test';
import 'zone.js/dist/jasmine-patch';

// TestBed initialization
import { TestBed } from '@angular/core/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

// Example 2:
// ========================

// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
declare const __karma__: any;
declare const require: any;

// Prevent Karma from running prematurely.
__karma__.loaded = function () { };

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
let context;
if (__karma__.config.codeCoverage) {
  context = require.context('./app', true, /\.ts$/);
} else {
  context = require.context('./app', true, /\.spec\.ts$/);
}
// And load the modules.
context.keys().map(context);
// Finally, start Karma to run the tests.
__karma__.start();
```

All preparing was completely ended! At the beginning, let’s make a pipe and its spec.

src/echo.pipe.ts

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'echo'
})
export class EchoPipe implements PipeTransform {
    transform(value: any): any {
        return value;
    }
}
```

src/echo.pipe.spec.ts

```typescript
import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { EchoPipe } from './echo.pipe';

@Component({
    selector: 'test',
    template: `
    <p>{{ text | echo }}</p>
    `
})
class TestComponent {
    text: string;
}

describe('EchoPipe', () => {

beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, EchoPipe]
        });
    });

beforeEach(async(() => {
        TestBed.compileComponents();
    }));

it('works well', async(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.componentInstance.text = 'foo';
        fixture.detectChanges();
        const el = fixture.debugElement.nativeElement as HTMLElement;
        expect(el.querySelector('p').textContent).toBe('foo');
    }));
});
```

At last, load that spec from src/main.spec.ts. require.context is very useful utility of webpack that can load all modules in directory recursively.

```typescript
// TestBed initialization
// ...

// load all specs in ./src
const context = (require as any).context('./', true, /\.spec\.ts$/);
context.keys().map(context)
```

More things

Official documentation for testing is a very good article. You can trying it with the testing environment which we’ve created here.
Conclusion

    karma-webpack and sourcemap are awesome.
    Create a testing entry point and initialize TestBed
    Write tests!

Source code in this article is at GitHub

## Testing Parent <-> Child

```typescript
// REF : https://angular.io/guide/component-interaction

it('timer and parent seconds should match', function () {
  let parent = element(by.tagName(parentTag));
  let message = parent.element(by.tagName('app-countdown-timer')).getText();
  browser.sleep(10); // give `seconds` a chance to catchup with `message`
  let seconds = parent.element(by.className('seconds')).getText();
  expect(message).toContain(seconds);
});

it('should stop the countdown', function () {
  let parent = element(by.tagName(parentTag));
  let stopButton = parent.all(by.tagName('button')).get(1);

  stopButton.click().then(function() {
    let message = parent.element(by.tagName('app-countdown-timer')).getText();
    expect(message).toContain('Holding');
  });
});
```

```typescript
// REF : https://appdividend.com/2018/03/26/angular-unit-testing-example-tutorial/
// dash.component.spec.ts

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

// dash.component.spec.ts

let component: DashComponent;
let fixture: ComponentFixture<DashComponent>;
let de: DebugElement;

it('should have a h1 tag of `dash works!`', () => {
    expect(de.query(By.css('p')).nativeElement.innerText).toBe('dash works!');
    expect(de.query(By.css('p')).nativeElement.innerContent).toBe('dash works!');
});
```

## Covering Try {} Catch (error) block

```typescript
// Example 1
public login(username: string, password: string): void{
    this.authService.login(username, password) //this return Observable in real world
            .catch(() => {
                this.formErrors['general.error'] = true;
                return Observable.throw('error! :<');
            })
            .subscribe(() => {
                this.router.navigate(['/someRoute']);
            });
}

it('', () => {
    authService.login.and.returnValue(Observable.throw('')); //authService is my mock

    expect(component.login.bind(component, 'u', 'p')).toThrow(...);
    expect(component.formErrors['general.error']).toBeTruthy();
});

// Example 2
// ========================
functionToCover(value) {
    if (value) {
        try {
            if (console) {
                console.log('json ', JSON.parse(value));
                console.log('Requested key returns value : ', value);
            }

        } catch (error) {
            throw new Error('Error in getting requested key.');
            /* if (console) {
                console.log('Requested key returns value : ', value);
            } */
        }
    } else {
        if (console) {
            console.log('Requested key not found');
        }
    }
}

it('should call "functionToCover()" with error:', () => {
    sessionStorage.setItem('lr_json_data', '');
    expect(function () {
        fixture.componentInstance.functionToCover('any string');
    }).toThrow();
    fixture.detectChanges();
});


ngOnInit() {
    // Get method
    this.myService.request('get', {
        restOfUrl: '',
        endPoint: 'https://jsonplaceholder.typicode.com/posts',
        isSecure: true,
        contentType: 'application/json',
        customHeader: [{ 'key': 'as', 'value': 'asdf' }]
    }).subscribe(data => {
        // return data;
    }, error => {
        // throw new Error('Error in getting requested data from https://jsonplaceholder.typicode.com/posts.');
        // throw error;
        if (console) {
            console.error('Something is wrong in get. : ', error);
        }
    });
}

// NOTE : If you are passing error from test case then use console in your code (*.ts) file
// Else use throw new Error.
// REF : https://stackoverflow.com/questions/39960146/testing-error-case-with-observables-in-services

/*
const xService = fixture.debugElement.injector.get(SomeService);
const mockCall = spyOn(xService, 'method').and.returnValue(Observable.throw({status: 404}));
*/

it('should call "ngOnInit()" function:', () => {
    const spy = spyOn(myService, 'request').and.returnValue(Observable.throw('Error in getting requested data from https://jsonplaceholder.typicode.com/posts.'));

    fixture.componentInstance.ngOnInit();
    fixture.detectChanges();
});

// OUTPUT
// ==================
context.js:243 Something is wrong in get. :  Error in getting requested data from https://jsonplaceholder.typicode.com/posts.
```

```typescript
// Dialog with ViewChild
it('should call "openDialog()" function', () => {
    // @ViewChild('dynamicDialog') dynamicDialog;
    // @ViewChild('footnoteContainer') footnoteContainer;
    // <my-dialog #footnoteContainer></my-dialog>
    const footnoteContainer: dialogComponent = fixture.componentInstance.footnoteContainer; //

    spyOn(footnoteContainer, 'showDialog').and.returnValue(true);

    const linkElem = document.createElement('a');
    document.body.appendChild(linkElem);
    linkElem.addEventListener('click', (event) => {
        component.openDialog(event,
            'Dialog 2', `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit.`);
    });
    linkElem.click();
    fixture.detectChanges();
});
```

```typescript
// Create a jasmine spy to spy on the addPaste method
spyOnAdd = spyOn(errorService, "getErrorMessages").and.returnValue(Promise.resolve(mockErrorMessages));
component.errorMessages = spyOnAdd;
```

Chrome 70.0.3538 (Windows 7.0.0) ERROR : Some of your tests did a full page reload!
Solution: Add following to your test case
```typescript
beforeAll(() => {
    window.onbeforeunload = () => 'Oh no!';
});
```

## Unit Testing of : Service and Router

```typescript
// home.component.ts
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DynamicComponentService } from '../services/dynamic-component.service';

@Component({
  selector: 'home-page',
  templateUrl: '<h1>Demo Component</h1>',
  providers: [DynamicComponentService]
})
export class HomeComponent implements OnInit, AfterViewInit {

    constructor(
        private dynamicComponentService: DynamicComponentService
    ) { }

    ngOnInit() {
        // code on ngOnInit
    }

    ngAfterViewInit(): void {
        this.dynamicComponentService.dynamicComponents('My Data');
    }

}
```

```typescript
// home.component.spec.ts
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Injectable } from '@angular/core';

import { HttpModule, Http } from '@angular/http';
import { APP_BASE_HREF, Location, CommonModule } from '@angular/common';

import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute, Routes } from '@angular/router';

import { HomeComponent } from './components/home.component';
import { RemoteService } from './service/remote.service';
import { DynamicComponentService } from '../services/dynamic-component.service';

import { Observable } from 'rxjs/Observable';

// Create mock or stub ( fake ) service and pass it in providers section in beforeEach block below
// Remote service is sending call to server API and return data but we are returning fake data as observable
@Injectable()
class RemoteServiceStub {
    request(requestType: string, urlOptions: IUrlOptions, body?: any, key?: string) {
        // tslint:disable-next-line:quotemark
        let testData = [{ "data": { "name": "Hiren" } }];

        testData['_body'] = JSON.stringify(testData);
        return Observable.of(testData);
    }
    clearAll_IDBStores() {
    }
}

// Below service is calling above given service internally so we have created fake for that also
@Injectable()
class DynamicComponentServiceStub {

    constructor(public remoteService: RemoteService) { }

    getAssetGroupFromSevice(agName: string, addDataToStore: boolean) {
        // tslint:disable-next-line:quotemark
        let testData = [{ "data": { "name": "Hiren", "title": "UI" } }];
        return Observable.of(testData);
    }

    // Add other methods if required
    getGroupNameFromRoute() {
        return 'name';
    }

    dynamicComponents(templateContent) {
        this.getAssetGroupFromSevice(agName, true);
    }
}

describe('Component: HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    // For service testing
    let dynamicComponentService: DynamicComponentService;
    let remoteService: RemoteService;

    // for Router testing
    /**
     * 1. Create fake or mock router object and create some methods shown below
     * 2. pass appRoutes object in "RouterTestingModule.withRoutes(appRoutes)"
     */
    let location: Location;
    const mockRouter = {
        url: 'https://localhost:4200/home',
        navigate: jasmine.createSpy('navigate'),
        navigateByUrl: jasmine.createSpy('navigateByUrl'),
    };

    const fakeActivatedRoute = {
        snapshot: { data: {} }
    };
    const appRoutes: Routes = [
        { path: 'web/:orgName/home', component: HomeComponent, pathMatch: 'full',  },
        { path: 'web/:orgName/login', component: LoginComponent, pathMatch: 'full' },
    ];

    beforeEach(async(() => {
        const httpService = jasmine.createSpyObj('Http', ['get']);

        TestBed.configureTestingModule({
            declarations: [
                ExampleComponent,
                LogOffComponent,
                LoginComponent,
                FinancialWellBeing
            ],
            imports: [
                BrowserModule,
                CommonModule,
                RouterTestingModule.withRoutes(appRoutes),
                RouterTestingModule,
                HttpModule
            ],
            providers: [
                // Require for service call testing
                { provide: DynamicComponentService, useClass: DynamicComponentServiceStub },
                { provide: RemoteService, useClass: RemoteServiceStub },
                { provide: Http, usevalue: httpService },

                // Required for Route testing
                {
                    provide: APP_BASE_HREF, useValue: '/'
                },
                { provide: ActivatedRoute, useValue: fakeActivatedRoute },
                { provide: Router, useValue: mockRouter },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        });

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(HomeComponent);
            component = fixture.debugElement.componentInstance;

            // For service testing
            fallbackStorageInstance = TestBed.get(DomStorageFallbackService);
            dynamicComponentService = TestBed.get(DynamicComponentService);

            // For router testing
            location = TestBed.get(Location);
            remoteService = TestBed.get(RemoteService);

            spyOn(dynamicComponentService, 'dynamicComponents');
        });
    }));

    beforeEach(() => {
        sessionStorage.setItem('MyData', 'value');
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate', () => {
        mockRouter.navigate(['/home']);
        fixture.detectChanges();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
    });

    it('should call service success', fakeAsync(() => {
        fixture.detectChanges();
        spyOn(remoteService, 'request').and.callThrough();
        spyOn(dynamicComponentService, 'getAssetGroupFromSevice').and.callThrough();
        // spyOn(dynamicComponentService, 'getAssetGroupFromSevice').and.returnValue(Observable.of(testData));
        component.ngAfterViewInit();
        fixture.detectChanges();
    }));

    // To cover error block of service. Ex.
    /*
    mySerice.request('get', {}).subscribe((data) => {}, (error) => {})
    OR
    myService.
    */
    it('should call service error', fakeAsync(() => {
        fixture.detectChanges();
        spyOn(remoteService, 'request').and.returnValue(Observable.throw({ status: 404 }));
        component.ngAfterViewInit();
        fixture.detectChanges();
    }));

});

// EXAMPLE 2
// ==================

const createMockRoute = (id: string) => {
    return {
        queryParams: { href: id }
    } as any;
};
const createMockRouteState = () => null;

beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            AuthGuard,
            { provide: Router, useValue: mockRouter }
        ],
        declarations: [RoutingComponent],
        imports: [RouterTestingModule.withRoutes(appRoutes), HttpModule]

    }); // compile template and css

    guard = TestBed.get(AuthGuard);
});

it('should be created', inject([LocalStorageService], (localStorageService: LocalStorageService) => {
    expect(localStorageService).toBeTruthy();
    localStorageService.setItem('AF_SWITCH_ON', true);
    expect(localStorageService.getItem).toBeTruthy();
    const route = createMockRoute('');
    const state = createMockRouteState();
    guard.canActivate(route, state);
    localStorageService.setItem('LSS', 'true');
    guard.canActivate(route, state);
}));
```

```typescript
// Example service
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class CountryService {

    constructor(private http: Http) { }

    getCountries() {
        return this.http.get('assets/js/country.json')
            .toPromise()
            .then(res => res.json().data)
            .then(data => data);
    }
}

// Test case
describe('Component using above service', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                HttpModule
            ],
            declarations: [
                MyComponent,
            ],
            providers: [
                CountryService
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(StyleGuideAutocomplete);
        debugElement = fixture.debugElement;
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();

        component.filteredBrands = [];
        foo = {
            setBar: function (value) {
                component.filteredBrands.push(value);
            }
        };

        spyOn(foo, 'setBar');

        foo.setBar('Audi');
        countryService = TestBed.get(CountryService);

        fixture.detectChanges();
    });

});
```

```typescript
// EXAMPLE 2 : Service Testing
// Component
// =================

import { Component, OnInit } from '@angular/core';
import { RemoteService } from './service/remote.service';

@Component({
    selector: 'sample-component',
    template: `
    <article class="" id="">
        <h1>Example Component</h1>
    </article>
  `
})
export class StorageTestingComponent implements OnInit {

    constructor(public myService: RemoteService) {}

    // return function for storage check
    returnKeyCheckFun(value) {
        if (value) {
            try {
                if (console) {
                    console.log('json ', JSON.parse(value));
                }

            } catch (error) {
                throw new Error('Error in getting requested key.');
            }
        } else {
            if (console) {
                console.log('Requested key not found');
            }
        }
    }

    ngOnInit() {
        // Get method
        this.myService.request('get', {
            restOfUrl: '',
            endPoint: 'https://jsonplaceholder.typicode.com/posts',
            isSecure: true,
            contentType: 'application/json',
            customHeader: [{ 'key': 'as', 'value': 'asdf' }]
        }).subscribe(data => {
            // return data;
        }, error => {
            // throw new Error('Error in getting requested data from https://jsonplaceholder.typicode.com/posts.');
            if (console) {
                console.error('Something is wrong in get. : ', error);
            }
        });
    }
}


// Test Cases
// ======================

it('should call "returnKeyCheckFun()" with error:', () => {
    sessionStorage.setItem('lr_json_data', '');
    // Cover error block in Try and Catch
    expect(function () {
        fixture.componentInstance.returnKeyCheckFun('any string');
    }).toThrow();
    fixture.detectChanges();
});

it('cover Error block in service subscribe method', () => {
    spyOn(myService, 'request').and.returnValue(Observable.throw('Error in getting requested data from https://jsonplaceholder.typicode.com/posts.'));

    fixture.componentInstance.ngOnInit();
    fixture.detectChanges();
});
```

## Spying LocalStorage and sessionStorage using `spyOn`

```typescript
let store, mockLocalStorage;

beforeEach(() => {
store = {};
mockLocalStorage = {
    getItem: (key: string): string => {
        return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
        store[key] = `${value}`;
    },
    removeItem: (key: string) => {
        delete store[key];
    },
    clear: () => {
        store = {};
    }
};
spyOn(localStorage, 'getItem')
    .and.callFake(mockLocalStorage.getItem);
spyOn(localStorage, 'setItem')
    .and.callFake(mockLocalStorage.setItem);
spyOn(localStorage, 'removeItem')
    .and.callFake(mockLocalStorage.removeItem);
spyOn(localStorage, 'clear')
    .and.callFake(mockLocalStorage.clear);
});

it(('check localstorage has item'), ()=>{
    localStorage.setItem('isIndexNavOpened', 'false');
    expect(localStorage.getItem('isIndexNavOpened')).toBe('false');
})
```

## Testing routing
(test)[https://codecraft.tv/courses/angular/unit-testing/routing/]

```typescript

describe('Router: App', () => {

    let location: Location;
    let router: Router;
    let fixture;
    export const routes: Routes = [
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: 'home', component: HomeComponent},
        {path: 'search', component: SearchComponent}
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routes)],
            declarations: [
            HomeComponent,
            SearchComponent,
            AppComponent
            ]
        });

        router = TestBed.get(Router);
        location = TestBed.get(Location);

        fixture = TestBed.createComponent(AppComponent);
        router.initialNavigation();
    });

    it('fakeAsync works', fakeAsync(() => {
        let promise = new Promise((resolve) => {
            setTimeout(resolve, 10)
        });
        let done = false;
        promise.then(() => done = true);
        tick(50);
        expect(done).toBeTruthy();
    }));

    it('navigate to "" redirects you to /home', fakeAsync(() => {
        router.navigate(['']);
        tick();
        expect(location.path()).toBe('/home');
    }));

    it('navigate to "search" takes you to /search', fakeAsync(() => {
        router.navigate(['search']);
        tick();
        expect(location.path()).toBe('/search');
    }));

});

```

## `beforeEach` with Async

(Testing Routes in Angular 2)[https://semaphoreci.com/community/tutorials/testing-routes-in-angular-2]

```typescript
import {
    async,              // ADDED LINE
    inject,             // ADDED LINE
    TestBed
} from '@angular/core/testing';
import { Router } from '@angular/router';   // ADDED LINE

import { FormListComponent } from './form-list.component';

// ADDED CLASS
class MockRouter {
    navigateByUrl(url: string) { return url; }
}

describe('Component: FormListComponent', () => {
    let component: FormListComponent;

    // updated beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormListComponent],
            providers: [
                { provide: Router, useClass: MockRouter }
            ]
        })
        // the below was added
        .compileComponents().then(() => {
            const fixture = TestBed.createComponent(FormListComponent);

            component = fixture.componentInstance;
        });
    }));

    /* In this test, we spy on the navigateByUrl method of the MockRouter instance so that when it is called, we can see what it was called with. Next, we call the new displayForm method with an arbitrary ID. Finally we grab the URL from the spy we created and verify that is the expected URL we wanted. */
    describe('#displayForm', () => {
        it('should call Router.navigateByUrl("forms/:id") with the ID of the form', inject([Router], (router: Router) => {
            const spy = spyOn(router, 'navigateByUrl');

            component.displayForm(23);

            const url = spy.calls.first().args[0];

            expect(url).toBe('/form/23');
        }));
    });

});
```

We've leveraged Angular's testing framework to substitute the regular `Router` class with our `MockRouter`. The regular Router has many more methods and features, but our mock router just needs stubs for the methods we care about — in this case that just means navigateByUrl. This allows us to avoid loading the real Router and all its setup for our tests.

Note that we're utilizing the async test method here. This allows us to create our components for testing, which is an asynchronous operation, in a way that executes our tests only after the asynchronous operations have completed.

```typescript
// services/form.service.ts:

import { Injectable } from '@angular/core';
import { FormData } from '../models';

import { BehaviorSubject } from 'rxjs/Rx';      // ADDED LINE

@Injectable()
export class FormService {
    forms = new BehaviorSubject<Array<FormData>>([]);   // CHANGED TO SUBJECT

    setForms(newForms: Array<FormData>) {
        this.forms.next(newForms);                      // CHANGED TO SUBJECT
    }

    getForm(formId: number): FormData {
        // CHANGED TO SUBJECT
        let form = this.forms.value.find((form) => form.id === formId);

        if (!form) {
            form = null;
        }

        return form;
    }
}

// in Component using service
// imports

@Component({
    // component config
})
export class FormListComponent {
    forms: Array<FormData> = [];

    constructor(private formService: FormService, private router: Router) {
        this.formService.forms
            .subscribe((forms) => this.forms = forms);
    }

    // displayForm method
}

// TEST
// imports + MockRouter

// ADDED
class MockFormService {
    forms = {
        subscribe: () => {}
    }
}

describe('Component: FormListComponent', () => {
    let component: FormListComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormListComponent],
            providers: [
                { provide: Router, useClass: MockRouter },
                // ADDED LINE
                { provide: FormService, useClass: MockFormService }
            ]
        })
        // compileComponents
    }));

    // tests
});
```

## using `Object.keys`

```javascript
it('should create a `FormControl` for each question', () => {
    component.questions = [
        {
            controlType: 'text',
            id: 'first',
            label: 'My First',
            required: false
        },
        {
            controlType: 'text',
            id: 'second',
            label: 'Second!',
            required: true
        }
    ];
    component.ngOnInit();

    expect(Object.keys(component.formGroup.controls)).toEqual([
        'first', 'second'
    ]);
});
```

## Mock ActivatedRoute

```javascript
// activated-route-mock.ts
import { BehaviorSubject } from 'rxjs/Rx';

export class MockActivatedRoute {
    private paramsSubject = new BehaviorSubject(this.testParams);
    private _testParams: {};

    params  = this.paramsSubject.asObservable();

    get testParams() {
        return this._testParams;
    }
    set testParams(newParams: any) {
        this._testParams = newParams;
        this.paramsSubject.next(newParams);
    }
}

// form-viewer.component.spec.ts

describe('Component: FormViewerComponent', () => {
    // MOVED COMPONENT CREATION TO FUNCTION
    const createComponent = () => {
        const fixture = TestBed.createComponent(FormViewerComponent);

        component = fixture.componentInstance;
        fixture.detectChanges();
    };
    // previous setup

    beforeEach(async(() => {
        // test module configuring
        TestBed.configureTestingModule({
            declarations: [FormViewerComponent],
            imports: [],
            providers: [
                { provider: ActivatedRoute, useValue: activeRoute },
                // ADDED FormService
                FormService
            ]
        });
    }));

    it('should have a defined component', () => {
        createComponent();
        expect(component).toBeDefined();
    });

    // ADDED TEST
    it('should call `FormService.getForm` when the route ID changes', inject([FormService], (formService: FormService) => {
        spyOn(formService, 'getForm');
        activeRoute.testParams = { id: 1234 };
        createComponent();
        formService.forms.next([]);

        expect(formService.getForm).toHaveBeenCalledWith(1234);
    }));
});

// form-viewer.component.ts
import {
    Component,
    OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormService } from '../../services/form.service';
import { FormData } from '../../models';

@Component({
    selector: 'form-viewer',
    template: require('./form-viewer.component.html'),
    styles: []
})
export class FormViewerComponent implements OnInit {
    private get _blankForm(): FormData {
        return {
            id: null,
            questions: [],
            title: ''
        };
    }

    form: FormData = this._blankForm;

    constructor(private formService: FormService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.formService.forms.subscribe(() => {
            this.route.params.map((param) => parseInt(param['id']))
                .forEach((id: number) => this.selectForm(id));
        });
    }

    private selectForm(id: number) {
        const selectedForm = this.formService.getForm(id);

        if (selectedForm) {
            this.form = selectedForm;
        } else {
            this.form = this._blankForm;
        }
    }
}
```

## Form testing

```javascript
// Example 1
// =================
it('should return true if the form control is valid', () => {
    const formControl = new FormControl('test');

    component.control = formControl;
    expect(component.isValid).toBe(true);
});

// Example 2
// =================
it('should set the `payload` to a stringified version of our form values', () => {
    component.questions = [
        {
            controlType: 'text',
            id: 'first',
            label: 'My First',
            required: false
        },
        {
            controlType: 'text',
            id: 'second',
            label: 'Second!',
            required: true
        }
    ];
    component.ngOnInit();

    component.formGroup.controls['first'].setValue('pizza');
    component.submit();

    expect(component.payload).toEqual(JSON.stringify({first: 'pizza', second: ''}));
});
```

## cover Error part

```
describe('toThrow', function() {
    it('checks that the expected exception was thrown by the actual', function() {
        var object = {
            doSomething: function() {
                throw new Error("Unexpected error!")
            }
        };
        expect(object.doSomething).toThrow(new Error("Unexpected error!"));
    });
});

OR

throw new TypeError('some message');
```