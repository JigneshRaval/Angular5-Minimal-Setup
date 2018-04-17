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

        <ul uk-tab>
            <li><a href="#">tab.module.ts</a></li>
            <li><a href="#">tab.component.ts</a></li>
            <li><a href="#">tab-content.component.ts</a></li>
            <li><a href="#">Usage</a></li>
        </ul>

        <ul class="uk-switcher uk-margin">
        <li>
<pre><code ngNonBindable>
import &#123; NgModule } from '@angular/core';
import &#123; CommonModule } from '@angular/common';

import &#123; Example1TabComponent } from './tab.component';
import &#123; Example1TabContentComponent } from './tab-content.component';
import &#123; Example1TabMainComponent } from './tab-main.component';

@NgModule(&#123;
    imports: [
        CommonModule
    ],
    declarations: [
        Example1TabComponent,
        Example1TabContentComponent,
        Example1TabMainComponent
    ],
    exports: [
        Example1TabMainComponent
    ]
})
export class TabsModule &#123;

}
</code></pre>
        </li>
        <li><pre><code ngNonBindable>
import &#123; Component, Input } from '@angular/core';

@Component(&#123;
    selector: 'example1-tab-component',
    template: \`
    &lt;div class="wrapper unselectable" [ngClass]="&#123; active: active }">
        &lt;ng-content>&lt;/ng-content>
    &lt;/div>
    \`,
    styles: [\`
        :host &#123;
        cursor: pointer;
        user-select: none;
        }

        .wrapper &#123;
        padding: 1rem;
        background-color: #ddd;
        }

        .active &#123;
        background-color: #bbb;
        }

        .unselectable &#123;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
    \`]
})
export class Example1TabComponent &#123;
    @Input() active: boolean = false;
}
</code></pre></li>
<li><pre><code ngNonBindable>import &#123; Component, Input } from '@angular/core';

@Component(&#123;
    selector: 'example1-tab-content-component',
    template: \`
        &lt;div class="door">
            &lt;ng-content>&lt;/ng-content>
        &lt;/div>
        \`,
    styles: [\`
        :host &#123;
            border: 1px solid #ddd;
            border-top: 0;
            margin-bottom: 2rem;
            display: block;
            padding: 8px;
        }
    \`]
})
export class Example1TabContentComponent &#123;
}
</code></pre></li>
<li><pre><code ngNonBindable>&lt;div class="tabs-selection">
    &lt;example1-tab-component [active]="isSelected(1)" (click)="setTab(1)">Tab 1&lt;/example1-tab-component>
    &lt;example1-tab-component [active]="isSelected(2)" (click)="setTab(2)">Tab 2&lt;/example1-tab-component>
    &lt;example1-tab-component [active]="isSelected(3)" (click)="setTab(3)">Tab 3&lt;/example1-tab-component>
&lt;/div>

&lt;div [ngSwitch]="tab">
    &lt;example1-tab-content-component *ngSwitchCase="1">Tab content 1&lt;/example1-tab-content-component>
    &lt;example1-tab-content-component *ngSwitchCase="2">Tab content 2&lt;/example1-tab-content-component>
    &lt;example1-tab-content-component *ngSwitchCase="3">Tab content 3&lt;/example1-tab-content-component>
    &lt;example1-tab-content-component *ngSwitchDefault>Select a tab&lt;/example1-tab-content-component>
&lt;/div>

export class Example1TabMainComponent &#123;
    tab = 0;

    setTab(num: number) &#123;
        this.tab = num;
    }

    isSelected(num: number) &#123;
        return this.tab === num;
    }
}
</code></pre></li>
        </ul>
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
