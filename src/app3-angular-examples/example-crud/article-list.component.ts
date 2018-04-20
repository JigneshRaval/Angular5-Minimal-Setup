import { Component } from '@angular/core';
import { ArticleService } from './article.service';

@Component({
    selector: 'article-list-component',
    template: `
        <h1>Article List Component</h1>
        <button (click)="createArticle($event)">Create Article</button>
    `,
    providers: [ArticleService]
})
export class ArticleListComponent {

    constructor(private articleService: ArticleService) {}

    ngOnInit() {
        this.articleService.getAllArticles().subscribe(articles => console.log(articles));
    }

    createArticle(event) {
        this.articleService.createArticle().subscribe(article => console.log(article));
    }
}
