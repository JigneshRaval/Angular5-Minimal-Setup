import { Routes } from '@angular/router';

import { LazyParentComponent } from './lazy-parent.component';
import { LazyChildComponent } from './lazy-child.component';

export const routes: Routes = [
    { path: '', component: LazyParentComponent, pathMatch: 'full' },
    { path: 'lazy-child', component: LazyChildComponent, pathMatch: 'full' },
    { path: 'lazy-confirm', component: LazyChildComponent }
];
