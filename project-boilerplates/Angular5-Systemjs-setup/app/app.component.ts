import { Component } from '@angular/core';
import { MessageService } from './components/data-sharing-example/using-service-2/message.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'my-app',
    template: `
    <div>
        <p>App Component Message : {{ message }}</p>

        <!-- <link-test-component></link-test-component> -->

        <template-driven-form-component></template-driven-form-component>

        <list-view-component></list-view-component>

        <filter-list-view-component></filter-list-view-component>

       <iframe-component></iframe-component>

        <parent-one-component></parent-one-component>

        <parent-two-component></parent-two-component>

        <parent-three-component></parent-three-component>

        <home-component></home-component>

        <accordion-one-component (myFunction)="alertAccordion($event)"></accordion-one-component>

        <!--<carousel-new-index></carousel-new-index>-->

        <observable-examples-component></observable-examples-component>
    </div>
  `,
    styles: [`
        .jumbotron { box-shadow: 0 2px 0 rgba(0, 0, 0, 0.2); }
  `]
})
export class AppComponent {
    message: any;
    subscription: Subscription;
    constructor(private messageService: MessageService) {
        // subscribe to home component messages
        this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message; });
    }

    alertAccordion(childInputValue) {
        console.log(childInputValue)
    }
}
