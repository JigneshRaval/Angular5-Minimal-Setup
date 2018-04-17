import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Example1TabComponent } from './tab.component';
import { Example1TabContentComponent } from './tab-content.component';
import { Example1TabMainComponent } from './tab-main.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        Example1TabComponent,
        Example1TabContentComponent,
        Example1TabMainComponent
    ],
    exports: [
        Example1TabMainComponent
    ]
})
export class TabsModule {

}
