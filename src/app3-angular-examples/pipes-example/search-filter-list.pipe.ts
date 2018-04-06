// Tutorials Referances:
// https://hassantariqblog.wordpress.com/2017/03/16/angular2-creating-custom-search-filter-pipe-for-ngfor-directive/
// https://codeburst.io/create-a-search-pipe-to-dynamically-filter-results-with-angular-4-21fd3a5bec5c

import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchFilterList'
})
//@Injectable()
export class SearchFilterPipe implements PipeTransform  {
    transform(items: any[], searchText: string): any[] {
        console.log(items, searchText);
        if(!items) return [];
        if (!searchText) return items;

        if (items) {
            return items.filter(item => item.name.indexOf(searchText) !== -1);
        }
    }
}
