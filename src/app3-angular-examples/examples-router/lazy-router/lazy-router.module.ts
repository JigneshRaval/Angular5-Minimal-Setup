// https://angularfirebase.com/lessons/how-to-lazy-load-components-in-angular-4-in-three-steps/
// https://medium.com/@michelestieven/lazy-loading-angular-modules-27856e940bb0
// https://scotch.io/tutorials/lazy-loading-in-angular-v2

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyParentComponent } from './lazy-parent.component';
import { LazyChildComponent } from './lazy-child.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', component: LazyParentComponent, pathMatch: 'full' },
    { path: 'lazy', component: LazyChildComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LazyParentComponent,
    LazyChildComponent,
    RouterModule
  ]
})
export class LazyRouteExampleModule { }
