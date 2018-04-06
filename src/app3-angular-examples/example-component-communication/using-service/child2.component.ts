import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SharedService } from './shared.service';


@Component({
    //moduleId: module.id,
    selector: 'sibling2-component',
    template: `
        <div class="panel-group">
            <div class="panel panel-primary">
                <div class="panel-heading">Sibling 2</div>
            <div class="panel-body">
                <div *ngIf="searchCaseNumber">Searching for: {{searchCaseNumber}}</div>
                <form [formGroup]="sibling2Form" class="form-inline" (ngSubmit)="onSubmit()">
                    <div class="form-group">
                    <label for="caseNumber">Case Number:</label>
                    <input type="text" class="form-control" id="caseNumber" formControlName="caseNumber" placeholder="Case Number">
                    </div>
                    <button type="submit" class="btn btn-default">Submit</button>
                </form>

            </div>
        </div>
    `
})
export class Sibling2Component implements OnChanges {
    sibling2Form: FormGroup;
    searchCaseNumber: any = '';
    constructor(private fb: FormBuilder, private _sharedService: SharedService) {
        this.createForm();
        this._sharedService.caseNumber$.subscribe(
            data => {
                console.log('Sibling2Component-received from sibling1: ' + data);
                this.searchCaseNumber = data;
                this.sibling2Form.patchValue({
                    caseNumber: data
                });
            });
    }

    createForm() {
        this.sibling2Form = this.fb.group({
            caseNumber: ''
        });
    }

    ngOnChanges() {
        //this.sibling2Form.get('caseNumber').value=this._sharedService.subscribeData();
        //this.searchCaseNumber = this._sharedService.subscribeData();
        //console.log('Sibling2Component-received from sibling1: ' + this.searchCaseNumber);
    }

    onSubmit(): void {
        console.log('Form submitted-sibling2Form');
        let caseNumber = this.sibling2Form.get('caseNumber').value;
        this.searchCaseNumber = caseNumber;
        this._sharedService.publishData(caseNumber);
    }


}
