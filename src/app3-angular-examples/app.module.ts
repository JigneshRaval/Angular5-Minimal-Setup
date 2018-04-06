import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

// All Components, Entry Components, Directives, Pipes and Services exported from index.ts
import { MY_EXAMPLES } from './index';

@NgModule({
    declarations: [
        AppComponent,
        MY_EXAMPLES.COMPONENTS,
        MY_EXAMPLES.DIRECTIVES,
        MY_EXAMPLES.PIPES
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule
    ],
    providers: [MY_EXAMPLES.SERVICES],
    entryComponents: [MY_EXAMPLES.ENTRY_COMPONENTS],
    bootstrap: [AppComponent]
})
export class AppModule { }
