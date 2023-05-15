import './index.scss';
import Game from '../components/Game';
import Field from '../components/Field';

const createField = (mode, bombQty) => new Field(mode, bombQty).generateField();

const game = new Game(createField);

export default game;
