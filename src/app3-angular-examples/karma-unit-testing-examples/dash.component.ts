import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dash-component',
    template: `
    <p>
      dash works!
    </p>
    <button (click)="clickMe($event)" id="btnClickMe">Click Me</button>
  `
})
export class DashComponent implements OnInit {

    public title = 'dash';

    private percentage = 0;

    constructor() { }

    ngOnInit() {
        this.percentage = 80;
    }

    helloWorld() {
        return 'Hello world!';
    }

    calcPercentage(percentage) {
        let grade;

        if (percentage > 90) {
            grade = 'A';
            console.log('First class');
        } else if (percentage > 70 && percentage < 90) {
            grade = 'B';
            console.log('Distinction');
        } else if (percentage > 50 && percentage < 70) {
            grade = 'C';
            console.log('Second class');
        } else {
            grade = 'D';
            console.log('Pass class');
        }

        return grade;
    }

    clickMe(event) {
        try {
            let elem = event.target;
            console.log('ClickMe Element ==', elem);

            if (elem) {
                elem.classList.add('clickme-class');
            }

        } catch (error) {
            console.log(error);
        }
    }

}
