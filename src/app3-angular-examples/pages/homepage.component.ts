import { Component, ViewChild } from '@angular/core';

import { DialogComponent } from '../example-dynamic-dialog/dialog.component';
import { DialogAnchorDirective } from '../example-dynamic-dialog/dialog-anchor.directive';

@Component({
    selector: 'app-home-page',
    template: `

            <h2>Home page</h2>

            <div>
                <example1-tab-main-component></example1-tab-main-component>

                <example2-main-component></example2-main-component>

                <!--<example3-carousel-main-component></example3-carousel-main-component>-->

                <div dialogAnchor></div>

                <div class="open-button" (click)='openDialogBox()'>Open dialog box</div>

                <template-driven-form-1-component></template-driven-form-1-component>

                <duplicate-form-fields></duplicate-form-fields>

                <list-demo></list-demo>

                <filter-list-view-component></filter-list-view-component>

                <list-view-component></list-view-component>

                <example-observable-list></example-observable-list>

                <example-observable-subject></example-observable-subject>

                <obervable-with-async-pipe></obervable-with-async-pipe>

                <named-router-component></named-router-component>

                <article-list-component></article-list-component>

                <template-driven-form-component></template-driven-form-component>

                <form-select-dropdown-component></form-select-dropdown-component>

                <connected-dropdown-component></connected-dropdown-component>

                <footnote-filter-component></footnote-filter-component>
            </div>
    `
})
export class HomePage {
    @ViewChild(DialogAnchorDirective) dialogAnchor: DialogAnchorDirective;

    openDialogBox() {
        this.dialogAnchor.createDialog(DialogComponent);
    }
}
