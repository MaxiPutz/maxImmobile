import { LitElement, html, css } from "https://cdn.jsdelivr.net/npm/lit-element@4.1.0/+esm"

class GuestBook extends LitElement {
  static styles = css`
    .chat-container {
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      right: 0;
      height: 50vh;
      width: 300px;
      background-color: #f0f0f0;
      padding: 10px;
      box-sizing: border-box;
      z-index: 9999; /* Ensure it is on top of other content */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      transform: translateY(-100%);
      transition: transform 0.3s ease;
    }

    .visible {
      transform: translateY(0);
    }

    .message-container {
      flex-grow: 1;
      overflow-y: auto;
      padding-bottom: 10px;
    }

    .message {
      background-color: #dcf8c6;
      border-radius: 8px;
      padding: 8px;
      margin-bottom: 10px;
      width: fit-content;
      max-width: 80%;
    }

    .message.other {
      background-color: #fff;
      align-self: flex-start;
    }

    .message.self {
      background-color: #dcf8c6;
      align-self: flex-end;
    }

    .input-container {
      display: flex;
      align-items: center;
    }

    input {
      flex-grow: 1;
      padding: 10px;
      border-radius: 20px;
      border: 1px solid #ccc;
      font-size: 16px;
    }

    button {
      margin-left: 10px;
      padding: 10px 15px;
      background-color: #25d366;
      color: white;
      border: none;
      border-radius: 50%;
      font-size: 16px;
      cursor: pointer;
    }

    button:hover {
      background-color: #22c060;
    }
  `;

  static properties = {
    messages: { type: Array },
    visible: { type: Boolean },
  };

  constructor() {
    super();
    this.messages = [];
    this.newMessage = '';
    this.visible = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.checkUrl();
    if (this.visible) {
      this.loadMessages();
    }
  }

  checkUrl() {
    const currentUrl = window.location.href;
    if (currentUrl.includes('willhabenMark')) {
      this.visible = true;
    }
  }

  async loadMessages() {
    try {
      const response = await fetch('/api/getChat');
      if (response.ok) {
        this.messages = await response.json();
      }
    } catch (error) {
      console.error('Failed to fetch messages', error);
    }
  }

  async postMessage() {
    if (!this.newMessage.trim()) return;

    const message = { text: this.newMessage, sender: 'self', timestamp: new Date() };
    
    try {
      const response = await fetch('/api/postMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      if (response.ok) {
        this.messages = [...this.messages, message];
        this.newMessage = '';
      } else {
        console.error('Failed to post message');
      }
    } catch (error) {
      console.error('Failed to post message', error);
    }
  }

  handleInputChange(e) {
    this.newMessage = e.target.value;
  }

  renderMessages() {
    return this.messages.map(
      (msg) => html`
        <div class="message ${msg.sender}">
          <span>${msg.text}</span>
        </div>
      `
    );
  }

  render() {
    return html`
      <div class="chat-container ${this.visible ? 'visible' : ''}">
        <div class="message-container">
          ${this.renderMessages()}
        </div>
        <div class="input-container">
          <input
            type="text"
            placeholder="Write a message..."
            .value="${this.newMessage}"
            @input="${this.handleInputChange}"
            @keydown="${(e) => e.key === 'Enter' && this.postMessage()}"
          />
          <button @click="${this.postMessage}">+</button>
        </div>
      </div>
    `;
  }
}

customElements.define('guest-book', GuestBook);
