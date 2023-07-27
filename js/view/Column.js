import ProductivityPalAPI from '../api/productivityPalAPI.js';
import Dropzone from './Dropzone.js';
import Item from './Item.js';

export default class Column {
  constructor(id, title) {
    const topDropzone = Dropzone.createDropzone();

    this.elements = {};
    this.elements.root = Column.createRoot();
    this.elements.title = this.elements.root.querySelector(
      '.board-column-title'
    );
    this.elements.items = this.elements.root.querySelector(
      '.board-column-items'
    );
    this.elements.addItem = this.elements.root.querySelector('.board-add-item');

    this.elements.root.dataset.id = id;
    this.elements.title.textContent = title;
    this.elements.items.appendChild(topDropzone);
    //Dropzone

    this.elements.addItem.addEventListener('click', () => {
      //Add items
      const newItem = ProductivityPalAPI.insertItem(id, '');
      this.renderItem(newItem);
    });
    // console.log(id);
    // console.log(ProductivityPalAPI.getItems(id));
    ProductivityPalAPI.getItems(id).forEach((item) => {
      this.renderItem(item);
    });
  }

  static createRoot() {
    const range = document.createRange();

    range.selectNode(document.body);

    return range.createContextualFragment(`
    <div class="board-column">
            <div class="board-column-title"></div>
                <div class="board-column-items"></div>
                <button class="board-add-item" type="button">+ ADD</button>
        </div>
    `).children[0];
  }

  renderItem(data) {
    //TODO: Create Item instance
    // console.log(data.id);
    // console.log('HDDDH');
    // console.log('HFH   ' + data.itemContent);
    // console.log('HFH   ' + data.content);
    const item = new Item(data.id, data.content);
    this.elements.items.appendChild(item.elements.root);
  }
}
