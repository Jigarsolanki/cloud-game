Entity = function () {
  return {
    timeDrain: 0,
    capacity: 0,
    type: undefined,
    cost: 0
  };
};

Entity.prototype.getCost = function () {
  return time_drain * capacity;
};

Entity.prototype.reduceTime = function (request) {
  request.timeTaken += timeDrain;
};

Server = {

};

Loadbalancer = {
  endpoints: []
};

Gtm = {
  sharedpoints: [],
  endpoints: [],
  timeBonus: 0
};

Gtm.prototype.addTime = function (request) {
  request.timeTaken -= timeBonus;
};