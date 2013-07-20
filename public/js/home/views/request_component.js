define(
  [
    'backbone',
    'easel'
  ],
  function(Backbone, Easel) {

    View = Backbone.View.extend({
      requestContainer: null,
      model: null,
      shape: null,
      initialize: function(options) {
        this.requestContainer = options.requestContainer;
        this.model = options.model;
        this.render();
      },
      render: function() {
        var graphics,

        graphics = new createjs.Graphics();
        graphics.beginFill(this.randomColor());
        graphics.drawCircle(0, 0, 5);

        this.shape = new createjs.Shape(graphics);

        this.shape.x = this.model.get('x');
        this.shape.y = this.model.get('y');

        this.requestContainer.addChild(this.shape);
      },
      randomColor: function () {
        var r = Math.random()*255>>0;
        var g = Math.random()*255>>0;
        var b = Math.random()*255>>0;
        return "rgba("+r+", "+g+", "+b+", 1)";
      },
      move: function () {
        var currentDestination,
          request = this.model;

          currentDestination = request.getDestination();
        if (currentDestination) {

          request.move();
          this.shape.x = request.get('x');
          this.shape.y = request.get('y');

          if(request.get('x') >= currentDestination.get('x')) {
            currentDestination.processRequest(request);
          }
        } else {

          this.requestContainer.removeChild(this.shape);
        }
      }
    });

    return View;
  }
);
