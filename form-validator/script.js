const form = document.querySelector("#form")
const username = document.getElementById("username")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const repassword = document.querySelector("#repassword")
const phone = document.querySelector("#phone")



const checkEmail = (input) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return String(input).toLowerCase().match(re);
};

const validateEmail = (input) => {
    if (!checkEmail(input.value) && input.value !== 0) {
        error(input, "Wrong mail format")
    } else {
        success(input)
    }
}

function error(input, message) {
    input.className = "form-control is-invalid";
    const div = input.nextElementSibling;
    console.log(div)
    div.innerText = message;
    div.className = 'invalid-feedback'
}

function success(input) {
    input.className = "form-control is-valid"
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function checkRequired(inputs) {

    inputs.forEach(function (input) {
        if (input.value === "") {
            error(input, `${capitalizeFirstLetter(input.id)} is required`)
        } else {
            success(input)
        }
        console.log(input.value);
    })
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        error(input, `${capitalizeFirstLetter(input.id)} should be minimum ${min} character`)
    } else if (input.value.length > max) {
        error(input, `${capitalizeFirstLetter(input.id)} should be maximum ${max} character`)
    } else {
        success(input);
    }
}

function checkPasswords(input1, input2) {
    if (input1.value !== input2.value) {
        error(input2, "Passwords don't match")
    }
}

function checkPhone(input) {
    /* 
        This function is checking valid Turkey phone numbers as seen below examples
        * 555-123-45-67
        * 0 555 123 45 67
        * +905551234567
        * 00905551234567 
    */
    let re = /^(((\+|00)?(90)|0)[-| ]?)?((5\d{2})[-| ]?(\d{3})[-| ]?(\d{2})[-| ]?(\d{2}))$/gm;
    if (!re.test(input.value)) {
        error(input, "Wrong phone number format")
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log(username.value);

    checkRequired([username, email, phone, password, repassword]);
    if (email.value !== "") {
        validateEmail(email);
    }
    checkLength(username, 7, 15);
    checkLength(password, 6, 12);
    checkPasswords(password, repassword);
    checkPhone(phone);
})