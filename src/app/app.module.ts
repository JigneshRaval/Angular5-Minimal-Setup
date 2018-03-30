import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RootComponent } from './root/root.component';
import { LoginComponent } from './login/login.component';
import { ROUTING } from './root/app.routing';

@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    BrowserModule,
    ROUTING
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
