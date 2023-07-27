export default class ProductivityPalAPI {
  // use this to globally set all items in a partivular column
  static getItems(columnId) {
    //read from local storage
    const column = read().find((coln) => coln.id === columnId);
    if (!column) {
      return [];
    }
    return column.items;
  }

  //using this to add data
  static insertItem(columnId, itemContent) {
    const data = read();
    const column = data.find((col) => col.id === columnId);
    const item = {
      id: Math.floor(Math.random() * 100000),
      // itemContent: itemContent
      itemContent
    };

    if (!column) {
      throw new Error('Column does not exist.');
    }

    column.items.push(item);
    save(data);
    return item;
  }

  //Using this to update column
  static updateItem(itemId, newProps) {
    const data = read();
    const [item, currentColumn] = (() => {
      for (const column of data) {
        const item = column.items.find((itm) => itm.id === itemId);

        if (item) {
          return [item, column];
        }
      }
    })();

    if (!item) {
      throw new Error('Item not found');
    }

    item.content =
      newProps.content === undefined ? item.content : newProps.content;

    //Update column and position
    if (newProps.columnId !== undefined && newProps.position !== undefined) {
      const targetColumn = data.find((col) => col.id === newProps.columnId);
      if (!targetColumn) {
        throw new Error('Target column not found');
      }

      //Delete the item from it's current column
      currentColumn.items.splice(currentColumn.items.indexOf(item), 1);

      //Move Item into it's new column and position
      targetColumn.items.splice(newProps.position, 0, item);
    }
    save(data);
  }

  //Using this to delete data
  static deleteItem(itemId) {
    const data = read();
    for (const column of data) {
      const item = column.items.find((itm) => itm.id === itemId);

      if (item) {
        column.items.splice(column.items.indexOf(item), 1);
      }
    }
    save(data);
  }
}

function read() {
  const json = localStorage.getItem('board-data');

  //Presumably If user is using the app fro the first time
  if (!json) {
    return [
      {
        id: 1,
        items: []
      },
      {
        id: 2,
        items: []
      },
      {
        id: 3,
        items: []
      }
    ];
  }

  return JSON.parse(json);
}

function save(data) {
  localStorage.setItem('board-data', JSON.stringify(data));
}
