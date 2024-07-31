import Utils from './utils.js';
import { home } from '../view-controller.js';
import { GlobalCss } from './_parts-index.js';

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
       /*  button {
          padding: 10px;
          margin: 5px;
          border-radius: 50%;
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
    } */
      button {
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10 and IE 11 */
        user-select: none; /* Standard syntax */
        cursor: pointer;
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
      <g-css></g-css>
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
