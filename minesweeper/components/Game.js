import moonImg from '../assets/img/moon_fill.svg';
import sunImg from '../assets/img/sun_fill.svg';
import soundOnIcon from '../assets/img/sound_on.svg';
import soundOffIcon from '../assets/img/sound_off.svg';
import historyIcon from '../assets/img/history.svg';
import openSound from '../assets/sounds/open.mp3';
import bombSound from '../assets/sounds/bomb.mp3';
import winSound from '../assets/sounds/win.mp3';

export default class Game {
  constructor(createField, createCell, createPopup) {
    this.openCellSnd = new Audio(openSound);
    this.bombSnd = new Audio(bombSound);
    this.winSnd = new Audio(winSound);
    this.popupRes = createPopup('result', this.restart);
    this.createField = (fieldInitialState) => createField(
      this.state.difficulty,
      this.state.bombQty,
      createCell,
      this.incrementMoves,
      this.loose,
      this.incrementOpenCells,
      this.cashState,
      fieldInitialState,
    );
    this.root = document.querySelector('.root');
    this.state = JSON.parse(localStorage.getItem('minesweeperState')) || {
      bombQty: 10,
      movesDone: 0,
      openCells: 0,
      theme: 'default',
      seconds: 0,
      history: [],
      fieldState: null,
      gameInProcess: false,
      soundOn: true,
      difficulty: 'easy',
    };
    this.popupStats = createPopup('history', this.state.history);
    this.field = null;
    this.initiate();
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
    Array.from(this.difficultySelector.options)
      .find((e) => e.value === this.state.difficulty).selected = true;
    Array.from(this.bombQtySelector.options)
      .find((e) => e.value.toString() === this.state.bombQty.toString()).selected = true;
  };

  createInfoPanel = () => {
    this.infoPanel = document.createElement('div');
    this.infoPanel.classList.add('nav-panel__info-panel');
    this.timerCanvas = document.createElement('p');
    this.timerCanvas.classList.add('nav-panel__timer');
    this.timerCanvas.textContent = this.state.seconds;
    this.score = document.createElement('p');
    this.score.classList.add('nav-panel__score');
    this.score.textContent = this.state.movesDone;
    this.infoPanel.append(this.timerCanvas);
    this.infoPanel.append(this.score);
  };

  createNavPanel = () => {
    this.createGameModeMenu();
    this.createInfoPanel();
    this.navPanel = document.createElement('div');
    this.navPanel.classList.add('nav-panel');
    this.navPanel.append(this.optionsPanel);
    this.navPanel.append(this.infoPanel);
    return this.navPanel;
  };

  createMainLayout = () => {
    this.mainElem = document.createElement('main');
    this.mainElem.classList.add('content');
    this.mainElem.append(this.createNavPanel());
    this.fieldContainer = document.createElement('div');
    this.fieldContainer.classList.add('content__container');
    this.fieldContainer.append(this.generateField());
    this.mainElem.append(this.fieldContainer);
    this.root.append(this.mainElem);
  };

  incrementOpenCells = () => {
    if (!this.state.gameInProcess) return;
    this.state.openCells += 1;
    if (this.state.openCells === this.field.size ** 2 - this.state.bombQty) {
      this.win();
    } else if (this.state.soundOn) {
      this.openCellSnd.currentTime = 0;
      this.openCellSnd.play();
    }
  };

  incrementMoves = () => {
    if (!this.state.gameInProcess) this.startTimer();
    this.state.movesDone += 1;
    this.score.textContent = this.state.movesDone;
  };

  loose = () => {
    if (this.state.soundOn) {
      this.bombSnd.currentTime = 0;
      this.bombSnd.play();
    }
    this.stopTimer();
    this.state.history.unshift({ result: 'fail', score: this.state.movesDone, time: this.state.seconds });
    this.state.history = this.state.history.splice(0, 10);
    this.popupRes.open('Game over. Try again');
    this.blockClicking();
    this.field.showAll();
  };

  win = () => {
    if (this.state.soundOn) {
      this.winSnd.currentTime = 0;
      this.winSnd.play();
    }
    this.stopTimer();
    this.state.history.unshift({ result: 'win', score: this.state.movesDone, time: this.state.seconds });
    this.state.history = this.state.history.splice(0, 10);
    this.popupRes.open(`Hooray! You found all mines in ${this.state.seconds} seconds and ${this.state.movesDone} moves!`);
    this.blockClicking();
    this.field.showAll();
  };

