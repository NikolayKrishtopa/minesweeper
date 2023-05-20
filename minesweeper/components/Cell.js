export default class Cell {
  constructor(
    coordinates,
    generateBombs,
    incrementMove,
    loose,
    checkSurround,
    incrementOpenCells,
    cashState,
    initialState,
  ) {
    this.state = initialState || {
      isClosed: true,
      value: 0,
      isBomb: false,
      isFlagged: false,
    };
    this.cashState = cashState;
    this.incrementOpenCells = incrementOpenCells;
    this.loose = loose;
    this.checkSurround = () => checkSurround(this.coordinates);
    this.incrementMove = incrementMove;
    this.coordinates = coordinates;
    this.generateBombs = generateBombs;
  }

  createLayout = () => {
    this.element = document.createElement('div');
    this.element.classList.add('field__cell');
    this.element.classList.add('field__cell_state_locked');
    this.cellText = document.createElement('p');
    this.cellText.classList.add('field__text');
    this.element.append(this.cellText);
    this.setListeners();
    this.renderState();
    return this.element;
  };

  setBomb = () => {
    this.state.isBomb = true;
    this.renderState();
  };

  setValue = (value) => {
    this.state.value = value;
    this.renderState();
  };

  open = () => {
    this.state.isClosed = false;
    if (!this.state.isBomb) {
      this.incrementOpenCells();
      if (this.state.value === 0) {
        this.checkSurround();
      }
    }
    this.renderState();
  };

  handleMove = () => {
    if (!this.state.isClosed) return;
    this.generateBombs(this.coordinates);
    if (this.state.isBomb) {
      this.loose();
    } else {
      this.incrementMove();
    }
    this.open();
    this.isFlagged = false;
    this.renderState();
    this.element.removeEventListener('click', this.handleMove);
    this.element.removeEventListener('contextmenu', this.flag);
    this.cashState();
  };

  renderState = () => {
    if (this.state.isClosed) {
      this.element.classList.add('field__cell_state_locked');
    } else {
      this.element.classList.remove('field__cell_state_locked');
    }

    if (this.state.isBomb) {
      this.element.classList.add('field__cell_state_bomb');
    } else {
      this.element.classList.remove('field__cell_state_bomb');
    }
    if (this.state.isFlagged) {
      this.element.classList.add('field__cell_state_flag');
    } else {
      this.element.classList.remove('field__cell_state_flag');
    }
    this.cellText.textContent = (this.state.value !== 0 && !this.state.isBomb) ? this.state.value : '';
    this.element.classList.add(`field__cell_danger_${this.state.value}`);
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
