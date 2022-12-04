window.addEventListener("load", function () {
  const cardForm = document.forms[0];
  const cardholderName = cardForm.elements.cardholder_name;

  // select card number input box when page loads
  cardholderName.focus();
});
// submit button reference
const submitBtn = document.getElementById("submit_btn");


const cardNumber = document.getElementById("card_number");
const cardholderName = document.getElementById("cardholder_name");
const expDate = document.getElementById("exp_date");
const cvcNumber = document.getElementById("cvc_number");

//event listeners to validate payment when data is entered
cardholderName.addEventListener("input", validateName);
cardNumber.addEventListener("input", validateNumber);
expDate.addEventListener("input", validateDate);
cvcNumber.addEventListener("input", validateCVC);
submitBtn.addEventListener("click", displayCompleteMessage);
//
function displayCompleteMessage() {
  const cardForm = document.getElementById("form");
  const completeMessage = document.querySelector(".complete");
  completeMessage.classList.remove("show-complete");
  cardForm.classList.add("hide-form");
}

//check if the cardholer name is valid
function validateName() {
  const formControl = cardholderName.parentElement;
  const name = cardholderName.value;
  const validateName = /^([A-Za-z'-]{3,})\s([A-Za-z'-]{3,})$/.test(name);
  if (name == "") {
    formControl.classList.add("error");
    formControl.classList.remove("success");
  } else if (!validateName) {
    formControl.classList.add("error");
    formControl.classList.remove("success");
  } else {
    formControl.classList.remove("error");
    formControl.classList.add("success");
  }
  //change name on the card
  document.querySelector(".card-name").innerText = cardholderName.value;  
}





//check if the card number is valid
function validateNumber() {  
  let formControl = cardNumber.parentElement;
  formatCardNumber();
  let number = cardNumber.value;
  number = number.replace(/[ -]/g, "");
  const re =
  /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(number);
  if (number == "") {
    formControl.classList.add("error");
    formControl.classList.remove("success");
  } else if (!re) {
    formControl.classList.add("error");
    formControl.classList.remove("success");
  } else if (luhn(number) === false) {
    formControl.classList.add("error");
    formControl.classList.remove("success");
  } else {
    formControl.classList.remove("error");
    formControl.classList.add("success");
  }
  document.querySelector(".card-number").innerText = cardNumber.value;
}

// //format number into 4 digit groups
function formatCardNumber() {
  cardNumber.value = cardNumber.value.replace(/[^a-z0-9]+/gi, '').replace(/(.{4})/g, '$1 ').trim();
}

//check if expiration date is valid

function validateDate() {
  const formControl = expDate.parentElement;
  const currentYear = new Date().getFullYear() - 2000;
  const currentMonth = new Date().getMonth() + 1;
  let expMonth = expDate.value.split("/")[0];
  let expYear = expDate.value.split("/")[1];
  const re = /\b(0[1-9]|1[0-2])\b/.test(expMonth); //to check if month value is in range of 1-12

  if (expDate.value == "") {
    formControl.classList.add("error");
    formControl.classList.remove("success");
  } else if (expDate.value.length !== 5) {
    formControl.classList.add("error");
    formControl.classList.remove("success");
  } else if (!re) {
    formControl.classList.add("error");
    formControl.classList.remove("success");
  } else if (expYear < currentYear) {
    formControl.classList.add("error");
    formControl.classList.remove("success");
  } else if (expMonth < currentMonth && expYear <= currentYear) {
    formControl.classList.add("error");
    formControl.classList.remove("success");
  } else {
    formControl.classList.remove("error");
    formControl.classList.add("success");
  }
  document.querySelector(".exp-date").innerText = expDate.value;
}

// check CVC number is valid
function validateCVC() {  
  const formControl = cvcNumber.parentElement;
  let cvc = cvcNumber.value;
  if(cvc == "") {
    formControl.classList.add("error");
    formControl.classList.remove("success");
  } else if (cvc.length !== 3) {
    formControl.classList.add("error");
    formControl.classList.remove("success");
  } else {
    formControl.classList.remove("error");
    formControl.classList.add("success");
  }
  document.querySelector(".cvc-number").innerText = cvcNumber.value;
} 


/* ------- Luhn Algorithm used for Validating Credit Card Numbers   ----- */
function luhn(idNum) {
  let string1 = "";
  let string2 = "";

  // Retrieve the odd-numbered digits starting from the back
  for (let i = idNum.length - 1; i >= 0; i -= 2) {
    string1 += idNum.charAt(i);
  }
  // Retrieve the even-numbered digits starting from the back and double them
  for (let i = idNum.length - 2; i >= 0; i -= 2) {
    string2 += 2 * idNum.charAt(i);
  }

  // Return whether the sum of the digits is divisible by 10
  return sumDigits(string1 + string2) % 10 === 0;

  function sumDigits(numStr) {
    let digitTotal = 0;
    for (let i = 0; i < numStr.length; i++) {
      digitTotal += parseInt(numStr.charAt(i));
    }
    return digitTotal;
  }
}
