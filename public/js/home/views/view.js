define(
  [
    'backbone',
    './request_container',
    '../../models/server',
    './server_component',
    '../../models/loadbalancer',
    './loadbalancer_component',
    '../../models/request',
    '../../models/game',
    './request_component',
    'underscore'
  ],
  function(Backbone, RequestContainer, Server, ServerComponent,
    Loadbalancer, LoadbalancerComponent, Request, Game,
    RequestComponent, underscore) {
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

        this.bindButtons();
        this.game = new Game();
        this.bindBank();
        this.start();
      },
      bindButtons: function () {
        $('#add-server').on('click', _.bind(function () {
          this.addServer();
        }, this));
        $('#add-loadbalancer').on('click', _.bind(function () {
          this.addLoadbalancer();
        }, this));
      },
      bindBank: function () {
        $('#money').text(this.game.get('money'));
        this.game.on("change:money", function (model, value) {
          $('#money').text(value);
        });
      },
      addServer: function () {
        var server, serverComponent, allLoadbalancers;

        server = new Server({ x: 600, y: this.canvas.height * Math.random(), cost: 100 });

        if (this.game.spend(server.get('cost'))) {
          serverComponent = new ServerComponent({model: server, stage: this.stage});

          allLoadbalancers = this.getAllLoadbalancers();

          if(allLoadbalancers.length > 0) {
            allLoadbalancers[0].addNode(server);
            if(allLoadbalancers.length > 0) {
              allLoadbalancers[0].addNode(server);
            }
          }
          this.addEntity(server);
        }
      },
      addLoadbalancer: function () {
        var loadbalancer, loadbalancerComponent, servers;

        loadbalancer = new Loadbalancer({ x: 400, y: this.canvas.height * Math.random(), cost: 125 });

        if (this.game.spend(loadbalancer.get('cost'))) {
          loadbalancerComponent = new LoadbalancerComponent({model: loadbalancer, stage: this.stage});

          loadbalancer.addNodes(this.getAllServers());

          loadbalancer.addNodes(this.getAllServers());
          this.addEntity(loadbalancer);
        }
      },
      addEntity: function (newEntity) {
        var highestPriorityEntity, highestPriorityEntityValue;

        highestPriorityEntityValue = 0;

        this.entities.push(newEntity);
        newEntity.start();

        if (this.entities.length === 1) {
          this.firstDestination = newEntity;
        } else {
          this.entities.forEach(function (entity) {
            if (highestPriorityEntityValue <= entity.get('priority')) {
              highestPriorityEntityValue = entity.get('priority');
              highestPriorityEntity = entity;
            }
          });
          this.firstDestination = highestPriorityEntity;
        }
      },
      getAllLoadbalancers: function () {
        var loadbalancers;

        loadbalancers = [];
        this.entities.forEach(function (entity) {
          if(entity.get('priority') === 1) {
            loadbalancers.push(entity);
          }
        });

        return loadbalancers;
      },
      getAllServers: function () {
        var servers;

        servers = [];
        this.entities.forEach(function (entity) {
          if(entity.get('priority') === 0) {
            servers.push(entity);
          }
        });

        return servers;
      },
      start: function () {
        this.particleTimer = setInterval(_.bind(function () {
          if (this.firstDestination) {
            this.addRequest();
          }
        }, this), 200);

        createjs.Ticker.addListener(_.bind(function() {
          this.update();
          this.stage.update();
        }, this));
      },
      addRequest: function () {
        var request;

        request = new Request({x: 0, y: this.canvas.height / 2, startTime: new Date().getTime()});
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
