define(function(require) {

    var Backbone = require("backbone");
    var Utils = require("utils");
    var ProductsCollection = require("collection/ProductsCollection");
    var ProductModel = require("models/ProductModel");
    var NewProductsCollection = require("collection/NewProductsCollection");
    var SalesProductsCollection = require("collection/SalesProductsCollection");

var homeView = Utils.Page.extend({

	constructorName: 'homeView',

  model : ProductModel, 

	initialize: function(){
		this.template = Utils.templates.home;
	},
	id: "homeview",
	className: "homeviewclass",

  events:{
	"click #Categorie": "gotocat",
	"keypress #Cerca": "ricerca"
  },

  render: function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//      HOMEPAGE:
//   1) DICHIARO UN ARRAY PER CONTENERE TUTTI I PRODOTTI CHE SERVONO PER LO SLIDER
//   2) PRIMA FACCIO LA FETCH PER OTTENERE I PRODOTTI NUOVI E NELLA SUCCESS DI QUESTA FACCIO LA FETCH PER
//      OTTENERE I PRODOTTI IN VETRINA
//   3) TRAMITE DUE CICLI FOR RIEMPIO L'ARRAY (BIDIMENSIONALE) E INFINE LO PASSO AL TEMPLATE
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////

    var nuovi = new NewProductsCollection();
    var vetrina = new SalesProductsCollection();
    var array = [];
    //metto riferimento this nella variabile self
	  var self = this; 
	
    nuovi.fetch({
      success: function(data){
      array[0] = (data.models);
  console.log(data);

      vetrina.fetch({
        success: function(data){
          console.log(data);
          array[1] = (data.models);
          console.log(data.models);
          for (var i = 0; i < 6; i++) {
            var idp = ((array[0][i].attributes)).id;
            idimg = ((array[0][i].attributes)).id_default_image;
            ((array[0][i])).attributes.price = parseFloat(((array[0][i])).attributes.price).toFixed(2);
            var id_tax = ((array[0][i])).attributes.id_tax_rules_group;
            var pricetax = self.tax(((array[0][i])).attributes.price, id_tax);
            ((array[0][i])).attributes.price = parseFloat(pricetax).toFixed(2);
          }
          for (var i = 0; i < 6; i++) {
            var idp = (array[1][i].attributes).id;
            idimg = ((array[1][i].attributes)).id_default_image;
            ((array[1][i])).attributes.price = parseFloat(((array[1][i])).attributes.price).toFixed(2);
            var id_tax = ((array[1][i])).attributes.id_tax_rules_group;
            var pricetax = self.tax(((array[1][i])).attributes.price, id_tax);
            ((array[1][i])).attributes.price = parseFloat(pricetax).toFixed(2);                        
          }

          $(self.el).html(self.template(array));

      
            //avvio slider 
            $(".single-item").slick({
                dots: true,
                arrows: false,
                adaptiveHeight: true,
                autoplay: true
            });
              //nascondo lo spinner dopo aver caricato tutti i prodotti
              document.getElementById('spinner').style.display = "none";
              //se l' utente ha effettuato l'accesso come ospite nascondo le voci "area personale" e "logout" dal menu
              if ((localStorage.getItem('session')) == null) {
                    document.getElementById('profilo').style.display = "none";
                    document.getElementById('logout').style.display = "none";
              } 

              return self;
        }
     }); 
}
});


},

//funzione per eseguire ricerca di un prodotto 
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

    gotocat: function(event){
      console.log("counterview = " + window.counterview)
      document.getElementById('spinner').style.display = "block";
            Backbone.history.navigate("catView", {
                trigger: true
            });
        },

///////////////////////////////////////////////////////////////////////
//  FUNZIONE PER AGGIUNTA TASSE(IVA) AL PREZZO RITORNATO DAL SERVER  //
///////////////////////////////////////////////////////////////////////
    tax: function(price, id_tax){

        var iva;
       
        price = parseFloat(price);
        console.log(price);
        if (id_tax == 4){
             iva = (price * 4)/100;
            console.log(iva);

            price = parseFloat(price) + parseFloat(iva);
        }  else if(id_tax == 1){
             iva = (price * 22)/100;
             price = parseFloat(price) + parseFloat(iva);
        }else if(id_tax == 2){
            iva = (price * 10)/100;
            price = parseFloat(price) + parseFloat(iva);
        }else if(id_tax == 3){
            iva = (price * 4)/100;
            price = parseFloat(price) + parseFloat(iva);
        }else if(id_tax == 5){
            iva = (price * 4)/100; 
            price = parseFloat(price) + parseFloat(iva);
        }

        return price;
    }        



});

return homeView;

});

