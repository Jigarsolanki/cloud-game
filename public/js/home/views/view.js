define(
  [
    'backbone',
    './request_container',
    '../../models/server',
    './server_component',
    '../../models/loadbalancer',
    './loadbalancer_component',
    '../../models/request',
    './request_component',
    'underscore'
  ],
  function(Backbone, RequestContainer, Server, ServerComponent, Loadbalancer, LoadbalancerComponent, Request, RequestComponent, underscore) {
    var View;

    View = Backbone.View.extend({
      canvas: null,
      stage: null,
      requestContainer: null,
      particleTimer: null,
      firstDestination: null,
      requestComponents: [],
      entities: [],
      initialize: function() {
        this.render();
      },
      render: function() {
        this.canvas = document.getElementById("canvas");
        this.canvas.width = 800;
        this.canvas.height = 600;

        this.stage = new createjs.Stage(this.canvas);

        this.requestContainer = new RequestContainer({ stage: this.stage }).get();

        // server1 = new Server({ x: 400, y: 200 });
        // serverComponent1 = new ServerComponent({model: server1, stage: this.stage});

        // lb1 = new Loadbalancer({ x: 200, y: 200 });
        // lb1.addNode(server1);
        // lbComponent1 = new LoadbalancerComponent({ model: lb1, stage: this.stage });

        //this.firstDestination = lb1;

        this.bindButtons();
        this.start();
      },
      bindButtons: function () {
        $('#add_server').on('click', _.bind(function () {
          this.addServer();
        }, this));
      },
      addServer: function () {
        var server, serverComponent;

        server = new Server({ x: 600, y: this.canvas.height * Math.random() });
        serverComponent = new ServerComponent({model: server, stage: this.stage});
        if (this.entities.length === 0) {
          this.firstDestination = server;
          this.entities.push(server);
        }
      },
      start: function () {
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
