import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleService } from './article.service';
import { ArticleListComponent } from './article-list.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ArticleListComponent
    ],
    exports: [
        ArticleListComponent
    ]
})
export class ArticlesModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ArticlesModule,
            providers: [
                ArticleService
            ]
        }
    }
}
