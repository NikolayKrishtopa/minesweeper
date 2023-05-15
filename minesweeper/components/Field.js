export default class Field {
  constructor(mode, bombQty, createCell) {
    this.createCell = createCell;
    this.mode = mode;
    this.bombQty = bombQty;
    this.bombs = [];
    this.cells = [];
    this.initiate();
  }

  calcSize = () => {
    switch (this.mode) {
      case 'easy':
        this.size = 10;
        break;
      case 'medium':
        this.size = 15;
        break;
      case 'hard':
        this.size = 25;
        break;
      default:
        break;
    }
  };

  generateBombs = () => {
    if (this.bombs.length) return;
    for (let b = this.bombQty; b > 0; b -= 1) {
      const random = Math.round(Math.random() * this.size ** 2);
      const row = Math.ceil(random / this.size) === 0 ? 1 : Math.ceil(random / this.size);
      const column = (random % this.size) + 1;
      const bomb = { row, column };
      this.bombs.push(bomb);
    }
    this.placeBombsToCells();
  };

  placeBombsToCells = () => {
    console.log(this.bombs);
    this.bombs.forEach((b) => this.cells[b.row - 1][b.column - 1].setBomb());
  };

  generateCells = () => {
    for (let i = 1; i <= this.size; i += 1) {
      const row = [];
      for (let j = 1; j <= this.size; j += 1) {
        const cell = this.createCell(`${i}-${j}`, this.generateBombs);
        row.push(cell);
      }
      this.cells.push(row);
    }
  };

  createFieldLayout = () => {
    this.field = document.createElement('div');
    this.field.classList.add('field');
    for (let i = 0; i < this.size; i += 1) {
      const row = document.createElement('div');
      row.classList.add('field__row');
      this.field.append(row);
      for (let j = 0; j < this.size; j += 1) {
        row.append(this.cells[i][j].createLayout());
      }
    }
  };

  generateField = () => {
    this.createFieldLayout();
    return this.field;
  };

  initiate = () => {
    this.calcSize();
    this.generateCells();
  };
}
