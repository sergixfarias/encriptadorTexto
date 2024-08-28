const doc = document;
const textareaEl = doc.querySelector(".formulario__textarea");
const imgPlaceholder = doc.querySelector(".resultado__img");
const loadingIndicator = doc.querySelector(".resultado__loader");
const titleResult = doc.querySelector(".resultado__titulo");
const textResult = doc.querySelector(".resultado__text");
const btnEncrypt = doc.querySelector(".formulario__btn");
const btnDecrypt = doc.querySelectorAll(".formulario__btn");
const btnCopy = doc.querySelector(".resultado__btn");

const keyPairs = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
];

// Función para encriptar el mensaje
function encryptMessage(input) {
    let encryptedMessage = "";
    for (let char of input) {
        let encryptedChar = char;
        for (let [original, replacement] of keyPairs) {
            if (char === original) {
                encryptedChar = replacement;
                break;
            }
        }
        encryptedMessage += encryptedChar;
    }
    return encryptedMessage;
}

// Función para desencriptar el mensaje
function decryptMessage(input) {
    let decryptedMessage = input;
    for (let [original, replacement] of keyPairs) {
        let regex = new RegExp(replacement, "g");
        decryptedMessage = decryptedMessage.replace(regex, original);
    }
    return decryptedMessage;
}

// Ocultar elementos dinámicamente
textareaEl.addEventListener("input", () => {
    imgPlaceholder.style.display = "none";
    loadingIndicator.classList.remove("hidden");
    titleResult.textContent = "Capturando Mensaje.";
    textResult.textContent = "";
});

// Función del botón de encriptar
btnEncrypt.addEventListener("click", (event) => {
    event.preventDefault();
    let inputMessage = textareaEl.value.toLowerCase();
    let encryptedMessage = encryptMessage(inputMessage);
    textResult.textContent = encryptedMessage;
    btnCopy.classList.remove("hidden");
    titleResult.textContent = "El resultado es:";
});

// Función del botón de desencriptar
btnDecrypt[1].addEventListener("click", (event) => {
    event.preventDefault();
    let inputMessage = textareaEl.value.toLowerCase();
    let decryptedMessage = decryptMessage(inputMessage);
    textResult.textContent = decryptedMessage;
    titleResult.textContent = "El resultado es:";
    btnCopy.classList.remove("hidden");
});

// Función del botón de copiar
btnCopy.addEventListener('click', () => {
    let copiedText = textResult.textContent;
    navigator.clipboard.writeText(copiedText).then(() => {
        imgPlaceholder.style.display = "block";
        loadingIndicator.classList.add("hidden");
        titleResult.textContent = "El texto se copió";
        btnCopy.classList.add("hidden");
        textResult.textContent = ""
    })
});