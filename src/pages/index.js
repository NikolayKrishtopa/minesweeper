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
  handleFlag,
  getRemainigFlags,
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
    handleFlag,
    getRemainigFlags,
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
  handleFlag,
  getRemainigFlags,
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
    handleFlag,
    getRemainigFlags,
  ));

const createPopup = (type, args) => (
  type === 'result'
    ? new PopupResult(args)
    : new PopupStats(args)
);

const game = new Game(createField, createCell, createPopup);

export default game;
