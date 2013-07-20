define([
  'jquery',
  'backbone',
  'home/views/view'
], function ($, Backbone, HomeView) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      '*actions': 'defaultAction'
    }
  });
  return {
    currentView: null,
    initialize: function () {
      var appRouter;

      appRouter = new AppRouter;

      appRouter.on('route:defaultAction', _.bind(function (actions) {
        this.currentView = new HomeView();
      }, this));
      Backbone.history.start();
    }
  };
});
