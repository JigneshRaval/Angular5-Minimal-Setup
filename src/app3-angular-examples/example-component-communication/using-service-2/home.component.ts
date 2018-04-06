import { Component } from '@angular/core';

import { MessageService } from './message.service';

@Component({
    selector: 'home-component',
    template: `
        <div class="col-md-6 col-md-offset-3">
            <h1>Home</h1>
            <button (click)="sendMessage()">Send Message</button>
            <button (click)="clearMessage()">Clear Message</button>
        </div>
    `
})

export class HomeComponent {
    constructor(private messageService: MessageService) {}

    sendMessage(): void {
        // send message to subscribers via observable subject
        this.messageService.sendMessage('Message from Home Component to App Component!');
    }

    clearMessage(): void {
        // clear message
        this.messageService.clearMessage();
    }
}
