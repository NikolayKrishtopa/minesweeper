export default class Cell {
  constructor(coordinates, generateBombs, incrementMove, loose, checkSurround, incrementOpenCells) {
    this.incrementOpenCells = incrementOpenCells;
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
    if (!this.isBomb) {
      this.incrementOpenCells();
      if (this.value === 0) {
        this.checkSurround();
      }
    }
  };

  handleMove = () => {
    this.generateBombs(this.coordinates);
    if (this.isBomb) {
      this.loose();
    } else {
      this.incrementMove();
    }
    this.open();
    this.element.classList.remove('field__cell_state_flag');
    this.element.removeEventListener('click', this.handleMove);
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
    this.element.addEventListener('click', () => {
      this.handleMove();
    });
    this.element.addEventListener('contextmenu', this.flag);
  };
}
