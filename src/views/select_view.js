const PubSub = require('../helpers/pub_sub.js');

const SelectView = function(element){
  this.element = element;
};

SelectView.prototype.bindEvents = function(){
  PubSub.subscribe('Munros:munros-loaded', (event) => {
    const uniqueRegions = this.getUniqueRegions(event.detail);
    this.populate(uniqueRegions);
  });
  this.element.addEventListener('change', (event) => {
    const selectedRegion = event.target.value;
    PubSub.publish('SelectView:region-selected', selectedRegion);
  })
}

SelectView.prototype.populate = function(uniqueRegions){
  uniqueRegions.forEach((region) => {
    const option = document.createElement('option');
    option.value = region;
    option.textContent = region;
    this.element.appendChild(option);
  });
}

SelectView.prototype.getUniqueRegions = function(munros){
  const allRegions = munros.map((munro) => {
    return munro.region;
  });

  return allRegions.filter((region, index) => {
    return allRegions.indexOf(region) === index;
  });
};

module.exports = SelectView;
