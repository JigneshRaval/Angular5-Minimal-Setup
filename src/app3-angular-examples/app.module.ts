import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePage } from './pages/homepage.component'
import { ContactPage } from './pages/contact-us.component'
import { ROUTING } from './app.routing'

// All Components, Entry Components, Directives, Pipes and Services exported from index.ts
import { MY_EXAMPLES } from './index';
import { TabsModule } from './example-1/tab.module';

@NgModule({
    declarations: [
        AppComponent,
        ContactPage,
        HomePage,
        MY_EXAMPLES.COMPONENTS,
        MY_EXAMPLES.DIRECTIVES,
        MY_EXAMPLES.PIPES
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ROUTING,
        RouterModule,
        TabsModule
    ],
    providers: [MY_EXAMPLES.SERVICES],
    entryComponents: [MY_EXAMPLES.ENTRY_COMPONENTS],
    bootstrap: [AppComponent]
})
export class AppModule { }
