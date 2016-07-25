define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");
  var CartModel = require("models/CartModel");

  var successView = Utils.Page.extend({

    constructorName: "successView",
    model : CartModel,


    initialize: function() {
      
      this.template = Utils.templates.ordersuccess;

    },

    id: "successView",
    className: "successView",

    events: {
      "click #home": "home"
    },

    render: function() {
        
        //elimino prodotti dal carrello
        var cart = JSON.parse(localStorage["cart"]);
            cart = [];
            localStorage["cart"] = JSON.stringify(cart);

      
      $(this.el).html(this.template());
      document.getElementById("cont").innerHTML = cart.length;
            if (cart.length==0) {
                document.getElementById("cont").style.display= "none"
            }
      return this;
    },

    home: function(e) {
      Backbone.history.navigate("home", {
        trigger: true
      });
    }
  });

  return successView;

});