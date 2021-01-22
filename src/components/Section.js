export default class Section {
  constructor(containerSelector) {
    this._containerSelector = document.querySelector(containerSelector);
  }

  loadInitial(el) {
    this._containerSelector.append(el);
  }

  addItem(el) {
    this._containerSelector.prepend(el);
  }
}
