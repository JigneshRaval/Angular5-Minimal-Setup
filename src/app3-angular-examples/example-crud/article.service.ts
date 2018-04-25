import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

/* export interface Article {
    articleTitle: string;
    articleCreatedDate: Date;
    articleContent: string;
    articleImage: string;
} */

@Injectable()
export class ArticleService {
    private apiUrl = 'http://localhost:3005';

    constructor(private http: HttpClient) { }

    createArticle() {
        const payload = new HttpParams()
            .set(`articleTitle`, 'My first Article')
            .set('articleCreatedDate', new Date())
            .set('articleContent', 'Content of Article')
            .set('articleImage', 'article.png');

        const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

        // const headers = new HttpHeaders({'Content-Type': 'application/json'})

        return this.http.post(`${this.apiUrl}/api/articles/create`, payload, {
            headers: headers
        }).map(res => console.log(res));
    }

    getAllArticles() {
        return this.http.get(`${this.apiUrl}/api/articles`).map(res => console.log(res));
    }

    sGetCarModels() {
        return this.http.get(`${this.apiUrl}/api/cars/models`, { responseType: 'text'});
    }

    sGetCarBrands() {
        return this.http.get(`${this.apiUrl}/api/cars/brands`).map(res => console.log(res));
    }
}



