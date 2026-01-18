# PassGen - Secure Password Generator

A modern, secure password generator built with React, TypeScript, and Tailwind CSS.

[![Netlify Status](https://api.netlify.com/api/v1/badges/placeholder/deploy-status)](https://passgen-priyanshu.netlify.app)

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

## Live Demo

Visit [passgen-priyanshu.netlify.app](https://passgen-priyanshu.netlify.app)

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **Web Crypto API** - Secure random number generation

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── PasswordGenerator.tsx  # Main component
│   ├── StrengthIndicator.tsx  # Password strength bar
│   ├── Checkbox.tsx           # Custom checkbox
│   └── Toast.tsx              # Copy notification
├── hooks/
│   └── usePasswordGenerator.ts # Password logic hook
├── lib/
│   └── password.ts            # Password generation utilities
├── App.tsx
├── main.tsx
└── index.css
```

## Security

Passwords are generated entirely client-side. No data is sent to any server. The generator uses the Web Crypto API (`crypto.getRandomValues()`) which provides cryptographically strong random values.

## Author

Made by [Priyanshu](https://priyans-hu.netlify.app) · [GitHub](https://github.com/Priyans-hu)

## License

MIT License - feel free to use and modify.
