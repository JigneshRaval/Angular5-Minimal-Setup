import { Component, Input } from '@angular/core';

@Component({
    selector: 'example1-tab-component',
    template: `
    <div class="wrapper unselectable" [ngClass]="{ active: active }">
        <ng-content></ng-content>
    </div>
    `,
    styles: [`
        :host {
        cursor: pointer;
        user-select: none;
        }

        .wrapper {
        padding: 1rem;
        background-color: #ddd;
        }

        .active {
        background-color: #bbb;
        }

        .unselectable {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
  `]
})
export class Example1TabComponent {
    @Input() active: boolean = false;
}
