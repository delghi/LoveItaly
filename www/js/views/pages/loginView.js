define(function(require) {

    var Backbone = require("backbone");
    var Utils = require("utils");
    var UserModel = require( "models/UserModel");
    var md5 = require ("md5");

    var loginView = Utils.Page.extend({

    	 constructorName: 'loginView',

         model : UserModel,
        

    	 id: "loginView",
		 className: "loginView",

		 events: {
		 	"click #buttonlogin": "login",
		 	"click #ButtonRegistrati": "signup",
            "click #buttonospite" : "ospite"
		 },

    	 initialize: function(){
    	 	
    	 	this.template = Utils.templates.login;
            document.getElementById('spinner').style.display = "none";

    	 },

    	 render: function(){

            $(this.el).html(this.template());
            return this;
    	 },

    	 login: function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//      LOGIN:
//   1) PRELEVO DALLA FORM DI LOGIN USERNAME E PASSWORD DELL'UTENTE 
//   2) FACCIO LA FETCH DEL MODEL DELL'UTENTE PER VERIFICARE LA CORRETTEZZA DELLE CREDENZIALI INSERITE
//      E NEL CASO DI ESITO POSITIVO (OVVERO IL SERVER MI RESTITUISCE UN ARRAY LUNGO UNO) SALVO NEL LOCALSTORAGE
//      ID, USERNAME, NOME E COGNOME PER CREARE UNA SORTA DI SESSIONE LOCALE
//   3) NEL CASO DI ESITO NEGATIVO, DOPO AVER NOTIFICATO L'ERRORE, RIMANGO NELLA STESSA PAGINA PER FAR
//      RIPROVARE L'ACCESSO
//      
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    	 	
    	 	el: $("#login");

    	 	var username = $(this.el).find("#email").val();
    	 	var psw = $(this.el).find("#password").val();
    	   localStorage.setItem("password", psw);

            
            var utente = new UserModel({
                email: username,
                psw: psw
            });

            utente.fetch({

                success: function(data) {

                    var verifica = data.toJSON();
                   if(verifica.customers == undefined) {//credenziali errate 

                         Materialize.toast("Email e/o password non validi.", 2000);
                         Backbone.history.navigate("login",{
                            trigger: true
                         });
                   }

                    if((verifica.customers.length) == '1'){

                        localStorage.setItem("iduser", verifica.customers[0].id) ;
                        localStorage.setItem("session" , username);
                        localStorage.setItem("key", verifica.customers[0].secure_key);
                        localStorage.setItem("nome", verifica.customers[0].firstname);
                        localStorage.setItem("cognome", verifica.customers[0].lastname);

                        Materialize.toast("Bentornato " + verifica.customers[0].firstname + " " + verifica.customers[0].lastname, 2000);
                        //nascondo voce "login/registrazione" dal menu e aggiungo voci "area personale" e "logout"
                        document.getElementById('log').style.display = "none";
                        document.getElementById('profilo').style.display = "block";
                        document.getElementById('logout').style.display = "block";
                        document.getElementById('header').style.display = "block";
                        document.getElementById('spinner').style.display = "block";
                        Backbone.history.navigate("home",{
                            trigger: true
                        });
                    }


                },

                error: function(){
                        Materialize.toast("Email e/o password non validi.", 2000);
                        console.log("errore fetch login");
                        }
            });

        },

    	 	signup: function(){

    	 		Backbone.history.navigate("signup",{
    	 			trigger: true
    	 		});
    	 	},

            ospite: function(){
               if (Localita.options[Localita.selectedIndex].value !="null") {
                
               
                document.getElementById('spinner').style.display = "block";
                Backbone.history.navigate("home", {
                    trigger : true
                });
               }
               else {
                  Materialize.toast("Selezionare una località", 2000);
               }
            }


    });

    return loginView;
});
