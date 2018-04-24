import { Component, ViewChild } from '@angular/core';

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
                    <router-outlet></router-outlet>
                </div>
            </div>

            <footer-component></footer-component>
        </div>



    `
})
export class AppComponent {

}
