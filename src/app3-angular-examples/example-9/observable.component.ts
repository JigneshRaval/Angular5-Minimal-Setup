import { Component } from '@angular/core';
import  position from './observe-mouse-move'

@Component({
    selector: 'observable-examples-component',
    template: `
        <div>

        </div>
    `
})
export class ObservableExamplesComponent {
    test;
    constructor() {
        this.test = position.subscribe(data => console.log('Data:', data));
        console.log('position :', position, this.test);
    }
}
