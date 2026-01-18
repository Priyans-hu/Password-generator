# PassGen - Secure Password Generator

A modern, secure password generator with a sleek dark UI. Available as a web app and Chrome extension.

## Features

- **Cryptographically Secure** - Uses `crypto.getRandomValues()` for true randomness
- **Entropy-based Strength Meter** - Real-time password strength calculation
- **Customizable Options**:
  - Password length (4-50 characters)
  - Include/exclude letters (A-z)
  - Include/exclude numbers (0-9)
  - Include/exclude symbols (!@#$)
  - Exclude similar characters (0O1lI)
- **One-click Copy** - Copy to clipboard with visual feedback
- **Modern UI** - Dark theme with glassmorphism design

## Use Online

Open `index.html` in your browser or visit the [live demo](https://priyans-hu.github.io/Password_Generator/).

## Install as Chrome Extension

1. **Generate Icons** (first time only):
   - Open `generate-icons.html` in your browser
   - Download all 4 icon sizes (16, 32, 48, 128)
   - Save them to the `icons/` folder

2. **Load Extension**:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (top right toggle)
   - Click "Load unpacked"
   - Select the `Password_Generator` folder
   - The PassGen icon will appear in your toolbar

## Tech Stack

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first styling (via CDN)
- **Vanilla JavaScript** - No frameworks, pure JS
- **Web Crypto API** - Secure random number generation

## Security

Passwords are generated entirely client-side. No data is sent to any server. The generator uses the Web Crypto API (`crypto.getRandomValues()`) which provides cryptographically strong random values.

## File Structure

```
Password_Generator/
├── index.html          # Main web app
├── popup.html          # Chrome extension popup
├── script1.js          # Password generation logic
├── script2.js          # Copy functionality
├── manifest.json       # Chrome extension config
├── generate-icons.html # Icon generator tool
├── icons/              # Extension icons
└── README.md
```

## Author

Made by [Priyanshu](https://priyans-hu.netlify.app) · [GitHub](https://github.com/Priyans-hu)

## License

MIT License - feel free to use and modify.
