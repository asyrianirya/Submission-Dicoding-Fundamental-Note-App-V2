import Utils from './utils.js';
import { home } from '../view-controller.js';
import './_parts-index.js';

class CustomButtons extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'closed' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
        :host {
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
      `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `      
        <button id="switchpage">SHOW ARCHIVED NOTES</button>
    `;

    const eleswitchpage = this._shadowRoot.querySelector('#switchpage');
    let boolIsArchivePage;

    eleswitchpage.addEventListener('click', (event) => {
      const titleBar = document.querySelector('title-bar');
      const boolIsArchivePage = titleBar.getAttribute('isArchive') === 'true';

      if (boolIsArchivePage) {
        home(true, false);
        event.target.innerText = 'SHOW ARCHIVED NOTES';
      } else {
        home(true, true);
        event.target.innerText = 'SHOW MAIN NOTES';
      }
    });
  }
}

customElements.define('custom-buttons', CustomButtons);
