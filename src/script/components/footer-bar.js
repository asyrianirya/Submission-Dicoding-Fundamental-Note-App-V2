
class FooterBar extends HTMLElement {
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
          position:sticky;
          bottom:0;
          width:100%;
          height:2rem;  
          background-color: black;
          display: flex;
          text-align: center;
          justify-content: center;
          align-items: center;
          color: white;
        }
        .footer-container {
          display: flex;
        }
        
        .footer-container>div {
          align-content: center;
        }

        #slot {
          position: absolute;
          left: 0;
          top: 0;
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
        <div class="footer-container">
          <div>
            <div class="sticky-footer"><a href="https://github.com/asyrianirya">@asyrianirya</a> 2024</div>
          </div>
          <div id="slot">
            <slot></slot>
          </div>
        </div>
      `;
  }
}

customElements.define('footer-bar', FooterBar);
