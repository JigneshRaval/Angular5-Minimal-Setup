import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// Entry Component
import { AppComponent } from './app.component';

// All Components, Entry Components, Directives, Pipes and Services
import { THEME_MAIN } from './components/index';

const AppRoutes: Routes = [
    { path: '', component: AppComponent }
]

@NgModule({
    declarations: [
        AppComponent,
        THEME_MAIN.COMPONENTS,
        THEME_MAIN.DIRECTIVES,
        THEME_MAIN.PIPES
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(AppRoutes)
    ],
    providers: [THEME_MAIN.SERVICES],
    entryComponents: [THEME_MAIN.ENTRY_COMPONENTS],
    bootstrap: [AppComponent]
})
export class AppModule { }
