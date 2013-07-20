define(
  [
    'backbone',
    'easel'
  ],
  function(Backbone, Easel) {
    var RequestContainer;

    RequestContainer = Backbone.View.extend({
      stage: null,
      container: null,
      initialize: function(options) {
        this.stage = options.stage;
        this.container = new createjs.Container();
        this.stage.addChild(this.container);
      },
      get: function () {
        return this.container;
      }
    });

    return RequestContainer;
  }
);
