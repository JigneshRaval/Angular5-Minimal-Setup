# Angular 4/5 Tips

## 1. Solution to problem — Property ‘map’ does not exist on type ‘Observable<Response>’

### Solution 1

**Source:**  <a href="https://medium.com/@colin_78999/solution-to-problem-property-map-does-not-exist-on-type-observable-response-cccd13b07145">Solution to problem — Property ‘map’ does not exist on type ‘Observable<Response>’</a>

When writing http code in Angular, it is a common patter to map the response Observable, e.g.

```
this.http.post(uploadUrl, formData)
  .map((res: Response) => res.json())
```

However, in a new project, it is possible to get this error

> TS2339: Property ‘map’ does not exist on type ‘Observable<Response>’.

The solution is to add

```
import 'rxjs/add/operator/map';
```

### Solution 2

**Source:**  <a href="https://github.com/angular/angular-cli/issues/3249">ng test error: Property 'map' does not exist on type 'Observable<Response>'</a>

I solved issue by adding following includes in `test.ts` file in src/app folder in my solution

```
import 'core-js/es6';
import 'core-js/es7/reflect';

import 'ts-helpers';

import 'zone.js/dist/zone.js';
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

import 'rxjs/Rx';
```

========================================================
1. Error while prod build : "$$_gendir/app/app.module.ngfactory"
	Ref : https://github.com/angular/angular-cli/issues/7125
	------------------------------------------------------
	I can confirm that ng new project-name problem with "$$_gendir/app/app.module.ngfactory" can be resolved by:

	npm install enhanced-resolve@3.3.0 --save;
	ng build --prod --aot; (result: now everything is OK)

	also ng build --prod its not this same as ng build --env=prod

	Generic type 'HttpEvent' requires 1 type argument(s).

2. Assets path when linking one app into another app using "npm link"
	// CSS Path in main.scss
	------------------------------------
	/* This is the main CSS that includes other CSS files. */

	/**
	 * TODO: Need to find better solution
	 * Need to find proper way to provide path of images used inside CSS or SCSS files because
	 * modules linked ( using "npm link" ) inside another app then images path of linked module/app
	 * not working properly
	 */
	@import "base-path.scss";
	//$assetsPath: $APP_URL;//"../../assets";

	/**
	 * TODO: Need to find better solution
	 * Uncomment below path when using UI-core inside UI-styleguide or in another app
	 */
	$assetsPath: "..";
	$assetsPath: "../node_modules/@mywidget/uicore/src/al-assets";

3. var myZone = zone.fork({
            afterTask: function() {
                console.log('addEventListener hook: ', arguments);
            }
        });
        myZone.run(function() {
            window.addEventListener('click', function() {
                console.log('click!');
            });
        });

4. this.__zone_symbol__clickfalse[0].callback()


5. Using Npm Link : common.js in C:\jr\style-guide-app-linked\node_modules\@angular\cli\models\webpack-configs\common.js

	Update this code with below code: ------------------
	resolve: {
            extensions: ['.ts', '.js'],
            modules: ['node_modules', nodeModules],
            symlinks: !buildOptions.preserveSymlinks
        },
        resolveLoader: {
            modules: [nodeModules, 'node_modules']
        },

	New Code: ------------------------
	resolve: {
            extensions: ['.ts', '.js'],
            //modules: ['node_modules', nodeModules],
			alias: { "@angular": path.join(nodeModules, "/@angular") }
            //symlinks: true
        },
        resolveLoader: {
            modules: ['node_modules']
        },

	Example: -------------------------
	resolve: {
        extensions: ['.js', '.ts', '.css'],
        // This will resolve module path when using "npm link"
        alias: { "@angular": path.join(__dirname, "node_modules/@angular") }
    },
    resolveLoader: {
        modules: ["node_modules"] // This will resolve module path when using "npm link"
    },

