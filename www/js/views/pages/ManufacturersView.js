define(function(require) {

    var Backbone = require("backbone");
    var ManufacturerCollection = require("collection/ManufacturerCollection");
    var Utils = require("utils");
    var ManufacturerModel = require("models/ManufacturerModel");

    var ManufacturersView = Utils.Page.extend({

        constructorName: "ManufacturersView",

        model: ManufacturerModel,

        initialize: function() {

            this.template = Utils.templates.lista_aziende;

        },

        id: "ManufacturersView",
        className: "ManufacturersView",

        events: {
        },

        render: function() {

            var collection = new ManufacturerCollection();
            var self = this;
         
          collection.fetch({
                success: function(collection,response,options){
                            $(self.el).html(self.template(collection.toJSON()));
                            document.getElementById('spinner').style.display = "none";

                            return self;
                         }
            });
            
        },

    });

    return ManufacturersView;

});
