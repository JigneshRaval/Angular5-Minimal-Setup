import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
// import "rxjs/Rx";
// import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'list-view-component',
    template: `
        <strong>Countries : </strong> <input type="text" [ngModel]="countries" />
        <ul>
            <li *ngFor="let country of countries; let i = index;">{{country.name}} = {{country.code}}</li>
        </ul>
    `
})
export class ListViewComponent {
    private countryApiUrl = '../../assets/data/country.json';
    private countries = [];
    constructor(private http: Http) { }

    getCountries() {
        // Method 1
        // ==============================
        return this.http.get(this.countryApiUrl)
            .toPromise()
            .then(res => <any[]>res.json().data)
            .then(data => {
                console.log('Data :', data);
                return data;
            });

        // Method 2
        // ===============================
        /*
        return this.http.get(this.countryApiUrl)
            .map((response: Response) => {
                return response.json();
            })
            .catch();
            */
    }

    // Filter given country from list of contries
    filterCountry(query, countries: any[]): any[] {
        // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];
        for (let i = 0; i < countries.length; i++) {
            let country = countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(country);
            }
        }
        return filtered;
    }

    ngAfterViewInit() {
        // Method 1
        // ==============================
        /*this.getCountries().subscribe(data => {
            // Read the user infos  from the JSON response
            this.countries = data['data'];
            console.log(data);
        });*/

        // Method 2
        // ==============================
        this.getCountries().then(data => {
            let singleItem = this.filterCountry('india', data);
            this.countries = singleItem;
            console.log(this.countries);
        });

        console.log(this.countries);
    }
}
