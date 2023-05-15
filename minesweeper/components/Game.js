export default class Game {
  constructor(createField) {
    this.createField = () => createField(this.mode, this.bombQty);
    this.root = document.querySelector('.root');
    this.mode = 'easy';
    this.bombQty = 10;
    this.initiate();
  }

  createGameModeMenu = () => {
    this.optionsPanel = document.createElement('div');
    this.optionsPanel.classList.add('game-options');
    this.modeSelector = document.createElement('select');
    this.modeSelector.classList.add('game-options__selector');
    this.modeSelector.innerHTML = `
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
    this.optionsPanel.append(this.modeSelector);
    this.optionsPanel.append(this.bombQtySelector);
  };

  generateField = () => {
    if (this.field) this.field.remove();
    this.field = this.createField();
    this.root.append(this.field);
  };

  createLayoutStructure = () => {
    this.createGameModeMenu();
    this.generateField();
  };

  startNewGame = () => {
    this.generateField();
  };

  setListeners = () => {
    this.modeSelector.addEventListener('change', (e) => {
      this.mode = e.target.value;
      this.startNewGame();
    });
    this.bombQtySelector.addEventListener('change', (e) => {
      this.bombQty = e.target.value;
      this.startNewGame();
    });
  };

  initiate = () => {
    this.createLayoutStructure();
    this.setListeners();
  };
}
