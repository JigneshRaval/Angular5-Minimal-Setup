import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RootComponent } from './root/root.component';
import { LoginComponent } from './login/login.component';
import { ROUTING } from './root/app.routing';

@NgModule({
	declarations: [
		RootComponent,
		LoginComponent
	],
	imports: [
		BrowserModule,
		ROUTING,
		FormsModule,
		HttpClientModule,
		HttpModule
	],
	providers: [],
	bootstrap: [RootComponent]
})
export class AppModule { }
