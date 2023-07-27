import ProductivityPalAPI from './api/productivityPalAPI.js';
import Board from './view/board.js';

ProductivityPalAPI.insertItem(2, 'WORK HARD');
new Board(document.querySelector('.board'));
