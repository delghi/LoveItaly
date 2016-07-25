define(function(require) {

    var Backbone = require("backbone");
    var $ = require("jquery");


    

    var ManufacturerModel = Backbone.Model.extend({

        constructorName: "ManufacturerModel",

        initialize: function(options) {
            this.id = options.id;
            
        },

        url: function() {
            var url = 'http://loveitaly.altervista.org/api/manufacturers/';
            url += this.id;
            url += '?io_format=JSON&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H';
            return url;
        },

        parse: function(response) {

            return response.manufacturer;
        },
        sync: function(method, collection, options) {
            options = options || {};
            // options.beforeSend = autenticazione;
            return Backbone.Model.prototype.sync.apply(this, arguments);
        }
    });

    return ManufacturerModel;
});
