export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  loadInitial(el) {
    this._containerSelector.append(el);
  }

  addItem(el) {
    this._containerSelector.prepend(el);
  }
}
