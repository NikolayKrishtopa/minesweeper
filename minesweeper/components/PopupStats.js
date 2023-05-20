import Popup from './Popup';
import closeIcon from '../assets/img/close_icon.svg';

export default class PopupStats extends Popup {
  constructor(records) {
    super();
    this.records = records;
    this.initiate();
  }

  create = () => {
    super.create();
    this.message.textContent = 'Your last 10 plays stats';
    this.element.classList.add('popup_type_stats');
    this.closeBtn.classList.add('popup__button_type_close');
    this.closeBtn.textContent = '';
    const img = document.createElement('img');
    this.closeBtn.append(img);
    img.src = closeIcon;
    img.alt = 'Close window';
  };

  open = () => {
    super.open();
  };
}
