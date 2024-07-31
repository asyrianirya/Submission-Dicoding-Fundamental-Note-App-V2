import Utils from '../utils.js';

class GlobalCss extends HTMLElement {
  _style = null;

  constructor() {
    super();

    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
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
        .prevent-select {
          -webkit-user-select: none; /* Safari */
          -ms-user-select: none; /* IE 10 and IE 11 */
          user-select: none; /* Standard syntax */
        }
      
    `;
  }

  _emptyContent() {
    this.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this.appendChild(this._style);
  }
}

customElements.define('g-css', GlobalCss);
