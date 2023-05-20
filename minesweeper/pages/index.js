import './index.scss';
import Game from '../components/Game';
import Field from '../components/Field';
import Cell from '../components/Cell';
import PopupResult from '../components/PopupResult';
import PopupStats from '../components/PopupStats';

const createField = (
  difficulty,
  bombQty,
  createCell,
  incrementMove,
  loose,
  incrementOpenCells,
  cashState,
  iniitialState,
) => (
  new Field(
    difficulty,
    bombQty,
    createCell,
    incrementMove,
    loose,
    incrementOpenCells,
    cashState,
    iniitialState,
  )
);

const createCell = (
  coordinates,
  generateBombs,
  incrementMove,
  loose,
  checkSurround,
  incrementOpenCells,
  cashState,
  initialState,
) => (
  new Cell(
    coordinates,
    generateBombs,
    incrementMove,
    loose,
    checkSurround,
    incrementOpenCells,
    cashState,
    initialState,
  ));

const createPopup = (type, args) => (
  type === 'result'
    ? new PopupResult(args)
    : new PopupStats(args)
);

const game = new Game(createField, createCell, createPopup);

export default game;
