define(
  [
    'backbone',
    'easel',
    'underscore'
  ],
  function(Backbone, Easel, underscore) {
    var ServerComponent;

    ServerComponent = Backbone.View.extend({
      image: null,
      stage: null,
      container: null,
      initialize: function(options) {
        this.stage = options.stage;
        this.model = options.model;

        this.intImage();

        this.render();
      },
      intImage: function() {
        this.image = new Image();
        this.image.onload = _.bind(this.onLoaded, this);
        this.image.src = '/public/images/server.png';
        this.image.server = this.model;
      },
      onLoaded: function (event) {
        var image = event.target;
        var bitmap, container, serverComponent;

        serverModel = this.model;
        container = new createjs.Container();
        this.container = container;
        this.stage.addChild(this.container);

        bitmap = new createjs.Bitmap(image);
        this.container.addChild(bitmap);

        bitmap.rotation = 0;
        bitmap.x = this.model.get('x');
        bitmap.y = this.model.get('y');
        bitmap.regX = bitmap.image.width/2|0;
        bitmap.regY = bitmap.image.height/2|0;
        bitmap.scaleX = bitmap.scaleY = bitmap.scale = 1;
        bitmap.onPress = function(evt) {
          // bump the target in front of it's siblings:
          container.addChild(bitmap);
          var offset = {
            x: bitmap.x - evt.stageX,
            y: bitmap.y - evt.stageY
          };

          // add a handler to the event object's onMouseMove callback
          // this will be active until the user releases the mouse button:
          evt.onMouseMove = function(ev) {
            bitmap.x = ev.stageX +offset.x;
            bitmap.y = ev.stageY+offset.y;
            serverModel.set('x', bitmap.x);
            serverModel.set('y', bitmap.y);
          }
        };
      }
    });

    return ServerComponent;
  }
);
