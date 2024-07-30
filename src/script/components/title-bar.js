import Utils from './utils.js';

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
            position: sticky;
            top: 0;
            width: 100%;
            background-color: ${Utils.getSettings('colors', 'titleFallbackColor')};
            background-color: ${Utils.getSettings('colors', 'titleColor')};
            padding: 1.5rem;
            border: 5px solid black;
        }
  
        div {
            padding: 24px 20px;
        }
  
        .brand-name {
            margin: 0;
        
            font-size: 1.7em;
        }
        #header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

      `;
  }a

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
        <div id="header" class="header">
          <div class="header-title">
            <h1 class="brand-name">${this._title}</h1>
          </div>
          <div class="header-toolsets">
            <slot></slot>
          </div>
        </div>
      `;
  }
}

customElements.define('title-bar', TitleBar);
