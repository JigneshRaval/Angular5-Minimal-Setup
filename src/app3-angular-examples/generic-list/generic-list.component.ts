import { Component, Input, ContentChild, ContentChildren, TemplateRef, QueryList, AfterContentInit } from '@angular/core';
import { PrimeTemplate } from './generic-list.directive';

@Component({
    selector: 'generic-list',
    template: `
        <h3>List using LI tags</h3>
        <ul class="list-group">
            <li *ngFor="let item of items">
                {{item.title}}
            </li>
        </ul>

        <h3>List using ng-template ( Header Template )</h3>
        <ul class="list-group">
            <ng-template ngFor [ngForOf]="items" [ngForTemplate]="headerTemplate">
            </ng-template>
        </ul>

        <h3>List using ng-template ( Body Template )</h3>
        <ul class="list-group">
            <ng-template ngFor [ngForOf]="items" [ngForTemplate]="bodyTemplate">
            </ng-template>
        </ul>

        <h3>Generic List Footer</h3>
        <h4>
            <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
        </h4>

    `
})
export class GenericListComponent implements AfterContentInit {
    public headerTemplate: TemplateRef<any>;
    public bodyTemplate: TemplateRef<any>;
    public footerTemplate: TemplateRef<any>;

    @Input() items: any[] = [];

    @ContentChild(TemplateRef) itemTmpl: TemplateRef<any>;
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    ngAfterContentInit(): void {
        console.log('ngAfterContentInit :', this.templates);

        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    console.log('Header :', item.template);
                    break;

                case 'body':
                    this.bodyTemplate = item.template;
                    console.log('Body :', item.template);
                    break;

                case 'footer':
                    this.footerTemplate = item.template;
                    console.log('Footer :', item.template);
                    break;

                case 'filter':
                    console.log(item.template);
                    break;

                case 'editor':
                    console.log(item.template);
                    break;

                default:
                    console.log(item.template);
                    break;
            }
        });
    }
}
