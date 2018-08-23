## Angular Tips & Tricks
------------

## `ngOnDestroy` Alternatives, Using `@HostHostListener`

On refresh or when you navigate away from the current page, then ngOnDestroy won't be called. The application will just be destroyed by the browser.

Only when Angular2 removes the component from the DOM because you move away or you call destroy() on a dynamically created component, then ngOnDestroy() is called.

You can listen to beforeunload and unload yourself if you need some action to happen before the application is destroyed by the browser.

See also

https://developer.mozilla.org/en-US/docs/Web/Events/unload
How can we detect when user closes browser? (Angular)

```
@HostListener('window:unload', ['$event'])
unloadHandler(event) {
    console.log('window:unload Fired...');
}

@HostListener('window:beforeunload', ['$event'])
beforeUnloadHander(event) {
    console.log('window:beforeunload Fired...');
}
```
https://stackoverflow.com/questions/45898948/angular-4-ngondestroy-in-service-destroy-observable/45898988

```
// EXAMPLE
// ==========================
@Injectable()
class Service implements OnDestroy {
  ngOnDestroy() {
    console.log('Service destroy')
  }
}

@Component({
  selector: 'foo',
  template: `foo`,
  providers: [Service]
})
export class Foo {
  constructor(service: Service) {}

  ngOnDestroy() {
    console.log('foo destroy')
  }
}

@Component({
  selector: 'my-app',
  template: `<foo *ngIf="isFoo"></foo>`,
})
export class App {
  isFoo = true;

  constructor() {
    setTimeout(() => {
        this.isFoo = false;
    }, 1000)
  }
}
```

## RxJS Imports

```
// Import all

import Rx from "rxjs/Rx";

Rx.Observable
  .interval(200)
  .take(9)
  .map(x => x + "!!!")
  .bufferCount(2)
  .subscribe(::console.log);

// Add operators (my favourite)

import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/interval";
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";
import "rxjs/add/operator/bufferCount"

Observable
  .interval(200)
  .take(9)
  .map(x => x + "!!!")
  .bufferCount(2)
  .subscribe(::console.log);
```
```
// JavaScript ES7 Function Bind Syntax

import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/interval";
import {take} from "rxjs/operator/take";
import {map} from "rxjs/operator/map";
import {bufferCount} from "rxjs/operator/bufferCount"

Observable
  .interval(200)
  ::take(9)
  ::map(x => x + "!!!")
  ::bufferCount(2)
  .subscribe(::console.log);
```

## Memory Leaks in Angular
https://stackoverflow.com/questions/39011677/memory-leaks-in-angular2

In the browser, Angular is just JavaScript, so the typical caveats apply.

