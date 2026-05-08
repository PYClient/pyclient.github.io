# PyClient Chat App

PyClient Chat is a feature-rich, single-page chat experience built with pure HTML, CSS, and JavaScript. It is designed to run on GitHub Pages while showcasing popular chat-app patterns like Discord and WhatsApp.

## ✨ Highlights

- **Local account logins** with avatars, status, and display names
- **Automatic chat saving** using localStorage
- **Theme mode + accent color controls**
- **Owner-only moderation hub** (mute/ban, reports, blocked terms, slow mode, channel creation)
- **Typing indicators**, reactions, pinned messages, and message search
- **Bot companions** for demo responses and live typing feedback
- **Direct messages** with bots and channel-based chat rooms

## 🚀 Run it locally

1. Clone the repository:
   ```bash
   git clone https://github.com/pyclient/pyclient.github.io.git
   ```
2. Open `index.html` in your browser.

## ⚙️ Configuration

- Update `OWNER_CONFIG` in `main.js` to set your owner username and access code.
- All messages, profiles, and settings are stored locally in your browser via localStorage.

## 📝 Notes

This is a front-end demo. Real-time multi-user messaging and production authentication will require a backend. Once you decide on the login system, the front-end is ready to integrate with it.
