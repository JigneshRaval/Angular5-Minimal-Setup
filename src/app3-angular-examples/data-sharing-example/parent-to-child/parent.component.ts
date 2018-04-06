// Ref : https://angularfirebase.com/lessons/sharing-data-between-angular-components-four-methods/

// Parent to Child: Sharing Data via Input()
import { Component } from '@angular/core';

@Component({
    selector: 'parent-one-component',
    template: `
        <div style="border: 1px solid #CCC; padding: 1em; background-color: #25aae1;">
            <h3>Parent one component</h3>
            {{message}}
            <child-one-component [messageFromParent]="message"></child-one-component>
        </div>
    `
})
export class ParentOneComponent {
    message: string = 'Message from parent.';
}
