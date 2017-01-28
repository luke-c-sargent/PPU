var CryptoJS = require("crypto-js");
var fetchModule = require("fetch");

export class FSDB{
    required = ["oauth_timestamp", "oauth_nonce", "method", "parameter", "search_string"];
    oauth_server="http://54.201.221.123:6666/oauth/";
    _url = "http://platform.fatsecret.com/rest/server.api";

    public constructor(){}    


    public query_upc(search_str){
        return this.query("food.find_id_for_barcode", "barcode", search_str);
    }

    public get_nutrition_from_upc(upc){
        this.query_upc(upc);
    }
    
    resolve_oauth(server_args, method, parameter, search_str){
        this.fetch_oauth(server_args).then(
            function(response) {
                console.log("SUCCESS:!!" + JSON.stringify(response));
                return response.json();
            },
            function(error) {
                return error;
            }
        );
    }

    fetch_oauth(args){
        var promise = fetchModule.fetch(
        this.oauth_server + "?" + this.create_parameter_string(args),{
            method: "POST",
            body: ""
        });
        return promise;
    }

    query(method, parameter, search_str){
        console.log("1");
        var server_args = {
            "oauth_timestamp":(Date.now()).toString(), 
            "oauth_nonce":(Date.now()).toString(), 
            "method":method, 
            "parameter":parameter, 
            "search_string":search_str
        };

console.log("2");
        var fetched_sig_and_key = this.fetch_oauth(server_args).then(
            function(response) {
                console.log("SUCCESS:!" + JSON.stringify(response));
                return response;
            },
            function(error) {
                return error;
            }
        );
//////////////////////////////
        return fetched_sig_and_key;
        ////////////////////
        /*
console.log("3");
        var _args = {
        // required for every transaction
        "oauth_signature_method": "HMAC-SHA1",
        "oauth_version": "1.0",
        "format":"json"
        };
console.log("4");
        for( var _key in server_args){
            if(_key !== 'parameter' && _key != 'search_string')
            _args[_key] = server_args[_key];
        }
        _args[parameter] = search_str;
        _args["oauth_signature"] = fetched_sig_and_key["oauth_signature"];
        _args["oauth_consumer_key"] = fetched_sig_and_key["oauth_consumer_key"];

        console.log("ARGS: " + JSON.stringify(_args));

        var result = fetchModule.fetch(
            this._url,{
                method: "POST",
                body: this.create_parameter_string(_args)
            });
        console.log("5");
        return result;

/*        console.log("METHOD: "+method);
        console.log("PARAMETER: "+parameter);
        console.log("QUERY TERM: "+search_str);

        var _method = "POST";
        var _url = "http://platform.fatsecret.com/rest/server.api";
        var shared_secret = "0aefb439b5c14318bddf3f18cbe61fd9";
        

        
        var _args = {
        // required for every transaction
        "oauth_consumer_key": "8c30cf8678534af78fe4a4eda8bc50d9",
        "oauth_signature_method": "HMAC-SHA1",
        "oauth_timestamp": (Date.now()).toString(),
        "oauth_nonce": (Date.now()).toString(),
        "oauth_version": "1.0",
        "method":method,
        "format":"json"
        };

        _args[parameter] = search_str;

        console.log("ARGS: " + JSON.stringify(_args));
        // SIGNATURE BASE STRING CREATION
        var encoded_params = encodeURIComponent( this.create_parameter_string(_args) );
        //console.log("ENCODED PARAMETERS: " + encoded_params+"\n\n");
        var encoded_url = encodeURIComponent(_url);
        var sig_base_str = _method + 
                            "&" + 
                            encoded_url + 
                            "&" + 
                            encoded_params ;
        console.log("SIGNATURE BS: " + sig_base_str);
        var key = shared_secret + "&";
        //console.log("KEY: " + key);
        //console.log("2 so far so good....");
        //oauth_signature = encodeURIComponent(crypto.createHmac('sha1', key).update(sig_base_str).digest('base64'));
        var encoded = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(sig_base_str,key));
        //console.log("oauth: " + encoded);
        var oauth_signature = encodeURIComponent(encoded);

        _args["oauth_signature"] = oauth_signature;

        console.log(JSON.stringify(_args));

        var result = "";
        var _this = this;
        var test = fetchModule.fetch(
            _url,{
                method: "POST",
                body: this.create_parameter_string(_args)
            });
        return test;*/
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

        console.log("created parameter string: ");
        console.log(params);

        return params.substring(0, (params.length - 1) );
    }
}