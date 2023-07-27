import ProductivityPalAPI from '../api/productivityPalAPI.js';
import Dropzone from './Dropzone.js';

export default class Item {
  constructor(id, content) {
    const bottomDropzone = Dropzone.createDropzone();

    this.elements = {};
    this.elements.root = Item.createRoot();
    this.elements.input = this.elements.root.querySelector('.board-item-input');

    this.elements.root.dataset.id = id;
    this.elements.input.textContent = content;
    this.content = content; // again, check this line incase of errors ooo
    this.elements.root.appendChild(bottomDropzone);

    //This function ultimately update an item or a task
    const onBlur = () => {
      const newContent = this.elements.input.textContent.trim();

      if (newContent === this.content) {
        return;
      }
      this.content = newContent;
      ProductivityPalAPI.updateItem(id, {
        content: this.content
      });
    };

    this.elements.input.addEventListener('blur', onBlur);
    this.elements.root.addEventListener('dblclick', () => {
      const check = confirm('Are you sure you want to delete this task?');

      if (check) {
        ProductivityPalAPI.deleteItem(id);

        this.elements.input.removeEventListener('blur', onBlur);
        this.elements.root.parentElement.removeChild(this.elements.root);
      }
    });

    this.elements.root.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', id); //or jjust text
    });

    this.elements.input.addEventListener('drop', (e) => {
      e.preventDefault();
    });
  }

  static createRoot() {
    const range = document.createRange();

    range.selectNode(document.body);

    return range.createContextualFragment(`
    <div class="board-item" draggable="true">
            <div class="board-item-input" contenteditable></div>
        </div>
    `).children[0];
  }
}
