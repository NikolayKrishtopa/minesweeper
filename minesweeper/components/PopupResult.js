import Popup from './Popup';

export default class PopupResult extends Popup {
  constructor(onRestart) {
    super();
    this.onRestart = () => {
      onRestart();
      this.close();
    };
    this.initiate();
  }

  create = () => {
    super.create();
    this.restartBtn = document.createElement('button');
    this.restartBtn.classList.add('popup__button');
    this.restartBtn.textContent = 'Retry';
    this.container.append(this.restartBtn);
  };

  open(message) {
    super.open();
    this.message.textContent = message;
  }

  setListeners() {
    super.setListeners();
    this.restartBtn.addEventListener('click', this.onRestart);
  }

  unsetListeners() {
    super.unsetListeners();
    this.restartBtn.removeEventListener('click', this.onRestart);
  }
}
