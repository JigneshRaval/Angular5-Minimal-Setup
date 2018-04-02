import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from './signup.service';
import { User } from '../models/user.model';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    providers: [SignupService]
})
export class SignupComponent {
    private user: User;

    constructor(private signupService: SignupService, private router: Router) {
        this.user = new User();
     }

    validateSignup() {
        console.log('validateSignup :', this.user, this.user.username , this.user.password);

        if (this.user.username && this.user.password) {
            this.signupService.validateSignupService(this.user).subscribe(result => {
                console.log('Result: ', result);

                if (result['status'] === 'success') {
                    this.router.navigate(['/']);
                } else {
                    console.log('Wrong username or password');
                    this.router.navigate(['/signup']);
                }
            }, error => {
                console.log(error);
            });
        } else {
            console.log('Wrong username or password');
        }
    }
}
