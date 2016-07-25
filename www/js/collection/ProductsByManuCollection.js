define(function(require){

var Backbone = require("backbone");
var $ = require("jquery");

var ProductsByManuCollection = Backbone.Collection.extend({

	constructorName: 'NewProductsCollection',

	initialize: function(options) {
 	 this.id = options.id; 
 },

 url: function(){
 	var url = 'http://loveitaly.altervista.org/api/products?filter[id_manufacturer]=';
 	url += this.id;
 	url += '&io_format=JSON&display=full&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H';
 	return url;
 },


	parse: function(data){
 	
 	
 	return data.products;
 },

 sync: function(method, collection, options) {
       
       options = options || {};
       // options.beforeSend = window.autenticazione;
       	return Backbone.Collection.prototype.sync.apply(this, arguments);
       
        }
});

return ProductsByManuCollection;
});


