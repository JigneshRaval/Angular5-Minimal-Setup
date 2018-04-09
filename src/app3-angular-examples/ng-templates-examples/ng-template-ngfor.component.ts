import { Component } from '@angular/core';

@Component({
    selector: 'ngtemplate-ngfor-component',
    templateUrl: './ng-template-ngfor.component.html'
})
export class NgTemplateNgForComponent {
    allPersons = [
        { name: 'Mahesh', age: '25' },
        { name: 'Shakti', age: '23' },
        { name: 'Krishna', age: '23' },
        { name: 'Radha', age: '21' },
    ];
}
