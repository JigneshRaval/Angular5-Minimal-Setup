import { Component, OnInit } from '@angular/core';
import { User } from './user.interface';

@Component({
    selector: 'template-driven-form-component',
    templateUrl: 'app/components/form-example/template-driven-form.component.html'
})
export class TemplateDrivenFormComponent implements OnInit {
    public user: User; // our model

    ngOnInit() {
        this.user = {
            name: '',
            address: {
                street: '',
                postalcode: '8082'
            }
        }
    }

    save(model: User, isValid: boolean) {
        // Check if model is valid
        // if valid, call API to save user data
        console.log(model, isValid);
    }
}
