import moonImg from '../assets/img/moon_fill.svg';
import sunImg from '../assets/img/sun_fill.svg';

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
    this.theme = 'default';
    this.seconds = 0;
    this.startTimer();
  }

  createGameModeMenu = () => {
    this.optionsPanel = document.createElement('div');
    this.optionsPanel.classList.add('nav-panel__game-options');
    this.difficultySelector = document.createElement('select');
    this.difficultySelector.classList.add('nav-panel__selector');
    this.restartBtn = document.createElement('button');
    this.restartBtn.classList.add('nav-panel__restart-btn');
    this.restartBtn.textContent = 'Restart';
    this.difficultySelector.innerHTML = `
      <option value="easy" class="nav-panel__option">easy</option>
      <option value="medium" class="nav-panel__option">medium</option>
      <option value="hard" class="nav-panel__option">hard</option>`;
    this.bombQtySelector = document.createElement('select');
    this.bombQtySelector.classList.add('nav-panel__selector');
    for (let i = 10; i < 100; i += 1) {
      const option = document.createElement('option');
      option.classList.add('nav-panel__option');
      option.value = i;
      option.textContent = i;
      this.bombQtySelector.append(option);
    }
    this.optionsPanel.append(this.difficultySelector);
    this.optionsPanel.append(this.bombQtySelector);
    this.optionsPanel.append(this.restartBtn);
  };

  createInfoPanel = () => {
    this.infoPanel = document.createElement('div');
    this.infoPanel.classList.add('nav-panel__info-panel');
    this.timerCanvas = document.createElement('p');
    this.timerCanvas.classList.add('nav-panel__timer');
    this.timerCanvas.textContent = 0;
    this.score = document.createElement('p');
    this.score.classList.add('nav-panel__score');
    this.score.textContent = 0;
    this.infoPanel.append(this.timerCanvas);
    this.infoPanel.append(this.score);
  };

  createNavPanel = () => {
    this.createGameModeMenu();
    this.createInfoPanel();
    this.navPanel = document.createElement('div');
    this.navPanel.classList.add('nav-panel');
    this.root.append(this.navPanel);
    this.navPanel.append(this.optionsPanel);
    this.navPanel.append(this.infoPanel);
  };

  incrementMove = () => {
    this.movesDone += 1;
    this.score.textContent = this.movesDone;
    if (this.movesDone === this.field.size ** 2 - this.bombQty) {
      this.win();
    }
  };

  loose = () => {
    this.popup.open('Game over. Try again');
    this.blockClicking();
    this.stopTimer();
    this.field.showBombs();
  };

  win = () => {
    this.popup.open(`Hooray! You found all mines in ${this.seconds} seconds and ${this.movesDone} moves!`);
    this.blockClicking();
    this.stopTimer();
    this.field.showBombs();
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

  startTimer = () => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.seconds += 1;
      this.timerCanvas.textContent = this.seconds;
      this.startTimer();
    }, 1000);
  };

  stopTimer = () => {
    clearTimeout(this.timer);
  };

  constructHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');
    header.innerHTML = `
    <header class="header">
      <div class="header__container">
        <h1 class="header__logo">Minesweeper</h1>
        <div class="header__buttons-wrapper">
          <button class="header__btn header__btn_active" id="defThemeBtn">
            <img src="#" alt="default theme button" />
          </button>
          <button class="header__btn" id="darkThemeBtn">
            <img src="#" alt="dark theme button" />
          </button>
        </div>
      </div>
    </header>
    `;
    this.root.prepend(header);
    this.defThemeBtn = this.root.querySelector('#defThemeBtn');
    this.darkThemeBtn = this.root.querySelector('#darkThemeBtn');
    this.darkThemeBtn.querySelector('img').src = moonImg;
    this.defThemeBtn.querySelector('img').src = sunImg;
  };

  createLayoutStructure = () => {
    this.constructHeader();
    this.createNavPanel();
    this.addPopup();
    this.generateField();
  };

  renderTheme = () => {
    switch (this.theme) {
      case 'default':
        this.root.classList.remove('dark');
        this.defThemeBtn.classList.add('header__btn_active');
        this.darkThemeBtn.classList.remove('header__btn_active');
        break;
      case 'dark':
        this.root.classList.add('dark');
        this.defThemeBtn.classList.remove('header__btn_active');
        this.darkThemeBtn.classList.add('header__btn_active');
        break;
      default:
        break;
    }
  };

  setDefTheme = () => {
    this.theme = 'default';
    this.renderTheme();
  };

  setDarkTheme = () => {
    this.theme = 'dark';
    this.renderTheme();
  };

  restart = () => {
    this.resetState();
    this.startTimer();
    this.generateField();
  };

  resetState = () => {
    this.movesDone = 0;
    this.seconds = 0;
    this.timerCanvas.textContent = 0;
    this.score.textContent = 0;
  };

  blockClicking = () => {
    this.field.field.style.pointerEvents = 'none';
  };

  setListeners = () => {
    this.difficultySelector.addEventListener('change', (e) => {
      this.difficulty = e.target.value;
    });
    this.bombQtySelector.addEventListener('change', (e) => {
      this.bombQty = e.target.value;
    });
    this.restartBtn.addEventListener('click', this.restart);
    this.defThemeBtn.addEventListener('click', this.setDefTheme);
    this.darkThemeBtn.addEventListener('click', this.setDarkTheme);
  };

  initiate = () => {
    this.createLayoutStructure();
    this.setListeners();
  };
}
