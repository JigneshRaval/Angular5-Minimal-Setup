import { Directive, Input, TemplateRef } from '@angular/core';


@Directive({
    selector: '[pTemplate]',
    host: {}
})
export class PrimeTemplate {

    @Input() type: string;

    @Input('pTemplate') name: string;

    constructor(public template: TemplateRef<any>) {
        console.log('Directive constructor :', this.template);
    }

    getType(): string {
        return this.name;
    }
}
