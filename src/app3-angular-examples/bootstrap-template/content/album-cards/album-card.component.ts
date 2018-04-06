import { Component } from '@angular/core';

@Component({
    selector: 'album-card-component',
    templateUrl: 'src/components/bootstrap-template/content/album-cards/album-card.component.html'
})
export class AlbumCardComponent {
    public cardsList: any[] = [];

    constructor() {
        this.cardsList = [
            { id: 1, title: "Card Title 1", minutes: 10 },
            { id: 2, title: "Card Title 2", minutes: 15 },
            { id: 3, title: "Card Title 3", minutes: 7 },
            { id: 4, title: "Card Title 4", minutes: 15 },
            { id: 5, title: "Card Title 5", minutes: 9 },
            { id: 6, title :"Card Title 6", minutes : 20}
        ]
    }
}
