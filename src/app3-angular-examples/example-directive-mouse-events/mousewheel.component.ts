import { Component } from '@angular/core';

@Component({
    selector: 'mousewheel-directive-example-component',
    template: `
        <h2>Mouse wheel scroll on below div</h2>
        <h4 style="color:green">{{mouseWheelDirection}}</h4>
        <div mouseWheel (mouseWheelUp)="mouseWheelUpFunc(event)" (mouseWheelDown)="mouseWheelDownFunc(event)" style="height: 150px;width:150px;border:1px solid red;">Scroll in this area</div>
    `
})
export class MouseWheelDirectiveExampleComponent {
    mouseWheelDirection: string;

    constructor() {

    }

    mouseWheelUpFunc() {
        this.mouseWheelDirection = "Scrolling Upward Direction";
    }

    mouseWheelDownFunc() {
        this.mouseWheelDirection = "Scrolling Downward Direction"
    }
}