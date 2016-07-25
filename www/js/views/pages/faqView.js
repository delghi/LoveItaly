define(function(require) {

	var Backbone = require("backbone");
	var Utils = require("utils");

	var faqView = Utils.Page.extend({

		constructorName: "faqView",

		id: "faq-view",
		
		initialize: function() {
		
			this.template = Utils.templates.domande_utili;
			
		
		},

		render: function() {
		
			$(this.el).html(this.template());
			return this;
		
		},

		
		
	});

	return faqView;

});