define(function(require) {

    var $ = require("jquery");
    var Backbone = require("backbone");
    var ProductsCollection = require("collection/ProductsCollection");
    var ProductModel = require("models/ProductModel");
    var UserModel = require("models/UserModel");
    var homeView = require("views/pages/homeView");
    var CategoryCollection = require("collection/CategoryCollection");
    var CategoryModel = require("models/CategoryModel");
    var StructureView = require("views/StructureView");
    var catView = require("views/pages/catView");
    var productbycatView = require("views/pages/productbycatView");
    var productView = require("views/pages/productView");
    var loginView = require('views/pages/loginView');
    var signupView= require('views/pages/signupView');
    var SearchView = require('views/pages/SearchView');
    var profileView = require('views/pages/profileView');
    var cartView = require("views/pages/cartView");
    var checkoutView = require("views/pages/checkoutView");
    var successView = require("views/pages/successView");
    var ManufacturersView = require("views/pages/ManufacturersView");
    var ManufacturerModel = require("models/ManufacturerModel");
    var ManufacturerView = require("views/pages/ManufacturerView");
    var productsbymanuView = require("views/pages/productsbymanuView");
    var OrdersView = require("views/pages/OrdersView");
    var slick = require("slider");
    var addressView = require("views/pages/addressView");
    var howtoView = require("views/pages/howtoView");
    var faqView = require("views/pages/faqView");
    var chisiamoView = require("views/pages/chisiamoView");
    var CartModel = require("models/CartModel");

    var AppRouter = Backbone.Router.extend({

        constructorName: "AppRouter",

        routes: {
            // the default is the structure view
            "": "showStructure",
            "home": "home",
            "catView": "showCategories",
            "product/:id": "showProdDetails",
            "category/:id": "showProdbyCat",
            "productsbyman/:id": "productsbyman",
            "login": "login",
            "signup": "showSignup",
            "search": "search",
            "profile" : "profile",
            "cart" : "cart",
            "checkout" : "checkout",
            "success" : "success",
            "aziende" : "aziende",
            "manufacturer/:id" : "showazienda",
            "ordini" : "ordini",
            "indirizzo" : "indirizzo",
            "chisiamo" : "chisiamo",
            "howto" : "howto",
            "faq" : "faq"
           
        },

     
        initialize: function(options) {

          function checkConnection() {
            var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';

             if(states[networkState] == 'No network connection'){
                return false;
             } else return true;
            }


        //creo carrello nel localStorage 

        var cart = new Array();
      //localstorage accetta solo stringe, quindi uso JSON.stringify

        if (localStorage.getItem("cart") === null) {
                localStorage["cart"] = JSON.stringify(cart);
            }

      function alertDismissed(){
        //ricarico la pagina per ritentare 
        location.reload(); 

    }
  //check internet connection--->se utente è connesso verifico anche se è in sessione per selezionare
  //la firstview adatta , altrimenti mostro alert

    if(checkConnection()){

          if(localStorage.getItem('session') == null) {

            this.firstView =  "login";
          } else
          {
             this.firstView = "home";
          }
           } else {
            navigator.notification.alert(
            'La nostra applicazione necessita di una connessione internet! Prova ad attivare la connessione dati o WIFI e riprova',  // message
             alertDismissed,         // callback
            'Errore di connessione', // title
            'Riprova'                  // buttonName
            );
           } 
        },

         home: function(){
          window.counterview = 0;
  	       var model = new ProductModel({});
           document.getElementById('header').style.display = "block";
  	       var page = new homeView({
  		        model: model
  	       });
          //mostro view
	       this.changePage(page);
          },

          showCategories: function(){
             window.counterview = 1;
         var model = new CategoryModel({});

         var page = new  catView({
          model : model
          });
         this.changePage(page);
            },

        showProdbyCat: function(id){

        var model = new ProductModel(id);
        document.getElementById('spinner').style.display = "block";
        var page = new productbycatView({
          model: model,
          id:id
          });

        this.changePage(page);
        },

        showProdDetails: function(id){
        document.getElementById('spinner').style.display = "block";
        var model = new ProductModel({
          id: id
        });

        var page = new productView({
          id:id,
          model: model
        });

        this.changePage(page);
        }, 


        showazienda: function(id){
          document.getElementById('spinner').style.display = "block";
          var model = new ManufacturerModel({
            id : id
          });
          var page = new ManufacturerView({
            id : id,
            model : model
          });

          this.changePage(page);
        },

        productsbyman: function(id){

          document.getElementById('spinner').style.display = "block";
          var model = new ProductModel(id);
          var page = new productsbymanuView({
            model : model, 
            id : id
          });
          this.changePage(page);
        },

        login: function(){
          // var model = new CategoryCollection();
          var page = new loginView({});
            if (!this.structureView) {
                this.structureView = new StructureView();
                // put the el element of the structure view into the DOM
                document.body.appendChild(this.structureView.render().el);
                this.structureView.trigger("inTheDOM");
            }
           document.getElementById('header').style.display = "none";
            this.changePage(page);
        },

        showSignup: function(){
          var page = new signupView({});
          this.changePage(page);  
        },

        search: function(){
          window.counterview = 3;
          var page = new SearchView({});
            if (!this.structureView) {
                this.structureView = new StructureView();
                // put the el element of the structure view into the DOM
                document.body.appendChild(this.structureView.render().el);
                this.structureView.trigger("inTheDOM");
            }
            document.getElementById('spinner').style.display = "none";

            this.changePage(page);
        },
        profile: function(){

          var page = new profileView({});
          if (!this.structureView) {
                this.structureView = new StructureView();
                // put the el element of the structure view into the DOM
                document.body.appendChild(this.structureView.render().el);
                this.structureView.trigger("inTheDOM");
            }
          this.changePage(page);

          },

        cart: function(){

          var model = new CartModel({});
          var page = new cartView({
             model : model
          });
          this.changePage(page);

        },

        checkout: function(){

          var page = new checkoutView({});
          this.changePage(page);
        },

        success: function(){

          var page = new successView({});
          this.changePage(page);

          },

        aziende: function(){

          document.getElementById('spinner').style.display = "block";

          var page = new ManufacturersView({});
          this.changePage(page);
        },

        ordini : function(){
          document.getElementById('spinner').style.display = "block";
          var page = new OrdersView({});
          this.changePage(page);
        },

        indirizzo: function(){
          document.getElementById('spinner').style.display = "block";
          var page = new addressView({});
          this.changePage(page);
        },

        chisiamo: function(){
          var page = new chisiamoView({});
          this.changePage(page);
        },

        howto: function(){
          var page = new howtoView({});
          this.changePage(page);
        },

        faq: function(){
          var page = new faqView({});
          this.changePage(page);
        },

        showStructure: function() {
            if (!this.structureView) {
                this.structureView = new StructureView();
                // put the el element of the structure view into the DOM
                document.body.appendChild(this.structureView.render().el);
                this.structureView.trigger("inTheDOM");
            }
            //verifico se l'utente è in sessione
            var sessione = localStorage.getItem("session");
            if( sessione != null){
          document.getElementById('log').style.display = "none";
            } 

            // go to first view
            this.navigate(this.firstView, {
                trigger: true
            });
        }

});
return AppRouter;
});




