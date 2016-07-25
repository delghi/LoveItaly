define(function(require) {

    var Backbone = require("backbone");
    var Utils = require("utils");
    var ProductModel = require("models/ProductModel");
    var ProductsCollection = require("collection/ProductsCollection");
    var ProductsByCatCollection = require ("collection/ProductsByCatCollection");

  var productbycatView = Utils.Page.extend({

    constructorName: 'productbycatView',

    model : ProductModel,

    initialize: function(options){
	               this.id = options.id;
	               this.template = Utils.templates.elenco_prodotti_categoria;
                },
 
    events:{

    "click #Categorie" : "goback",
    "keypress #Cerca": "ricerca"
    },

    render: function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//      PRODOTTI DI UNA CATEGORIA
//   1)DICHIARO COLLECTION E GLI PASSO L'ID DELLA CATEGORIA SELEZIONATA
//   2)FETCH PER OTTENERE I PRODOTTI DAL SERVER 
//   3)AGGIUNGO IVA AL PREZZO E PASSO LA COLLECTION AL TEMPLATE
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////

	           var collection = new ProductsByCatCollection({
	  	          id: this.id
	           });
              var self = this;
	            collection.fetch({
               success: function(collection,response,options){

                           for( var i=0; i<collection.models.length; i++){

                              var prezzo = collection.models[i].attributes.price;
                              var tasse = collection.models[i].attributes.id_tax_rules_group;
                              var iva;
                              prezzo = parseFloat(prezzo);
                              if (tasse == 4){
                                iva = (prezzo * 4)/100;
                                prezzo = parseFloat(prezzo) + parseFloat(iva);
                              }  else if(tasse == 1){
                                        iva = (prezzo * 22)/100;
                                        prezzo = parseFloat(prezzo) + parseFloat(iva);
                                }else if(tasse == 2){
                                        iva = (prezzo * 10)/100;
                                        prezzo = parseFloat(prezzo) + parseFloat(iva);
                                }else if(tasse == 3){
                                        iva = (prezzo * 4)/100;
                                        prezzo = parseFloat(prezzo) + parseFloat(iva);
                                }else if(tesse == 5){
                                        iva = (prezzo * 4)/100; 
                                        prezzo = parseFloat(prezzo) + parseFloat(iva);
                                }
                              collection.models[i].attributes.price = prezzo.toFixed(2);
                            }

	         $(self.el).html(self.template(collection.toJSON()));
           //nascondo spinner solo dopo aver caricato tutti i prodotti
           document.getElementById('spinner').style.display = "none";
			     return self;
		          }	
	  });
  },

    goback: function(){

            Backbone.history.history.back();
          },

    ricerca: function(e){
    
              event.stopPropagation();
              //se utente preme invio(=13)
                if (event.keyCode == '13') {
                    var keyword = $(e.target).val();
                    localStorage.setItem("key", keyword);
              Backbone.history.navigate("search", {
                   trigger: true
               });
                }
    }


});    

return productbycatView;

});