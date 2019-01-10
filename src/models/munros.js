const PubSub = require('../helpers/pub_sub.js')
const Request = require('../helpers/request.js')

const Munros = function(){
  this.munros = [];
}

Munros.prototype.bindEvents = function(){
  PubSub.subscribe('SelectView:region-selected', (event) => {
    const selectedRegion = event.detail;
    const foundMunros = this.findByRegion(selectedRegion);
    PubSub.publish('Munros:found-munros-by-region', foundMunros);
  })
};

Munros.prototype.getData = function(){
  const request = new Request('https://munroapi.herokuapp.com/munros');
  request.get().then((data) => {
    this.munros = data;
    PubSub.publish('Munros:munros-loaded', this.munros);
  });
}

Munros.prototype.findByRegion = function(region){
  return this.munros.filter((munro) => {
    return munro.region === region;
  })
}

module.exports = Munros;
