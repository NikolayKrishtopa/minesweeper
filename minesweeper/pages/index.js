import './index.scss';
import Game from '../components/Game';
import Field from '../components/Field';
import Cell from '../components/Cell';

const createField = (difficulty, bombQty, createCell, incrementMove, loose) => (
  new Field(difficulty, bombQty, createCell, incrementMove, loose)
);

const createCell = (coordinates, generateBombs, incrementMove, loose) => (
  new Cell(coordinates, generateBombs, incrementMove, loose));

const game = new Game(createField, createCell);

export default game;
