// Character sets
export const CHAR_SETS = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
} as const;

// Ambiguous characters that can be confused
export const AMBIGUOUS = '0O1lI';

export interface PasswordOptions {
  length: number;
  includeLetters: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeAmbiguous: boolean;
}

export type StrengthLevel = 'weak' | 'medium' | 'strong' | 'very-strong';

export interface StrengthResult {
  score: number;
  level: StrengthLevel;
  entropy: number;
}

// Cryptographically secure random number generator
function secureRandom(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

// Shuffle array using Fisher-Yates with secure random
function secureShuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = secureRandom(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Build character pool based on options
function getCharacterPool(options: PasswordOptions): { pool: string; activeSets: string[] } {
  let pool = '';
  const activeSets: string[] = [];

  if (options.includeLetters) {
    pool += CHAR_SETS.lowercase + CHAR_SETS.uppercase;
    activeSets.push(CHAR_SETS.lowercase, CHAR_SETS.uppercase);
  }
  if (options.includeNumbers) {
    pool += CHAR_SETS.numbers;
    activeSets.push(CHAR_SETS.numbers);
  }
  if (options.includeSymbols) {
    pool += CHAR_SETS.symbols;
    activeSets.push(CHAR_SETS.symbols);
  }

  // Fallback to letters if nothing selected
  if (pool === '') {
    pool = CHAR_SETS.lowercase + CHAR_SETS.uppercase;
    activeSets.push(CHAR_SETS.lowercase, CHAR_SETS.uppercase);
  }

  // Remove ambiguous characters if option is checked
  if (options.excludeAmbiguous) {
    pool = pool
      .split('')
      .filter((c) => !AMBIGUOUS.includes(c))
      .join('');
  }

  return { pool, activeSets };
}

// Generate cryptographically secure password
export function generatePassword(options: PasswordOptions): string {
  const { pool, activeSets } = getCharacterPool(options);
  let password: string[] = [];

  // Ensure at least one character from each active set
  activeSets.forEach((set) => {
    let filteredSet = set;
    if (options.excludeAmbiguous) {
      filteredSet = set
        .split('')
        .filter((c) => !AMBIGUOUS.includes(c))
        .join('');
    }
    if (filteredSet.length > 0) {
      password.push(filteredSet[secureRandom(filteredSet.length)]);
    }
  });

  // Fill remaining length with random characters from pool
  while (password.length < options.length) {
    password.push(pool[secureRandom(pool.length)]);
  }

  // Shuffle to randomize position of guaranteed characters
  password = secureShuffle(password);

  // Trim if we added more than needed
  return password.slice(0, options.length).join('');
}

// Calculate password strength based on entropy
export function calculateStrength(password: string, options: PasswordOptions): StrengthResult {
  const { pool } = getCharacterPool(options);
  const poolSize = pool.length;
  const length = password.length;

  // Calculate entropy: log2(poolSize^length) = length * log2(poolSize)
  const entropy = length * Math.log2(poolSize);

  let score = 0;

  // Entropy-based scoring
  if (entropy >= 28) score += 1; // Minimum acceptable
  if (entropy >= 36) score += 1; // Reasonable
  if (entropy >= 60) score += 1; // Strong
  if (entropy >= 80) score += 1; // Very strong
  if (entropy >= 100) score += 1; // Excellent

  // Character variety bonus
  if (/[a-z]/.test(password)) score += 0.5;
  if (/[A-Z]/.test(password)) score += 0.5;
  if (/[0-9]/.test(password)) score += 0.5;
  if (/[^a-zA-Z0-9]/.test(password)) score += 0.5;

  // Length bonus
  if (length >= 16) score += 1;
  if (length >= 24) score += 1;

  const finalScore = Math.min(score, 10);

  let level: StrengthLevel;
  if (finalScore <= 3) {
    level = 'weak';
  } else if (finalScore <= 5) {
    level = 'medium';
  } else if (finalScore <= 7) {
    level = 'strong';
  } else {
    level = 'very-strong';
  }

  return { score: finalScore, level, entropy };
}
