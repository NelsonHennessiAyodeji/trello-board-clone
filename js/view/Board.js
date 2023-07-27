import Column from './Column.js';

export default class Board {
  //root = a class of board in index.html
  constructor(root) {
    this.root = root;

    Board.columns().forEach((column) => {
      // TODO: Create an instance column class
      const columnView = new Column(column.id, column.title);

      this.root.appendChild(columnView.elements.root);
    });
  }

  static columns() {
    return [
      {
        id: 1,
        title: 'Tasks'
      },
      {
        id: 2,
        title: 'In Progress'
      },
      {
        id: 3,
        title: 'Completed'
      }
    ];
  }
}
