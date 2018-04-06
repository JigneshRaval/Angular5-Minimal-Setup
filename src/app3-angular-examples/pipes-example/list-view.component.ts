// Filter country list
import { Component, AfterViewInit } from '@angular/core';
import { Http, Response } from '@angular/http';

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
        this.http.get(this.countryApiUrl)
            .map((response: Response) => {
                return response.json();
            }).subscribe(data => {
                this.countries = data['data'];
            })
    }
}
