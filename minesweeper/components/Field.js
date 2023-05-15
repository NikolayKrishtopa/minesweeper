export default class Field {
  constructor(mode, bombQty) {
    this.mode = mode;
    this.bombQty = bombQty;
    this.calcSize();
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

  createFieldLayout = () => {
    this.field = document.createElement('div');
    this.field.classList.add('field');
    for (let i = 1; i <= this.size; i += 1) {
      const row = document.createElement('div');
      row.classList.add('field__row');
      this.field.append(row);
      for (let j = 1; j <= this.size; j += 1) {
        const cell = document.createElement('div');
        cell.classList.add('field__cell');
        const cellText = document.createElement('p');
        cellText.classList.add('field__cell-text');
        cell.append(cellText);
        cellText.textContent = `${i}-${j}`;
        row.append(cell);
      }
    }
  };

  generateField = () => {
    this.createFieldLayout();
    return this.field;
  };
}
