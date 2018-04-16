import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTE_COMPONENTS } from './index';
export const AppRoutes: Routes = ROUTE_COMPONENTS

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
