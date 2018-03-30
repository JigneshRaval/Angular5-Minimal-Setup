import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { LoginComponent } from '../login/login.component';

export const AppRoutes: Routes = [
    { path: '', component: LoginComponent }
]

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
