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
    '../../models/sounds',
    './request_component',
    'underscore',
    'toastr'
  ],
  function(Backbone, RequestContainer, Server, ServerComponent,
    Loadbalancer, LoadbalancerComponent, Request, Game, Sounds,
    RequestComponent, underscore, toastr) {
    var View;

    View = Backbone.View.extend({
      Resources: {
        'SERVER': 'addServer',
        'LOADBALANCER': 'addLoadbalancer'
      },

      canvas: null,
      stage: null,
      requestContainer: null,
      particleTimer: null,
      firstDestination: null,
      requestComponents: [],
      entities: [],
      game: null,
      requestGenerationTime: 200,
      sounds: null,
      selectedResource: null,
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
        this.bindStats();
        this.sounds = new Sounds();
        this.start();
      },
      bindButtons: function () {
        $('#add-server').on('click', _.bind(function () {
          this.selectedResource = this.Resources.SERVER;
          $('.selected-resource').removeClass('selected-resource');
          $('#add-server').addClass('selected-resource');
        }, this));
        $('#add-loadbalancer').on('click', _.bind(function () {
          this.selectedResource = this.Resources.LOADBALANCER;
          $('.selected-resource').removeClass('selected-resource');
          $('#add-loadbalancer').addClass('selected-resource');
        }, this));
        $('#buy-resource').on('click', _.bind(function () {
          this.buy(this.selectedResource);
        }, this));
        $('#upgrade-1').on('click', _.bind(function () {
          //TODO
        }, this));
        $('#upgrade-2').on('click', _.bind(function () {
          //TODO
        }, this));
        $('#delete').on('click', _.bind(function () {
          var servers;

          if (current_server !== undefined) {
            this.stage.removeChild(current_server);
            this.removeEntity(current_server);
          }
        }, this));
      },
      bindBank: function () {
        $('#money').text(this.game.get('money'));
        this.game.on("change:money", function (model, value) {
          $('#money').text(value);
        });
      },
      bindStats: function () {
        this.game.on("change:totalRequests", function (model, value) {
          $('#total-requests').text(value);
        });
      },
      buy: function (resourceToBuy) {
        this[resourceToBuy]();
      },
      addServer: function () {
        var server, serverComponent, allLoadbalancers;

        server = new Server({ x: 600, y: this.canvas.height * Math.random(), cost: 100, game: this.game });

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
        } else {
          toastr.error('Not enough money to buy a server!');
        }
      },
      addLoadbalancer: function () {
        var loadbalancer, loadbalancerComponent, servers;

        if (!this.getAllServers().length) {
          toastr.error('You must create a server first!')
        }
        else {
          loadbalancer = new Loadbalancer({ x: 400, y: this.canvas.height * Math.random(), cost: 125 });

          if (this.game.spend(loadbalancer.get('cost'))) {
            loadbalancerComponent = new LoadbalancerComponent({model: loadbalancer, stage: this.stage});

            loadbalancer.addNodes(this.getAllServers());

            loadbalancer.addNodes(this.getAllServers());
            this.addEntity(loadbalancer);
          } else {
            toastr.error('Not enough money to buy a loadbalancer!');
          }
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

        this.sounds.play('buildEntity');
      },
      removeEntity: function (removedEntity) {
        var highestPriorityEntity, highestPriorityEntityValue;

        highestPriorityEntityValue = 0;
        highestPriorityEntity = null;

        indexOfRemovedEntity = 0;
        for(var x = 0 ; x < this.entities.length; x++) {
          if(this.entities[x].cid === removedEntity.cid) {
            indexOfRemovedEntity = x;
          }
        }
        this.entities.splice(indexOfRemovedEntity, 1);

        if (this.entities.length === 0) {
          this.firstDestination = null;
        } else {
          this.entities.forEach(function (entity) {
            if (highestPriorityEntityValue <= entity.get('priority')) {
              highestPriorityEntityValue = entity.get('priority');
              highestPriorityEntity = entity;
            }
          });
          this.firstDestination = highestPriorityEntity;
        }

        this.sounds.play('destroyEntity');
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
      generateRequest: function () {
        if (this.firstDestination) {
            this.addRequest();
          }
      },
      start: function () {
        var requestGenerationTimer;

        requestGenerationTimer = setInterval(_.bind(function () {

          if(this.particleTimer && this.getAllServers().length > 0) {
            clearInterval(this.particleTimer);
            this.requestGenerationTime -= 5;
          }
          this.particleTimer = setInterval(_.bind(this.generateRequest, this), this.requestGenerationTime);
        }, this), 3000);

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
        this.game.set({'totalRequests': this.game.get('totalRequests') + 1});
        this.sounds.play('money');
      },
      update: function () {
        var x, y;

        for (var i = 0; i < this.requestComponents.length; i++) {
          this.requestComponents[i].move();
        }

        if (typeof this.stage.bitmap_array !== 'undefined') {
          for (var i = 0; i < this.stage.bitmap_array.length; i++) {
            this.stage.bitmap_array[i].changeValue();
          }
        }
        this.stage.update();
      }
    });

    return View;
  }
);
