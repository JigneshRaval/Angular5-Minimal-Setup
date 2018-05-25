import { Component, OnInit } from '@angular/core';
import { User } from './user.interface';
import { Profile } from './profile';
import { UserNew } from './user';

@Component({
    selector: 'form-select-dropdown-component',
    templateUrl: './form-select-dropdown.component.html',
    styles: [
        `.has-error select { border: 1px solid red; }
        .has-error input { border: 1px solid red; }
        `
    ]
})
export class FormSelectDropdownComponent implements OnInit {
    public user: User; // our model
    public langs: string[];

    allProfiles: Profile[];
    userNew = new UserNew();

    ngOnInit() {

        // Set initial data for all the form fields
        this.user = {
            language: '',
            name: '',
            address: {
                street: '',
                postalcode: '8082'
            }
        };

        this.langs = [
            'English',
            'French',
            'German',
        ];

        this.allProfiles = this.getProfile();

        this.setDefaultValue();

    }

    setDefaultValue() {
        this.userNew.userName = "Narendra Modi";
        this.userNew.profile = this.allProfiles[2];
    }

    getProfile() {
        let profiles = [
            new Profile('dev', 'Developer'),
            new Profile('man', 'Manager'),
            new Profile('dir', 'Director')
        ]
        return profiles;
    }

    onProfileChange(event) {

        this.userNew.profile = this.allProfiles[event.target.selectedIndex - 1];

        console.log('111 :',this.userNew.profile, event.target.selectedIndex);

        console.log('Profile Changed: ' + event.target.options[event.target.selectedIndex].value);
    }

    submitForm(model, isValid: boolean) {
        // Check if model is valid
        // if valid, call API to save user data
        console.log(model, isValid);

        let userProfile: Profile = model.form.controls['profile'].value;

        console.log('userProfile :: ', userProfile);

        let language = model.form.controls['language'].value;

        console.log('Language :: ', language);

    }
}
