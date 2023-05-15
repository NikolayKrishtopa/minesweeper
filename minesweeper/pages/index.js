import './index.scss';
import Game from '../components/Game';
import Field from '../components/Field';
import Cell from '../components/Cell';

const createField = (mode, bombQty, createCell) => (
  new Field(mode, bombQty, createCell).generateField()
);

const createCell = (coordinates, generateBombs) => new Cell(coordinates, generateBombs);

const game = new Game(createField, createCell);

export default game;
