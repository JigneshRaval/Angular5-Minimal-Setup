import { Component } from '@angular/core';

@Component({
    selector: 'list-demo',
    template: `
        <h1>Generic List Demo</h1>
        <generic-list [items]="items">
            <ng-template let-item="$implicit" let-i="index" let-c="count" pTemplate="header">
                <li>[{{i}}] Hello: {{item.title}} ( count : {{c}})</li>
            </ng-template>
        </generic-list>

        <generic-list [items]="cols">
            <ng-template let-item="$implicit" let-i="index" let-c="count" pTemplate="body">
                <li>[{{i}}] Hello 123: {{item.header}} ( count : {{c}})</li>
            </ng-template>
        </generic-list>
    `
})
export class ListDemo {
    items: any[] = [
        { id: 1, title: 'List Item 1' },
        { id: 2, title: 'List Item 2' },
        { id: 3, title: 'List Item 3' },
        { id: 4, title: 'List Item 4' }
    ];
    cols = [
        {field: 'vin', header: 'Vin'},
        {field: 'year', header: 'Year'},
        {field: 'brand', header: 'Brand'},
        {field: 'color', header: 'Color'}
    ];
    cars: any[] = [
        { id: 1, name: 'Maruti' },
        { id: 2, name: 'Tata' },
        { id: 3, name: 'Audi' },
        { id: 4, name: 'BMW' }
    ];
}
