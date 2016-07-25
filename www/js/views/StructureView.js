  define(function(require) {

  var $ = require("jquery");
  var Backbone = require("backbone");
  var Utils = require("utils");


  var StructureView = Backbone.View.extend({

    constructorName: "StructureView",

    id: "main",

    events: {
           
       "click #profilo" : "profile",
       "click #login": "login",
       "click #logout" : "logout",
       "click #svuota" : "svuotacart",
       "click #PulsanteCarrello" : "carrello",
       "click #cont" : "carrello",
       "click #home" : "home",
       "click #categorie" : "categorie",
       "click #aziende" : "lista_aziende",
       "click #chisiamo" : "chisiamo",
       "click #howto" : "howto",
       "click #faq" : "faq"

        },

    initialize: function(options) {

      
      // load the precompiled template
      this.template = Utils.templates.structure;
    },

    render: function() {
      // load the template
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      this.contentElement = this.$el.find('#content')[0];

      return this;
    },

 

    login: function(){
    //se utente non è in sessione 
    if(localStorage.getItem("session") == null){

      Backbone.history.navigate("login",{
        trigger: true
      }); 
      } else {//utente  in sessione go to homepage

        Backbone.history.navigate("home",{
          trigger: true
        });

      }


      },

    profile: function(){
document.getElementById('spinner').style.display = "block";
        Backbone.history.navigate("profile",{
          trigger : true
        });

    },

    logout: function(event){
 
      localStorage.removeItem("session");
      localStorage.removeItem("iduser");
      localStorage.removeItem("password");
      localStorage.removeItem("key");

     document.getElementById('profilo').style.display = "none";
     document.getElementById('logout').style.display = "none";
     document.getElementById('log').style.display = "block";
      Backbone.history.navigate("",{
        trigger: true
      }); 
    },


    svuotacart: function(event){
    

            $('#contenitore').remove();
            var cart = JSON.parse(localStorage["cart"]);
            cart = [];
            localStorage["cart"] = JSON.stringify(cart);

            Backbone.history.navigate("cart", {
                trigger: true
            });
      
    },

    carrello: function(){
      Backbone.history.navigate("cart", {
        trigger: true
      });
    },

    home: function(){
      document.getElementById('spinner').style.display = "block";
      Backbone.history.navigate("home", {
        trigger: true
      });
    },

    categorie: function(){
      document.getElementById('spinner').style.display = "block";
      Backbone.history.navigate("catView", {
        trigger: true
      });
    },

    lista_aziende: function(){
      document.getElementById('spinner').style.display = "block";
      Backbone.history.navigate("aziende", {
        trigger: true
      });
    },

    chisiamo: function(){
      Backbone.history.navigate("chisiamo", {
        trigger: true
      });
    },

    howto: function(){
      Backbone.history.navigate("howto", {
        trigger: true
      });
    },

    faq: function(){
      Backbone.history.navigate("faq", {
        trigger: true
      });
    }
  
});

  return StructureView;
  
});

  