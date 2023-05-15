export default class Cell {
  constructor(text, generateBombs) {
    this.isBomb = false;
    this.text = text;
    this.generateBombs = generateBombs;
  }

  createLayout = () => {
    this.element = document.createElement('div');
    this.element.classList.add('field__cell');
    this.element.classList.add('field__cell_state_locked');
    this.cellText = document.createElement('p');
    this.cellText.classList.add('field__cell-text');
    this.element.append(this.cellText);
    this.cellText.textContent = this.text;
    this.setListeners();
    return this.element;
  };

  setBomb = () => {
    this.isBomb = true;
    this.element.classList.add('field__cell_state_bomb');
  };

  open = () => {
    this.generateBombs();
    this.element.classList.remove('field__cell_state_flag');
    this.element.classList.remove('field__cell_state_locked');
    this.element.removeEventListener('click', this.open);
    this.element.removeEventListener('contextmenu', this.flag);
  };

  flag = (e) => {
    e.preventDefault();
    if (this.element.classList.contains('field__cell_state_flag')) {
      this.element.classList.remove('field__cell_state_flag');
    } else {
      this.element.classList.add('field__cell_state_flag');
    }
  };

  setListeners = () => {
    this.element.addEventListener('click', this.open);
    this.element.addEventListener('contextmenu', this.flag);
  };
}
