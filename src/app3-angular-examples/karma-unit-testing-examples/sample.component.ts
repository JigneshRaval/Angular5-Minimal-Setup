import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sample-component',
    template: `
    <h1>{{ value }}</h1>

    <hr>

    <button (click)="increment()" class="increment">Increment</button>
    <button (click)="decrement()" class="decrement">Decrement</button>

    <p class="message">
        {{ message }}
    </p>
    `
})
export class SampleComponent implements OnInit {

    public value = 0;
    public message: string;

    increment() {
        if (this.value < 15) {
            this.value += 1;
            this.message = '';
        } else {
            this.message = 'Maximum reached!';
        }
    }
    decrement() {
        if (this.value > 0) {
            this.value -= 1;
            this.message = '';
        } else {
            this.message = 'Minimum reached!';
        }
    }

    tryCatch(a) {
        try {
            let c = JSON.parse(a);
            return c;
        } catch (error) {
            console.log('error');
        }
    }

    ngOnInit() {

    }

}
