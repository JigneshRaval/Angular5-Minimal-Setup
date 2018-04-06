import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[adHostDirective]'
})
export class AdDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
