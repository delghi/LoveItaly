define(function(require) {

    var Backbone = require("backbone");
    var Utils = require("utils");
    var CategoryCollection = require("collection/CategoryCollection");
    var CategoryModel = require("models/CategoryModel");


var catView = Backbone.View.extend({

	constructorName: 'catView',

	model : CategoryModel,

	initialize: function(){

 	this.template = Utils.templates.categorie;

	},

	id: 'catview',
	className: 'catviewclass',

	events: {
		"keypress #Cerca": "ricerca",
		"click #Categorie" : "home"	
	},

	render: function(){

		var collection = new CategoryCollection();

		//metto riferimento this nella variabile self
		var self = this; 

		collection.fetch({
			success: function(collection,response,options){
			
								//rimuovo homepage,root e crediti da categorie
								collection.remove(collection.at(0));
								collection.remove(collection.at(0));
								collection.remove(collection.at(15));
									
								$(self.el).html(self.template(collection.toJSON()));
								document.getElementById('spinner').style.display = "none";
								return self;

			}
		});
	},		

	ricerca: function(e){
      			console.log(event);
       			event.stopPropagation();
            //se l'utente preme invio (=13)
            	if (event.keyCode == '13') {
             	 var keyword = $(e.target).val();
             	 localStorage.setItem("key", keyword);
              	Backbone.history.navigate("search", {
                   	trigger: true
               	});

    			}
	},

	home: function(){
			document.getElementById('spinner').style.display = "block";
			Backbone.history.navigate("home", {
				trigger : true
			});
	}

});

return catView; 

});