// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppModule } from "./app.module";

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [NativeScriptModule],
})
class AppComponentModule {}

// var fs = require("file-system");
// var filename = "upc_to_id.json";

// var file = fs.knownFolders.documents().getFile(filename);

console.log("hey this happened");

platformNativeScriptDynamic().bootstrapModule(AppModule);