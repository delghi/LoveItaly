define(function(require){

var Backbone = require("backbone");
var $ = require("jquery");
var md5 = require("md5"); //libreria per codifica password
var UserModel = Backbone.Model.extend({

	constructorName: 'UserModel',

initialize: function(options) {
            this.email = options.email;
            this.psw= options.psw;
            console.log(this.psw);
            this.psw = md5('7j3EQiXxwscCNaOIORd8YqmvkjfEmDVxs4EcihNJNVNyCG4bHA3ThTnk'+ this.psw);
            //prova 
            
        },

        url: function() {
            var url = 'http://loveitaly.altervista.org/api/customers/?io_format=JSON&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H&display=full&filter[email]=';
            url += this.email;
            url += '&filter[passwd]=';
            url += this.psw;
            return url;
        },


	parse: function(response){
		// console.log(response.customers);

		// return response.customers;
		return response;
	},

	sync: function(method, collection, options){
	options = options || {};
	// options.beforeSend = window.autenticazione;

	return Backbone.Model.prototype.sync.apply(this,arguments);
}

});

return UserModel;
});




