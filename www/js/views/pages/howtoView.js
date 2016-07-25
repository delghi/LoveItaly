define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");

	var howtoView = Utils.Page.extend({

		constructorName: "howtoView",

		id: "howtoView",
		
		initialize: function() {
		
			this.template = Utils.templates.come_funziona;
			
		
		},

		render: function() {
		
			$(this.el).html(this.template());
			return this;
		
		},

		
		
	});

	return howtoView;

});