define(
  [
    'backbone',
    'easel',
    'underscore'
  ],
  function(Backbone, Easel, underscore) {
    var EntityComponent;

    EntityComponent = Backbone.View.extend({
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
        throw ('Not implemented!');
      },
      onLoaded: function (event) {
        var image = event.target;
        var bitmap, container, serverComponent, model;

        model = this.model;
        container = new createjs.Container();
        this.container = container;
        this.stage.addChild(this.container);

        bitmap = new createjs.Bitmap(image);
        this.container.addChild(bitmap);



        bitmap.rotation = 0;
        bitmap.x = model.get('x');
        bitmap.y = model.get('y');
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
            model.set('x', bitmap.x);
            model.set('y', bitmap.y);
          };

        };

        bitmap.onClick = function(ev) {
          current_server = ev.target.parent;
          current_server_model = model;
        };

      }
    });

    return EntityComponent;
  }
);
