export default class Popup {
  constructor() {
    this.initiate();
  }

  create() {
    this.element = document.createElement('div');
    this.element.classList.add('popup');
    this.container = document.createElement('div');
    this.container.classList.add('popup__container');
    this.element.append(this.container);
    this.message = document.createElement('p');
    this.message.classList.add('popup__text');
    this.closeBtn = document.createElement('button');
    this.closeBtn.classList.add('popup__button');
    this.closeBtn.textContent = 'Close';
    [this.message, this.closeBtn].forEach((e) => this.container.append(e));
  }

  setListeners() {
    this.closeBtn.addEventListener(
      'click',
      this.close,
    );
  }

  unsetListeners() {
    this.closeBtn.removeEventListener('click', this.close);
  }

  getElement() {
    return this.element;
  }

  open() {
    this.element.classList.add('popup_state_open');
    this.setListeners();
  }

  close = () => {
    this.element.classList.remove('popup_state_open');
    this.unsetListeners();
  };

  initiate() {
    this.create();
  }
}
