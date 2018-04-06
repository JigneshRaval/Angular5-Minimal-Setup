// Ref : https://angularfirebase.com/lessons/sharing-data-between-angular-components-four-methods/

// Child to Parent: Sharing Data via ViewChild()
/*
ViewChild allows a one component to be injected into another, giving the parent access to its attributes and functions. One caveat, however, is that child won’t be available until after the view has been initialized. This means we need to implement the AfterViewInit lifecycle hook to receive the data from the child.
*/
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ChildTwoComponent } from './child.component';

@Component({
    selector: 'parent-two-component',
    template: `
        <div style="border: 1px solid #CCC; padding: 1em; background-color: #00bcd4;">
            <h3>Parent Two component</h3>
            Message : {{message}}

            <child-two-component></child-two-component>

            <button (click)="updateMessage($event)">Update Message</button>
        </div>
    `
})
export class ParentTwoComponent implements AfterViewInit {
    message: string = 'Message parent Two.';

    @ViewChild(ChildTwoComponent) child;

    constructor() { }

    ngAfterViewInit() {
        this.message = this.child.messageToParent;
    }

    updateMessage() {
        this.message = this.child.childFunction();
    }
}
