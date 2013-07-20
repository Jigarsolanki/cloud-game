require.config({
  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  },
  paths: {
    jquery: '/public/js/external/jquery.min',
    underscore: '/public/js/external/underscore.min',
    backbone: '/public/js/external/backbone.min',
    text: '/public/js/external/text'
  }
});

require(['app'], function(App){
  App.initialize();
});
