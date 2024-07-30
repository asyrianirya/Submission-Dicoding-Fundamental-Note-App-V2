import Utils from './utils.js';
import notepadIco from '../../styles/notepad.png';
import { mainNotes, Notes } from '../data-index.js';
import { home } from '../view-controller.js';
import './_parts-index.js';

class EditList extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _script = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'closed' });
    this._style = document.createElement('style');
    this.render();
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  _updateStyle() {
    this._style.textContent = `
    :host {
      padding: 0px;
      margin: 0px;
    }

    button {
      padding: 10px;
      margin: 5px;
      border-radius: 10px 10px 10px 10px;
      border: 1px solid black;
      background-color: ${Utils.getSettings('colors', 'buttonColor')};
      transition: background-color 0.2s;
      text-decoration: none;
      z-index: 0;
    }

    button:hover { background-color: ${Utils.getSettings(
      'colors',
      'buttonColorHover',
    )};
    }
    .form-container {
      display: flex;
      position: absolute;
      background-color: rgba(0, 255, 255,50);
      border: 1px solid black;
      display: none;
      width: 100%;
      max-width: 50vw;
      z-index: 101;
      
    }

    @media only screen and (max-width: 600px) {
      .form-container {
        width: 100%;
        height: 100%;
        max-width: 600px;
        position: fixed;
      }
    }

    label {
      flex: 1;
    }

    form {
      display: flex;
      flex-direction: column;
      padding: 1rem;
    }

    .input-note {
      display: flex;
      flex-direction: column;
    }

    .input-note-label {
      display: flex;
      flex-direction: row;
    }
    .input-container {
      display: flex;
      flex-direction: column;
      align-items: start;
    }
    .feedback {
      color: red;
    }
    .invalid {
      border: 2px solid red;
    }
    .warning{
      border: 2px solid yellow;
    }
    textarea {
      resize: vertical;
      max-height: 5rem;
      min-height: 1rem;
    }
    .input {
      box-shadow: inset 10px 10px 17px -15px rgba(0,0,0,0.75);
      margin-inline: 5px;
      padding-left: 10px;
      height: 2rem;
      border-radius: 20px 20px;
    }
    .title-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 2rem;

    background-color: #0D0D0D;
      color: white;
    }
    .label-logo-container {
      display: flex;
      align-items: center;
    }
    .logo-container {
      height: 2rem;
    }
    .logo-container img {
      height: 100%;
    }
    .button-container {
      display: flex;
      align-items: center;
    }
    #close {
      border-radius: 0px 0px;
      height: 100%;
      margin: 0;
      background-color: #0D0D0D;
      color: white;
      transition: background-color 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0px solid black;
      padding: 0;
      height: 2rem;
      width: 2rem;
    }
    #close:hover {
      background-color: rgba(255,0,0,0.7);
    }
    h1 { 
      margin: 0;
      margin-bottom: 10px;
    }
    .prevent-select {
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10 and IE 11 */
        user-select: none; /* Standard syntax */
      }
    
        `;
  }

  get _textNote() {
    return this._shadowRoot.querySelector('#judul-note');
  }

  get _formContainer() {
    return this._shadowRoot.getElementById('form');
  }

  get _backStage() {
    return this._shadowRoot.querySelector('backstage-element');
  }

  render() {
    const moduleNotes = mainNotes();

    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
    <div class="insert-container">
        <div class="action-container prevent-select">
            <button title="Add Notes" id="insert">INSERT NOTES</button>
            <button title="Dummy Notes" id="insert_dummy">INSERT DUMMY NOTES</button>
        </div>
        <backstage-element></backstage-element>
        <div id="form" class="form-container">
        <div class="title-bar">
          <div class="label-logo-container">
            <div class="logo-container">
              <img src="${notepadIco}"></img>
            </div>
            <p>Insert Notes</p>
          </div>
          <div class="button-container">
            <button id="close">
            <span>&#10005;</span>
            </button>
          </div>
        </div>
            <form>
              <div class="title">
                <h1>INPUT BARU</h1>
              </div>
                  <div class="input-note-title input-note">
                      <div class="input-note-label">
                        <label for="judul-note">Masukan Judul catatan anda:</label><span class="judul-note-word">0/0</span>
                      </div>
                      <input class="input" minlength="8" maxlength="50" name="Judul Catatan" type="text" id="judul-note" required>
                      <p class="judulNoteFeedback feedback"></p>
                  </div>
                  <div class="input-note-content input-note">
                      <div class="input-note-label">
                        <label for="isi-note">Masukan Isi catatan anda:</label><span class="isi-note-word">0/0</span>
                      </div>
                      <textarea class="input" minlength="10" maxlength="1000" name="Isi Catatan" type="text" id="isi-note" required row="60" col="auto"></textarea>
                      <p class="isiNoteFeedback feedback"></p>
                  </div>
              <button id="submit-note" type="submit">Insert Note</button>
            </form>
        </div>
    </div>

        `;
    const insertButton = this._shadowRoot.getElementById('insert');
    const insertDummyButton = this._shadowRoot.getElementById('insert_dummy');

    const backStage = this._shadowRoot.querySelector('backstage-element');

    const formContainer = this._shadowRoot.getElementById('form');
    const submitNote = this._shadowRoot.getElementById('submit-note');

    const judulNote = this._shadowRoot.getElementById('judul-note');
    const judulNoteWord = this._shadowRoot.querySelector('.judul-note-word');
    const judulNoteFeedback =
      this._shadowRoot.querySelector('.judulNoteFeedback');

    const isiNote = this._shadowRoot.getElementById('isi-note');
    const isiNoteFeedback = this._shadowRoot.querySelector('.isiNoteFeedback');
    const isiNoteWord = this._shadowRoot.querySelector('.isi-note-word');

    const formClose = () => {
      Utils.hideElement(formContainer);
      Utils.hideElement(backStage);
      judulNote.value = '';
      isiNote.value = '';
    };

    const formOpen = () => {
      Utils.showElement(formContainer);
      Utils.showElement(backStage);
    };

    insertButton.addEventListener('click', () => {
      formOpen();
    });

    backStage.addEventListener('click', () => {
      formClose();
    });

    let isError = true;
    const validateInput = (
      inputElement,
      feedbackElement,
      minLength,
      maxLength,
      wordElement = null,
    ) => {
      inputElement.addEventListener('input', (event) => {
        const inputValue = inputElement.value.trim();
        const currentLength = inputElement.value.length;
        if (wordElement) {
          wordElement.innerHTML = `${currentLength}/${maxLength}`;
        }
        if (!inputValue) {
          inputElement.classList.add('invalid');
          feedbackElement.textContent = `Masukkan ${inputElement.name} terlebih dahulu`;
          isError = true;
        } else if (minLength && currentLength < minLength) {
          inputElement.classList.add('invalid');
          feedbackElement.textContent = `Masukkan karakter setidaknya lebih atau sama dengan dari ${minLength}`;
          isError = true;
        } else if (maxLength && currentLength == maxLength) {
          inputElement.classList.add('warning');
          feedbackElement.textContent = `Anda sudah mencapai batas maksimum banyak karakter`;
          isError = false;
        } else if (maxLength && currentLength > maxLength) {
          inputElement.classList.add('invalid');
          feedbackElement.textContent = `Karakter jangan lebih dari ${maxLength}`;
          isError = true;
        } else {
          inputElement.classList.remove('invalid');
          inputElement.classList.remove('warning');
          feedbackElement.textContent = '';
          isError = false;
        }
      });
    };

    const judulNoteMinLength = parseInt(
      Utils.getElementAttribute(judulNote, 'minlength'),
    );
    const judulNoteMaxLength = parseInt(
      Utils.getElementAttribute(judulNote, 'maxlength'),
    );
    judulNoteWord.innerHTML = `0/${judulNoteMaxLength}`;
    const isiNoteMinLength = parseInt(
      Utils.getElementAttribute(isiNote, 'minlength'),
    );
    const isiNoteMaxLength = parseInt(
      Utils.getElementAttribute(isiNote, 'maxlength'),
    );
    isiNoteWord.innerHTML = `0/${isiNoteMaxLength}`;

    validateInput(
      judulNote,
      judulNoteFeedback,
      judulNoteMinLength,
      judulNoteMaxLength,
      judulNoteWord,
    );
    validateInput(
      isiNote,
      isiNoteFeedback,
      isiNoteMinLength,
      isiNoteMaxLength,
      isiNoteWord,
    );

    submitNote.addEventListener('click', (event) => {
      event.preventDefault();
      if (isiNote.value.trim() == '' || judulNote.value.trim() == '') {
        isError = true;
      }

      if (!isError) {
        const note = {
          title: judulNote.value,
          body: isiNote.value,
        };

        moduleNotes.insertNote(note).then((response) => {
          home();
        });

        formClose();
      } else {
        alert('Kesalahan input');
      }
    });

    const closeModalInsertButton = this._shadowRoot.getElementById('close');
    closeModalInsertButton.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      formClose();
    });

    insertDummyButton.addEventListener('click', (e) => {
      moduleNotes
        .insertNote({ title: 'DUMMY NOTES', body: 'THIS IS DUMMY NOTES' })
        .then((response) => {
          home();
        });
    });

    let timer;

    insertDummyButton.addEventListener('mousedown', (e) => {
      e.target.timer = window.setTimeout(() => {
        console.log('Dummy Button Hovered!');
        const notes = Notes.getNotes();
        console.log(notes);
        notes.forEach((note) => {
          moduleNotes.insertNote(note).then((response) => {
            home();
          });
        });
        insertDummyButton.style.backgroundColor = Utils.getSettings(
          'colors',
          'secretActButtonColor',
        );
        insertDummyButton.disabled = true;
      }, 1000);
    });

    insertDummyButton.addEventListener('mouseup', (e) => {
      insertDummyButton.style.backgroundColor = '';
      insertDummyButton.disabled = false;

      e.target.timer ? window.clearTimeout(e.target.timer) : 0;
    });

    insertDummyButton.addEventListener('mouseleave', (event) => {
      insertDummyButton.style.backgroundColor = '';
      insertDummyButton.disabled = false;
    });
  }
}

customElements.define('edit-list', EditList);
