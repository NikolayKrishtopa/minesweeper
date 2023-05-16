export default class Popup {
  constructor(onRestart) {
    this.onRestart = () => {
      onRestart();
      this.close();
    };
    this.initiate();
  }

  create = () => {
    this.element = document.createElement('div');
    this.element.classList.add('popup');
    this.container = document.createElement('div');
    this.container.classList.add('popup__container');
    this.element.append(this.container);
    this.message = document.createElement('p');
    this.message.classList.add('popup__text');
    this.restartBtn = document.createElement('button');
    this.restartBtn.classList.add('popup__button');
    this.restartBtn.textContent = 'Retry';
    this.closeBtn = document.createElement('button');
    this.closeBtn.classList.add('popup__button');
    this.closeBtn.textContent = 'Close';
    [this.message, this.restartBtn, this.closeBtn].forEach((e) => this.container.append(e));
  };

  setListeners = () => {
    this.restartBtn.addEventListener('click', this.onRestart);
    this.closeBtn.addEventListener('click', this.close);
  };

  unsetListeners = () => {
    this.restartBtn.removeEventListener('click', this.onRestart);
    this.closeBtn.removeEventListener('click', this.close);
  };

  getElement = () => this.element;

  open = (message) => {
    this.element.classList.add('popup_state_open');
    this.message.textContent = message;
    this.setListeners();
  };

  close = () => {
    this.element.classList.remove('popup_state_open');
    this.unsetListeners();
  };

  initiate = () => {
    this.create();
  };
}
