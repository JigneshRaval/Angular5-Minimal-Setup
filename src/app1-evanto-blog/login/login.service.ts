import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable()
export class LoginService {

    constructor(private http: HttpClient) { }

    validateLogin(user: User) {
        const body = new HttpParams()
            .set(`username`, user.username)
            .set(`password`, user.password);

        const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

        // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        /* const httpOptions = {
            headers: new HttpHeaders().set('content-type', 'application/json')
        }; */

        return this.http.post('http://localhost:3005/api/user/login', body.toString(), { headers });
    }

}
