import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/finally';

@Component({
    selector: 'obervable-with-async-pipe',
    template: `
    <h1>Counting Down From {{ countDown }}!</h1>

    <h2 *ngIf="!countCompleted">{{ count$ | async }}</h2>

    <div *ngIf="count$ | async as count; else loading">
        {{ count }}
    </div>

    <ng-template #loading>
        Loading stuff...
    </ng-template>

    <h2 *ngIf="countCompleted">{{ message }}</h2>
  `
})
export class ObservableWithAsyncPipe {
    message: string;
    countCompleted: boolean;
    countDown: number;

    // The prop$ dollar suffix is generally used to indicate something is an Observable source.
    count$: Observable<number>;

    constructor() {
        this.countDown = 5;
        this.message = "Happy birthday!"
        this.countCompleted = false;

        /*
        Here we're creating an observable named "count$" in which counts down from 5 over a 1 second interval.
        In our template, we're displaying the current count using the async pipe.
        When the countdown is over, we replace the count with a message saying "Happy birthday!".
        */
        this.count$ = Observable
            .interval(1000)
            .map(i => this.countDown - i)
            .takeWhile(i => i > 0)
            .finally(() => this.countCompleted = true);
    }
}
