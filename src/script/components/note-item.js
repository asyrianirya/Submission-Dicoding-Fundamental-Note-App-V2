import Utils from './utils.js';
import { mainNotes } from '../data-index.js';
import { home } from '../view-controller.js';
import '@fontsource-variable/edu-tas-beginner';
import '@fontsource-variable/merienda';


class NoteItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _emptyType = false;
  _notesColor =
    Utils.getSettings('colors', 'defaultNoteColor') ||
    Utils.getSettings('colors', 'fallbackDefaultNoteColor');
  _additionNotes = Utils.getSettings('colors', 'additionNotes');
  _additionNotesHover = Utils.getSettings('colors', 'additionNotesHover');
  _negativeButton = Utils.getSettings('colors', 'negativeButton');
  _negativeButtonHover = Utils.getSettings('colors', 'negativeButtonHover');
  _note = {};

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'closed' });
    this._style = document.createElement('style');
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  set note(value) {
    this._note = value;
    this.render();
  }

  get note() {
    return this._note;
  }

  _commonStyle = `
        :host {
          display: block;
          border-radius: 20px;
          
          box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
          overflow: hidden;
          opacity: 1;
          transition: border-radius 0.5s, opacity 0.5s;
          padding: 10px;
        }
        .card {
          height: 100%;
        }
        :host(:hover){
          border-radius: 20px 0px 0px 20px;
          opacity: 1;
        }
        .note-info {
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
        }
        .note-info__title h2 {
          overflow-wrap: break-word;
          font-family: 'Merienda Variable', cursive;
        }
        .note-info__description p {
          overflow-wrap: anywhere;
          font-family: 'Edu TAS Beginner Variable', cursive;
          font-size: 30px;
        }
        .note-info__created-at {
        }
        .note-info__archived button{
          width: 100%;
        }
        button {
          background-color: ${Utils.getSettings('colors', 'buttonColor')};
          z-index = 0;
        }
        button:hover {
          background-color: ${Utils.getSettings('colors', 'buttonColorHover')};
          color:white;
        }
        .note-info__delete button {
          width: 100%;
          background-color: ${this._negativeButton};
        }
        .note-info__delete button:hover {
          background-color: ${this._negativeButtonHover};
        }

        
  `;

  _updateStyle() {
    this._style.textContent =
      this._commonStyle +
      `
        :host {
          background-color: ${this._notesColor};
        }
      `;
  }

  _updateStyleEmptyBox() {
    this._style.textContent =
      this._commonStyle +
      `
      :host {
        background-color: ${this._additionNotes};
        transition: background-color 0.5s;
      }
      :host(:hover){
        background-color: ${this._additionNotesHover};
      }
      .card-empty {
        font-size: 72px;
        text-align: center;
        justify-content: center;
        display: flex;
        flex-direction: column;
        color: gray;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    `;
  }
  render() {
    const moduleNotes = mainNotes();

    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);

    let shadowContent = '';
    if (this._note.id) {
      shadowContent = `
        <div class="card ${this._emptyType ? 'nonetype' : ''}">
          <div class="note-info">
            <div class="note-info__title">
              <h2>${this._note.title || ''}</h2>
            </div>
            <div class="note-info__description">
              <p>${this._note.body || ''}</p>
            </div>
            <div class="note-info__created-at">
              <p>${this._note.createdAt || ''}</p>
            </div>
          <div class="buttons" style="display: none;">
              <div class="note-info__delete">
                  <button
                    onmouseover="this.innerText = 'HAPUS INI'"
                    onmouseout="this.innerText = 'HAPUS'"
                    data-id="${this._note.id || ''}"
                  >HAPUS</button>
              </div>
              <div class="note-info__archived">
                  <button 
                  data-archived="${this._note.archived}"
                  data-id="${this._note.id || ''}"
                  onmouseover="this.innerText = this.getAttribute('data-archived') === 'true' ? 'KELUARKAN DARI ARSIP' : 'ARSIPKAN'" 
                  onmouseout="this.innerText = this.getAttribute('data-archived') === 'true' ? 'DIARSIPKAN' : 'TIDAK DIARSIPKAN'">
                    ${this._note.archived ? 'DIARSIPKAN' : 'TIDAK DIARSIPKAN'}
                  </button>
                </div>
                <input type="hidden" id="${this._note.id || ''}" name="${
                  this._note.id || ''
                }" value="${this._note.id || ''}">
          </div><!-- end button -->
            </div> <!--end note info-->
        </div>
      `;
    } else {
      this._updateStyleEmptyBox();
      this._shadowRoot.appendChild(this._style);
      shadowContent = `
        <div class="card-empty">+</div>
      `;
    }

    this._shadowRoot.innerHTML += shadowContent;

    const noteInfoDelete = this._shadowRoot.querySelector('.note-info__delete');

    const noteInfoArchived = this._shadowRoot.querySelector(
      '.note-info__archived',
    );
    const emptyCard = this._shadowRoot.querySelector('.card-empty');

    const editListElement = document.querySelector('edit-list');
    const textNoteElement = editListElement._textNote;
    const backStage = editListElement._backStage;
    const formContainer = editListElement._formContainer;

    emptyCard?.addEventListener('click', (event) => {
      event.preventDefault();
      Utils.showElement(backStage);
      Utils.showElement(formContainer);
      textNoteElement.focus();
    });

    noteInfoArchived?.addEventListener('click', (event) => {
      event.preventDefault();
      const dataId = event.target.getAttribute('data-id');
      if (dataId && this._note.archived == false) {
        moduleNotes.archiveNote(dataId).then((response) => {
          home();
        });
      } else if (dataId && this._note.archived == true) {
        moduleNotes.unArchiveNote(dataId).then((response) => {
          home(false, true);
        });
      }
    });

    noteInfoDelete?.addEventListener('click', (event) => {
      event.preventDefault();
      const dataId = event.target.getAttribute('data-id');
      if (dataId) {
        moduleNotes.removeNote(dataId).then((response) => {
          home();
        });
      }
    });

    const buttons = this._shadowRoot.querySelector('.buttons');

    this.addEventListener('mouseover', () => {
      buttons ? Utils.showElement(buttons) : 0;
    });
    this.addEventListener('mouseout', () => {
      buttons ? Utils.hideElement(buttons) : 0;
    });
  }
}

customElements.define('note-item', NoteItem);
