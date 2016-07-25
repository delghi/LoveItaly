	define(function(require) {
    var $ = require("jquery");
    var Backbone = require("backbone");
    var Utils = require("utils");
    var CartModel = require("models/CartModel");

    var cartView = Utils.Page.extend({

        constructorName: "cartView",
        model: CartModel,

        initialize: function() {
            this.template = Utils.templates.cart;
        },

        id: "cart",
        className: "cart",

        events: {
           
            "click #checkout": "checkout",
            "click #continua" : "continua",
            "click #delete" : "deleteprod"
        },

        render: function() {

            
            $(this.el).html(this.template(this.model));
            return this;

        },

        deleteprod: function(e){
            
           //////////////////////////////////////////////////////
           // 
           //      RIMOZIONE ELEMENTO DAL CARRELLO:
           //   1) LO RIMUOVO PRIMA DAL DOM
           //   2) LO RIMUOVO DAL LOCAL STORAGE E DECREMENTO IL
           //      PREZZO FINALE DEL CARRELLO
           //
           ////////////////////////////////////////////////////// 
           
            $(e.currentTarget).parent().remove();
            var nome = $(e.currentTarget).attr("prodName");
            var cart = JSON.parse(localStorage["cart"]);
            var id = 0;

            for(var i = 0; i < cart.length; i++){
                
                if(cart[i].name == nome){
                    id = i; 
                    this.model.prezzofinale = ((this.model.prezzofinale).toFixed(2)) - (cart[i].total);
                    $("#PrezzoTotale").text((this.model.prezzofinale).toFixed(2));
                    break;
                }
            }

            cart.splice(id,1);
            localStorage["cart"] = JSON.stringify(cart);
            document.getElementById("cont").innerHTML = cart.length;
            if (cart.length==0) {
                document.getElementById("cont").style.display= "none"
            }
        },




        continua: function(e){

            Backbone.history.history.back();
        },



        checkout: function(e) {

            //////////////////////////////////////////////////////////////////////////////////////////////////7
           // 
           //      PROCEDO AL CHECKOUT ORDINE:
           //   1) PRENDO TUTTI I PRODOTTI DAL LOCALSTORAGE (CARRELLO)
           //   2) VERIFICO SE L'UTENTE E' IN SESSIONE ALTRIMENTI REDIRIGO L'UTENTE ALLA PAGINA DI LOGIN/SIGNUP
           //   3) SE IL CARRELLO NON E' VUOTO, VADO ALLA PAGINA DI CHECKOUT    
           //
           //////////////////////////////////////////////////////////////////////////////////////////////////// 


            var ordini = JSON.parse(localStorage["cart"]);
            console.log(localStorage.getItem('session'));
            if(localStorage.getItem('session') == undefined) {
                Materialize.toast("Devi essere registrato per effettuare un acquisto!", 2000);
                Backbone.history.navigate("login", {
                    trigger : true
                });
            } else {
            if(ordini.length === 0){
                 Materialize.toast("Il carrello è vuoto!", 2000);
            } else {
                 Backbone.history.navigate("checkout", {
                trigger: true
                    });
                }
                }

           
        },
    });

    return cartView;

});
