import Utils from '../utils.js';

class BackStage extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _zIndex = 100;
  _isHide = 'true';
  _red = 0;
  _green = 0;
  _blue = 0;
  _alpha = 0.4;
  static get observedAttributes() {
    return ['zIndex', 'red', 'green', 'blue', 'alpha'];
  }

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'closed' });
    this._style = document.createElement('style');
  }

  _updateStyle(zIndex, isHide, r, g, b, a) {
    this._style.textContent = `
        :host {
              
            ${isHide == 'true' ? 'display: none;' : ''}
            position: fixed;
            z-index: ${zIndex}; 
            left: 0;
            top: 0;
            width: 100%;
            height: 100%; 
            overflow: none;
            background-color: rgb(0,0,0);
            background-color: rgba(${r},${g},${b},${a}); 

        }
      `;
  }

  get zIndex() {
    return this._zIndex;
  }
  set zIndex(value) {
    this._zIndex = value;
  }

  get isHide() {
    return this._zIndex;
  }
  set isHide(value) {
    this._zIndex = value;
  }

  get red() {
    return this._red;
  }
  set red(value) {
    this._red = value;
  }

  get green() {
    return this._green;
  }
  set green(value) {
    this._green = value;
  }

  get blue() {
    return this._blue;
  }
  set blue(value) {
    this._blue = value;
  }

  get alpha() {
    return this._alpha;
  }
  set alpha(value) {
    this._alpha = value;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (property) {
      case 'zIndex':
        this.zIndex = newValue;
        break;
      case 'isHide':
        this.isHide = newValue;
        break;
      case 'red':
        this.red = newValue;
        break;
      case 'green':
        this.green = newValue;
        break;
      case 'blue':
        this.blue = newValue;
        break;
      case 'alpha':
        this.alpha = newValue;
        break;
    }

    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle(
      this._zIndex,
      this._isHide,
      this._red,
      this._green,
      this._blue,
      this._alpha,
    );
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
    <slot></slot>
    `;
  }
}

customElements.define('backstage-element', BackStage);
