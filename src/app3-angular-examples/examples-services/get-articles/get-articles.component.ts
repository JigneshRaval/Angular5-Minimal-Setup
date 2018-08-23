// REF : https://symbiotics.co.za/using-observables-in-angular-4-to-get-data-from-an-api-service/

import { Component, OnInit } from '@angular/core';
import { GetArticlesService } from './get-articles.service';
import { DataSharingService } from './data-sharing.service';

@Component({
    selector: 'get-articles-component',
    template: `
        <h2><code>get-articles-component</code></h2>
        <ul class="uk-list uk-list-striped">
            <li *ngFor="let post of _postsArray" trackby="post.id">
                <h3>{{post.name}}</h3>
                <p>{{post.email}}</p>
            </li>
        </ul>
    `
})
export class GetArticlesComponent implements OnInit {
    _postsArray = [];

    constructor(
        private getArticleService: GetArticlesService,
        private dataSharingService: DataSharingService
    ) { }

    ngOnInit() {
        // Method 1 : Simple Service using HTTP get method
        // ==============================================
        this.getArticleService.getPosts().subscribe(data => {
            this._postsArray = data;
            console.log('Method 1 : Get Articles service :', data);

            this.dataSharingService.setComments(data);
        });


        // Method 2 : Using Data Sharing Service
        // ==============================================
        this.getArticleService.getPosts().subscribe(data => {
            // 1. Set data in Observable Subject in data-sharing.service.ts
            this.dataSharingService.setComments(data);
        });

        // 2. Set data in Observable Subject in data-sharing.service.ts
        this.dataSharingService.getComments().subscribe(data => {
            console.log('Method 2 : Data Sharing service :', data);
        })
    }
}
