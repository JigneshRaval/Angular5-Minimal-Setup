import { Component } from '@angular/core';
import * as data from '../../assets/data/footnote.json';

@Component({
    selector: 'footnote-filter-component',
    templateUrl: './footnote-filter.component.html'
})
export class FootnoteFilterComponent {

    public plans = [];
    public footNoteAll = [];

    constructor() {

        this.generateFootnoteList();

    }

    public generateFootnoteList() {
        console.log('Data :', data.pensionFormOfPayment);
        let tempFootnoteArray = [];

        this.plans = data.pensionFormOfPayment.planElectionCalculationDetails;

        data.pensionFormOfPayment.planElectionCalculationDetails.map((item) => {

            // console.log(item.optionalFormsOfPayment);

            item.optionalFormsOfPayment.map((item1) => {
                // console.log(item1.primaryOptionalFormsOfPayment);

                item1.primaryOptionalFormsOfPayment.map((item2) => {

                    // console.log(item2.complexForms.paymentAmount);

                    item2.complexForms.paymentAmount.map((item3) => {

                        //console.log('Original :', item3.footnotes);

                        tempFootnoteArray.push(item3.footnotes);

                    });

                });

            });

        });

        this.footNoteAll = this.removeDuplicateFootnotes([].concat(...tempFootnoteArray));

        // console.log('footNoteAll :', this.footNoteAll);
    }

    public removeDuplicateFootnotes(array = []) {
        let tempArray = [];
        return array.filter(element => {
            if (tempArray.indexOf(element.id) == -1) {
                tempArray.push(element.id);
                return true;
            }
        });
    }

}
