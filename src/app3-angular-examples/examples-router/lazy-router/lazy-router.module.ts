// https://angularfirebase.com/lessons/how-to-lazy-load-components-in-angular-4-in-three-steps/
// https://medium.com/@michelestieven/lazy-loading-angular-modules-27856e940bb0
// https://scotch.io/tutorials/lazy-loading-in-angular-v2

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { LazyParentComponent } from './lazy-parent.component';
import { LazyChildComponent } from './lazy-child.component';

// Routes
import { routes } from './lazy-router.routing';
import { RouterModule } from '@angular/router';

/*
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: LazyParentComponent, pathMatch: 'full' },
  { path: 'lazy-child', component: LazyChildComponent, pathMatch: 'full' },
  { path: 'lazy-confirm', component: LazyChildComponent }
];
*/

@NgModule({
  imports: [
    //CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LazyParentComponent,
    LazyChildComponent
  ]
})
export class LazyRouteExampleModule { }

/**
 * You can also create seperate file and put following code in it.
 *
 * // lazy-router.routing.ts
 * import { Routes } from '@angular/router';

import { LazyParentComponent } from './lazy-parent.component';
import { LazyChildComponent } from './lazy-child.component';

export const routes: Routes = [
    { path: '', component: LazyParentComponent, pathMatch: 'full' },
    { path: 'lazy-child', component: LazyChildComponent, pathMatch: 'full' },
    { path: 'lazy-confirm', component: LazyChildComponent }
];

 * then import this file in lazy-router.module.ts like : import { routes } from './lazy-router.routing';
 */