One thing that Angular specifically warns against though is Observables. Once you subscribe to one, it will keep working until you unsubscribe, even if you navigate to another view. Angular unusbscribes for you where possible (eg if you use the async pipe in the template:

```
// model

// listenToServer returns an observable that keeps emitting updates
serverMsgs = httpService.listenToServer();

// template

<div>{{serverMsgs | async}}</div>
```
Angular will show server messages in the div, but end the subscription when you navigate away.

However, if you subscribe yourself, you have to also unsubscribe:
```
// model

msgs$ = httpService.listenToServer().subscribe(
    msg => {this.serverMsgs.push(msg); console.log(msg)}
);

// template

<div *ngFor="let msg of serverMsgs">{{msg}}</div>
```

When you navigate away, even though you cannot see new messages appear in the view, you will see them printed to the console as they arrive. To unsubscribe when the component is disposed of, you would do:

`ngOnDestroy(){ this.msgs$.unsubscribe(); }`

**From the docs:**
we must unsubscribe before Angular destroys the component. Failure to do so could create a memory leak.

---------------------------- TUTORIALS -------------------------

https://www.dwmkerr.com/fixing-memory-leaks-in-angularjs-applications/
https://auth0.com/blog/four-types-of-leaks-in-your-javascript-code-and-how-to-get-rid-of-them/

---------------------------------------------------
https://github.com/primefaces/primeng/blob/61b8aaa82bbe875b881da9c926c95f2a4ac30bbd/src/app/showcase/components/terminal/terminaldemo.ts

```
import {Component,OnDestroy} from '@angular/core';
import {TerminalService} from '../../../components/terminal/terminalservice';
import {Subscription}   from 'rxjs/Subscription';

@Component({
    templateUrl: './terminaldemo.html',
    providers: [TerminalService]
})
export class TerminalDemo implements OnDestroy {

    subscription: Subscription;

    constructor(private terminalService: TerminalService) {
        this.subscription = this.terminalService.commandHandler.subscribe(command => {
            let response = (command === 'date') ? new Date().toDateString() : 'Unknown command: ' + command;
            this.terminalService.sendResponse(response);
        });
    }

    ngOnDestroy() {
        if(this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
```
```
declare global {
    interface Window { MyNamespace: any; }
}

window.MyNamespace = window.MyNamespace || {};
```
--------------------------------- Index.html
```
function destroyApp() {
    console.log('destroyApp :', window.debugStuff.app);
    window.debugStuff.app.destroy();
    window.debugStuff.platform.destroy();
    delete window.debugStuff;

    logInfo();
}

function logInfo() {
    console.log('getAllAngularRootElements', getAllAngularRootElements());
    console.log('getAngularTestability', getAngularTestability(getAllAngularRootElements()[0]));
}

window.addEventListener("beforeunload", destroyApp);
```
// Main.ts -------------------------
```
declare global {
  interface Window { debugStuff: any; }
}
```

```
function _window() {
  return window;
}
```

```
platformBrowserDynamic().bootstrapModule(AppModule).then((ref) => {
  console.log("storing stuff for destroying later");
  window.debugStuff =  {
    app: ref,
    platform: platformBrowserDynamic()
  }

});
```

```
export default {
  resolve: {
    alias: {
      'angular': path.resolve(path.join(__dirname, 'node_modules', 'angular'))
     },
     //...
  },
  // ...
}
```

```
var $timer = $('#timer'),
    count = 0;

//set the interval
var interval = setInterval(function() {
    $timer.html(count++);
}, 1000);
console.log('the interval is: '+interval);

//clear it
$('button').bind('click', function(e) {
    var found;
    for(i=0; i<10000; i++)
    {
        window.clearInterval(i);
    }
});
```

```
// EXAMPLE 1
// ===================================
platformBrowserDynamic().bootstrapModule(AppModule, {ngZone: 'noop'}).then(ref => {
  // Ensure Angular destroys itself on hot reloads.
  if (window['ngRef']) {
    window['ngRef'].destroy();
  }
  window['ngRef'] = ref;

  // Otherise, log the boot error
}).catch(err => console.error(err));

// EXAMPLE 2
// ===================================

//platformBrowserDynamic().bootstrapModule(AppModule);
const moduleRef = platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  console.log('Bootstraping Styleguide..', ref);
  // Ensure Angular destroys itself on hot reloads.
  if (window['ngRef']) {
    window['ngRef'].destroy();
    window['ngRef'] = null;
  }
  window['ngRef'] = ref;

  // Otherise, log the boot error
}).catch(err => console.error(err));

console.log('moduleRef :',moduleRef)
```

### ChangeDetectionStrategy

`changeDetection: ChangeDetectionStrategy.OnPush`

## Using Angular trackBy
```
<ul>
  <li *ngFor="let song of songs; trackBy: trackSongByFn">{{song.name}}</li>
</ul>

trackByFn(index, song) {
    return index; // or song.id
}
```

## Import .json files in Angular
```
// typings.d.ts:
// ============================
declare module "*.json" {
  const value: any;
  export default value;
}
declare module "json!*" {
  const value: any;
  export default value;
}

// Then in normal .ts file:
// ============================
import * as manifestData from '../al-assets/data/manifest.json';
console.log('manifestData ===> ', (<any>manifestData));
console.log('manifestData : Name ===> ', (<any>manifestData).name);
console.log('manifestData : Version ===> ', (<any>manifestData).version);
console.log('manifestData : Dependencies ===> ', (<any>manifestData).dependencies);
console.log('manifestData : Tile Widget Version ===> ', (<any>manifestData).dependencies['@alight/tileswidget']);

// OR using simple Javascript
<script>
let manifestUrl = './al-assets/data/manifest.json';
  fetch(manifestUrl)
            .then((response) => {
                // If error then exit
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }
                return response.json()
            }).then((data)=> {
              console.log('Base app version :', data.version);
            })
</script>
```

## Linking other NPM module one App
```
// Change from
// ====================
resolve: {
	extensions: ['.ts', '.js'],
	modules: ['node_modules', nodeModules],
	symlinks: !buildOptions.preserveSymlinks
},
resolveLoader: {
	modules: [nodeModules, 'node_modules']
},

// Change To
// ================================
resolve: {
	extensions: ['.ts', '.js'],
	//modules: ['node_modules', nodeModules],
	alias: { "@angular": path.join(nodeModules, "/@angular") },
	symlinks: !buildOptions.preserveSymlinks
},
resolveLoader: {
	modules: ['node_modules']
},

// In angular-cli.json

"defaults": {
    "styleExt": "scss",
    "component": {},
    "serve": {
      "port": 4400
    },
    "build": {
      "preserveSymlinks": true
    }
  }
```

## Remove spinner arrows from HTML input type Number
```
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: textfield;
    margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
}
```

## Angular Errors

```
// ERROR 1

ERROR in Metadata version mismatch for module C:/jr/__UPointNext/NextGen-v3/upoint-base-app-linked/node_modules/@alight/advocacyhelprequestcreationwidget/node_modules/primeng/components/dropdown/dropdown.d.ts, found version 4, expected 3, resolving symbol AdvocacyHelpRequestCreationWidgetModule in C:/jr/__UPointNext/NextGen-v3/upoint-base-app-linked/node_modules/@alight/advocacyhelprequestcreationwidget/src/index.ts, resolving symbol AdvocacyHelpRequestCreationWidgetModule in C:/jr/__UPointNext/NextGen-v3/upoint-base-app-linked/node_modules/@alight/advocacyhelprequestcreationwidget/src/index.ts


// ERROR 2

uncaught Error: Component Tab1ContentComponent is not part of any NgModule or the module has not been imported into your module.


// ERROR 3

Could not find a declaration file for module 'lodash'. 'c:/jr/__UPointNext/NextGen-v3/ui-core-widget/node_modules/lodash/lodash.js' implicitly has an 'any' type.

Solution: Try `npm install @types/lodash` if it exists or add a new declaration (.d.ts) file containing `declare module 'lodash';`
```
