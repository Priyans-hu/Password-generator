// Character sets
const ltr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const num = "0123456789";
const sym = "~!@#$%^&*()_+-{}|:\"'?><;./,";

// DOM elements
const ltr_cBox = document.getElementById("ltr-cBox");
const num_cBox = document.getElementById("num-cBox");
const sym_cBox = document.getElementById("sym-cBox");
const passLenSlider = document.getElementById("passLen");
const dispPassLen = document.getElementById("dispPassLen");
const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");

// Build character set based on checkboxes
let all = "";

function include() {
    all = "";
    if (ltr_cBox.checked) all += ltr;
    if (num_cBox.checked) all += num;
    if (sym_cBox.checked) all += sym;

    // Fallback to letters if nothing selected
    if (all === "") {
        all = ltr;
        ltr_cBox.checked = true;
    }
}

include();

// Calculate password strength
function calculateStrength(password, length) {
    let score = 0;

    // Length scoring
    if (length >= 8) score += 1;
    if (length >= 12) score += 1;
    if (length >= 16) score += 1;
    if (length >= 24) score += 1;

    // Character variety scoring
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;

    return score;
}

function updateStrengthIndicator(password) {
    const score = calculateStrength(password, password.length);

    // Reset classes but keep base Tailwind classes
    strengthFill.className = "h-full rounded-full transition-all duration-300";

    if (score <= 2) {
        strengthFill.classList.add("bg-red-500");
        strengthFill.style.width = "25%";
        strengthText.textContent = "Weak";
        strengthText.className = "text-sm font-medium text-red-500 min-w-[70px] text-right";
    } else if (score <= 4) {
        strengthFill.classList.add("bg-yellow-500");
        strengthFill.style.width = "50%";
        strengthText.textContent = "Medium";
        strengthText.className = "text-sm font-medium text-yellow-500 min-w-[70px] text-right";
    } else if (score <= 6) {
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

// Generate password
function genPass() {
    const len = passLenSlider.value;
    let password = "";

    for (let i = 0; i < len; i++) {
        password += all[Math.floor(Math.random() * all.length)];
    }

    document.getElementById("newPass").innerText = password;
    updateStrengthIndicator(password);
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

document.getElementById("generatePassBtn").addEventListener("click", () => {
    include();
    genPass();
});

// Update on checkbox change
[ltr_cBox, num_cBox, sym_cBox].forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        include();
        genPass();
    });
});
