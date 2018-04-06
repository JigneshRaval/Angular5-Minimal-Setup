import { Component } from '@angular/core';

@Component({
    selector: 'app-component',
    template: `
        <main class="container">
            <div class="uk-container">
                <bootstrap-template-component></bootstrap-template-component>
            </div>

            <router-outlet></router-outlet>
        </main>
    `
})
export class AppComponent {
    
}
