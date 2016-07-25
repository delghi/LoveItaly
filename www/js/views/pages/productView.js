define(function(require) {

    var Backbone = require("backbone");
    var Utils = require("utils");
    var ProductModel = require("models/ProductModel");

var productView = Utils.Page.extend({

constructorName: 'productView',

model : ProductModel,

initialize: function(options){
	this.id = options.id;
	this.template = Utils.templates.view_prodotto;
},

events: {
"click #AddCarrello" : "addtocart",
"click #indietro" : "goback",
"keypress #Cerca": "ricerca"
},
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//      PAGINA DI UN PRODOTTO:
//   1)DICHIARO MODEL E GLI PASSO L'ID DELL'PRODOTTO SELEZIONATO
//   2)FETCH PER OTTENERE TUTTI I DETTAGLI DEL PRODOTTO DAL SERVER 
//   3)AGGIUNGO IVA AL PREZZO E ELIMINO TAG HTML DALLA DESCRIPTION 
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////

render: function(){

	var model = new ProductModel({
 		id: this.id
 	});
	
 	var self = this;

	  model.fetch({
    success: function(data){

        //parso i dati del prodotto
        var prezzo = model.get('price');
        var tasse = model.get('id_tax_rules_group');
        var categoria = model.get('id_category_default');
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
        }else if(tasse == 5){
            iva = (prezzo * 4)/100; 
            prezzo = parseFloat(prezzo) + parseFloat(iva);
        }
        
        var descrizione = model.get('description');
        //elimino tag html dalla descrizione
        model.set("description", $(descrizione).text());
        //elimino ultime cifre dal prezzo 
        model.set("price", parseFloat(prezzo).toFixed(2));
        //nome categoria per il button "indietro"



         var chiamataAjax = function() {
                        $.ajax({
                            url: 'http://loveitaly.altervista.org/api/categories/'+categoria+'?io_format=JSON&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H',
                            async: true,
                            type: "GET",
                            dataType: 'json',
                            // beforeSend: window.autenticazione,

                            success: function(data) {
                                console.log(data.category.name);
                                 if(window.counterview == 1) {
                                     model.set("category", data.category.name);
                                 } else if(window.counterview == 0) {
                                    model.set("category", "Homepage");
                                 } else if(window.counterview == 2){
                                    model.set("category" , "Risultati ricerca");
                                 }

                                 $(self.el).html(self.template(model.toJSON()));
                                //nascondo spinner solo dopo il caricamento dei dati dal server
                                document.getElementById('spinner').style.display = "none";
                                $('.collapsible').collapsible({
                                    accordion : false // start collapsible for materialize
                                });
                                return self;
                              },
                            error: function(XMLHttpRequest, textStatus, errorThrown) {
                                console.log('Errore chiamata ajax!' +
                                    '\nReponseText: ' + XMLHttpRequest.responseText +
                                    '\nStatus: ' + textStatus +
                                    '\nError: ' + errorThrown);
                            }
                        })
                    }
                    chiamataAjax();




   //          $(self.el).html(self.template(model.toJSON()));
   //          //nascondo spinner solo dopo il caricamento dei dati dal server
   //          document.getElementById('spinner').style.display = "none";
   //          $('.collapsible').collapsible({
   //          accordion : false // start collapsible for materialize
   //           });
			// return self;
		}	
});



},

goback:function(){

    Backbone.history.history.back();

    },
//////////////////////////////////////////////////
// 
//      AGGUNTA DI UN PRODOTTO AL CARRELLO
//
//////////////////////////////////////////////////
addtocart: function(){

    el: $("#productcart");

            var arraycart = [];
            arraycart = localStorage.getItem("cart");
            var self = this;

            //prendo dalla form (hidden nel dom) id , nome , img, prezzo, quantità, azienda

            var id = $(this.el).find("#id").val(),
                name = $(this.el).find("#name").val(),
                img = $(this.el).find("#img").val(),
                price = $(this.el).find("#price").val(),
                quantity = $(this.el).find("#quantity").val();
                manufacturer = $(this.el).find("#manufacturer").val();

            //creo il modello con i dati appena presi 

            var prod = new ProductModel({
                name: name,
                id: id,
                img: img,
                price: parseFloat(price).toFixed(2),
                quantity: quantity,
                manufacturer : manufacturer,
                total: parseFloat(price * quantity).toFixed(2)
            });
            var cart = JSON.parse(localStorage["cart"]);
            cart.push(prod);
        //local storage accetta solo stringe, quindi per memorizzare un array utilizzo JSON.stringify()
           localStorage["cart"] = JSON.stringify(cart);
            console.log(cart);

            if (Backbone.history.fragment === 'cart') {
                Backbone.history.stop();
                Backbone.history.start()
            }
            
            document.getElementById("cont").style.display= "block";            
            document.getElementById("cont").innerHTML = cart.length;

            Materialize.toast("Prodotto aggiunto al carrello!", 2000);

},

ricerca: function(e){
    
    console.log(e);
       event.stopPropagation();
            //se utente preme invio(==12)
            if (event.keyCode == '13') {
              var keyword = $(e.target).val();
              console.log(keyword);
              localStorage.setItem("key", keyword);
              Backbone.history.navigate("search", {
                   trigger: true
               });

}
}


});

return productView;

});     