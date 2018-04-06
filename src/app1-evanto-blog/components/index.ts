import { NgTemplateNgForComponent } from './ng-templates-examples/ng-template-ngfor.component';

// Export all Components, Entry Components, Directives, Pipes and Services
export const MY_EXAMPLES = {
    "COMPONENTS" : [
        HeaderComponent,
		JumbotronComponent,
		AlbumCardComponent,
		FooterComponent,
		BootstrapTemplateComponent,
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
        LoginComponent
    ],
    "ENTRY_COMPONENTS": [HeroJobAdComponent, HeroProfileComponent, DialogComponent],
    "DIRECTIVES": [DialogAnchorDirective],
    "PIPES": [],
    "SERVICES" : [AdService, PageVisibilityService]
}
