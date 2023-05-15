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

  generateBombs = (clicked) => {
    if (this.bombs.length) return;
    let allCells = this.cells.flat().filter((c) => (
      c.coordinates.row !== clicked.row || c.coordinates.column !== clicked.column));
    for (let b = this.bombQty; b > 0; b -= 1) {
      const random = Math.floor(Math.random() * allCells.length);
      this.bombs.push(allCells[random]);
      allCells = allCells.filter((_, i) => i !== random);
    }
    this.bombs.forEach((e) => e.setBomb());
  };

  generateCells = () => {
    for (let i = 1; i <= this.size; i += 1) {
      const row = [];
      for (let j = 1; j <= this.size; j += 1) {
        const cell = this.createCell({ row: i, column: j }, this.generateBombs);
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
