import { Component, Renderer2, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
    selector: 'link-test-component',
    template: `
    <div style="padding: 1.5em; border: 1px solid #CCC;" (outSideEventHandler)="reportAnalytics($event, 'Action')">
        <h2>Hello {{name}}</h2>
        <button #myButton>Click me</button>
<hr />
        <button (outSideEventHandler)="reportAnalytics($event, 'Action')" (click)="sampleFunc()">Report to analytics ( Outside Zone )</button>
        <p>Status: {{status}}</p>
        <hr />
        <button (click)="status = 'Change detection running!'">Run change detection</button>

        <button (click)="sampleFunc()">Run change detection 2</button>
        <hr />
        <a role="menuitem" (click)="sampleFunc($event)"
        onclick="if(isUACrossEnabled()){
            try{
                ga('trackerUa1.send','event', 'Internal Link' ,'Link click','LinkId:PRTL_BENE_YOUR_PROFILE LinkDest:/web/sdfsd/beneficiaries'); alert('try success'); }
            catch(err){alert('error');}
            }
            if(isUAClientEnabled()){
                try{
                    if(isGTMEnabled()){
                        dataLayer.push({'event':'UPointLinkEvent','linkCategory':'Internal Link','linkAction':'Link Click','linkLabel':'LinkId:PRTL_BENE_YOUR_PROFILE LinkDest:/web/hmorg/beneficiaries'}); alert('try success gtm enabled client');
                    }else{
                        ga('trackerUa2.send','event', 'Internal Link' ,'Link click','LinkId:PRTL_BENE_YOUR_PROFILE LinkDest:/web/sdfsdf/beneficiaries'); alert('else gtm enabled false');
                    }
                }
                catch(err){alert('error');}
            }setTimeout(function() {document.location.href = href;}, 100);return false;"
            href="https://www.google.com/web/sdfsd/beneficiaries?linkId=PRTL_BENE_YOUR_PROFILE&amp;technicalNameForLink=PRTL_BENE_YOUR_PROFILE&amp;userFriendlyNameForLink=This is common beneficiary link under \'Your Profile\' menu&amp;domain=Ben-CM&amp;baseClientIndicator=Base" tabindex="0" id="yui_3_4_0_2_1516255479507_104">Beneficiaries</a>
    </div>
    `
})

export class LinkTestComponent implements OnInit {
    @HostListener('click', ['$event']) onClick(e) {
        console.log('1. Host Listener Called', e);
     }
    status;

    @ViewChild('myButton') myButton;

    constructor(private renderer: Renderer2, private _elem: ElementRef) {
        this.status = '';
    }

    sampleFunc(event) {
        console.log("2. Sample function executed.");
    }

    ngOnInit() {

        let global = this.renderer.listen('document', 'click', (evt: any) => {
            console.log('3. Clicking the document', evt);
        })
        //global();

        let simple = this.renderer.listen(this.myButton.nativeElement, 'click', (evt: any) => {
            console.log('4. Clicking the button', evt);
        });
        //simple();


        // alert(this._elem.nativeElement.nodeName);
        let anchor = this.renderer.listen(this._elem.nativeElement.querySelector('a'), 'click', (evt) => {
            evt.preventDefault();
            evt.stopImmediatePropagation();
            console.log('Clicking the button', evt.target.href);
            alert('5. inside anchor');
        });

        console.log(this._elem.nativeElement);

    }

    reportAnalytics($event, action) {
        console.log(action);
    }
}
