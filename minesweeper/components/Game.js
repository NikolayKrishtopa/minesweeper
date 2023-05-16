export default class Game {
  constructor(createField, createCell, createPopup) {
    this.popup = createPopup(this.restart);
    this.createField = () => createField(
      this.difficulty,
      this.bombQty,
      createCell,
      this.incrementMove,
      this.loose,
    );
    this.root = document.querySelector('.root');
    this.difficulty = 'easy';
    this.bombQty = 10;
    this.movesDone = 0;
    this.initiate();
  }

  createGameModeMenu = () => {
    this.optionsPanel = document.createElement('div');
    this.optionsPanel.classList.add('game-options');
    this.difficultySelector = document.createElement('select');
    this.difficultySelector.classList.add('game-options__selector');
    this.restartBtn = document.createElement('button');
    this.restartBtn.classList.add('game-options__restart-btn');
    this.restartBtn.textContent = 'Restart';
    this.difficultySelector.innerHTML = `
      <option value="easy" class="game-options__option">easy</option>
      <option value="medium" class="game-options__option">medium</option>
      <option value="hard" class="game-options__option">hard</option>`;
    this.bombQtySelector = document.createElement('select');
    this.bombQtySelector.classList.add('game-options__selector');
    for (let i = 10; i < 100; i += 1) {
      const option = document.createElement('option');
      option.classList.add('game-options__option');
      option.value = i;
      option.textContent = i;
      this.bombQtySelector.append(option);
    }
    this.root.append(this.optionsPanel);
    this.optionsPanel.append(this.difficultySelector);
    this.optionsPanel.append(this.bombQtySelector);
    this.optionsPanel.append(this.restartBtn);
  };

  incrementMove = () => {
    this.movesDone += 1;
    if (this.movesDone === this.field.size ** 2 - this.bombQty) {
      this.popup.open(`Hooray! You found all mines in ## seconds and ${this.movesDone} moves!`);
    }
  };

  loose = () => {
    this.movesDone = 0;
    this.popup.open('Game over. Try again');
  };

  generateField = () => {
    if (this.fieldElement) this.fieldElement.remove();
    this.field = this.createField();
    this.fieldElement = this.field.generateField();
    this.root.append(this.fieldElement);
  };

  addPopup = () => {
    this.root.append(this.popup.getElement());
  };

  createLayoutStructure = () => {
    this.createGameModeMenu();
    this.addPopup();
    this.generateField();
  };

  restart = () => {
    this.movesDone = 0;
    this.generateField();
  };

  setListeners = () => {
    this.difficultySelector.addEventListener('change', (e) => {
      this.difficulty = e.target.value;
    });
    this.bombQtySelector.addEventListener('change', (e) => {
      this.bombQty = e.target.value;
    });
    this.restartBtn.addEventListener('click', this.restart);
  };

  initiate = () => {
    this.createLayoutStructure();
    this.setListeners();
  };
}
