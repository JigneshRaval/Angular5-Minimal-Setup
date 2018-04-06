// System JS config Example 1
// ======================================

System.config({
    transpiler: 'typescript',
    typescriptOptions: {
        // Copy of compiler options in standard tsconfig.json
        "target": "es6",
        "module": "system",
        "moduleResolution": "node",
        "sourceMap": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "lib": ["es2015", "dom"],
        "noImplicitAny": true,
        "suppressImplicitAnyIndexErrors": true,
        "baseUrl": "app",
        "paths": {
            "@app/*": ["app/*"]
        }
    },
    meta: {
        'typescript': {
            "exports": "ts"
        }
    },
    paths: {
        //'npm:': 'https://unpkg.com/'
        'npm:': './node_modules/'
    },
    map: {
        'app': './app',
        '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
        '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
        '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
        '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
        '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
        '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

        /*
        '@angular/core': 'npm:@angular/core@5.2.1/bundles/core.umd.js',
        '@angular/common': 'npm:@angular/common@5.2.1/bundles/common.umd.js',
        '@angular/compiler': 'npm:@angular/compiler@5.2.1/bundles/compiler.umd.js',
        '@angular/platform-browser': 'npm:@angular/platform-browser@5.2.1/bundles/platform-browser.umd.js',
        '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic@5.2.1/bundles/platform-browser-dynamic.umd.js',
        '@angular/http': 'npm:@angular/http@5.2.1/bundles/http.umd.js',
        '@angular/router': 'npm:@angular/router@5.2.1/bundles/router.umd.js',
        '@angular/forms': 'npm:@angular/forms@5.2.1/bundles/forms.umd.js',
        */

        // Test Suite
        // '@angular/core/testing': 'npm:@angular/core/bundles/core-testing.umd.js',
        // '@angular/common/testing': 'npm:@angular/common/bundles/common-testing.umd.js',
        // '@angular/compiler/testing': 'npm:@angular/compiler/bundles/compiler-testing.umd.js',
        // '@angular/platform-browser/testing': 'npm:@angular/platform-browser/bundles/platform-browser-testing.umd.js',
        // '@angular/platform-browser-dynamic/testing': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
        // '@angular/http/testing': 'npm:@angular/http/bundles/http-testing.umd.js',
        // '@angular/router/testing': 'npm:@angular/router/bundles/router-testing.umd.js',
        // 'tsconfig.json': './tsconfig.json',
        // 'typescript': 'https://unpkg.com/typescript@2.4.2/lib/typescript.js',
        'rxjs': 'npm:rxjs'
    },
    packages: {
        app: {
            main: './main.ts',
            defaultExtension: 'ts'
        },
        rxjs: {
            defaultExtension: 'js'
        }
    }
});

// System JS config Example 2
// ======================================
/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 *
 * WEB ANGULAR VERSION
 * (based on systemjs.config.js in angular.io)
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
/*
(function (global) {
    System.config({
        // DEMO ONLY! REAL CODE SHOULD NOT TRANSPILE IN THE BROWSER
        transpiler: 'ts',
        typescriptOptions: {
            // Copy of compiler options in standard tsconfig.json
            "target": "es5",
            "module": "system",
            "moduleResolution": "node",
            "sourceMap": true,
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true,
            "lib": ["es2015", "dom"],
            "noImplicitAny": true,
            "suppressImplicitAnyIndexErrors": true
        },
        meta: {
            'typescript': {
                "exports": "ts"
            }
        },
        paths: {
            // paths serve as alias
            'npm:': 'https://unpkg.com/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            'app': 'app',

            // angular bundles
            '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
            '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            // '@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            // '@angular/router/upgrade': 'npm:@angular/router/bundles/router-upgrade.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            // '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
            // '@angular/upgrade/static': 'npm:@angular/upgrade/bundles/upgrade-static.umd.js',

            // other libraries
            'rxjs': 'npm:rxjs@5.5.3',
            // 'rxjs/operators': 'npm:rxjs@5.5.3/operators/index.js',
            // 'tslib': 'npm:tslib/tslib.js',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api@0.4/bundles/in-memory-web-api.umd.js',
            'ts': 'npm:plugin-typescript@5.2.7/lib/plugin.js',
            'typescript': 'npm:typescript@2.4.2/lib/typescript.js',

        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.ts',
                defaultExtension: 'ts',
                meta: {
                    './*.ts': {
                        // loader: 'systemjs-angular-loader.js'
                    }
                }
            },
            rxjs: {
                defaultExtension: 'js'
            }
        }
    });

})(this);
*/

// System JS config Example 3
// ======================================

/*
System.config({
    //use typescript for compilation
    transpiler: 'typescript',
    //typescript compiler options
    typescriptOptions: {
      emitDecoratorMetadata: true
    },
    paths: {
      'npm:': 'https://unpkg.com/'
    },
    //map tells the System loader where to look for things
    map: {

      'app': './src',

      '@angular/core': 'npm:@angular/core@4.0.0-rc.3/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common@4.0.0-rc.3/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler@4.0.0-rc.3/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser@4.0.0-rc.3/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic@4.0.0-rc.3/bundles/platform-browser-dynamic.umd.js',


      'rxjs': 'npm:rxjs',
      'typescript': 'npm:typescript@2.1/lib/typescript.js'
    },
    //packages defines our app package
    packages: {
      app: {
        main: './main.ts',
        defaultExtension: 'ts'
      },
      rxjs: {
        defaultExtension: 'js'
      }
    }
  });*/
