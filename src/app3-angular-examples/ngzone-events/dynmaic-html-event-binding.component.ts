//our root app component
import {NgModule, Component, Compiler, ViewContainerRef,
    ViewChild, Input, ComponentRef, ComponentFactory,
    ComponentFactoryResolver,QueryList, ChangeDetectorRef} from '@angular/core'
    import {BrowserModule} from '@angular/platform-browser';
    import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


    @Component({
      selector: 'btn',
      template: `
           <button (click)="clickMe()">Click(DCL)</button>
      `
    })
    export class btn{
      clickMe(){
        alert('working by DCL');
      }

    }
    /*---------------------------------------*/
    @Component({
      selector: 'parent',

      template: `
      With innerHTML:<bR>
      <div [innerHTML]="myHTML"></div>

      <hr>

      With DCL:<bR>
        <template  #target>
        </template>
      `,
    })
    export class Parent {

      @ViewChild('target', {read: ViewContainerRef}) target: ViewContainerRef;
      cmpRef: ComponentRef<btn>;


      constructor(private componentFactoryResolver: ComponentFactoryResolver,
                  private compiler: Compiler,
                  private cdRef:ChangeDetectorRef,
                  private sanitizer:DomSanitizer) {
                    this.myHTML = '<button (click)="clickMe()">Click(innerHTML)</button>';
                    this.myHTML = sanitizer.bypassSecurityTrustHtml(this.myHTML);
      }


      ngAfterViewInit(){
        let factory = this.componentFactoryResolver.resolveComponentFactory(btn);
        this.cmpRef = this.target.createComponent(factory)
      }

      /* doesn't work because of innerHTML API */
      clickMe(){
        alert('working by innerHTML');
      }
    }

    @NgModule({
      imports: [ BrowserModule ],
      declarations: [ Parent,btn],
      bootstrap: [ Parent ],
      entryComponents: [btn],
    })
    export class AppModule {}
