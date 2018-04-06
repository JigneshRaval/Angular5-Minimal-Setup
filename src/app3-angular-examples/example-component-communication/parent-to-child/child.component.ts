import { Component, Input} from '@angular/core';

@Component({
    selector: 'child-one-component',
    template: `
        <div style="border: 1px solid #CCC; padding: 1em; background-color: #0e74bb;">
            <h3>Child one component</h3>
            {{messageFromParent}}
        </div>
    `
})
export class ChildOneComponent {
    @Input() messageFromParent: string;
}
