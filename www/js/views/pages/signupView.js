define(function(require) {

    var Backbone = require("backbone");
    var Utils = require("utils");
    var UserModel = require("models/UserModel");

    var signupView = Utils.Page.extend({

        constructorName: "signupView",

      

        
        initialize: function() {

            this.template = Utils.templates.registrazione1;
        
        },

        id: "signupView",
        className: "signupView",

        events: {
            
            "click #buttonsignup" : "registrati",
            
        },

        render: function() {
            
            var model = new UserModel({});

             $(this.el).html(this.template(model.toJSON()));
             return this;
        },


        registrati: function(e) {

            el: $("#register-form");

            var self = this;

            // Prendo oggetti dal form HTML della registrazione
            var email = $(this.el).find("#email").val(),
                psw = $(this.el).find("#password").val(),
                nome = $(this.el).find("#nome").val(),
                cognome = $(this.el).find("#cognome").val();

                if(email == '' || psw == '' || nome == '' || cognome == ''){

                Materialize.toast("Completa tutti i campi!", 2000);
           
                } 

        
            //creo il synopsis per invio dati registrazione al server
            var synopsis = '<?xml version="1.0" encoding="UTF-8"?> <prestashop xmlns:xlink="http://www.w3.org/1999/xlink"> <customer> <id_default_group></id_default_group> <id_lang format="isUnsignedId"></id_lang> <newsletter_date_add></newsletter_date_add> <ip_registration_newsletter></ip_registration_newsletter> <last_passwd_gen readOnly="true"></last_passwd_gen> <secure_key format="isMd5" readOnly="true"></secure_key> <deleted format="isBool"></deleted> <passwd required="true" maxSize="32" format="isPasswd">';
            synopsis += psw + '</passwd> <lastname required="true" maxSize="32" format="isName">';
            synopsis += cognome + '</lastname> <firstname required="true" maxSize="32" format="isName">';
            synopsis += nome + '</firstname> <email required="true" maxSize="128" format="isEmail">';
            synopsis += email + '</email> <id_gender format="isUnsignedId"></id_gender> <birthday format="isBirthDate"></birthday> <newsletter format="isBool"></newsletter> <optin format="isBool"></optin> <website format="isUrl"></website> <company format="isGenericName"></company> <siret format="isSiret"></siret> <ape format="isApe"></ape> <outstanding_allow_amount format="isFloat"></outstanding_allow_amount> <show_public_prices format="isBool"></show_public_prices> <id_risk format="isUnsignedInt"></id_risk> <max_payment_days format="isUnsignedInt"></max_payment_days> <active format="isBool">1</active> <note maxSize="65000" format="isCleanHtml"></note> <is_guest format="isBool"></is_guest> <id_shop format="isUnsignedId"></id_shop> <id_shop_group format="isUnsignedId"></id_shop_group> <date_add format="isDate"></date_add> <date_upd format="isDate"></date_upd> <associations> <groups nodeType="groups" api="groups"> <groups> <id></id> </groups> </groups> </associations> </customer> </prestashop>';


            var signupCall = function() {
                $.ajax({
                    url: 'http://loveitaly.altervista.org/api/customers/?id=1&schema=synopsis&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H',
                    async: true,
                    data: synopsis,
                    type: "POST",
                    // beforeSend: window.autenticazione,

                    success: function(result) {

                         // Backbone.history.navigate("home", {
                         //            trigger: true});
                        //ora che è registrato lo metto in sessione (localStorage)
                        //e lo rimando alla home page
                        var utente = new UserModel({
                            email: email,
                            psw: psw
                        });
                        
                        utente.fetch({
                            success: function() {

                                Materialize.toast("Registrazione effettuata con successo, grazie!" , 2000);

                                localStorage.setItem("session", email);
                                document.getElementById('log').style.display = "none";
                                document.getElementById('profilo').style.display = "block";
                                document.getElementById('logout').style.display = "block";
                                document.getElementById('header').style.display = "block";
                                Backbone.history.navigate("home", {
                                    trigger: true
                                });
                            },
                            error: function() {}
                        })

                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        //rimani nella stessa pagina

                    }
                })
            };

            signupCall();


        },


      
    });

    return signupView;

});
