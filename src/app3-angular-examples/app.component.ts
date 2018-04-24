import { Component, ViewChild } from '@angular/core';

/* declare var jquery: any;
declare var $: any;
declare var hljs: any; */

@Component({
    selector: 'app-root',
    template: `
        <div class="uk-container uk-container-expand">
            <header-component></header-component>

            <div class="uk-flex">
                <div class="uk-width-1-4 uk-padding uk-background-muted">
                    <examples-sidebar></examples-sidebar>
                </div>
                <div class="uk-width-1-1 uk-padding">
                    <router-outlet (activate)="changeOfRoutes()"></router-outlet>
                </div>
            </div>

            <footer-component></footer-component>
        </div>
    `
})
export class AppComponent {

    changeOfRoutes() {
        alert('Hi router changed');
        // Highlight code syntax
        if ($) {
            $('pre code').each(function (i, block) {
                if (hljs) {
                    hljs.highlightBlock(block);
                }
            });
        }
    }
}
