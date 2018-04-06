// Ref : https://angular-2-training-book.rangle.io/handout/directives/ng_switch_directives.html
// DEMO : https://plnkr.co/edit/QWxD0DIZi6QiISafwfgu?p=preview

import { Component } from '@angular/core';

@Component({
    selector: 'example1-tab-main-component',
    template: `
        <h3>Example 1 : Tabs component</h3>
        <p>This example shows usage of ngSwitch, ngSwitchCase and ngSwitchDefault</p>
        <div class="tabs-selection">
            <example1-tab-component [active]="isSelected(1)" (click)="setTab(1)">Tab 1</example1-tab-component>
            <example1-tab-component [active]="isSelected(2)" (click)="setTab(2)">Tab 2</example1-tab-component>
            <example1-tab-component [active]="isSelected(3)" (click)="setTab(3)">Tab 3</example1-tab-component>
        </div>

        <div [ngSwitch]="tab">
            <example1-tab-content-component *ngSwitchCase="1">Tab content 1</example1-tab-content-component>
            <example1-tab-content-component *ngSwitchCase="2">Tab content 2</example1-tab-content-component>
            <example1-tab-content-component *ngSwitchCase="3">Tab content 3</example1-tab-content-component>
            <example1-tab-content-component *ngSwitchDefault>Select a tab</example1-tab-content-component>
        </div>
    `,
    styles: [`
        :host {
            font-family: Arial;
        }

        .tabs-selection {
            background-color: #ddd;
            display: flex;
            box-sizing: border-box;
            flex-direction: row;
            padding-left: 16px;
            padding-right: 16px;
            width: 100%;
        }
  `]
})
export class Example1TabMainComponent {
    tab = 0;

    setTab(num: number) {
        this.tab = num;
    }

    isSelected(num: number) {
        return this.tab === num;
    }
}
