import { HomePage } from './pages/homepage.component';

// Bootstrap static template
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

// Example 1 [ Tab Component ]
/* import { Example1TabComponent } from './example-1/tab.component';
import { Example1TabContentComponent } from './example-1/tab-content.component'; */
import { Example1TabMainComponent } from './example-1/tab-main.component';

// Example 2 [ AdBanner Dynamic Component ]
import { AdBannerComponent, AdDirective, AdService, HeroJobAdComponent, HeroProfileComponent, Example2MainComponent } from './example-2/index';

// Example 3 [ Carousel Component ]
import { CarouselComponent } from './example-3/carousel.component';
import { Example3CarouselMainComponent } from './example-3/carousel-main.component';
import { PageVisibilityService } from './example-3/page-visibility.service';

// Example 4
import { DialogComponent } from './example-dynamic-dialog/dialog.component';
import { DialogAnchorDirective } from './example-dynamic-dialog/dialog-anchor.directive';

import DynamicComponent from './example-dynamic-component/dynamic.component';
import MainDynamicComponent from './example-dynamic-component/dynamic-component.main';
import HelloWorldComponent from './example-dynamic-component/hello-world.component';
import WorldHelloComponent from './example-dynamic-component/world-hello.component';

import { TemplateDrivenForm1Component } from './example-forms/template-driven-form-1/template-driven-form-1.component';
import { TemplateDrivenFormComponent } from './form-example/template-driven-form.component';
import { FormSelectDropdownComponent } from './form-select-dropdown-example/form-select-dropdown.component';

import { NgTemplateNgForComponent } from './ng-templates-examples/ng-template-ngfor.component';

import { GenericListComponent } from './generic-list/generic-list.component';
import { ListDemo } from './generic-list/generic-list-demo.component';
import { PrimeTemplate } from './generic-list/generic-list.directive';


import { ExamplesSidebarComponent } from './components/component.index';

import { DuplicateFormFields } from './duplicate-form-fields/duplicate-form-fields.component'

import { AngularTipsComponent } from './components/angular-tips.component';

import { ExampleObservableComponent } from './example-observable/example-observable.component';
import { ExampleObservableService } from './example-observable/example-observable.service';
import { ExampleObservableSubject } from './example-observable/example-observable-subject.component';
import { ObservableWithAsyncPipe } from './example-observable/observable-async-pipe.component';

import * as ObservableTimerExample from './example-observable/example-obervable-timer';

console.log('ObservableTimerExample:', ObservableTimerExample);

import { NamedRouterComponent } from './examples-router/named-router-outlets/named-router-outlet.component';
import { ChildRoute1Component } from './examples-router/named-router-outlets/child-route-1.component';
import { ChildRoute2Component } from './examples-router/named-router-outlets/child-route-2.component';
import { ChildRoute3Component } from './examples-router/named-router-outlets/child-route-3.component';

import { ArticleService } from './example-crud/article.service';

import { ListViewComponent } from './example-6/list-display.component';
import { FilterListViewComponent } from './example-6/list-view.component';

import { UpperCasePipe } from './pipes-example/uppercase.filter';
import { SearchFilterPipe } from './pipes-example/search-filter-list.pipe';

import { ConnectedDropdownComponent } from './connected-dropdown/connected-dropdown.component';

import { FootnoteFilterComponent } from './footnote-filter/footnote-filter.component';

import { GetArticlesComponent } from './examples-services/get-articles/get-articles.component';
import { GetArticlesUsingSharedServiceComponent } from './examples-services/get-articles/get-articles-using-shared-service.component';
import { GetArticlesService } from './examples-services/get-articles/get-articles.service';
import { DataSharingService } from './examples-services/get-articles/data-sharing.service';

// Export all Components, Entry Components, Directives, Pipes and Services
export const MY_EXAMPLES = {
    "COMPONENTS": [
        ExamplesSidebarComponent,
        HeaderComponent,
        FooterComponent,
		/* Example1TabComponent,
		Example1TabContentComponent,
		Example1TabMainComponent, */
        CarouselComponent,
        Example3CarouselMainComponent,
        DialogComponent,
        AdBannerComponent,
        AdDirective,
        HeroJobAdComponent,
        HeroProfileComponent,
        Example2MainComponent,
        TemplateDrivenForm1Component,
        TemplateDrivenFormComponent,
        FormSelectDropdownComponent,
        MainDynamicComponent,
        DynamicComponent,
        HelloWorldComponent,
        WorldHelloComponent,
        GenericListComponent,
        ListDemo,
        PrimeTemplate,
        DuplicateFormFields,
        NgTemplateNgForComponent,
        AngularTipsComponent,
        ExampleObservableComponent,
        ExampleObservableSubject,
        ObservableWithAsyncPipe,
        NamedRouterComponent,
        ChildRoute1Component,
        ChildRoute2Component,
        ChildRoute3Component,
        ListViewComponent,
        FilterListViewComponent,
        ConnectedDropdownComponent,
        FootnoteFilterComponent,
        GetArticlesComponent,
        GetArticlesUsingSharedServiceComponent
    ],
    "ENTRY_COMPONENTS": [HeroJobAdComponent, HeroProfileComponent, DialogComponent],
    "DIRECTIVES": [DialogAnchorDirective],
    "PIPES": [UpperCasePipe, SearchFilterPipe],
    "SERVICES": [AdService, PageVisibilityService, ExampleObservableService, GetArticlesService, DataSharingService]
}



// Export all Components, Entry Components, Directives, Pipes and Services
export const ROUTE_COMPONENTS = [
    { path: '', component: HomePage },
    { path: 'home', component: HomePage },
    { path: 'adbanner', component: Example2MainComponent },
    {
        path: 'tips', component: AngularTipsComponent,
        children: [
            { path: '', component: ChildRoute1Component, outlet: 'tab1-content' },
            { path: 'tab-item-1', component: ChildRoute1Component, outlet: 'tab1-content' },
            { path: 'tab-item-2', component: ChildRoute2Component, outlet: 'tab2-content' },
            { path: 'tab-item-3', component: ChildRoute3Component, outlet: 'tab3-content' }
        ]
    },
    {
        path: 'lazy', loadChildren: './examples-router/lazy-router/lazy-router.module#LazyRouteExampleModule'
    },
    {
        path: 'tabs', component: Example1TabMainComponent
    },
    {
        path: 'observable-async', component: ExampleObservableComponent
    },
]
