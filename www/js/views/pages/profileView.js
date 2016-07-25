define(function(require) {

    var Backbone = require("backbone");
    var Utils = require("utils");
    var UserModel = require("models/UserModel");
	
	var profileView = Utils.Page.extend({

	constructorName: "profileView",

	initialize: function(){
		this.template = Utils.templates.pagina_profilo;
	},

    events: {

        "click #storico" : "ordini",
        "click #dati" : "dati",
        "click #indirizzo" : "indirizzo"
    },




	render: function(){

		var iduser = localStorage.getItem("iduser");
		
        var that = this;

		 var chiamataAjax = function() {
                        $.ajax({
                            url: 'http://loveitaly.altervista.org/api/orders/?io_format=JSON&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H&display=full&filter[id_customer]='+ iduser,
                            async: true,
                            type: "GET",
                            dataType: 'json',
                            // beforeSend: window.autenticazione,

                            success: function(data) {
                            	data.nome = localStorage.getItem("nome");
                            	data.cognome = localStorage.getItem("cognome");
                            	data.email = localStorage.getItem("session");
                                console.log(data);
                                $(that.el).html(that.template(data))
                                document.getElementById('spinner').style.display = "none";
                                return that;
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

},


    ordini: function(){

    Backbone.history.navigate("ordini", {
                trigger: true
            });

    },



    indirizzo: function(){


        Backbone.history.navigate("indirizzo", {
            trigger: true
         });
    }



});



return profileView;
	
    });  