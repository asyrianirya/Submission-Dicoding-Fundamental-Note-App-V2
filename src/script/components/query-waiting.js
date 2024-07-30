class QueryWaiting extends HTMLElement {
  _shadowRoot = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'closed' });
    this._style = document.createElement('style');

    this.render();
  }
  _updateStyle() {
    this._style.textContent = `
    .loader {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: inline-block;
      position: fixed;
      top: 50%;
      bottom: 50%;
      left: 50%;
      right: 50%;
      border: 3px solid;
      border-color: #FFF #FFF transparent transparent;
      box-sizing: border-box;
      animation: rotation 1s linear infinite;
    }
    .loader::after,
    .loader::before {
      content: '';  
      box-sizing: border-box;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      border: 3px solid;
      border-color: transparent transparent #FF3D00 #FF3D00;
      width: calc(40px);
      height: calc(40px);
      border-radius: 50%;
      box-sizing: border-box;
      animation: rotationBack 0.5s linear infinite;
      transform-origin: center center;
    }
    .loader::before {
      width: calc(32px);
      height: calc(32px);
      border-color: #FFF #FFF transparent transparent;
      animation: rotation 1.5s linear infinite;
    }
        
    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    } 
    @keyframes rotationBack {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(-360deg);
      }
    }
    
  `;
  }
  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }
  render() {
    this._emptyContent();
    this._updateStyle();

    const shadowRoot = this._shadowRoot;
    shadowRoot.appendChild(this._style);
    shadowRoot.innerHTML += `
    <div class="loader-container">
      <span class="loader"></span>
      <p class="progress">Fetching data...</p>
    </div>
    `;
  }
}
customElements.define('query-waiting', QueryWaiting);
