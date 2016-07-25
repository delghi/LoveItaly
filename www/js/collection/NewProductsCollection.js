define(function(require){

var Backbone = require("backbone");
var $ = require("jquery");

var newProductsCollection = Backbone.Collection.extend({

	constructorName: 'NewProductsCollection',

	url: 'http://loveitaly.altervista.org/api/products/?io_format=JSON&display=full&sort=[id_DESC]&limit=6&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H',

	parse: function(data){
 	
 	
 	return data.products;
 },

 sync: function(method, collection, options) {
       
       options = options || {};
       // options.beforeSend = window.autenticazione;
       	return Backbone.Collection.prototype.sync.apply(this, arguments);
       
        }
});

return newProductsCollection;
});


