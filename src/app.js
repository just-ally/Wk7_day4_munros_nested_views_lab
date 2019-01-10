const Munros = require('./models/munros.js');
const MunroListView = require('./views/munro_list_view.js');
const SelectView = require('./views/select_view.js')

document.addEventListener('DOMContentLoaded', () => {
  console.log('Javascript loaded');

  const element = document.querySelector('#regions');
  const selectView = new SelectView(element);
  selectView.bindEvents();

  const container = document.querySelector('#munro-list');
  const munroList = new MunroListView(container);
  munroList.bindEvents();

  const munros = new Munros();
  munros.bindEvents();
  munros.getData();
})
