import { Component, Input} from '@angular/core';

@Component({
    selector: 'child-two-component',
    template: `
        <div style="border: 1px solid #CCC; padding: 1em; background-color: #03a9f4;">
            <h3>Child Two component</h3>
            {{messageToParent}}
        </div>
    `
})
export class ChildTwoComponent {
    messageToParent: string = 'Message to parent from child component';

    childFunction() {
        this.messageToParent = 'Updated :: Message to parent from child component';
        console.log('Hi, from child two.');
        return this.messageToParent;
    }
}
