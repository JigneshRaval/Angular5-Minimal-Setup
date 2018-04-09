import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RootComponent } from './root/root.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ROUTING } from './app.routing';

@NgModule({
	declarations: [
		RootComponent,
		HomeComponent,
		LoginComponent,
		SignupComponent
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
