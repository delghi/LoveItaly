define(function(require) {

    var Backbone = require("backbone");
    var $ = require("jquery");


    var autenticazione = function(xhr) {
        var key64 = 'SVlJNk0zNU1MQjhVVlczOFk5OVJZM1lQUVdSWDVYOEg6'; //codifica 64 della API key
        var token = 'Basic '.concat(key64);
        xhr.setRequestHeader('Authorization', token);
    }

    var ManufacturerCollection = Backbone.Collection.extend({

        constructorName: "ManufacturerCollection",

        initialize: function() {

        },
        url: 'http://loveitaly.altervista.org/api/manufacturers/?io_format=JSON&display=full&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H',

        parse: function(data) {
            return data.manufacturers;
        },
        sync: function(method, collection, options) {
            options = options || {};
            // options.beforeSend = autenticazione;
            return Backbone.Model.prototype.sync.apply(this, arguments);
        }
    });

    return ManufacturerCollection;
});
