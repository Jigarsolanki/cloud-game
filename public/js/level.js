Level = function () {
  return {
    stage: 0
  };
};

Level.prototype.initialize = function () {
  this.stage = this.options.stage;
  this.amountOfRequests = this.generateRequests();
};

Level.prototype.generateRequests = function () {
    return this.stage * 10;
};
