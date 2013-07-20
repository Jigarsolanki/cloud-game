define(
  [
    'backbone',
    './request_container',
    '../../models/server',
    './server_component',
    '../../models/request',
    './request_component',
    'underscore'
  ],
  function(Backbone, RequestContainer, Server, ServerComponent, Request, RequestComponent, underscore) {
    var View;

    View = Backbone.View.extend({
      canvas: null,
      stage: null,
      requestContainer: null,
      particleTimer: null,
      firstDestination: null,
      requestComponents: [],
      initialize: function() {
        this.render();
      },
      render: function() {
        this.canvas = document.getElementById("canvas");
        this.canvas.width = 800;
        this.canvas.height = 600;

        this.stage = new createjs.Stage(this.canvas);

        this.requestContainer = new RequestContainer({ stage: this.stage }).get();

        server1 = new Server({x: 400, y: 200});
        serverComponent1 = new ServerComponent({model: server1, stage: this.stage});

        this.firstDestination = server1;
        this.particleTimer = setInterval(_.bind(function () {
          this.addRequest();
        }, this), 200);

        createjs.Ticker.addListener(_.bind(function() {
          this.update();
          this.stage.update();
        }, this));
      },
      addRequest: function () {
        var request;

        request = new Request({x: 0, y: this.canvas.height / 2});
        request.setDestination(this.firstDestination);
        requestComponent = new RequestComponent({model: request, requestContainer: this.requestContainer});
        this.requestComponents.push(requestComponent);
      },
      update: function () {
        var x, y;

        for (var i = 0; i < this.requestComponents.length; i++) {
          this.requestComponents[i].move();
        }
      }
    });

    return View;
  }
);
