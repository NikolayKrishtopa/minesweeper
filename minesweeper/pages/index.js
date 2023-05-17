import './index.scss';
import Game from '../components/Game';
import Field from '../components/Field';
import Cell from '../components/Cell';
import Popup from '../components/Popup';

const createField = (difficulty, bombQty, createCell, incrementMove, loose) => (
  new Field(difficulty, bombQty, createCell, incrementMove, loose)
);

const createCell = (coordinates, generateBombs, incrementMove, loose, checkSurround) => (
  new Cell(coordinates, generateBombs, incrementMove, loose, checkSurround));

const createPopup = (onRestart) => new Popup(onRestart);

const game = new Game(createField, createCell, createPopup);

export default game;
