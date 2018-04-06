import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'accordion-one-component',
    template: `
        <input type="text" value="" (input)="accordionChange($event)" />
        <div>
            <p>Accordion</p>
        </div>
    `
})
export class AccordionComponent {
    inputVal;
    @Output() myFunction: EventEmitter<any> = new EventEmitter();

    constructor() {

    }

    accordionChange(event) {
        console.log(event.target.value);
        this.myFunction.emit(event.target.value)
    }

}
