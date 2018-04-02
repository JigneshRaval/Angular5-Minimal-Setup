import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Http, Response, RequestOptions, Headers, ResponseType } from '@angular/http';
@Injectable()
export class LoginService {

    constructor(private http: HttpClient) { }

    validateLogin(user: User) {
        let header = new HttpHeaders();

        const httpOptions = {
            headers: new HttpHeaders().set('content-type', 'application/json')
        };
        let other_header = httpOptions.headers.set('content-type', 'application/json; charset=utf-8');

        return this.http.post('http://localhost:3005/api/user/login', {
            username: user.username,
            password: user.password
        }, httpOptions);
    }

}
