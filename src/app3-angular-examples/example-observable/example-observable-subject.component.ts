// https://medium.com/front-end-hacking/creating-an-observable-with-angular-part-ii-the-4-different-types-3d8fd2835850
import { Component } from '@angular/core';

// 4 types of Subject that RxJS provides. The main difference between them is how they react to subscribe().
// Subject
// BehaviorSubject
// ReplaySubject
// AsyncSubject

// When you subscribe to a Subject, you get every event that this Subject emits after you have subscribed (including complete) as shown on the figure.
import { Subject } from 'rxjs/Subject';

// A BehaviorSubject behaves like a Subject, except the Observer also receives the last event that occurred before the subscription.
// It then receives all the events occurring after the subscription, like for a regular Subject.
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// With a ReplaySubject, the Observer receives all past events when it subscribes.
// It then receives all the events occurring after the subscription, like for a regular Subject.
import { ReplaySubject } from 'rxjs/ReplaySubject';

// This one has a peculiar behavior. AsyncSubject will wait for complete to emit the last event and then the complete event.
import { AsyncSubject } from 'rxjs/AsyncSubject';



@Component({
    selector: 'example-observable-subject',
    template: `
        <h1 *ngIf="type">
            {{type.name}}
        </h1>

        <div class="container">
            <div>
                <button (click)="start()">Start</button>
                <p [ngClass]="style">{{init}}</p>
            </div>
            <div>
                <button (click)="subscribe()">Subscribe</button>
                <p *ngFor="let value of valuesFromSubscription">{{value}}</p>
            </div>
        </div>
    `
})
export class ExampleObservableSubject {
    type = ReplaySubject;

    init: number;
    valuesFromSubscription: number[] = [];
    style = 'none';

    $subject = new this.type<number>();
    // $subject = new this.type<number>(0); for BehaviorSubject case
    public subscribe() {
        this.$subject.subscribe((value: number) => {
            this.valuesFromSubscription.push(value);
        });
    }

    public start() {
        this.init = 0;
        this.style = 'show';

        // First time iteration, then use interval to increment the number and emit next event
        this.iterate();

        const interval = setInterval(() => {
            this.iterate();
            if (this.init >= 4) {
                setTimeout(() => {
                    clearInterval(interval);
                    this.$subject.complete();
                    this.style = 'none';
                }, 1900);
            }
        }, 2000);
    }

    private iterate() {
        this.init++;
        this.$subject.next(this.init);
    }
}

