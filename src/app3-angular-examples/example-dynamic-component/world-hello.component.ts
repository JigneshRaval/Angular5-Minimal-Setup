// Tutorial SRC : http://blog.rangle.io/dynamically-creating-components-with-angular-2/
// http://plnkr.co/edit/ZXsIWykqKZi5r75VMtw2?p=preview

import { Component, Injector } from '@angular/core';

@Component({
  selector: 'world-hello',
  template: `
    <div>World Hello {{showNum}}</div>
  `,
})
export default class WorldHelloComponent {
  showNum = 0;

  constructor(private injector: Injector) {
    this.showNum = this.injector.get('showNum');
  }
}
