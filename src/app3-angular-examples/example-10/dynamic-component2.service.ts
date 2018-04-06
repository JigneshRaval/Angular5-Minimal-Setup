import {
    ComponentFactoryResolver,
    Injectable,
    Inject,
    ReflectiveInjector
} from '@angular/core'

import { DynamicComponent2 } from './dynamic-component2.component'

@Injectable()
export class DynamicComp2Service {
    rootViewContainer: any;

    constructor(private _componentFactoryResolver: ComponentFactoryResolver) { }

    public setRootViewContainerRef(viewContainerRef:any) {
        this.rootViewContainer = viewContainerRef
    }

    public addDynamicComponent() {
        const factory = this._componentFactoryResolver.resolveComponentFactory(DynamicComponent2)
        const component = factory.create(this.rootViewContainer.parentInjector)

        this.rootViewContainer.insert(component.hostView)
    }

}
