import Utils from './utils.js';
import { home } from '../view-controller.js';
import './_parts-index.js';

class ContentRefresh extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _script = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'closed' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
  :host {
      padding: 0px;
      margin: 0px;
  }
  #force_refresh {
    padding: 10px;
    margin: 5px;
    border-radius: 10px 10px 10px 10px;
    border: 1px solid black;
    background-color: ${Utils.getSettings('colors', 'buttonColor')};
    text-decoration: none;
  }

  #force_refresh:hover {
      background-color: ${Utils.getSettings('colors', 'buttonColorHover')};
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
    const shadowRoot = this._shadowRoot;

    this._emptyContent();
    this._updateStyle();

    shadowRoot.appendChild(this._style);
    shadowRoot.innerHTML += `  
    <button title="Force Refresh" id="force_refresh"></button>
      `;

    const forceRefresh = shadowRoot.querySelector('#force_refresh');
    function refreshAction(note = '') {
      forceRefresh.style.backgroundColor = 'red';

      if (
        Utils.getElementAttribute(
          document.querySelector('title-bar'),
          'isArchive',
        ) == 'true'
      ) {
        home(2000, true);
      } else {
        home(2000, false);
      }
      setTimeout(() => {
        forceRefresh.style.backgroundColor = Utils.getSettings(
          'colors',
          'buttonColor',
        );
      }, 500);
    }

    forceRefresh.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      refreshAction();
    });
  }
}

customElements.define('content-refresh', ContentRefresh);
