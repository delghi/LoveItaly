require.config({
  paths: {
    jquery: '../lib/jquery/jquery', 
    underscore: '../lib/underscore/underscore',
    backbone: '../lib/backbone/backbone',
    text: '../lib/require/text',
    async: '../lib/require/async',
    handlebars: '../lib/handlebars/handlebars',
    templates: '../templates',
    leaflet: '../lib/leaflet/leaflet',
    spin: '../lib/spin/spin.min',
    preloader: '../lib/preloader/pre-loader',
    utils: '../lib/utils/utils',
    validate: '../lib/validate/validate.min',
    x2j: '../lib/xml2json/xml2json',
    slider: '../lib/slick/slick.min',
    md5: '../lib/md5/md5.min',
    hammerjs: '../lib/hammerjs/hammer.min',
    velocity:  '../lib/velocity/velocity.min',
    materialize: '../lib/materialize/js/materialize.amd'
  },

  shim: {
    'jquery': {
      exports: '$'
    },
    'underscore': {
      exports: '_'
    },
    'handlebars': {
      exports: 'Handlebars'
    },
    'leaflet': {
      exports: 'L'
    },
    'localstorage': {
      deps: ['backbone']
    },
    'slider': {
            deps: ['jquery'],
            exports: 'Slider'
        },
    'velocity': {
            deps: ['jquery']
        },

   'materialize': {
            deps: ['jquery', 'slider', 'velocity', 'hammerjs'],
            exports: 'Materialize'
        }
    }
});

// We launch the App
 require(['backbone', 'utils', 'jquery', 'underscore'], function (Backbone, Utils, $, _) {
    require(['preloader', 'router'], function(PreLoader, AppRouter) {

    //  VARIABILE GLOBALE PER CHIAMATA Virtual machine
    window.autenticazione = function (xhr) {
      var key64 = 'SVlJNk0zNU1MQjhVVlczOFk5OVJZM1lQUVdSWDVYOEg6'
      // codifica 64 della API key
      var token = 'Basic '.concat(key64)
      xhr.setRequestHeader('Authorization', token)
    }

    window.counterview = 0;

     document.addEventListener("deviceready", run, false);

 require(['materialize', 'jquery'], function(Materialize, $) {

            document.addEventListener("deviceready", initialize, false);

            function initialize() {
                require(
                    ['velocity', 'jquery.easing', 'animation', 'hammerjs', 'jquery.hammer', 'global', 'collapsible', 'dropdown', 'leanModal', 'materialbox', 'parallax', 'tabs', 'tooltip', 'waves', 'toasts', 'sideNav', 'scrollspy', 'forms', 'slider', 'cards', 'pushpin', 'buttons', 'scrollFire', 'transitions', 'picker', 'picker.date', 'character_counter'],
                    function() {
                        $('.button-collapse').sideNav({closeOnClick: true});
                        $(".single-item").slick({
                            dots: true,
                            arrows: false
                        });
                        $('.collapsible').collapsible({
                            accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                        });
                    });
            }

        });


     function run(){

        // Here we precompile ALL the templates so that the app will be quickier when switching views
            // see utils.js
            Utils.loadTemplates().once("templatesLoaded", function() {

                var images = []; // here the developer can add the paths to the images that he would like to be preloaded

                if (images.length) {
                    new PreLoader(images, {
                        onComplete: startRouter
                    });
                } else {
                    // start the router directly if there are no images to be preloaded
                    startRouter();
                }

                function startRouter() {
                    // launch the router
                    var router = new AppRouter();
                    Backbone.history.start();
                }
              });

}
        });

 });



     