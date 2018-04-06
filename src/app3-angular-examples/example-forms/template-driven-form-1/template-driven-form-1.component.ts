import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'template-driven-form-1-component',
    template: `
        <form #companyForm="ngForm" (ngSubmit)="submitCompany(companyForm.form)">
            <input type="text" class="form-control" name="company-name" ngModel #nameField="ngModel" required minlength="3" />
            <div class="alert alert-danger" *ngIf="nameField.errors.required">The company name is required</div>
            <div class="alert alert-danger" *ngIf="nameField.errors.minlength">The company name should be at least 3 characters long</div>

            <!-- <select class="form-control" name="company-industry" ngModel #industryField="ngModel" required>
                <option *ngFor="let industry of industries" [value]="industry.id">{{industry.name}}</option>
            </select>
            <div class="alert alert-danger" *ngIf="industryField.touched && !industryField.valid">The industry is required</div>-->


            <button class="btn btn-primary" [disabled]="!companyForm.valid">Submit</button>
        </form>
    `
})
export class TemplateDrivenForm1Component implements OnInit {

    industries = [
        { id: 1, name: "Agriculture" },
        { id: 2, name: "Manufacturing" },
        { id: 3, name: "Energy" },
        { id: 4, name: "Transportation" },
        { id: 5, name: "Finance" }
    ];

    submitCompany(form) {
        console.log(form.value);
        alert("The form was submitted");
        form.reset();
    }

    ngOnInit() {

    }
}
