# Angular Tips & Tricks - Part 3

```typescript
<!-- START :: Accordion Section -->
<div class="accordian">

    <!-- START :: Accordion Panel Item -->
    <div id="panel-{{item.itemId}}" class="accordian__panel" *ngFor="let item of this.items; let i = index">

        <!-- START :: Accordion Header -->
        <div class="accordian__header" (click)="toggleItem($event, item.itemId, i)" (keypress)="toggleItem($event, item.itemId, i)" tabindex="0" role="button">
            <h1>Accordion Title</h1>
        </div>
        <!-- END :: Accordion Header -->

        <!-- START :: Accordion Content -->
        <div id="panelContent-{{item.itemId}}" class="mt11" [@slideDownAccordionContent]="isAccordionVisible[i] ? 'visible' : 'hidden'">
            <div>
                <h3>Accordion Content</h3>
            </div>
        </div>
        <!-- END :: Accordion Content -->

    </div>
    <!-- END :: Accordion Panel Item -->

</div>
<!-- END :: Accordion Section -->


@Component({
    selector: 'accordion-component',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss'],
    animations: [
        trigger('slideDownAccordionContent', [
            state('visible', style({
                height: '*',
                overflow: 'visible',
                opacity: 1
            })),
            state('hidden', style({
                height: 0,
                overflow: 'hidden',
                opacity: 0
            })),
            transition('visible => hidden', animate('600ms ease-out')),
            transition('hidden => visible', animate('600ms ease-out'))
        ])
    ]
})
export class Accoridon {
    public isAccordionVisible: any;

    construnctor() {
        this.items = ['item1', 'item2'];
        this.isAccordionVisible = new Array(this.items.length);
        // this.isAccordionVisible.fill(false, 0, this.items.length);
        this.isAccordionVisible = [...new Array(this.items.length)].map(x => false); // [0, 0, 0, 0, 0]
    }

    toggleItem(event, index, accordionIndex) {
        this.isAccordionVisible[accordionIndex] = !this.isAccordionVisible[accordionIndex];
        event.currentTarget.parentElement.classList.toggle("accordian__panel--opened");
    };
}

```
