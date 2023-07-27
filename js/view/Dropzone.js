import ProductivityPalAPI from '../api/productivityPalAPI.js';

export default class Dropzone {
  static createDropzone() {
    const range = document.createRange();

    range.selectNode(document.body);

    const dropzone = range.createContextualFragment(`
        <div class="board-dropzone"></div>
        `).children[0];

    dropzone.addEventListener('dragover', (e) => {
      //to make sure the functionality works in most scenereos
      e.preventDefault();
      dropzone.classList.add('board-dropzone-active');
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('board-dropzone-active');
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('board-dropzone-active');

      const columnElement = dropzone.closest('.board-column');
      const columnId = Number(columnElement.dataset.id);
      const dropzonesInColumn = Array.from(
        columnElement.querySelectorAll('.board-dropzone')
      );
      const droppedIndex = dropzonesInColumn.indexOf(dropzone);
      const itemId = Number(e.dataTransfer.getData('text/plain'));
      const droppedItemElement = document.querySelector(
        `[data-id="${itemId}"]`
      );
      const insertAfter = dropzone.parentElement.classList.contains(
        'board-item'
      )
        ? dropzone.parentElement
        : dropzone;

      if (droppedItemElement.contains(dropzone)) {
        return;
      }

      insertAfter.after(droppedItemElement);
      ProductivityPalAPI.updateItem(itemId, {
        columnId,
        position: droppedIndex
      });
    });

    return dropzone;
  }
}
