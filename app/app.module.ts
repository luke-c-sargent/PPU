import { NgModule } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/platform";
import { BarcodeScanner } from "nativescript-barcodescanner";

import { AppComponent } from "./app.component";

@NgModule({
  imports: [NativeScriptModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [BarcodeScanner]
})
export class AppModule {}