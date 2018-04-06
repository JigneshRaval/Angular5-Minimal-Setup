Setting up Angular 5 project from scratch using Webpack 4 and Typescript 2.7
=============================================

Thanks to Bharat Tiwari for this great tutorial.

Ref : https://medium.com/developing-an-angular-4-web-app/setting-up-our-angular-4-project-from-scratch-bdbc616f92f2


> Project Repository: [https://github.com/jsified-brains/momentz4ever-web-ng4/](https://github.com/jsified-brains/momentz4ever-web-ng4/)

> Branch specific for this task: [https://github.com/jsified-brains/momentz4ever-web-ng4/tree/seed-ng4-and-unit-tests](https://github.com/jsified-brains/momentz4ever-web-ng4/tree/seed-ng4-and-unit-tests)

1. Inside your usual working folder of choice, create a folder for the new angular-4 project.
    I am using Windows and my project folder is at `C:\working\TS-NG4\momentz4ever-web-ng4`.

2. Open terminal/command prompt with admin privileges.

3. Move to the project folder on the command prompt

**`cd C:\working\TS-NG4\momentz4ever-web-ng4`**

4. Initialize the folder with _package.json_ using the below command:

**`npm init`**

5. Answer the prompted questions and confirm the entered information in the end. This would initialize the folder with `package.json`.

6. Install the minimum required packages for starting with an angular-2/4 application.

`npm install --save @angular/core @angular/common @angular/compiler @angular/platform-browser @angular/platform-browser-dynamic @angular/forms @angular/router @angular/http rxjs zone.js core-js`

7. Install typescript, tslint and few required type definitions

`npm install --save-dev typescript tslint @types/node`

8. Install Webpack, webpack-dev-server and some of the webpack loaders and plugins that we are anticipating to use with webpack:

`npm install --save-dev webpack webpack-dev-server html-webpack-plugin extract-text-webpack-plugin raw-loader css-loader style-loader sass-loader node-sass url-loader file-loader awesome-typescript-loader angular2-template-loader`

9. Create a _tsconfig_ file for our project using the below command:

`tsc --init`

10. The above command would create tsconfog.json file under the project’s root folder. 
Open the project folder in your web editor and update _tsconfig.json_ as below:

```
// tsconfig.json : Example 1
{
    "compileOnSave": false,
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "noImplicitAny": false,
        "sourceMap": true,
        "baseUrl": "src",
        "outDir": "./dist",
        "declaration": false,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "typeRoots": \[
            "node_modules/@types"
        \],
        "lib": \[
            "es2016",
            "dom"
        \],
        "types": \[
            "node"
        \]
    },
    "awesomeTypeScriptLoaderOptions": {
        "useWebpackText": true
    }
}

// tsconfig.json : Example 2
{
    "compilerOptions": {
        "target": "es5",
        "module": "es2015",
        "moduleResolution": "node",
        "declaration": true, // triggers the generation of the typings *.d.ts files, that enable IDE Intellisense
        "sourceMap": true,
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "removeComments": false,
        "noImplicitAny": true,
        "skipLibCheck": true,
        "baseUrl": ".", // This must be specified if "paths" is.
        "lib": \[
            "es2015",
            "dom"
        \]
    },
    "include": \[
        "src/**/*.ts"
    \],
    "exclude": \[
        "node_modules"
    \],
    "typeRoots": \[
        "../node_modules/@types"
    \],
    "compileOnSave": false,
    "buildOnSave": false
}
```

```
// package.json

{
	"name": "angular5_webpack4_typescript2_7",
	"version": "1.0.0",
	"description": "",
	"scripts": {
		"start": "webpack --config webpack.config.js -w",
		"start:new": "webpack-cli --config webpack.config.js -w",
		"start:dev": "webpack --mode development -w",
		"start:prod": "webpack --mode production"
	},
	"author": "",
	"license": "ISC",
	"dependencies": {
		"@angular/common": "^5.2.7",
		"@angular/compiler": "^5.2.7",
		"@angular/core": "^5.2.7",
		"@angular/forms": "^5.2.7",
		"@angular/http": "^5.2.7",
		"@angular/platform-browser": "^5.2.7",
		"@angular/platform-browser-dynamic": "^5.2.7",
		"@angular/router": "^5.2.7",
		"core-js": "^2.5.3",
		"rxjs": "^5.5.6",
		"zone.js": "^0.8.20"
	},
	"devDependencies": {
		"@types/node": "^9.4.6",
		"awesome-typescript-loader": "^3.5.0",
		"ts-loader": "^4.0.1",
		"tslint": "^5.9.1",
		"typescript": "^2.7.2",
		"webpack": "^4.1.0",
		"webpack-cli": "^2.0.10"
	}
}
```

11. Add `tslint.json` under the project root folder ( You can copy the file contents from [here](https://gist.github.com/b-tiwari/00f13dd5b6ab3fa0b8c702390abba59b). )

12. Creating the root app component :
 - under the project’s root folder, create a folder `src`.
 - create a new folder named `components` inside `src`. 
 - create a sub-folder `app` inside `components`. 
 - inside this `src\components\app` folder, create file `app.component.ts `:

```
// app.component.ts
import { Component } from '@angular/core';
@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent { }
```

13. Create `**app.component.html**` inside the `src\components\app` folder:

<h1>Welcome to Momentz4Ever</h1>
<h3>Hello from app component</h3>

14. Create `**app.module.js**` inside the `.\src\components\app` folder:

```
// app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './components/app/app.component';


@NgModule({
  declarations: \[
    AppComponent
  \],
  imports: \[
    BrowserModule,
    FormsModule,
    HttpModule
  \],
  providers: \[\],
  bootstrap: \[AppComponent\]
})
export class AppModule { }
```

15. Create `polyfills.js` under the `src` folder:

```
// polyfills.ts
/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1\. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2\. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/docs/ts/latest/guide/browser-support.html
 */

/************************************
 * BROWSER POLYFILLS
 */

/** IE9, IE10 and IE11 requires all of the following polyfills. **/
// import 'core-js/es6/symbol';
// import 'core-js/es6/object';
// import 'core-js/es6/function';
// import 'core-js/es6/parse-int';
// import 'core-js/es6/parse-float';
// import 'core-js/es6/number';
// import 'core-js/es6/math';
// import 'core-js/es6/string';
// import 'core-js/es6/date';
// import 'core-js/es6/array';
// import 'core-js/es6/regexp';
// import 'core-js/es6/map';
// import 'core-js/es6/set';
/** IE10 and IE11 requires the following for NgClass support on SVG elements */
// import 'classlist.js';  // Run \`npm install --save classlist.js\`.
/** IE10 and IE11 requires the following to support `@angular/animation`. */
// import 'web-animations-js';  // Run \`npm install --save web-animations-js\`.

/** Evergreen browsers require these. **/
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';


/** ALL Firefox browsers require the following to support `@angular/animation`. **/
// import 'web-animations-js';  // Run \`npm install --save web-animations-js\`.


/***************************************************************************************************
 * Zone JS is required by Angular itself.
 */
import 'zone.js/dist/zone';  // Included with Angular CLI.


/***************************************************************************************************
 * APPLICATION IMPORTS
 */

/**
 * Date, currency, decimal and percent pipes.
 * Needed for: All but Chrome, Firefox, Edge, IE11 and Safari 10
 */
// import 'intl';  // Run \`npm install --save intl\`.
/**
 * Need to import at least one locale-data with intl.
 */
// import 'intl/locale-data/jsonp/en';
```

16. Create `main.ts` under the `src` folder:

```
// main.ts

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import './polyfills';
import { AppModule } from './components/app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
```

17. Create `index.html` under the `src` folder:

```
// index.html

<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Momentz4ever</title>
		<base href="/">

		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="icon" type="image/x-icon" href="favicon.ico">
	</head>
	<body>
		<app-root>Loading...</app-root>
	</body>
</html>
```

18. Initializing **Webpack**:
Add a folder named **_‘webpack’_** in the project’s root folder and under this folder, add a file — _webpack.config.js_.

```
// webpack.config.js

const webpack = require('webpack');
const path = require('path');
let ENV = process.env.NODE_ENV;

let baseWebpackConfig = {
    entry: {
        'app': './src/main.ts',
        'vendor': './src/vendor.ts',          // Libs or Vendor files like jQuery, Lodash, Bootstrap etc. including Angular and RxJS
        'polyfills': './src/polyfills.ts'   // Polyfills like Core.js, Zone.js
    },
    watch: true,
    output: {
        path: path.resolve(__dirname, "dist"), // string
        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)

        filename: '\[name\].js', // string
        //filename: "\[name\].js", // for multiple entry points
        //filename: "\[chunkhash\].js", // for long term caching
        // the filename template for entry chunks

        publicPath: "/", // string
        //publicPath: "",
        //publicPath: "https://cdn.example.com/",
        // the url to the output directory resolved relative to the HTML page

        libraryTarget: "umd", // universal module definition
        /*
		libraryTarget: "umd2", // universal module definition
        libraryTarget: "commonjs2", // exported with module.exports
        libraryTarget: "commonjs-module", // exports with module.exports
        libraryTarget: "commonjs", // exported as properties to exports
        libraryTarget: "amd", // defined with AMD defined method
        libraryTarget: "this", // property set on this
        libraryTarget: "var", // variable defined in root scope
        libraryTarget: "assign", // blind assignment
        libraryTarget: "window", // property set to window object
        libraryTarget: "global", // property set to global object
        libraryTarget: "jsonp", // jsonp wrapper
		*/
        // the type of the exported library
    },
    resolve: {
        extensions: \['.js', '.ts', '.tsx', '.css'\],
        // This will resolve module path when using "npm link"
        alias: { "@angular": path.join(\_\_dirname, "node\_modules/@angular") }
        //modules: \['src', 'node_modules'\]
        // OR this (surprisingly both worked for me):
        //alias: { "my-package": path.join(__dirname, "../my-package" },

        // You don't really need the resolve.fallback unless you do: import "something"
        // that is not in my-package's package.json dependencies.
        //fallback: path.join(\_\_dirname, "node\_modules")
    },
    resolveLoader: {
        //modules: \["node_modules"\] // This will resolve module path when using "npm link"
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    optimization: {
        "minimize": true,
        splitChunks: {
            /* "chunks": "all",
            "name": true,
            cacheGroups: {
                app: {
                    name: "app",
                    test: "app",
                    enforce: true
                },
                vendor: {
                    name: "vendor",
                    test: "vendor",
                    enforce: true,
                    minChunks: 2
                },
                polyfills: {
                    name: "polyfills",
                    test: "polyfills",
                    enforce: true
                }
            } */
        }
    },
    // adding plugins to your configuration
    plugins: \[
        /* new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            }
        }),
        new webpack.IgnorePlugin(/^\\.\\/locale$/, /moment$/),
        */
        // compile time plugins
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
        }),
        //new webpack.HotModuleReplacementPlugin()
    \],
    module: {
        rules: \[
            {
                test: /\\.ts$/,
                loaders: \['awesome-typescript-loader'\],
                exclude: /(node\_modules|bower\_components)/
            },
            /*
            // all files with a `.ts` or `.tsx` extension will be handled by \`ts-loader\`
            {
                test: /\\.tsx?$/,
                loader: "ts-loader",
                exclude: /(node\_modules|bower\_components)/
            } */
        \]
    }
}

module.exports = baseWebpackConfig;
```

19. In `package.json` , add a script named `build` to start _webpack-dev-server_, as below:

```
"scripts": {
  "test": "test",
  "build": "webpack-dev-server --config webpack/webpack.config.js"
}
```

20. Now run the above added `build` from command prompt to start _webpack-dev-server_

`npm run build`

21. The above command should build the application package and start the application on localhost, port 9000 as we specified in the _devServer_ settings of webpack config. 
Open the url [_http://localhost:9000_](http://localhost:9000)  and below html should be seen.
