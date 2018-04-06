// Filter to convert lowercase text to uppercase
// uppercase — converts “Hello” to “HELLO”

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'upperCasePipe'
})
export class UpperCasePipe implements PipeTransform {
    transform(value: any): any {
        return value.toUpperCase();
    }
}
