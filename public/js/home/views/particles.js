define(
  [
    'backbone',
    'easel',
    'underscore'
  ],
  function(Backbone, Easel, _) {
    View = Backbone.View.extend({
      canvas: null,
      stage: null,
      width: null,
      height: null,
      particleTimer: null,
      previousUpdateTime: null,
      initialize: function() {
        this.render();
      },
      render: function() {
        this.canvas = document.getElementById("canvas");
        this.stage = new createjs.Stage(canvas);
        this.canvas.width = 800;
        this.canvas.height = 500;
        this.width = canvas.width;
        this.height = canvas.height;
        
        //Timer for adding particles
        this.particleTimer = setInterval(_.bind(function () {
          this.addParticle();
          this.numParticles++;
        }, this), 500);
        
        //Timer for updating particle positions
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener('tick', function(){
          this.update();
          this.stage.update();
        });
      },
      randInRange: function(min, max) {
        return Math.random() * (max - min) + min;
      },
      speed: function () {
        return 20;  //randInRange(1, 2);
      },
      randomColor: function () {
        var r = Math.random()*255>>0;
        var g = Math.random()*255>>0;
        var b = Math.random()*255>>0;
        return "rgba("+r+", "+g+", "+b+", 1)";
      },
      addParticle: function () {
        var graphics = new createjs.Graphics();
        graphics.beginFill(randomColor());
        graphics.drawCircle(0, 0, 10);

        var circle = new createjs.Shape(graphics)
        circle.speed = speed();
        circle.x = 0;
        circle.y = height / 2;
        circle.speedX = -2 + Math.random() * 4;

        stage.addChild(circle);
      },
      update: function () {
        var x, y;
        for (var i = 0; i < stage.getNumChildren(); i++){
          var particle = stage.getChildAt(i);
          particle.x += particle.speed;
        }
      }
    });
    return View;
  }
);
