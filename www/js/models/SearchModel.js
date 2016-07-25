define(function(require) {

    var Backbone = require("backbone");
    var $ = require("jquery");



    var SearchModel = Backbone.Model.extend({

     constructorName: "SearchModel",

     initialize: function(options) {
         this.id = options.id;
     },

     url: function() {
         var url = 'http://loveitaly.altervista.org/api/search?language=1&query=';
         url += this.id;
         url += '&io_format=JSON&display=full&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H';
         return url;
     },

        parse: function(data) {
            console.log(data);
            return data.products;
        },

        sync: function(method, collection, options) {
            options = options || {};
            // options.beforeSend = autenticazione;
            return Backbone.Model.prototype.sync.apply(this, arguments);
        }
    });

    return SearchModel;
});
