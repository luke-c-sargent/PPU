import {Component, Inject} from "@angular/core";
import { BarcodeScanner } from 'nativescript-barcodescanner';
import {FSDB} from "./helpers/FSDB";

@Component({
    selector: "PPU",
    templateUrl: "app.component.html",
})

export class AppComponent {
    private padding:number = 13;


    constructor(private barcodescanner: BarcodeScanner){
        this.barcodescanner = new BarcodeScanner();
    }

    scanned:string = "0000000761567";
    upc_result:string = "Unscanned UPC";

    public api_access(){
        // FatSecret DataBase API connection
        var fs_api = new FSDB;
        
        console.log("quering scanned UPC " + this.scanned);

        // correct, but since a promise, must deal with information more cleverly
        var test = fs_api.query_upc(this.scanned);
        test.then(
                function(response) {
                    console.log("SUCCESS: " + JSON.parse(response["_bodyText"])["food_id"]["value"]);
                    return response;
                },
                function(error) {
                    return error;
                }

        );
        console.log("TEST type: " + typeof(test));
        //var result = fs_api.query_id(JSON.parse(id)["food_id"];
    }

    param(arg1, arg2){
        return arg1 + "=" + arg2;
    }

    create_parameter_string(args){
        var keys = Object.keys(args);
        // sort by keys
        keys.sort();
        // create parameter string
        var params = "";
        for(var i=0; i< keys.length; ++i){
            var k = keys[i];
            params += (k  + "=" + args[k]+"&");
        }
        return params.substring(0, (params.length - 1) );
    }




    public barcode_scan(){
        this.barcodescanner.scan({
            formats: "QR_CODE, EAN_13",
            cancelLabel: "EXIT. Also, try the volume buttons!", // iOS only, default 'Close'
            message: "Use the volume buttons for extra light", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
            showFlipCameraButton: true,   // default false
            preferFrontCamera: false,     // default false
            showTorchButton: true,        // iOS only, default false
            orientation: "undefined",     // Android only, default undefined (sensor-driven orientation), other options: portrait|landscape
            openSettingsIfPermissionWasPreviouslyDenied: true // On iOS you can send the user to the settings app if access was previously denied
          }).then((result) => {
          // Note that this Promise is never invoked when a 'continuousScanCallback' function is provided
          var raw_code = result.text;
          while (raw_code.length < this.padding)
              raw_code = '0' + raw_code;

          this.scanned = raw_code;
        }, (errorMessage) => {
          console.log("No scan. " + errorMessage);
        }
      );
    }
}