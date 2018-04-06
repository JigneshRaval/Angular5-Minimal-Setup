import { Component } from '@angular/core';

@Component({
    selector: 'bootstrap-template-component',
    template: `
        <main>
            <header-component></header-component>
            <main role="main">
                <jumbotron-component></jumbotron-component>
                <album-card-component></album-card-component>
            </main>
            <footer-component></footer-component>
        </main>
    `
})
export class BootstrapTemplateComponent {

}
