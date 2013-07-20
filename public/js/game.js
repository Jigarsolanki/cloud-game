Game = function () {
  Player1 = new Player();
  stage = 1;

  while (true) {
    var level;

    stage += 1;
    level = new Level({'stage': stage});
  }
};