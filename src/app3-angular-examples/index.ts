// Bootstrap static template
import { HeaderComponent } from './bootstrap-template/header/header.component';
import { JumbotronComponent } from './bootstrap-template/jumbotron/jumbotron.component';
import { AlbumCardComponent } from './bootstrap-template/content/album-cards/album-card.component';
import { FooterComponent } from './bootstrap-template/footer/footer.component';
import { BootstrapTemplateComponent } from './bootstrap-template/index';

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

import { TemplateDrivenForm1Component } from './example-forms/template-driven-form-1/template-driven-form-1.component';

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
        TemplateDrivenForm1Component
    ],
    "ENTRY_COMPONENTS": [HeroJobAdComponent, HeroProfileComponent, DialogComponent],
    "DIRECTIVES": [DialogAnchorDirective],
    "PIPES": [],
    "SERVICES" : [AdService, PageVisibilityService]
}
