import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app3-angular-examples/app.module';
import { environment } from './environments/environment';
// import { uikit } from './app3-angular-examples/shared/vendor';


if (environment.production) {
  enableProdMode();
}

const bootstrapPromise = platformBrowserDynamic().bootstrapModule(AppModule);

// Logging bootstrap information
bootstrapPromise.then(success => console.log(`Bootstrap success`))
  .catch(err => console.error(err));
