import { Component } from '@angular/core';
//import UIkit from 'uikit';
declare var UIkit: any;

@Component({
    selector: 'examples-sidebar',
    template: `
        <nav class="sidebar-navigation">
            <ul class="uk-nav-default uk-nav-parent-icon" uk-nav>
                <li><a routerLink="/tips">Angular Tips</a></li>
                <li class="uk-parent">
                    <a href="#"><span class="uk-margin-small-right" uk-icon="icon: thumbnails"></span> Components</a>
                    <ul class="uk-nav-sub">
                        <li><a routerLink="/tabs">Tab Component</a></li>
                        <li><a routerLink="/adbanner">Ad Banner</a></li>
                        <li><a routerLink="/contact">contact us</a></li>
                    </ul>
                </li>
                <li class="uk-parent">
                    <a href="#"><span class="uk-margin-small-right" uk-icon="icon: thumbnails"></span> Data Sharing/Component Communication</a>
                    <ul class="uk-nav-sub">
                        <li><a routerLink="/tabs">Tab Component</a></li>
                        <li><a routerLink="/adbanner">Ad Banner</a></li>
                        <li><a routerLink="/contact">contact us</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    `
})
export class ExamplesSidebarComponent {

}
