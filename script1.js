// Character sets
const CHAR_SETS = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?"
};

// Ambiguous characters that can be confused
const AMBIGUOUS = "0O1lI";

// DOM elements
const ltr_cBox = document.getElementById("ltr-cBox");
const num_cBox = document.getElementById("num-cBox");
const sym_cBox = document.getElementById("sym-cBox");
const ambiguousCBox = document.getElementById("ambiguous-cBox");
const passLenSlider = document.getElementById("passLen");
const dispPassLen = document.getElementById("dispPassLen");
const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");

// Cryptographically secure random number generator
function secureRandom(max) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
}

// Shuffle array using Fisher-Yates with secure random
function secureShuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = secureRandom(i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Build character set based on checkboxes
function getCharacterPool() {
    let pool = "";
    const activeSets = [];

    if (ltr_cBox.checked) {
        pool += CHAR_SETS.lowercase + CHAR_SETS.uppercase;
        activeSets.push(CHAR_SETS.lowercase, CHAR_SETS.uppercase);
    }
    if (num_cBox.checked) {
        pool += CHAR_SETS.numbers;
        activeSets.push(CHAR_SETS.numbers);
    }
    if (sym_cBox.checked) {
        pool += CHAR_SETS.symbols;
        activeSets.push(CHAR_SETS.symbols);
    }

    // Fallback to letters if nothing selected
    if (pool === "") {
        pool = CHAR_SETS.lowercase + CHAR_SETS.uppercase;
        activeSets.push(CHAR_SETS.lowercase, CHAR_SETS.uppercase);
        ltr_cBox.checked = true;
    }

    // Remove ambiguous characters if option is checked
    if (ambiguousCBox && ambiguousCBox.checked) {
        pool = pool.split("").filter(c => !AMBIGUOUS.includes(c)).join("");
    }

    return { pool, activeSets };
}

// Calculate password strength based on entropy
function calculateStrength(password, length, poolSize) {
    // Calculate entropy: log2(poolSize^length) = length * log2(poolSize)
    const entropy = length * Math.log2(poolSize);

    let score = 0;

    // Entropy-based scoring
    if (entropy >= 28) score += 1;  // Minimum acceptable
    if (entropy >= 36) score += 1;  // Reasonable
    if (entropy >= 60) score += 1;  // Strong
    if (entropy >= 80) score += 1;  // Very strong
    if (entropy >= 100) score += 1; // Excellent

    // Character variety bonus
    if (/[a-z]/.test(password)) score += 0.5;
    if (/[A-Z]/.test(password)) score += 0.5;
    if (/[0-9]/.test(password)) score += 0.5;
    if (/[^a-zA-Z0-9]/.test(password)) score += 0.5;

    // Length bonus
    if (length >= 16) score += 1;
    if (length >= 24) score += 1;

    return Math.min(score, 10);
}

// Store current pool size for strength calculation
let currentPoolSize = 0;

function updateStrengthIndicator(password, poolSize) {
    const score = calculateStrength(password, password.length, poolSize);

    // Reset classes but keep base Tailwind classes
    strengthFill.className = "h-full rounded-full transition-all duration-300";

    if (score <= 3) {
        strengthFill.classList.add("bg-red-500");
        strengthFill.style.width = "25%";
        strengthText.textContent = "Weak";
        strengthText.className = "text-sm font-medium text-red-500 min-w-[70px] text-right";
    } else if (score <= 5) {
        strengthFill.classList.add("bg-yellow-500");
        strengthFill.style.width = "50%";
        strengthText.textContent = "Medium";
        strengthText.className = "text-sm font-medium text-yellow-500 min-w-[70px] text-right";
    } else if (score <= 7) {
        strengthFill.classList.add("bg-green-500");
        strengthFill.style.width = "75%";
        strengthText.textContent = "Strong";
        strengthText.className = "text-sm font-medium text-green-500 min-w-[70px] text-right";
    } else {
        strengthFill.classList.add("bg-indigo-500");
        strengthFill.style.width = "100%";
        strengthText.textContent = "Very Strong";
        strengthText.className = "text-sm font-medium text-indigo-500 min-w-[70px] text-right";
    }
}

// Generate cryptographically secure password
function genPass() {
    const len = parseInt(passLenSlider.value);
    const { pool, activeSets } = getCharacterPool();
    currentPoolSize = pool.length;

    let password = [];

    // Ensure at least one character from each active set
    activeSets.forEach(set => {
        // Filter set if excluding ambiguous
        let filteredSet = set;
        if (ambiguousCBox && ambiguousCBox.checked) {
            filteredSet = set.split("").filter(c => !AMBIGUOUS.includes(c)).join("");
        }
        if (filteredSet.length > 0) {
            password.push(filteredSet[secureRandom(filteredSet.length)]);
        }
    });

    // Fill remaining length with random characters from pool
    while (password.length < len) {
        password.push(pool[secureRandom(pool.length)]);
    }

    // Shuffle to randomize position of guaranteed characters
    password = secureShuffle(password);

    // Trim if we added more than needed
    password = password.slice(0, len);

    const finalPassword = password.join("");
    document.getElementById("newPass").innerText = finalPassword;
    updateStrengthIndicator(finalPassword, currentPoolSize);
}

// Update length display
function updateLengthDisplay() {
    dispPassLen.innerText = passLenSlider.value;
}

// Initialize
updateLengthDisplay();
genPass();

// Event listeners
document.getElementById("genNewPass").addEventListener("click", genPass);

passLenSlider.addEventListener("input", () => {
    updateLengthDisplay();
    genPass();
});

document.getElementById("generatePassBtn").addEventListener("click", genPass);

// Update on checkbox change
const checkboxes = [ltr_cBox, num_cBox, sym_cBox];
if (ambiguousCBox) checkboxes.push(ambiguousCBox);

checkboxes.forEach(checkbox => {
    if (checkbox) {
        checkbox.addEventListener("change", genPass);
    }
});
