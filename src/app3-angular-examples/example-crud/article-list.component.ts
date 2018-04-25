import { Component } from '@angular/core';
import { ArticleService } from './article.service';

@Component({
    selector: 'article-list-component',
    template: `
        <h1>Article List Component</h1>
        <button (click)="createArticle($event)">Create Article</button>

        <button (click)="getCarBrands($event)">Car Router ( Get Car Brands )</button>

        <button (click)="getCarModels($event)">Car Router ( Get Car Models )</button>
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

    getCarBrands(event) {
        this.articleService.sGetCarBrands().subscribe(cars => console.log('Car Brand :', cars));
    }

    getCarModels(event) {
        this.articleService.sGetCarModels().subscribe(cars => console.log('Car Models :', cars));
    }
}
