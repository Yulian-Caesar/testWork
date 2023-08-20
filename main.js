const URL_HOME = 'https://payproglobal.com/';
const EMAIL_PATTERN = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const URL_PATTERN = new RegExp('^(https:\\/\\/)'+
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
        '((\\d{1,3}\\.){3}\\d{1,3}))'+
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
        '(\\?[;&a-z\\d%_.~+=-]*)?'+
        '(\\#[-a-z\\d_]*)?$','i');

let emailInput = document.getElementById('email-input');
let urlInput = document.getElementById('url-input');
let submitButton = document.getElementById('submit-button');

let isEmailInputValid = false;
let isUrlInputValid = false;

function validateEmailInput() {
    if (emailInput.value === '') {
        isErrorShow(emailInput, false);
        isEmailInputValid = false;
    }

    if (emailInput.value !== '' && EMAIL_PATTERN.test(emailInput.value)) {
        isErrorShow(emailInput, false);
        isEmailInputValid = true;
    }

    if (emailInput.value !== '' && !EMAIL_PATTERN.test(emailInput.value)) {
        isErrorShow(emailInput, true);
        isEmailInputValid = false;
    }

    isFormValid();
}

function validateUrlInput() {
    if (urlInput.value === '') {
        isErrorShow(urlInput, false);
        isUrlInputValid = false;
    }

    if(urlInput.value !== '' && URL_PATTERN.test(urlInput.value)) {
        isErrorShow(urlInput, false);
        isUrlInputValid = true;
    }

    if (urlInput.value !== '' && !URL_PATTERN.test(urlInput.value)) {
        isErrorShow(urlInput, true);
        isUrlInputValid = false;
    }

    isFormValid();
}


function isErrorShow(elInput, showError) {
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
            let result = await fetch(urlInput.value, {
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

emailInput.addEventListener('blur', validateEmailInput);
urlInput.addEventListener('blur', validateUrlInput);
submitButton.addEventListener("click", fetchForm);
