import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyParentComponent } from './lazy-parent.component';
import { LazyChildComponent } from './lazy-child.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: 'load-me', component: LazyParentComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LazyParentComponent,
    LazyChildComponent
  ]
})
export class LazyRouteExampleModule { }
