import { atcCener } from "./atc.js";

let atcSelect = "";
let fplMsg = "";
document.addEventListener("DOMContentLoaded", fpl());

function fpl() {
  buildAtcList();
  buildFpl();
  checkInput();
}

function buildAtcList() {
  atcSelect = document.querySelector("#atc-untits");
  for (let key in atcCener) {
    atcSelect.innerHTML += `<option value=${key}>${atcCener[key].name}</opion>`;
  }

  showContacts();
}

function checkInput() {
  let form = document.querySelector("#fpl");
  let input = form.querySelectorAll("input");
  let select = form.querySelectorAll("select");
  let textArea = form.querySelectorAll("textarea");
  let sendButton = document.querySelector("#send-button");

  atcSelect.addEventListener("change", showContacts);
  input.forEach((elem) => elem.addEventListener("input", buildFpl));
  select.forEach((elem) => elem.addEventListener("input", buildFpl));
  textArea.forEach((elem) => elem.addEventListener("input", buildFpl));
  sendButton.addEventListener("click", sendFpl);
}

function showContacts() {
  let option = atcSelect.options[atcSelect.selectedIndex];
  let atcUnit = atcCener[option.value];

  let phone = document.querySelector("#phone");
  let email = document.querySelector("#email");

  let phoneArry = convertStrToArry(atcUnit.phone);
  let emailArry = convertStrToArry(atcUnit.email);

  phone.innerHTML = composeContact(phoneArry, "tel:");
  email.innerHTML = composeContact(emailArry, "mailto:");
}

function convertStrToArry(str) {
  let separator = ",";
  let strArry = [];
  let arryIndex = 0;

  if (str.includes(separator)) {
    while (str.includes(separator)) {
      strArry[arryIndex] = str.slice(0, str.indexOf(separator));
      str = str.slice(str.indexOf(separator) + 2);
      arryIndex++;
    }
  }
  strArry[arryIndex] = str;
  return strArry;
}

function composeContact(arry, prefix) {
  let contact = "";
  arry.forEach((elem) => (contact += `<a href="${prefix}${elem}">${elem}</a>`));
  return contact;
}

function buildFpl() {
  let finalFpl = document.querySelector("#final-fpl");

  let field3 = "(FPL";

  let field7 = `-${getData("#aircraft-id")}`;

  let field8 = `-${getData("#flight-rules")}${getData(
    "#type-of-flight"
  )}%0d%0a `;

  let field9 = `-${getData("#aircraft-type")}/${getData(
    "#wake-turbulence-cat"
  )}`;

  let field10 = `-${getData("#equipment")}%0d%0a `;

  let field13 = `-${getData("#departure-aerodrome")}${getDofAndTime(
    "#departure-time",
    0
  )}%0d%0a `;

  let field15 = `-${getData("#cruising-speed")}${getData(
    "#flight-level"
  )} ${getData("#route")}%0d%0a `;

  let field16 = `-${getData("#destination-aerodrome")}${getDofAndTime(
    "#total-eet",
    0
  )} ${getData("#altn-aerodrome")} ${getData("#second-altn-aerodrome")}%0d%0a `;

  let field18 = `-DOF/${getDofAndTime("#dof", 2)} OPR/${getData(
    "#opr"
  )} ${getData("#other-information")} RMK/TEL ${getData("#tel")}`;

  let field19 = ")";

  fplMsg =
    field3 +
    field7 +
    field8 +
    field9 +
    field10 +
    field13 +
    field15 +
    field16 +
    field18 +
    field19;

  finalFpl.innerHTML = fplMsg.replace(/%0d%0a/g, "<br>");
}

function getData(idStr) {
  return document.querySelector(idStr)
    ? document.querySelector(idStr).value
    : "";
}

function getDofAndTime(str, position) {
  let data = document.querySelector(str).value;
  data = data.slice(position);
  data = data.replace(/\D/g, "");
  return data;
}

function sendFpl() {
  if (validateFpl()) {
    let email = document.querySelectorAll("#email a");
    let emailAdressMain = "";
    let emailAdressCopy = "";
    let mailto = "";

    emailAdressMain = email[0].innerHTML;
    for (let i = 1; i < email.length; i++)
      emailAdressCopy += `${email[i].innerHTML},`;

    mailto = `mailto:${emailAdressMain}?subject=${getData(
      "#aircraft-id"
    )} -DOF/${getDofAndTime("#dof", 2)}&cc=${emailAdressCopy}&body=${fplMsg}`;

    document.location = mailto;

    console.log(fplMsg.replace(/%0d%0a/g, "\r\n"));
  }
}

function validateFpl() {
  let result = true;
  let inputArr = document.querySelectorAll("#fpl input");
  let textareaArr = document.querySelectorAll("#fpl textarea");

  inputArr.forEach((input) => {
    // console.log(input.required);
    if (input.required && input.value == "") {
      console.log("Заполните: ", input.id);
      result &= false;
    }
  });

  textareaArr.forEach((textarea) => {
    // console.log(textarea.required);
    if (textarea.required && textarea.innerHTML == "") {
      console.log("Заполните: ", textarea.id);
      result &= false;
    }
  });

  return result;
}
