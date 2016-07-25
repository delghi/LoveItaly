define(function(require){

var Backbone = require("backbone");
var $ = require("jquery");

var ProductsByCatCollection = Backbone.Collection.extend({
 
 constructorName: 'ProductsByCatCollection',
 
 initialize: function(options) {
         this.id = options.id;
     },
 
     url: function() {
         var url = 'http://loveitaly.altervista.org/api/products/?io_format=JSON&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H&display=full&filter[id_category_default]=';
         url += this.id;
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

return ProductsByCatCollection;
});