
define(function(require) {

    var Backbone = require("backbone");
    var Utils = require("utils");
    var SearchModel = require("models/SearchModel");
    
    var SearchView = Utils.Page.extend({

        constructorName: "SearchView",

        model: SearchModel,

        initialize: function(variabile) {

            this.template = Utils.templates.searchlist;

        },

        id: "SearchView",
        className: "SearchView",

        events: {
          
        },

        render: function() {

            var temp = localStorage.getItem("key");
            var model = new SearchModel({
                id: temp
            });

            var that = this;
            model.fetch({
                success: function() {
                    var temp= model.toJSON();

                        for (var i = 0; i < (Object.keys(temp).length)-1; i++) {
                        
                         var idtemp= model.toJSON()[i];   
                         var idprod = ((model.toJSON())[i]).id;
                         idimg = (idtemp.associations.images[0]).id;
                         idprod = idprod;

                        var img2 = 'http://192.168.56.101/loveitaly/api/images/products/' + idprod + '/' + idimg + '/?ws_key=IYI6M35MLB8UVW38Y99RY3YPQWRX5X8H';
                        ((model.toJSON())[i]).img= img2;
                        ((model.toJSON())[i]).price= parseFloat(((model.toJSON())[i]).price).toFixed(2);
                    }
                    if (Object.keys(temp).length == 1) {                       
                       var testoerrore = document.getElementById("SearchView");
                       testoerrore.innerHTML = "Non ci sono risultati";
                       testoerrore.style.textAlign = "center";
                       testoerrore.style.marginTop = "20px";
                       testoerrore.style.fontSize = "18px";
                       testoerrore.style.fontWeight = "bold";
                       document.getElementById("provaerrore").style.display = "block";                       
                    }
                    window.counterview = 2;
                    $(that.el).html(that.template((model.toJSON())));
                    return that;
                }
            });
        }


    });

    return SearchView;

});
