define(
  [
    './entity_component'
  ],
  function(EntityComponent) {
    var ServerComponent;

    ServerComponent = EntityComponent.extend({
      intImage: function() {
        this.image = new Image();
        this.image.onload = _.bind(this.onLoaded, this);
        this.image.src = '/public/images/cloud_server.png';
        this.image.server = this.model;
      }
    });

    return ServerComponent;
  }
);
