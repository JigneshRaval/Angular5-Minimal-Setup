import { NgModule } from "@angular/core";
import { BootstrapGrowlComponent } from "./bootstrap-growl.component";
import { BootstrapGrowlService } from "./bootstrap-growl.service";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        BootstrapGrowlComponent
    ],
    providers: [
        BootstrapGrowlService
    ],
    exports: [
        BootstrapGrowlComponent
    ]
})
export class BootstrapGrowlModule {

}