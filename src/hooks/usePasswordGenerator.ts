import { useState, useCallback, useEffect } from 'react';
import {
  generatePassword,
  calculateStrength,
  type PasswordOptions,
  type StrengthResult,
} from '../lib/password';

const DEFAULT_OPTIONS: PasswordOptions = {
  length: 16,
  includeLetters: true,
  includeNumbers: true,
  includeSymbols: true,
  excludeAmbiguous: false,
};

export function usePasswordGenerator() {
  const [options, setOptions] = useState<PasswordOptions>(DEFAULT_OPTIONS);
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState<StrengthResult>({
    score: 0,
    level: 'weak',
    entropy: 0,
  });
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    const newPassword = generatePassword(options);
    setPassword(newPassword);
    setStrength(calculateStrength(newPassword, options));
  }, [options]);

  // Generate on mount and when options change
  useEffect(() => {
    generate();
  }, [generate]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [password]);

  const updateOption = useCallback(<K extends keyof PasswordOptions>(
    key: K,
    value: PasswordOptions[K]
  ) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  }, []);

  return {
    password,
    strength,
    options,
    copied,
    generate,
    copyToClipboard,
    updateOption,
  };
}
