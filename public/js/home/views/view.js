define(
  [
    'backbone',
    './particles'
  ],
  function(Backbone, Particles) {

    View = Backbone.View.extend({
      particles: null,
      initialize: function() {
        this.render();
      },
      render: function() {
        this.particles = new Particles();
      }
    });
    return View;
  }
);
