export default class Field {
  constructor(
    difficulty,
    bombQty,
    createCell,
    incrementMove,
    loose,
    incrementOpenCells,
    cashState,
    initialState,
    handleFlag,
    getRemainigFlags,
  ) {
    this.createCell = (coord, cellInitialState) => (
      createCell(
        coord,
        this.generateBombs,
        incrementMove,
        loose,
        this.checkSurround,
        incrementOpenCells,
        cashState,
        cellInitialState,
        handleFlag,
        getRemainigFlags,
      )
    );
    this.state = initialState || {
      bombsPlaced: false,
    };
    this.cellsMatrix = [];
    this.cellsFlat = [];
    this.difficulty = difficulty;
    this.bombQty = bombQty;
    this.bombs = [];
    this.initiate();
  }

  calcSize = () => {
    switch (this.difficulty) {
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
    if (this.state.bombsPlaced) return;
    if (!this.bombs.length) {
      let allCells = this.cellsFlat.filter((c) => (
        c.coordinates.row !== clicked.row || c.coordinates.column !== clicked.column));
      for (let b = this.bombQty; b > 0; b -= 1) {
        const random = Math.floor(Math.random() * allCells.length);
        this.bombs.push(allCells[random]);
        allCells = allCells.filter((_, i) => i !== random);
      }
    }
    this.bombs.forEach((e) => e.setBomb());
    this.calculateValues();
    this.state.bombsPlaced = true;
  };

  calculateValues = () => {
    this.cellsFlat.forEach((e) => {
      let surroundingBombs = 0;
      for (let i = e.coordinates.row - 1; i <= e.coordinates.row + 1; i += 1) {
        if (this.cellsMatrix[i]) {
          for (let j = e.coordinates.column - 1; j <= e.coordinates.column + 1; j += 1) {
            if (this?.cellsMatrix[i][j]?.state.isBomb) surroundingBombs += 1;
          }
        }
      }
      e.setValue(surroundingBombs);
    });
  };

  checkSurround = (coordinates) => {
    for (let i = coordinates.row - 1; i <= coordinates.row + 1; i += 1) {
      if (this.cellsMatrix[i]) {
        for (let j = coordinates.column - 1; j <= coordinates.column + 1; j += 1) {
          if (this?.cellsMatrix[i][j]?.state.isClosed) {
            if (!(Math.abs(i - coordinates.row) === 1 && Math.abs(j - coordinates.column) === 1)) {
              this.cellsMatrix[i][j].open();
            }
          }
        }
      }
    }
  };

  generateCells = () => {
    for (let i = 0; i < this.size; i += 1) {
      const row = [];
      for (let j = 0; j < this.size; j += 1) {
        let initState = null;
        if (this.state?.cellsState?.length >= i) {
          if (this.state?.cellsState[i]?.length >= j) { initState = this.state.cellsState[i][j]; }
        }
        const cell = this.createCell({ row: i, column: j }, initState);
        row.push(cell);
      }
      this.cellsMatrix.push(row);
    }
    this.cellsFlat = Array.from(this.cellsMatrix.flat());
  };

  createFieldLayout = () => {
    this.field = document.createElement('div');
    this.field.classList.add('field');
    this.field.classList.add(`field_size_${this.size}`);
    for (let i = 0; i < this.size; i += 1) {
      const row = document.createElement('div');
      row.classList.add('field__row');
      this.field.append(row);
      for (let j = 0; j < this.size; j += 1) {
        row.append(this.cellsMatrix[i][j].createLayout());
      }
    }
  };

  showAll = () => {
    this.cellsFlat.forEach((e) => {
      if (e.state.isClosed)e.open();
    });
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
