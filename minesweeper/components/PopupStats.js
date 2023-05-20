import Popup from './Popup';
import closeIcon from '../assets/img/close_icon.svg';

export default class PopupStats extends Popup {
  constructor() {
    super();
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
    this.list = document.createElement('ul');
    this.list.classList.add('popup__list');
    this.container.append(this.list);
  };

  renderList = () => {
    this.list.innerHTML = '';
    this.records.forEach((r, i) => {
      const item = document.createElement('li');
      item.classList.add('popup__list-item');
      item.textContent = `${i + 1}. Moves: ${r.score}, time: ${r.time} sec. ${r.result}`;
      this.list.append(item);
    });
  };

  open = (records) => {
    super.open();
    this.records = records;
    this.renderList();
  };
}
