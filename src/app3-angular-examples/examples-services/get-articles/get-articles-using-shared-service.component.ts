// REF : https://symbiotics.co.za/using-observables-in-angular-4-to-get-data-from-an-api-service/

import { Component, OnInit } from '@angular/core';
import { DataSharingService } from './data-sharing.service';

@Component({
    selector: 'get-articles-using-shared-service-component',
    template: `
        <h2><code>get-articles-using-shared-service-component</code></h2>
        <ul class="uk-list uk-list-striped">
            <li *ngFor="let post of _postsArray" trackby="post.id">
                <h3>{{post.name}}</h3>
                <p>{{post.email}}</p>
            </li>
        </ul>
        <button (click)="addNewComment()">Add New Comment</button>
    `
})
export class GetArticlesUsingSharedServiceComponent implements OnInit {
    _postsArray: any;

    constructor(
        private dataSharingService: DataSharingService
    ) { }

    ngOnInit() {
        this.dataSharingService.getComments().subscribe(data => {
            this._postsArray = data;
            console.log('GetArticlesUsingSharedServiceComponent: Data Sharing service :', data);
        });
    }

    addNewComment() {
        let comment = {
            body: "Newly added comment",
            email: "jignesh@cignex.com",
            id: 6,
            name: "id labore ex et quam laborum",
            postId: 6
        }

        this._postsArray.push(comment);

        this.dataSharingService.addNewComment(this._postsArray);
    }
}
