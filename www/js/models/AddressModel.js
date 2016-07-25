define(function(require) {

    var Backbone = require("backbone");
    var $ = require("jquery");

 var AddressModel = Backbone.Model.extend({

 constructorName: 'AddressModel',

 initialize: function(options) {
 	 this.id = options.id; 
 },
 
 url: function(){
 	var url = 'http://loveitaly.altervista.org/api/addresses/?display=full&io_format=JSON&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H&filter[id_customer]=';

 	url += this.id;
 	return url;
 },


 parse: function(response){
 	return response.addresses;
 },
sync: function(method, collection, options){
	options = options || {};
	// options.beforeSend = window.autenticazione;

	return Backbone.Model.prototype.sync.apply(this,arguments);
}


 });  

 return AddressModel;
  });