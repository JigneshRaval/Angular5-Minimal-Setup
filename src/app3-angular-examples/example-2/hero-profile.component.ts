import { Component, Input } from '@angular/core';

@Component({
    template: `
        <div class="hero-profile">
            <h3>Featured Hero Profile</h3>
            <h4>{{data.name}}</h4>

            <p>{{data.bio}}</p>

            <strong>Hire this hero today!</strong>
        </div>
    `
})
export class HeroProfileComponent {
    @Input() data: any;
}
