define(
  [
    'backbone'
  ],
  function(Backbone) {
    View = Backbone.View.extend({
      initialize: function() {
        this.render();
      },
      render: function() {
        this.$el.html('Hi there!');
      }
    });
    return View;
  }
);
