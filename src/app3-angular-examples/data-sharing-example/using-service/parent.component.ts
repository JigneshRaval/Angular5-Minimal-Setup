// https://embed.plnkr.co/P8xCEwSKgcOg07pwDrlO/
// Communication between component siblings via a service
import { Component } from '@angular/core';
import { SharedService } from './shared.service';
import { Sibling1Component } from './child1.component';
import { Sibling2Component } from './child2.component';

@Component({
    selector: 'parent-three-component',
    template: `
        <div>
            <h2>Communication between component siblings via a service</h2>
            <a href="https://angular.io/docs/ts/latest/cookbook/component-communication.html#!#bidirectional-service" target="_blank">Reference</a>
        </div>
            Start typing in casenumber field of any component and you
            will see the data in other component. These two siblings
            exchange the data on submit.
            <hr>
        <sibling1-component></sibling1-component><hr>
        <sibling2-component></sibling2-component>
  `,
    providers: [SharedService]
})
export class ParentThreeComponent {
    name: string;
    constructor() {
        this.name = 'Angular2'
    }
}
