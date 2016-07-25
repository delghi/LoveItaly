define(function(require) {

    var Backbone = require("backbone");
    var $ = require("jquery");

 var CartModel = Backbone.Model.extend({

 constructorName: 'CartModel',

 initialize: function() {
 		
 	if(localStorage.getItem("cart") !== null){

				this.cart = JSON.parse(localStorage.getItem("cart"));
				console.log(this.cart);
				this.totale = 0;
				this.quantityCart = 0;

				for (var i = 0; i < this.cart.length; i++) {

					this.totale = parseFloat(this.totale) + parseFloat(this.cart[i].price).toFixed(2) * parseInt(this.cart[i].quantity);
					this.quantita = parseInt(this.quantita) + parseInt(this.cart[i].quantity);
					
				}

				this.prezzofinale = this.totale + 2.00;
				this.prezzofinale.toFixed(2);

 }
 },
 

 });  

 return CartModel;
  });