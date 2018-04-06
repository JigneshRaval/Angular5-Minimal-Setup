import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { User } from '../models/user.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [LoginService]
})
export class LoginComponent {
    public user: User;

    constructor(private loginService: LoginService, private router: Router) {
        this.user = new User();
    }

    validateLogin() {
console.log('validateLogin :', this.user, this.user.username , this.user.password);

        if (this.user.username && this.user.password) {
            this.loginService.validateLogin(this.user).subscribe(result => {
                console.log('Result: ', result);

                if (result['status'] === 'success') {
                    this.router.navigate(['/home']);
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