  generateField = () => {
    this.field = this.createField(this.state.fieldState);
    this.fieldElement = this.field.generateField();
    return this.fieldElement;
  };

  restartField = () => {
    if (!this.fieldElement) return;
    this.fieldElement.remove();
    this.fieldContainer.append(this.generateField());
  };

  addPopup = () => {
    this.root.append(this.popupRes.getElement());
    this.root.append(this.popupStats.getElement());
  };

  startTimer = () => {
    this.state.gameInProcess = true;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.state.seconds += 1;
      this.timerCanvas.textContent = this.state.seconds;
      this.startTimer();
      this.cashState();
    }, 1000);
  };

  stopTimer = () => {
    clearTimeout(this.timer);
    this.state.gameInProcess = false;
  };

  constructHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');
    header.innerHTML = `
    <header class="header">
      <div class="header__container">
        <h1 class="header__logo">Minesweeper</h1>
        <div class="header__nav">      
          <button class="header__btn" id="statsBtn">
            <img src="#" alt="statistic"/>
          </button>
          <button class="header__btn" id="soundBtn">
            <img src="#" alt="sound button"/>
          </button>
          <button class="header__btn " id="themeBtn">
            <img src="#" alt="default theme button" />
          </button>
        </div>
      </div>
    </header>
    `;
    this.root.prepend(header);
    this.themeBtn = this.root.querySelector('#themeBtn');
    this.darkThemeBtn = this.root.querySelector('#darkThemeBtn');
    this.statsBtn = this.root.querySelector('button');
    this.soundBtn = this.root.querySelector('#soundBtn');
    this.statsBtn.querySelector('img').src = historyIcon;
  };

  createLayoutStructure = () => {
    this.constructHeader();
    this.createMainLayout();
    this.addPopup();
  };

  renderTheme = () => {
    const img = this.themeBtn.querySelector('img');
    switch (this.state.theme) {
      case 'default':
        this.root.classList.remove('dark');
        img.src = sunImg;
        img.alt = 'default theme button';
        break;
      case 'dark':
        this.root.classList.add('dark');
        img.src = moonImg;
        img.alt = 'dark theme button';
        break;
      default:
        break;
    }
  };

  renderSoundBtn = () => {
    switch (this.state.soundOn) {
      case true:
        this.soundBtn.querySelector('img').src = soundOnIcon;
        break;
      case false:
        this.soundBtn.querySelector('img').src = soundOffIcon;
        break;
      default:
        break;
    }
  };

  toggleTheme = () => {
    if (this.state.theme === 'default') {
      this.state.theme = 'dark';
    } else { this.state.theme = 'default'; }
    this.renderTheme();
  };

  toggleSound = () => {
    this.state.soundOn = !this.state.soundOn;
    this.renderSoundBtn();
  };

  restart = () => {
    if (this.state.gameInProcess) {
      this.state.history.unshift({ result: 'unfinished', score: this.state.movesDone, time: this.state.seconds });
      this.state.history = this.state.history.splice(0, 10);
      this.stopTimer();
    }
    this.resetState();
    this.restartField();
    this.cashState();
  };

  resetState = () => {
    this.state.fieldState = null;
    this.state.movesDone = 0;
    this.state.openCells = 0;
    this.state.seconds = 0;
    this.timerCanvas.textContent = 0;
    this.score.textContent = 0;
  };

  blockClicking = () => {
    this.field.field.style.pointerEvents = 'none';
  };

  setListeners = () => {
    this.difficultySelector.addEventListener('change', (e) => {
      this.state.difficulty = e.target.value;
      this.restart();
    });
    this.bombQtySelector.addEventListener('change', (e) => {
      this.state.bombQty = e.target.value;
      this.restart();
    });
    this.restartBtn.addEventListener('click', this.restart);
    this.themeBtn.addEventListener('click', this.toggleTheme);
    this.statsBtn.addEventListener('click', () => this.popupStats.open(this.state.history));
    this.soundBtn.addEventListener('click', this.toggleSound);
  };

  initiate = () => {
    this.createLayoutStructure();
    this.setListeners();
    this.renderTheme();
    this.renderSoundBtn();
    if (this.state.gameInProcess) this.startTimer();
  };

  cashState = () => {
    this.state.fieldState = this.field.state;
    this.state.fieldState.cellsState = this.field?.cellsMatrix.map((e) => e.map((f) => f.state));
    localStorage.setItem('minesweeperState', JSON.stringify(this.state));
  };
}
