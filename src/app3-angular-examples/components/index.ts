import { Component } from '@angular/core';

@Component({
    selector: 'examples-sidebar',
    template: `
    <nav class="examples-sidebar">
        <a class="p-2 text-dark" routerLink="/">Features</a>
        <a class="p-2 text-dark" routerLink="/home">Enterprise</a>
        <a class="p-2 text-dark" routerLink="/adbanner">Ad Banner</a>
        <a class="p-2 text-dark" routerLink="/contact">contact us</a>
    </nav>
    `
})
export class ExamplesSidebarComponent {

}
