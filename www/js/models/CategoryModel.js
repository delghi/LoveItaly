define(function(require) {

    var Backbone = require("backbone");
    var $ = require("jquery");


    var CategoryModel = Backbone.Model.extend({

     constructorName: "CategoryModel",

       initialize: function(options) {
        this.id = options.id;
        },
        url: function(){
            var url ='http://loveitaly.altervista.org/api/categories/';
            url += this.id;
            url += '?io_format=JSON&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H';
         return url;

        },

        parse: function(data) {
            return data.category;
        },

        sync: function(method, collection, options) {
            options = options || {};
            // options.beforeSend = window.autenticazione;
            return Backbone.Model.prototype.sync.apply(this, arguments);
        }
    });

    return CategoryModel;
});