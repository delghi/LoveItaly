define(function(require) {

    var Backbone = require("backbone");
    var Utils = require("utils");
    var ProductModel = require("models/ProductModel");
    var ProductsCollection = require("collection/ProductsCollection");
    var ProductsByManuCollection = require ("collection/ProductsByManuCollection");

var productsbymanuView = Utils.Page.extend({

constructorName: 'productsbymanuView',

model : ProductModel,

initialize: function(options){
	this.id = options.id;
	this.template = Utils.templates.searchlist;
},
 
 events:{
 },

render: function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//      PRODOTTI DI UN'AZIENDA SPECIFICA:
//   1)DICHIARO COLLECTION E GLI PASSO L'ID DELL'AZIENDA SELEZIONATA
//   2)FETCH PER OTTENERE I PRODOTTI DAL SERVER 
//   3)AGGIUNGO IVA AL PREZZO E PASSO LA COLLECTION AL TEMPLATE
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////
	  
    var collection = new ProductsByManuCollection({
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
            console.log(iva);

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
            //nascondo spinner solo dopo aver caricato tutti i dati
            document.getElementById('spinner').style.display = 'none';
			return self;
		}	


	  });


	
	},



});    

return productsbymanuView;

});