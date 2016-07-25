define(function(require) {

    var Backbone = require("backbone");
    var Utils = require("utils");

var checkoutView = Utils.Page.extend({

constructorName: "checkoutView",
 id: "checkoutView",
        className: "checkoutView",

initialize: function() {
            this.template = Utils.templates.checkout;
        },

events: {

"click #ordina" : "checkout"
},

render: function(){

            $(this.el).html(this.template());
            return this;
},


checkout: function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//      CHECKOUT:
//  1) PER INVIARE UN ORDINE AL SERVER BISOGNA CREARE 3 SYNOPSIS (IN FORMATO XML) RISPETTIVAMENTE PER  
//     INVIO INDIRIZZO, INVIO CARRELLO E INVIO ORDINE 
//
//  2) QUINDI FACCIO 3 CHIAMATE AJAX, E NELLA SUCCESS DI OGNUNA CREO IL SYNOPSIS PER LA SUCCESSIVA CHIAMATA
//
//  3) INFINE CHIAMO A RITROSO TUTTE E TRE LE FUNZIONI PER EFFETTUARE IN ORDINE PRIMA LA POST DELL'ADDRESS, 
//     POI LA POST DEL CART E INFINE LA POST DELL'ORDER
//
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////



	el: $("#checkout"); 

	var utente = localStorage.getItem("session");
            if (utente === null) {
                Backbone.history.navigate("login", {
                    trigger: true
                });
            } else { 
        
            // prendo carrello dal localstorage

 			var ordini = JSON.parse(localStorage["cart"]);
        
            //prendo input utente dalla form di checkout 

 				var nome = $(this.el).find("#nome").val(), 
                cognome = $(this.el).find("#cognome").val(), 
                citta = $(this.el).find("#citta").val(), 
                cap = $(this.el).find("#cap").val(), 
                telefono = $(this.el).find("#numero").val(), 
                indirizzo = $(this.el).find("#indirizzo").val(), 
                provincia = $(this.el).find("#provincia").val(),
                email = localStorage.getItem("session");
                
                if (nome=="" || cognome=="" || citta=="" || cap=="" || telefono=="" || indirizzo=="" || provincia=="-") {        
                    Materialize.toast("Immettere tutti i dati", 2000);
                }
                else{
        //variabili per invio ordine
                var userid = localStorage.getItem("iduser");
                var key = localStorage.getItem("key");
                var idstate = 148;
            	var idcart;
            	var idaddress;

        //creo synopsis per invio post dell'address

		var synopsis_address = '<prestashop><address><id></id><id_customer>';
            synopsis_address += userid + '</id_customer><id_manufacturer /><id_supplier />';
            synopsis_address += '<id_warehouse /><id_country>10</id_country><id_state>148</id_state>';
            synopsis_address += '<alias>';
            synopsis_address += 'customer</alias><company /><lastname>';
            synopsis_address += cognome + '</lastname><firstname>' + nome + '</firstname>';
            synopsis_address += '<vat_number /><address1>';
            synopsis_address += indirizzo + '</address1><address2 /><postcode>';
            synopsis_address += cap + '</postcode><city>';
            synopsis_address += citta + '</city><other /><phone />';
            synopsis_address += '<phone_mobile>' + telefono + '</phone_mobile>';
            synopsis_address += '<dni /><deleted/><date_add />';
            synopsis_address += '<date_upd /></address></prestashop>';


 				var addressAjax = function() {
                $.ajax({
                    url: 'http://loveitaly.altervista.org/api/addresses?ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H',
                    async: true,
                    data: synopsis_address,
                    type: "POST",
                    // beforeSend: window.autenticazione,

                    success: function(result) {

                        var $xml = $(result);
                        var id = $xml.find('id');
                        idaddress = id[0].textContent;

                       

                        var synopsis_cart = '<prestashop><cart><id /><id_address_delivery>';
                        synopsis_cart += idaddress + '</id_address_delivery><id_address_invoice /><id_currency>1</id_currency>';
                        synopsis_cart += '<id_customer>' + userid + '</id_customer><id_guest /><id_lang>1</id_lang><id_shop_group />';
                        synopsis_cart += '<id_shop /><id_carrier>8</id_carrier><recyclable /><gift /><gift_message /><mobile_theme />';
                        synopsis_cart += '<delivery_option /><secure_key /><allow_seperated_package /><date_add /><date_upd />';
                        synopsis_cart += '<associations><cart_rows>';

                       

                        for (var i = 0; i < ordini.length; i++) {

                            synopsis_cart += '<cart_rows><id_product>' + ordini[i].id + '</id_product>';
                            synopsis_cart += '<id_product_attribute>0</id_product_attribute><id_address_delivery>';
                            synopsis_cart += idaddress + '</id_address_delivery><quantity>' + ordini[i].quantity;
                            synopsis_cart += '</quantity></cart_rows>';
                        }

                        synopsis_cart += '</cart_rows></associations></cart></prestashop>';
                        console.log(synopsis_cart);
                        var cartAjax = function() {
                            $.ajax({
                                url: 'http://loveitaly.altervista.org/api/carts?ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H&io_format=XML',
                                async: true,
                                data: synopsis_cart,
                                type: "POST",
                                // beforeSend: window.autenticazione,

                                success: function(result) {
                                    var $xml = $(result);
                                    var id = $xml.find('id');

                                    idcart = id[0].textContent;


                                    var totale = 0;

                                    for (var i = 0; i < ordini.length; i++) {

                                        totale += ordini[i].total;

                                    }

                                    totale = parseFloat(totale).toFixed(2);


                                    
                             //synopsis per ivio post dell'ordine      
                            var synopsis_order = '<prestashop><order><id_address_delivery required="true" format="isUnsignedId">'+ idaddress +'</id_address_delivery><id_address_invoice required="true" format="isUnsignedId">'+ idaddress +'</id_address_invoice><id_cart required="true" format="isUnsignedId">'+ idcart +'</id_cart><id_currency required="true" format="isUnsignedId">1</id_currency><id_lang required="true" format="isUnsignedId">1</id_lang> <id_customer required="true" format="isUnsignedId">'+userid+'</id_customer> <id_carrier required="true" format="isUnsignedId">21</id_carrier> <current_state format="isUnsignedId" /> <module required="true" format="isModuleName">cheque</module> <invoice_number /> <invoice_date /> <delivery_number /> <delivery_date /> <valid /> <date_add format="isDate" /> <date_upd format="isDate" /> <shipping_number notFilterable="true" format="isTrackingNumber" /> <id_shop_group format="isUnsignedId" /> <id_shop format="isUnsignedId" /> <secure_key format="isMd5" /> <payment required="true" format="isGenericName">Assegno</payment> <recyclable format="isBool" /> <gift format="isBool" /> <gift_message format="isMessage" /> <mobile_theme format="isBool" /> <total_discounts format="isPrice" /> <total_discounts_tax_incl format="isPrice" /> <total_discounts_tax_excl format="isPrice" /> <total_paid required="true" format="isPrice">7.17</total_paid> <total_paid_tax_incl format="isPrice" /> <total_paid_tax_excl format="isPrice" /> <total_paid_real required="true" format="isPrice">0.00</total_paid_real> <total_products required="true" format="isPrice">'+totale+'</total_products> <total_products_wt required="true" format="isPrice">'+totale+'</total_products_wt> <total_shipping format="isPrice" /> <total_shipping_tax_incl format="isPrice" /> <total_shipping_tax_excl format="isPrice" /> <carrier_tax_rate format="isFloat" /> <total_wrapping format="isPrice" /> <total_wrapping_tax_incl format="isPrice" /> <total_wrapping_tax_excl format="isPrice" /> <conversion_rate required="true" format="isFloat">1</conversion_rate> <reference /> <associations> <order_rows nodeType="order_rows" virtualEntity="true"> <order_rows> <id /> <product_id required="true" /> <product_attribute_id required="true" /> <product_quantity required="true" /> <product_name read_only="true" readOnly="true" /> <product_reference read_only="true" readOnly="true" /> <product_ean13 read_only="true" readOnly="true" /> <product_upc read_only="true" readOnly="true" /> <product_price read_only="true" readOnly="true" /> <unit_price_tax_incl read_only="true" readOnly="true" /> <unit_price_tax_excl read_only="true" readOnly="true" /> </order_rows> </order_rows> </associations> </order> </prestashop>';




                                    console.log(synopsis_order);

                                    var orderAjax = function() {
                                        $.ajax({
                                            url: 'http://loveitaly.altervista.org/api/orders?ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H',
                                            async: true,
                                            data: synopsis_order,
                                            type: "POST",
                                            dataType: 'xml',
                                            contentType: "text/xml",

                                            // beforeSend: window.autenticazione,

                                            success: function(result) {

                                                console.log(result);
                                                alert("ordine effettuato");

                                                Backbone.history.navigate("success", {
                                                    trigger: true
                                                });

                                        		

                                            },
                                            error: function(XMLHttpRequest, textStatus, errorThrown) {

                                                
                                                
                                            }
                                        });
                                    };

                                    orderAjax();


                                },
                                error: function(XMLHttpRequest, textStatus, errorThrown) {
                                    Backbone.history.navigate("success", {
                                                    trigger: true
                                                });
                                }
                            })
                        };

                        cartAjax();


                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {}
                })
            };

            addressAjax();


                }
            }
}

});

return checkoutView;

});