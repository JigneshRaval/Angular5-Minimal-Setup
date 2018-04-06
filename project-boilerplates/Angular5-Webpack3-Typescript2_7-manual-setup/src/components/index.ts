// Bootstrap static template
import { HeaderComponent } from './bootstrap-template/header/header.component';
import { JumbotronComponent } from './bootstrap-template/jumbotron/jumbotron.component';
import { AlbumCardComponent } from './bootstrap-template/content/album-cards/album-card.component';
import { FooterComponent } from './bootstrap-template/footer/footer.component';
import { BootstrapTemplateComponent } from './bootstrap-template/index';

// Export all Components, Entry Components, Directives, Pipes and Services
export const THEME_MAIN = {
    "COMPONENTS" : [
        HeaderComponent,
		JumbotronComponent,
		AlbumCardComponent,
		FooterComponent,
		BootstrapTemplateComponent
    ],
    "ENTRY_COMPONENTS": [],
    "DIRECTIVES": [],
    "PIPES": [],
    "SERVICES" : []
}
