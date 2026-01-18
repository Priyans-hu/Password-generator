import { usePasswordGenerator } from '../hooks/usePasswordGenerator';
import { StrengthIndicator } from './StrengthIndicator';
import { Checkbox } from './Checkbox';
import { Toast } from './Toast';

export function PasswordGenerator() {
  const {
    password,
    strength,
    options,
    copied,
    generate,
    copyToClipboard,
    updateOption,
  } = usePasswordGenerator();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Background blur effects */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <main className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <svg className="w-7 h-7 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" />
          </svg>
          <span className="text-xl font-bold text-white">PassGen</span>
        </div>

        {/* Card */}
        <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-2xl">
          <h1 className="text-2xl font-bold text-center mb-2 text-white">
            Generate Secure Password
          </h1>
          <p className="text-muted text-center text-sm mb-6">
            Create strong, random passwords to keep your accounts safe
          </p>

          {/* Password Display */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1 bg-background border border-border rounded-lg px-4 py-3 overflow-hidden">
              <p className="font-mono text-lg font-semibold tracking-wider overflow-x-auto whitespace-nowrap text-white">
                {password || 'Generating...'}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={copyToClipboard}
                title="Copy"
                className="w-11 h-11 flex items-center justify-center bg-background border border-border rounded-lg text-muted hover:bg-indigo-500 hover:border-indigo-500 hover:text-white transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="9" y="9" width="13" height="13" rx="2" strokeWidth="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeWidth="2" />
                </svg>
              </button>
              <button
                onClick={generate}
                title="Regenerate"
                className="w-11 h-11 flex items-center justify-center bg-background border border-border rounded-lg text-muted hover:bg-indigo-500 hover:border-indigo-500 hover:text-white transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>

          {/* Strength Indicator */}
          <StrengthIndicator strength={strength} />

          {/* Password Length */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-muted">Password Length</label>
              <span className="bg-indigo-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                {options.length}
              </span>
            </div>
            <input
              type="range"
              min="4"
              max="50"
              value={options.length}
              onChange={(e) => updateOption('length', parseInt(e.target.value))}
              className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between mt-2 text-xs text-muted">
              <span>4</span>
              <span>50</span>
            </div>
          </div>

          {/* Character Options */}
          <div className="mb-6">
            <label className="text-sm font-medium text-muted block mb-3">
              Include Characters
            </label>
            <div className="space-y-3">
              <Checkbox
                id="letters"
                checked={options.includeLetters}
                onChange={(checked) => updateOption('includeLetters', checked)}
                icon={
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z" />
                  </svg>
                }
                label="Letters (A-z)"
              />
              <Checkbox
                id="numbers"
                checked={options.includeNumbers}
                onChange={(checked) => updateOption('includeNumbers', checked)}
                icon={
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 17h4v-2H6v-1h2V8H4v2h2v1H4v2h2v1H4v3zm10-7h-2v4h2v-4zm0 6h-2v2h2v-2zm-4-6h2V8h-2v2zm0 8h2v-6h-2v6zm8-10h-2v2h2V8zm-2 4h2v-2h-2v2zm2 2h-2v2h2v-2zm-2 4h2v-2h-2v2z" />
                  </svg>
                }
                label="Numbers (0-9)"
              />
              <Checkbox
                id="symbols"
                checked={options.includeSymbols}
                onChange={(checked) => updateOption('includeSymbols', checked)}
                icon={
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11 7h2v2h-2V7zm0 4h2v6h-2v-6zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                  </svg>
                }
                label="Symbols (!@#$)"
              />
              <Checkbox
                id="ambiguous"
                checked={options.excludeAmbiguous}
                onChange={(checked) => updateOption('excludeAmbiguous', checked)}
                icon={
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                  </svg>
                }
                label="Exclude Similar (0O1lI)"
              />
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generate}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-indigo-500/25"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29a.996.996 0 00-1.41 0L1.29 18.96a.996.996 0 000 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05a.996.996 0 000-1.41l-2.33-2.35zm-1.03 5.49l-2.12-2.12 2.44-2.44 2.12 2.12-2.44 2.44z" />
            </svg>
            Generate Password
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-muted text-sm mt-6">
          Made by{' '}
          <a
            href="https://priyans-hu.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:underline"
          >
            Priyanshu
          </a>
          <span className="mx-1">·</span>
          <a
            href="https://github.com/Priyans-hu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:underline"
          >
            GitHub
          </a>
        </p>
      </main>

      {/* Toast */}
      <Toast show={copied} message="Copied to clipboard!" />
    </div>
  );
}
