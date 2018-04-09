import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/homepage.component';
import { ContactPage } from './pages/contact-us.component';
import { Example2MainComponent } from './example-2/index';

export const AppRoutes: Routes = [
    { path: '', component: HomePage },
    { path: 'home', component: HomePage },
    { path: 'contact', component: ContactPage },
    { path: 'adbanner', component: Example2MainComponent }
]

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
