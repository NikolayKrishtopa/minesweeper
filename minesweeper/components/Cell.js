export default class Cell {
  constructor(coordinates, generateBombs, incrementMove, loose, checkSurround) {
    this.loose = loose;
    this.checkSurround = () => checkSurround(this.coordinates);
    this.incrementMove = incrementMove;
    this.isBomb = false;
    this.coordinates = coordinates;
    this.generateBombs = generateBombs;
    this.isClosed = true;
  }

  createLayout = () => {
    this.element = document.createElement('div');
    this.element.classList.add('field__cell');
    this.element.classList.add('field__cell_state_locked');
    this.cellText = document.createElement('p');
    this.cellText.classList.add('field__text');
    this.element.append(this.cellText);
    this.value = 0;
    this.setListeners();
    return this.element;
  };

  setBomb = () => {
    this.isBomb = true;
    this.element.classList.add('field__cell_state_bomb');
  };

  setValue = (value) => {
    this.value = value;
    this.cellText.textContent = (this.value !== 0 && !this.isBomb) ? this.value : '';
    this.element.classList.add(`field__cell_danger_${value}`);
  };

  open = () => {
    this.isClosed = false;
    this.element.classList.remove('field__cell_state_locked');
  };

  handleMove = () => {
    this.open();
    this.generateBombs(this.coordinates);
    this.element.classList.remove('field__cell_state_flag');
    this.element.removeEventListener('click', this.handleMove);
    this.element.removeEventListener('contextmenu', this.flag);
    if (this.isBomb) {
      this.loose();
    } else {
      this.incrementMove();
      if (this.value === 0) this.checkSurround();
    }
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
    this.element.addEventListener('click', () => {
      this.handleMove();
    });
    this.element.addEventListener('contextmenu', this.flag);
  };
}
