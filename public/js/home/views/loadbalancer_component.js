define(
  [
    './entity_component'
  ],
  function(EntityComponent) {
    var LoadbalancerComponent;

    LoadbalancerComponent = EntityComponent.extend({
      intImage: function() {
        this.image = new Image();
        this.image.onload = _.bind(this.onLoaded, this);
        this.image.src = '/public/images/server.png';
        this.image.server = this.model;
      }
    });

    return LoadbalancerComponent;
  }
);
