// Filter country list
import { Component, AfterViewInit } from '@angular/core';
import { Http, Response } from '@angular/http';

// How to import .JSON file in Angular and Typescript
// Method 1 : Using import ( Using Wildcard Module Name )
// Source : https://hackernoon.com/import-json-into-typescript-8d465beded79
/* First Add following in typings.d.ts
declare module "*.json" {
    const value: any;
    export default value;
}

Then, your code will work like charm!

// Typescript
// app.ts
import * as data from './example.json';
const word = (<any>data).name;
console.log(word); // output 'testing'
*/
import * as data from '../../assets/data/country.json';

@Component({
    selector: 'filter-list-view-component',
    template: `
        <h3>Convert to uppercase pipe example</h3>

        <p>{{title | upperCasePipe}}</p>

        <h3>Filter country list pipe example</h3>

        <input placeholder="country name" [(ngModel)]="searchText"/>
        <ul style="height: 250px; border: 1px solid red; overflow: auto; width: 300px;">
            <li *ngFor="let country of countries | searchFilterList: searchText">
                {{country.name | upperCasePipe}} ({{country.code}})
            </li>
        </ul>
    `
})
export class FilterListViewComponent implements AfterViewInit {
    private title = "This is title";
    private countryApiUrl = '../../../assets/data/country.json';

    private countries = [];

    constructor(private http: Http) { }

    ngAfterViewInit() {


        console.log('DATA :', data); // output 'testing'

        this.http.get(this.countryApiUrl)
            .map((response: Response) => {
                return response.json();
            }).subscribe(data => {
                this.countries = data['data'];
            })
    }
}
