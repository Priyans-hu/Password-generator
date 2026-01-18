// Copy to clipboard with toast notification
const copyBtn = document.getElementById("copyBtn");
const toast = document.getElementById("toast");

function showToast() {
    toast.classList.remove("opacity-0", "translate-y-4", "pointer-events-none");
    toast.classList.add("opacity-100", "translate-y-0");

    setTimeout(() => {
        toast.classList.add("opacity-0", "translate-y-4", "pointer-events-none");
        toast.classList.remove("opacity-100", "translate-y-0");
    }, 2000);
}

function copyPassword() {
    const password = document.getElementById("newPass").innerText;
    navigator.clipboard.writeText(password).then(() => {
        showToast();
    }).catch(err => {
        console.error("Failed to copy:", err);
    });
}

copyBtn.addEventListener("click", copyPassword);