	define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");

	var chisiamoView = Utils.Page.extend({

		constructorName: "chisiamoView",

		id: "chisiamoView",
		
		initialize: function() {
		
			this.template = Utils.templates.chi_siamo;
			
		
		},

		render: function() {
		
			$(this.el).html(this.template());
			return this;
		
		},

		
		
	});

	return chisiamoView;

});