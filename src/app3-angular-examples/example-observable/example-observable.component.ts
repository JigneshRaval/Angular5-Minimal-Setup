// Ref : https://medium.com/@luukgruijs/understanding-creating-and-subscribing-to-observables-in-angular-426dbf0b04a3
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ExampleObservableService } from './example-observable.service';

@Component({
    selector: 'example-observable-list',
    template: `
        <h2>Example Observable List ( Using Async pipe )</h2>
        <ul class="user__list" *ngIf="(users$ | async)?.length">
            <li *ngFor="let user of users$ | async">{{user.name}}</li>
        </ul>

        <h2>Example Observable List ( Using manually subscribing to observable service )</h2>
        <ul class="user__list" *ngIf="users.length">
            <li *ngFor="let user of users">{{user.name}}</li>
        </ul>
    `
})
export class ExampleObservableComponent implements OnInit {
    public users$: Observable<any[]>;
    public users: any[] = [];

    constructor(private exampleObservableService: ExampleObservableService) { }

    ngOnInit() {
        // Method 1 : Using 'async' pipe
        this.users$ = this.exampleObservableService.fetchUsers();

        // Method 2 : using manual subscription
        // We subscribe to the observable ourselves using the actual subscribe() method.
        // This can be handy if you would first like to do something with the data before displaying it.
        // The downside is that you have to manage the subscription yourself.
        this.exampleObservableService.fetchUsers().subscribe((users) => {

            // do stuff with our data here.
            // ....
            // asign data to our class property in the end
            // so it will be available to our template
            this.users = users
        })
    }
}
/**
 * Observable Examples
 * ------------------------------------------
 */
// Creating an observable yourself

// Example 1
// ==========================================
// As you can see in the example observables are created by using the new Observable() call,
// then subscribed to by an observer, executed by calling the next() and disposed by calling unsubscribe().
const simpleObservable = new Observable((observer) => {

    // Observable execution
    observer.next('Value 1: Hi');
    observer.next('Value 2: Hello');
    observer.complete();
})

// Subscribe to observer
simpleObservable.subscribe((value) => console.log(value));

// Subscribe to observer
// Note : To unsubscribe from observable you need to store it in any variable and then use .unsubscribe method on that variable
let simpleObsSubscription = simpleObservable.subscribe((value) => console.log(value));

console.log('simpleObsSubscription :', simpleObsSubscription);

// dispose the observable
simpleObsSubscription.unsubscribe();

// Note : Remember, observables are lazy. If you don’t subscribe nothing is going to happen. It’s good to know that when you subscribe to an observer, each call of subscribe() will trigger it’s own independent setup for that given observable. Subscribe calls are not shared among multiple subscribers to the same observable.
