import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'duplicate-form-fields',
    template: `
        <form #sampleForm="ngForm" (ngSubmit)="submitThisForm(sampleForm.form)">

            <div class="uk-margin">
                <input type="text" class="uk-input" name="company-name" ngModel #nameField="ngModel" required minlength="3" />
                <div class="alert alert-danger" *ngIf="nameField.errors.required">The company name is required</div>
                <div class="alert alert-danger" *ngIf="nameField.errors.minlength">The company name should be at least 3 characters long</div>
            </div>

            <ng-template ngFor [ngForOf]="items" let-i="index" let-item>
                <div class="uk-margin">
                    <label for="{{'friend_name'+i}}">Friend Name {{i+1}}</label>
                    <input class="uk-input" name="{{'friend_name'+i}}" id="{{'friend_name'+i}}" type="text" />
                </div>

                <div class="uk-margin">
                    <label for="{{'friend_age'+i}}">Friend Age {{i+1}}</label>
                    <input class="uk-input" name="{{'friend_age'+i}}" id="{{'friend_age'+i}}" type="text" />
                </div>
            </ng-template>

            <button (click)="addItem()" class="uk-button uk-button-primary">Add Item</button>
        </form>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DuplicateFormFields {
    items = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' }
    ]

    submitThisForm(form) {
        console.log(form.value);
        // alert("The form was submitted");
        form.reset();
    }

    addItem() {
        this.items.push({ id: this.items.length + 1, name: '' });
        console.log(this.items);
    }
}
