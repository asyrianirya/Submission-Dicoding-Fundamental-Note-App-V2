import githubMark from '../../styles/github-mark-white.svg';
import starMark from '../../styles/star-svgrepo-com.svg';
import panTool from '../../styles/pan_tool.svg';

class FooterSection extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _githubMark = githubMark;
  _starMark = starMark;
  _panTool = panTool;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'closed' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
          .links {
              position:static;
              bottom:0;
              width:100%;
              height:5rem;  
              background-color: black;
              display: flex;
              color: white;
              justify-content: center;
              align-items: center;
              gap: 5rem;
          }
        .img-container {
            width: 2rem;
            height: 2rem;
        }
        .img-container img {
            width: auto;
            height: 100%;
        }
        .link {
            display: flex;
            align-items: center;
            gap: .5rem;
            text-decoration: none;
            color: white;
            transition: box-shadow 0.2s, scale 0.2s;
            border-radius: 20px 20px;
        }
        .link:hover {
          box-shadow: 2px 7px 25px 8px rgba(255,255,255,1);
          transform: scale(1.05, 1.05);
          padding: 10px;
          border-radius: 30px 30px;

          animation: shake 0.2s;
          animation-iteration-count: 1;
        }
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(3px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(1px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
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
          <div>
            <div class="links">
              <a title="Visit me on GitHub" href="https://github.com/asyrianirya" class="link">
                <div class="img-container">
                    <img src="${this._githubMark}" ></img>
                </div>
                <span>Look for me on github</span>
              </a>
              <a  title="Review My Project" href="/review" class="link">
                <div class="img-container">
                    <img src="${this._starMark}" ></img>
                </div>
                <span>Review my project</span>
              </a>
              <a  title="Pengantar cepat" href="" class="link">
                <div class="img-container">
                    <img src="${this.panTool}" ></img>
                </div>
                <span>Quick Introduce</span>
              </a>
            </div>
          </div>
        `;
  }
}

customElements.define('footer-section', FooterSection);