6. when you are using "npm link" to link one app into another ( https://github.com/jvandemo/generator-angular2-library )

  Note : Remove so many Warnings regarding "can not resolve *.ts" file

```
WARNING in ./~/apollo-client/index.js
(Emitted value instead of an instance of Error) Cannot find source file '../../src/index.ts': Error: Can't resolve '../../src/index.ts' in 'C:\Dev\app_ma
nager\ui\node_modules\apollo-client'
 @ ./~/react-apollo/lib/browser.js 10:22-46
 @ ./src/index.tsx
 @ multi (webpack)-dev-server/client?http://localhost:8080 ./src/index.tsx

WARNING in ./~/apollo-client/transport/networkInterface.js
(Emitted value instead of an instance of Error) Cannot find source file '../../../src/transport/networkInterface.ts': Error: Can't resolve '../../../src/
transport/networkInterface.ts' in 'C:\Dev\app_manager\ui\node_modules\apollo-client\transport'
 @ ./~/apollo-client/index.js 1:0-98
 @ ./~/react-apollo/lib/browser.js
 @ ./src/index.tsx
 @ multi (webpack)-dev-server/client?http://localhost:8080 ./src/index.tsx

WARNING in ./~/apollo-client/transport/batchedNetworkInterface.js
(Emitted value instead of an instance of Error) Cannot find source file '../../../src/transport/batchedNetworkInterface.ts': Error: Can't resolve '../../
../src/transport/batchedNetworkInterface.ts' in 'C:\Dev\app_manager\ui\node_modules\apollo-client\transport'
 @ ./~/apollo-client/index.js 2:0-115
 @ ./~/react-apollo/lib/browser.js
 @ ./src/index.tsx
 @ multi (webpack)-dev-server/client?http://localhost:8080 ./src/index.tsx
 ```

	ng serve --preserve-symlinks

		If you are using an Angular CLI application to consume your library, make sure to set up a path mapping in /src/tsconfig.app.json of your consuming application (not your library):
	{
	  "compilerOptions": {
		// ...
		// Note: these paths are relative to `baseUrl` path.
		"paths": {
		  "@angular/*": [
			"../node_modules/@angular/*"
		  ]
		}
	  }
	}
	When you npm link a library with peer dependencies, the consuming application searches for the peer dependencies in the library's parent directories instead of the application's parent directories.

	If you get Error: Unexpected value '[object Object]' imported by the module 'AppModule'. Please add a @NgModule annotation., then try:

	$ ng serve --preserve-symlinks
	to make sure the consuming application searches for the peer dependencies in the application's node_modules directory.

	Example 2: changes in angular.cli ( Worked )
	---------------------------------------------
		After upgrade, either run

		ng serve --preserve-symlinks

		or update .angular-cli.json

		...
		"defaults": {
			"styleExt": "css",
			"component": {},
			"build": {
				"preserveSymlinks": true
			}
		}

		if you have symlinks in the source tree.


7. YARN Cheeatshet
	npm install === yarn
	Install is the default behavior.
	npm install taco --save === yarn add taco
	The Taco package is saved to your package.jsonimmediately.
	npm uninstall taco --save === yarn remove taco
	—-savecan be defaulted in NPM by npm config set save true but this is non-obvious to most developers. Adding and removing from package.json is default in Yarn.
	npm install taco --save-dev === yarn add taco --dev
	npm update --save === yarn upgrade
	Great call on upgrade vs update, since that is exactly what it is doing! Version number moves, upgrade is happening!
	*WARNING* npm update --save seems to be kinda broken in 3.11
	npm install taco@latest --save === yarn add taco
	npm install taco --global === yarn global add taco
	As always, use global flag with care.
	You can use this to use yarn to update itself with yarn self-update

	npm init === yarn init
	npm link === yarn link
	npm outdated === yarn outdated
	npm publish === yarn publish
	npm run === yarn run
	npm cache clean === yarn cache clean
	npm login === yarn login (and logout)
	npm test === yarn test
	npm install --production === yarn --production
	yarn autoclean [-I/--init] [-F/--force]

8. You can wrap ng-content in ng-template and use ngTemplateOutlet

	<a class="bouton" href="{{ href }}" *ngIf="hasURL">
		<ng-container *ngTemplateOutlet="contentTpl"></ng-container>
	</a>

	<button class="bouton" *ngIf="!hasURL">
		<ng-container *ngTemplateOutlet="contentTpl"></ng-container>
	</button>
	<ng-template #contentTpl><ng-content></ng-content></ng-template>

9. <some-element [ngStyle]="{'font-style': styleExp}">...</some-element>

	<some-element [ngStyle]="{'max-width.px': widthExp}">...</some-element>

	<some-element [ngStyle]="objExp">...</some-element>

10. <ng-container [ngSwitch]="thing.name">
		<div [ngSwitchCase]="'foo'">
			Inner content 1
		</div>
		<div [ngSwitchCase]="'bar'">
			Inner content 2
		</div>
		<div [ngSwitchCase]="'cat'">
			Inner content 3
		</div>¯
		<div [ngSwitchCase]="'dog'">
			Inner content 4
		</div>
	</ng-container>

11. <ng-template #followingpost let-author="author" let-age="age" let-text="text" let-badge="badge">
    <div class="container-fluid">
        <div class="card">
            <div class="header">
                <h4 class="title">{{ author }}</h4>
                <p class="category">il y a {{ age }} jours</p>
            </div>

            <div class="content" [innerHTML]="text">
            </div>

            <div class="text-right">
                <button class="btn btn-icon btn-simple"><i class="ti-comment"></i></button>
                <button class="btn btn-icon btn-simple">
                    <i class="ti-heart"></i>
                    <span *ngIf="badge" class="badge">{{ badge }}</span>
                </button>
                <button class="btn btn-icon btn-simple"><i class="ti-share"></i></button>
            </div>
        </div>
    </div>
</ng-template>

<ng-container *ngTemplateOutlet="followingpost;context:{author: 'Timothy', age: 2, badge: 18, text: 'Les Français qui payent plus de 2500 € d impôt peuvent bénéficier de cette loi : <a href=`http://bit.ly/2xxMicY`>http://bit.ly/2xxMicY</a>'}"></ng-container>

12 Add/Remove Event Listeners
	Don't use an anonymous function, instead name the function and put the removal in the event handler.

	var func = function(event) {
	   transitionComplete( event.propertyName );
		e.removeEventListener('transitionend',func);
	};

	e.addEventListener('transitionend',func, false);

13: Detecting Storage Support
function localStorageSupported() {
 try {
  return "localStorage" in window && window["localStorage"] !== null;
 } catch (e) {
  return false;
 }
}

14 : Angular CLI use YARN
	`ng set --global packageManager=yarn`

	ng set --global packageManager=npm

	yarn config set yarn-offline-mirror ~/npm-packages-offline-cache ( This will create a file .yarnrc in the user’s directory on your computer. )

	ng new hello-cli --skip-install

	cd hello-cli

	yarn install

	yarn cache clean

	ng new hello-cli2 --skip-install

	cd hello-cli2

	yarn install --offline

	----------------------------

	$ yarn global add create-react-app

	$ create-react-app my-app

15: ng serve --poll = 2000


16:Angular Tips: Avoiding duplication of RxJS operator imports (https://loiane.com/2017/08/angular-rxjs-imports/)

	Create file  : src/app/shared/rxjs-operators.ts - Below is how it looks like:
	// Observable class extensions
	import 'rxjs/add/observable/of';

	// Observable operators
	import 'rxjs/add/operator/map';
	import 'rxjs/add/operator/do';
	import 'rxjs/add/operator/catch';
	import 'rxjs/add/operator/switchMap';
	import 'rxjs/add/operator/mergeMap';
	import 'rxjs/add/operator/filter';
	import 'rxjs/add/operator/debounceTime';
	import 'rxjs/add/operator/distinctUntilChanged';

	You can import it directly in you app.module:
	import './rxjs-operators';

	C:\jr\ui-core-widget\src\components\al-popover\al-popover.component.ts
		import { Observable } from 'rxjs/Observable';
		import { BehaviorSubject } from 'rxjs/BehaviorSubject';
		import { Subject } from 'rxjs/Subject';
		import { Subscription } from 'rxjs/Subscription';

		import 'rxjs/add/observable/timer';
		import 'rxjs/add/observable/fromEvent';
		import 'rxjs/add/operator/skipUntil';
		import 'rxjs/add/operator/filter';
		import 'rxjs/add/operator/take';

17 : Updating Angular CLI

	If you're using Angular CLI 1.0.0-beta.28 or less, you need to uninstall angular-cli package. It should be done due to changing of package's name and scope from angular-cli to @angular/cli:

	npm uninstall -g angular-cli
	npm uninstall --save-dev angular-cli
	To update Angular CLI to a new version, you must update both the global package and your project's local package.

	Global package:

	npm uninstall -g @angular/cli
	npm cache verify
	# if npm version is < 5 then use `npm cache clean`
	npm install -g @angular/cli@latest
	Local project package:

	rm -rf node_modules dist # use rmdir /S/Q node_modules dist in Windows Command Prompt; use rm -r -fo node_modules,dist in Windows PowerShell
	npm install --save-dev @angular/cli@latest
	npm install

18. Angular CLI commands

	ng new [name] --minimal

	ng new [name] --inline-template

	ng new [name] --inline-style

	ng new [name] --style=scss

	ng new [name] --routing

	ng generate component second

	ng new [name] --skip-git

	ng new [name] --skip-install

19: Stackblitz

	https://stackblitz.com/github/gothinkster/angular-realworld-example-app?file=src%2Fapp%2Fsettings%2Fsettings.module.ts

	You can run any public repo on Github by providing the username + repo name like so:

	stackblitz.com/github/{GH_USERNAME}/{REPO_NAME}

	And you can also optionally specify a branch, tag, or commit:

	.../github/{GH_USERNAME}/{REPO_NAME}/tree/{TAG|BRANCH|COMMIT}

20: Create React App

	$ create-react-app hello-world
	(...tons of output)
	Success! Created hello-world at /Users/brandon/Documents/dev/create-react-app/hello-world
	Inside that directory, you can run several commands:
	yarn start
		Starts the development server.
	yarn run build
		Bundles the app into static files for production.
	yarn test
		Starts the test runner.
	yarn run eject
		Removes this tool and copies build dependencies, configuration files
		and scripts into the app directory. If you do this, you can’t go back!
	We suggest that you begin by typing:
	cd hello-world
	  yarn start
	Happy hacking!

21 : Setup Vue.js

yarn add vue vuex vue-router vuex-router-sync @vue/cli vue-cli

22 : .npmrc

registry=https://registry.npmjs.org/
strict-ssl=false
tmp=C:\jr\Temp
/uicore:assetspath=http://localhost:7575

23: Comemu
-cur_console:b -cur_console:d:C:\jr\base-app -cur_console:t:"Base App" cmd.exe /k "%ConEmuBaseDir%\CmdInit.cmd" -run cd..

> -cur_console:f -cur_console:d:C:\jr\style-guide-app-linked -cur_console:t:"Styleguide App" cmd.exe /k "%ConEmuBaseDir%\CmdInit.cmd" -run cd..

-cur_console:d:C:\Users\<UserName>\Documents\GitHub\react-todo-app -cur_console:t:ReactTodo-Server cmd.exe /k call npm start

> -cur_console:d:C:\Users\<UserName>\Documents\GitHub\react-todo-app -cur_console:t:ReactTodo-Webpack "C:\WINDOWS\system32\cmd.exe"   /k call npm run webpack

24: The browser is sending an OPTIONS (preflight) request because whatever code that's making the request isn't satisfying the requirements to avoid a preflight request. See here:
https://stackoverflow.com/questions/42168773/how-to-resolve-preflight-is-invalid-redirect-in-cors

Basically,

The http method must be GET, HEAD, or POST
The only headers you can set are Accept, Accept-Language, Content-Language, Content-Type, DPR, Downlink, Save-Data, Viewport-Width, or Width
The Content-Type request header must be application/x-www-form-urlencoded, multipart/form-data, or text/plain
Resource Override can change request headers, although in this case, chrome seems to filter out the request automatically (probably so extensions can't change them because it's a security issue). If you need to use certain headers or an uncommon http method then I'm not sure there's much you can do. I suppose you could redirect the script that's causing the request to your own script so you can just make the request to the correct url from the beginning.

Let me know if you find a way around this, as odds don't look too good for a solution.

25. Angular 5 webpack bundle analyzer
Angular Optimization:

	Testing of Code analyzation of Modules and Bundle files to reduce bundle size
	install "webpack-bundle-analyzer" globally : https://github.com/webpack-contrib/webpack-bundle-analyzer
	add this in package.json file : "bundle-report": "webpack-bundle-analyzer dist/stats.json" in base app
	"ng build --prod --stats-json" in base app ( // Above command builds our application in prod mode and also,
	// generates stats.json, and stores it in /dist/stats.json)
	run "npm run bundle-report" or webpack-bundle-analyzer dist/stats.json

26 How to import .JSON file in Angular and Typescript
// Method 1 : Using import ( Using Wildcard Module Name )
// Source : https://hackernoon.com/import-json-into-typescript-8d465beded79
/* First Add following in typings.d.ts
declare module "*.json" {
    const value: any;
    export default value;
}

Then, your code will work like charm!

// Typescript
// app.ts
import * as data from './example.json';
const word = (<any>data).name;
console.log(word); // output 'testing'
*/

## Error : Uncaught Error: Unexpected value '[object Object]' imported by the module 'CoreModule'. Please add a @NgModule annotation.
    at syntaxError (compiler.es5.js:1694)
    at compiler.es5.js:15398

Uncaught Error: Unexpected value '[object Object]' imported by the module 'AppModule'. Please add a @NgModule annotation. to Uncaught Error: Unexpected value '[object Object]' imported by the module 'AppModule'. Please add a @NgModule annotation.

```
I had the same issue, found answer here: https://github.com/angular/angular-cli/wiki/stories-linked-library

You need to edit /src/tsconfig.app.json in your project (not library!) and add:

    "baseUrl": "",
    "paths": {
      "@angular/*": [
        "../node_modules/@angular/*"
      ]
    },

into compilerOptions object.

ng serve --preserve-symlinks
```
