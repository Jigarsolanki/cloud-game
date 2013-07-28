define(
  [
    'backbone'
  ],
  function(Backbone) {
    var Sound;

    Sound = Backbone.Model.extend({
      defaults: {
        types: {
          'destroyEntity': new Audio("/public/sounds/destroy_entity.wav"),
          'buildEntity': new Audio("/public/sounds/build_entity.wav"),
          'money': new Audio("/public/sounds/money.wav")
        }
      },
      play: function (soundName) {
        var sound;

        sound = this.get('types')[soundName];
        sound.currentTime = 0;
        //sound.play();
      }
    });

    return Sound;
  }
);
