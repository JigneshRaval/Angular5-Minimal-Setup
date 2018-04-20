import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ArticleService {
    private apiUrl = 'http://localhost:3005';

    constructor(private http: HttpClient) { }

    createArticle() {
        return this.http.post(`${this.apiUrl}/api/articles/create`, {
            articleTitle: 'My first Article',
            articleCreatedDate: new Date(),
            articleContent: 'Content of Article',
            articleImage: 'article.png'
        }).map(res => console.log(res));
    }

    getAllArticles() {
        return this.http.get(`${this.apiUrl}/api/articles`).map(res => console.log(res));
    }
}



