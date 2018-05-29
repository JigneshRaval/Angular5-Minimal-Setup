import { Component } from '@angular/core';
/* import { CountryService } from './country.service';
import { Country } from './country';
import { State } from './state'; */

@Component({
    selector: 'connected-dropdown-component',
    template: `
    <h3>Connected Select Dropdowns</h3>

    <form #f="ngForm" novalidate (ngSubmit)="submitForm(f, f.valid)">
        <div class="uk-margin">
            <label>Country:</label>
            <select class="uk-select" [(ngModel)]="selectedCountry.id" (change)="onSelect($event.target.value)">
                <option value="0">--Select Country--</option>
                <option *ngFor="let country of countries" value={{country.id}}>{{country.name}}</option>
            </select>
        </div>

        <div class="uk-margin" *ngIf="isContrySelected">
            <label>State:</label>
            <select class="uk-select">
                <option *ngIf='selectedCountry.id == 0' value="0">--Select State--</option>
                <option *ngFor="let state of states " value={{state.id}} [disabled]="state.countryid==0">{{state.name}}</option>
            </select>
        </div>
    </form>
    `
})
export class ConnectedDropdownComponent {
    public countries: any[] = [];
    public states: any[] = [];
    public statesList: any[] = [];
    public selectedCountry;
    public isContrySelected = false;

    constructor() {

        this.selectedCountry = { id: 2, name: 'India' }

        // country.ts
        this.countries = [
            { id: 1, name: 'United States' },
            { id: 2, name: 'India' },
            { id: 3, name: 'Australia' },
            { id: 4, name: 'New Zealand' },
            { id: 5, name: 'South Africa' },
            { id: 6, name: 'United Kingdom' }
        ]

        // state.ts
        this.statesList = [
            { id: 1, countryid: 1, name: 'Alabama' },
            { id: 2, countryid: 1, name: 'Arizona' },
            { id: 3, countryid: 1, name: 'Arkansas' },
            { id: 4, countryid: 1, name: 'California' },
            { id: 5, countryid: 2, name: 'New Delhi' },
            { id: 5, countryid: 2, name: 'Goa' },
            { id: 6, countryid: 2, name: 'Punjab' },
            { id: 7, countryid: 2, name: 'Haryana' },
            { id: 8, countryid: 3, name: 'New South Wales' },
            { id: 9, countryid: 3, name: 'Tasmania' },
            { id: 10, countryid: 3, name: 'Qweensland' },
            { id: 11, countryid: 3, name: 'Western Australia' },
            { id: 12, countryid: 3, name: 'Victoria' },
            { id: 13, countryid: 4, name: 'Auckland' },
            { id: 14, countryid: 4, name: 'Wellington' },
            { id: 15, countryid: 4, name: 'Christchurch' },
            { id: 16, countryid: 4, name: 'Hamilton' },
            { id: 17, countryid: 4, name: 'Napier' },
            { id: 18, countryid: 5, name: 'Eastern Cape' },
            { id: 19, countryid: 5, name: 'Limpopo' },
            { id: 20, countryid: 5, name: 'Mpumalanga' },
            { id: 21, countryid: 5, name: 'North West' },
            { id: 22, countryid: 5, name: 'Northern Cape' },
            { id: 23, countryid: 6, name: 'Herefordshire' },
            { id: 24, countryid: 6, name: 'Durham' },
            { id: 25, countryid: 6, name: 'Manchester' },
            { id: 26, countryid: 6, name: 'South Yorkshire' },
            { id: 27, countryid: 6, name: 'Birmingham' }
        ];
    }

    onSelect(countryid) {
        this.states = this.statesList.filter((item) => item.countryid == countryid);

        // Toggle display state dropdown
        if (this.states.length > 0) {
            this.isContrySelected = true;
        } else {
            this.isContrySelected = false;
        }
        // this.states = this._countryService.getStates().filter((item) => item.countryid == countryid);
    }

    submitForm(model, isValid: boolean) {
        // Check if model is valid
        // if valid, call API to save user data
        console.log(model, isValid);

        let language = model.form.controls;

        console.log('Language :: ', language);

    }
}


// https://www.c-sharpcorner.com/article/cascading-drop-down-in-angular-2/
