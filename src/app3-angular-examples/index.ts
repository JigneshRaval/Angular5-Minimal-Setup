import { HomePage } from './pages/homepage.component';

// Bootstrap static template
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

// Example 1 [ Tab Component ]
import { Example1TabComponent } from './example-1/tab.component';
import { Example1TabContentComponent } from './example-1/tab-content.component';
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

import  DynamicComponent from './example-dynamic-component/dynamic.component';
import  MainDynamicComponent  from './example-dynamic-component/dynamic-component.main';
import  HelloWorldComponent  from './example-dynamic-component/hello-world.component';
import  WorldHelloComponent  from './example-dynamic-component/world-hello.component';

import { TemplateDrivenForm1Component } from './example-forms/template-driven-form-1/template-driven-form-1.component';

import { NgTemplateNgForComponent } from './ng-templates-examples/ng-template-ngfor.component';

import { GenericListComponent } from './generic-list/generic-list.component';
import { ListDemo } from './generic-list/generic-list-demo.component';
import { PrimeTemplate } from './generic-list/generic-list.directive';


import { ExamplesSidebarComponent } from './components/component.index';

import { DuplicateFormFields } from './duplicate-form-fields/duplicate-form-fields.component'

import { AngularTipsComponent } from './components/angular-tips.component';

// Export all Components, Entry Components, Directives, Pipes and Services
export const MY_EXAMPLES = {
    "COMPONENTS": [
        ExamplesSidebarComponent,
        HeaderComponent,
		FooterComponent,
		Example1TabComponent,
		Example1TabContentComponent,
		Example1TabMainComponent,
		CarouselComponent,
		Example3CarouselMainComponent,
		DialogComponent,
		AdBannerComponent,
        AdDirective,
        HeroJobAdComponent,
        HeroProfileComponent,
        Example2MainComponent,
        TemplateDrivenForm1Component,
        MainDynamicComponent,
        DynamicComponent,
        HelloWorldComponent,
        WorldHelloComponent,
        GenericListComponent,
		ListDemo,
        PrimeTemplate,
        DuplicateFormFields,
        NgTemplateNgForComponent,
        AngularTipsComponent
    ],
    "ENTRY_COMPONENTS": [HeroJobAdComponent, HeroProfileComponent, DialogComponent],
    "DIRECTIVES": [DialogAnchorDirective],
    "PIPES": [],
    "SERVICES" : [AdService, PageVisibilityService]
}



// Export all Components, Entry Components, Directives, Pipes and Services
export const ROUTE_COMPONENTS = [
    { path: '', component: HomePage },
    { path: 'home', component: HomePage },
    { path: 'adbanner', component: Example2MainComponent },
    { path: 'tabs', component: Example1TabMainComponent },
    { path: 'tips', component: AngularTipsComponent }
]
