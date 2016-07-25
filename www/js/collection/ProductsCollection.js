define(function(require){

var Backbone = require("backbone");
var $ = require("jquery");
var ProductModel = require("models/ProductModel");



var ProductsCollection = Backbone.Collection.extend({

  constructorName: 'ProductsCollection',

  url: 'http://loveitaly.altervista.org/api/products/?io_format=JSON&display=full&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H',

  // model: ProductModel,

  parse: function(data) {
        return data.products;
  },

  sync: function(method, collection, options){
    options = options || {};
    // options.beforeSend = window.autenticazione;
    return Backbone.Collection.prototype.sync.apply(this, arguments);
  }
});

return ProductsCollection;


});
