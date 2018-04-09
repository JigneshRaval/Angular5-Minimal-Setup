import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <header-component></header-component>

        <main class="content">
            <examples-sidebar></examples-sidebar>
            <router-outlet></router-outlet>
        </main>

        <footer-component></footer-component>
    `
})
export class AppComponent {

}
