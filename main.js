const URL_HOME = 'https://payproglobal.com/';
let emailInput = document.getElementById('email-input');
let emailError = document.getElementById('email-error');
let urlInput = document.getElementById('url-input');
let urlError = document.getElementById('url-error');
let submitButton = document.getElementById('submit-button');
let form = document.getElementById('form');

let isEmailInputValid = false;
let isUrlInputValid = false;

function validateEmailInput() {
    if(emailInput.value !== '' && !emailInput.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        isInputInvalid(emailError, emailInput, true);
        isEmailInputValid = false;
        return false;
    }
    isInputInvalid(emailError, emailInput, false);
    isEmailInputValid = true;
}

function validateUrlInput() {
    if(!urlInput.value.startsWith('https://')) {
        isInputInvalid(urlError, urlInput, true);
        isUrlInputValid = false;
        return false
    }
    
    try {
        new URL(urlInput.value);
        isInputInvalid(urlError, urlInput, false);
        isUrlInputValid = true;
        return true;
    } catch (err) {
        isInputInvalid(urlError, urlInput, true);
        isUrlInputValid = false;
        return false;
    }
}


function isInputInvalid(elInput, showError) {
    if (showError) {
        elInput.setAttribute('data-error', '');
    } else {
        elInput.removeAttribute('data-error');
    }
}

function isFormValid() {
    if (isEmailInputValid && isUrlInputValid) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

async function fetchForm() {
    (async function () {
        try {
            let result = await fetch(urlInput.nodeValue, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailInput.value,
                    url: urlInput.value
                })
            })
            } catch(err) {
                console.log("Something failed");
            } finally {
                window.location.href = URL_HOME;
        }
    })();
}


emailInput.addEventListener('keyup', validateEmailInput);
urlInput.addEventListener('keyup', validateUrlInput);
form.addEventListener('blur', isFormValid, true);
submitButton.addEventListener("click", fetchForm);
