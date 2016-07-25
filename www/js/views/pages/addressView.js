define(function(require) {

    var Backbone = require("backbone");
    var Utils = require("utils");
    var UserModel = require("models/UserModel");
	var AddressModel = require("models/AddressModel");
	var addressView = Utils.Page.extend({

	constructorName: "addressView",

    model: AddressModel,

	initialize: function(){
		this.template = Utils.templates.mio_indirizzo;
	},

    events: {

    },


	render: function(){

		var iduser = localStorage.getItem("iduser");
		
        var self = this;

		var model = new AddressModel({
            id : iduser
        });

        model.fetch({

            success: function(data){
            console.log(data);
            $(self.el).html(self.template(model.toJSON()));
            document.getElementById('spinner').style.display = "none";
            return self;


            }
        });
    }
});



return addressView;
	
    });  