import { Component, ViewContainerRef } from '@angular/core'
import { DynamicComp2Service } from './dynamic-component2.service'
import { DynamicComponent2 } from './dynamic-component2.component'

@Component({
    selector: 'dynamic-component-main2',
    template: `
    <div>
      <h2>Dynamic components Example 2! 123</h2>
    </div>
  `,
})
export class MainDynamicComponent2 {
    constructor(service: DynamicComp2Service, viewContainerRef: ViewContainerRef) {
        service.setRootViewContainerRef(viewContainerRef)
        service.addDynamicComponent()
    }
}

export { DynamicComponent2 } from './dynamic-component2.component'