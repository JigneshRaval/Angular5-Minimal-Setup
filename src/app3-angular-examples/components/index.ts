import { Component } from '@angular/core';

@Component({
    selector: 'examples-sidebar',
    template: `
        <nav class="bd-links examples-sidebar" id="bd-docs-nav">
            <div class="bd-toc-item">
                <a class="bd-toc-link" href="/docs/4.0/getting-started/introduction/">Getting started</a>

                <ul class="bd-sidenav">
                    <li><a routerLink="/">Introduction</a></li>
                    <li><a routerLink="/home">Download</a></li>
                    <li><a routerLink="/adbanner">Ad Banner</a></li><li>
                    <li><a class="p-2 text-dark" routerLink="/contact">contact us</a></li>
                </ul>
            </div>
        </nav>
    `
})
export class ExamplesSidebarComponent {

}
