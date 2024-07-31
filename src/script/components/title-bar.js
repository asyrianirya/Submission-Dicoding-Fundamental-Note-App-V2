import Utils from './utils.js';
import '@fontsource/bebas-neue';
import note_stack from '../../styles/note_stack.svg';
import { GlobalCss } from './_parts-index.js';

class TitleBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _title = Utils.getSettings('language', 'appTitle');
  _isArchive = false;

  static get observedAttributes() {
    return ['title', 'isArchive'];
  }

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'closed' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
        :host {
            display: flex;
            top: 0;
            width: 100%;
            background-color: ${Utils.getSettings('colors', 'titleFallbackColor')};
            background-color: ${Utils.getSettings('colors', 'titleColor')};
            padding: 1.5rem;
            border: 5px solid black;
        }
  
        .brand-name {
            margin: 0;
        
            font-family: 'Bebas Neue', cursiva;
        }
        #header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .header-title {
          display: flex;
        }

        .brand-name {
          overflow-wrap: break-word;
          font-size: 3rem;
          animation: myAnim 2s ease 0s 1 normal forwards;
          animation-iteration-count: 1;
        }
        @keyframes myAnim {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        .img-container {
          display: flex;
          align-items: center;
          width: 4rem;
        }
        .img-container img {
          width: 100%;
        }

      `;
  }

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }

  get isArchive() {
    return this._isArchive;
  }

  set isArchive(value) {
    this._isArchive = value;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'title':
        this.style.backgroundColor = Utils.getSettings('colors', 'titleColor');
        this.title = newValue;
        break;
      case 'isArchive':
        this.style.backgroundColor = Utils.getSettings(
          'colors',
          'titleArchiveColor',
        );
        this.isArchive = newValue;
        break;
    }

    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `      
    <g-css></g-css>
        <div id="header" class="header prevent-select">
          <div class="header-title">
            <div class="img-container">
              <img src="${note_stack}" draggable="false" ></img>
            </div>
            <div class="title">
            <h1 class="brand-name">${this._title}</h1>
            </div>
          </div>
          <div class="header-toolsets">
            <slot></slot>
          </div>
        </div>
      `;
  }
}

customElements.define('title-bar', TitleBar);
