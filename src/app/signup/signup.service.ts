import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable()
export class SignupService {

    constructor(private http: HttpClient) {}

    validateSignupService(user: User) {
        return this.http.post('http://localhost:3005/api/user/create', {
            name: user.username,
            username: user.username,
            password: user.password
        });
    }
}
