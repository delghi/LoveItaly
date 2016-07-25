define(function(require){

var Backbone = require("backbone");
var $ = require("jquery");
// var CategoryModel = require("models/CategoryModel");

var CategoryCollection = Backbone.Collection.extend({
 
 constructorName: 'CategoryCollection',


 // url: 'http://192.168.56.101/loveitaly/api/categories/?io_format=JSON&display=full',

 url: 'http://loveitaly.altervista.org/api/categories/?io_format=JSON&display=full&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H',


 parse: function(data){
 	// console.log(data.categories[1])
 	// delete data.categories[1];
 	// delete data.categories[0];
 	// console.log(data.categories)
 	
 	return data.categories;
 },

 sync: function(method, collection, options) {
       
       options = options || {};
       // options.beforeSend = window.autenticazione;
       	return Backbone.Collection.prototype.sync.apply(this, arguments);
       
        }
});

return CategoryCollection;
});