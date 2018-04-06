import { Directive, Input, Output, NgZone, ElementRef, EventEmitter, OnInit, OnDestroy } from '@angular/core';

@Directive({
    selector: '[outSideEventHandler]'
})
export class OutSideEventHandlerDirective implements OnInit, OnDestroy {

    @Input() event: string = 'click';
    @Output('outSideEventHandler') emitter = new EventEmitter();
    private _handler: Function;
    constructor(private _ngZone: NgZone, private el: ElementRef) { }

    ngOnInit() {
        this._ngZone.runOutsideAngular(() => {
            const nativeElement = this.el.nativeElement;
            this._handler = $event => {
                $event.preventDefault();
                console.log('6. Run outside Angular handler');
                console.log(nativeElement);
                this.emitter.emit($event);
            }

            nativeElement.addEventListener(this.event, this._handler, false);
        });
    }

    ngOnDestroy() {
        this.el.nativeElement.removeEventListener(this.event, this._handler);
    }
}
