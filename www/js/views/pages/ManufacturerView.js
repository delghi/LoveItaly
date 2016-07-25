define(function(require) {

    var Backbone = require("backbone");
    var Utils = require("utils");
    var ManufacturerModel = require("models/ManufacturerModel");
    var ProductsByManuCollection = require("collection/ProductsByManuCollection");
     var L = require("leaflet");

var ManufacturerView = Utils.Page.extend({

constructorName: 'ManufacturerView',

model: ManufacturerModel,

events: {

},

initialize: function(options){
	this.id = options.id;
	this.template = Utils.templates.pagina_azienda;
	
	
},

events: {


},

render: function(){


      /////////////////////////////////////////////////////////////////////////////////////////////////////////
      // 
      //      MOSTRO DETTAGLIO DI UN'AZIENDA:
      //  1) CREO NUOVA ISTANZA DEL MODEL E FACCIO LA FETCH PER AVERE DAL SERVER TUTTI I DATI DI QUELL'AZIENDA
      //  2) SE LA CHIAMATA VA A BUON FINE, ESEGUO DUE CHIAMATE AJAX ANNIDATE (LA PRIMA PER PRENDERE DAL SERVER    
      //     L'INDIRIZZO DELL'AZIENDA E LA SECONDA PER TRASFORMARE L'INDIRIZZO IN COORDINATE(GOOGLE API'S))
      //  3) NELLA SUCCESS DELLA SECONDA CHIAMATA CREO LA MAPPA CON UN MARKER
      //  4) INFINE PASSO IL DATA-MODEL AL TEMPLATE  
      ////////////////////////////////////////////////////////////////////////////////////////////////////////// 

	var model = new ManufacturerModel({
 		id: this.id
 	});
	
 	var self = this;

	  model.fetch({

	  	success: function(data){
					
	  			console.log(model.get('associations.addresses[0]'));
	  			console.log(model.get('associations'));
	  			var asso = model.get('associations');
	  			var id = asso.addresses[0].id;

	  			$.ajax({
                  url: 'http://loveitaly.altervista.org/api/addresses/?io_format=JSON&ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H&display=full&filter[id]='+ id,
                  async: true,
                  type: "GET",
                  dataType: 'json',
                  // beforeSend: window.autenticazione,

                     success: function(data) {
                            	
                                    var indirizzo  = data;
                                    var citta = indirizzo.addresses[0].city;
                                    var cap  = indirizzo.addresses[0].postcode;
                                    var address = indirizzo.addresses[0].address1;

                                    $.ajax({
                                        url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+cap+'+'+citta+'+'+address,
                                        async: true,
                                        type: "GET",
                                        dataType: 'json',

                                         success: function(data){
                                            
                                            var latitudine = data.results[0].geometry.location.lat;
                                            var longitudine = data.results[0].geometry.location.lng;

                                             var mapCenter = {
                                                lat: latitudine,
                                                lon: longitudine
                                              };

                                            var options = {
                                                center: new L.LatLng(mapCenter.lat, mapCenter.lon),
                                                zoom: 12
                                             };

                                             // creo mappa
                                             var map = L.map('mapid', options);
                                            map.attributionControl.setPrefix("Leaflet");

                                             // creo marker con popup e lo aggiungo alla mappa
                                            L.marker([mapCenter.lat, mapCenter.lon]).addTo(map)
                                            .bindPopup(address + '<br>' + citta + ' ' + cap)
                                            .openPopup();


                                          // add a layer showing Open Street Map's tiles
                                      var layer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                                      attribution: 'Map data &copy; OpenStreetMap',
                                      maxZoom: 20
                                        });
                                     map.addLayer(layer);

                                        }
                                    });


                              },
                            error: function(XMLHttpRequest, textStatus, errorThrown) {
                                console.log('Errore chiamata ajax!' +
                                    '\nReponseText: ' + XMLHttpRequest.responseText +
                                    '\nStatus: ' + textStatus +
                                    '\nError: ' + errorThrown);
                            }
                        })


	  			
					           var descr = model.get('short_description');
                     model.set("short_description", $(descr).text());
                     
                     $('.collapsible').collapsible({
                     accordion : false // start collapsible for materialize
                       });
                    
                    $(self.el).html(self.template(model.toJSON()));
                    //a fine caricamento nascondo spinner
                    document.getElementById('spinner').style.display = "none";
                    return self;

	  	}
	  });
	},



});

return ManufacturerView;

});