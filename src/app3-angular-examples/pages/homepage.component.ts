import { Component, ViewChild } from '@angular/core';

import { DialogComponent } from '../example-dynamic-dialog/dialog.component';
import { DialogAnchorDirective } from '../example-dynamic-dialog/dialog-anchor.directive';

@Component({
    selector: 'app-home-page',
    template: `

            <h2>Home page</h2>


            <div class="uk-container">
                <!-- <bootstrap-template-component></bootstrap-template-component> -->

                <example1-tab-main-component></example1-tab-main-component>
                <example2-main-component></example2-main-component>
                <!--<example3-carousel-main-component></example3-carousel-main-component>-->

                <div dialogAnchor></div>
                <div class="open-button" (click)='openDialogBox()'>Open dialog box</div>

                <template-driven-form-1-component></template-driven-form-1-component>
<duplicate-form-fields></duplicate-form-fields>
                <list-demo></list-demo>
            </div>
    `
})
export class HomePage {
    @ViewChild(DialogAnchorDirective) dialogAnchor: DialogAnchorDirective;

    openDialogBox() {
        this.dialogAnchor.createDialog(DialogComponent);
    }
}
