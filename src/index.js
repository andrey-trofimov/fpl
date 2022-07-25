const AtcCener = {
  rcMow: {
    name: "РЦ ЕС ОрВД Москва",
    phone: "+7 (495) 436-75-57, +7 (495) 662-80-55, +7 (916) 043-36-37",
    email: "nsmzc@atcm.ru",
  },
  rcRov: {
    name: "РЦ ЕС ОрВД Ростов-на-Дону",
    phone: "+7 (863) 272-32-87, +7 (863) 272-37-98",
    email: "dcpk@yug.gkovd.ru",
  },
  rcSip: {
    name: "РЦ ЕС ОрВД Симферополь",
    phone: "+7 (978) 922-80-29, +7 (365) 260-52-82",
    email: "cpksmf@crimeaovd.ru",
  },
  rcKuf: {
    name: "РЦ ЕС ОрВД Самара",
    phone: "+7 (846) 279-18-26",
    email: "zc_samara@mail.ru, smena.cpivp@cv.gkovd.ru",
  },
  rcSvx: {
    name: "РЦ ЕС ОрВД Екатеринбург",
    phone: "+7 (343) 205-80-69, +7 (343) 205-80-70",
    email: "zc@ur.gkovd.ru",
  },
  rcTmj: {
    name: "РЦ ЕС ОрВД Тюмень",
    phone: "+7 (345) 229-38-84, +7 (345) 229-38-44",
    email: "plan@rgc.ans.aero",
  },
  rcOvb: {
    name: "РЦ ЕС ОрВД Новосибирск",
    phone: "+7 (383) 319-14-05",
    email: "nzc@zsa.ru",
  },
  rcKja: {
    name: "РЦ ЕС ОрВД Красноярск",
    phone: "+7 (391) 252-61-13",
    email: "plan@kr.cs.gkovd.ru",
  },
  rcIkt: {
    name: "РЦ ЕС ОрВД Иркутск",
    phone: "+7 (395) 252-29-19",
    email: "pvd@vs.gkovd.ru",
  },
  rcYks: {
    name: "РЦ ЕС ОрВД Якутск",
    phone: "+7 (411) 244-31-27",
    email: "sppi@svs.gkovd.ru",
  },
  rcGdx: {
    name: "РЦ ЕС ОрВД Магадан",
    phone: "+7 (413) 260-56-03",
    email: "pivp@sv.gkovd.ru",
  },
  rcKhv: {
    name: "РЦ ЕС ОрВД Хабаровск",
    phone: "+7 (421) 241-86-18",
    email: "sppi@dv.gkovd.ru",
  },
  gcMow: {
    name: "ГЦ ЕС ОрВД Москва",
    phone: "+7 (499) 157-02-01, +7 (499) 155-36-59, +7 (985) 929-03-87",
    email: "regimivp@matfmc.ru",
  },
  zcLed: {
    name: "ЗЦ ЕС ОрВД Санкт-Петербург",
    phone: "+7 (812) 305-17-97, +7 (812) 704-11-05, +7 (921) 342-02-88",
    email: "spbzc.rgm@sz.gkovd.ru",
  },
};

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
  for (let key in AtcCener) {
    atcSelect.innerHTML += `<option value=${key}>${AtcCener[key].name}</opion>`;
  }

  showContacts();
}

function checkInput() {
  let form = document.querySelector("#fpl");
  let input = form.querySelectorAll("input");
  let select = form.querySelectorAll("select");
  let textArea = form.querySelectorAll("textarea");

  atcSelect.addEventListener("change", showContacts);
  input.forEach((elem) => elem.addEventListener("change", buildFpl));
  select.forEach((elem) => elem.addEventListener("change", buildFpl));
  textArea.forEach((elem) => elem.addEventListener("change", buildFpl));
}

function showContacts() {
  let option = atcSelect.options[atcSelect.selectedIndex];
  let atcUnit = AtcCener[option.value];

  let phone = document.querySelector("#phone");
  let email = document.querySelector("#email");

  let phoneArry = convertStrToArry(atcUnit.phone);
  let emailArry = convertStrToArry(atcUnit.email);

  phone.innerHTML = composeContact(phoneArry, "tel:");
  email.innerHTML = composeContact(emailArry, "mailto:");

  createSendLink();
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

  let field8 = `-${getData("#flight-rules")}${getData("#type-of-flight")}\r\n`;

  let field9 = `-${getData("#aircraft-type")}/${getData("#wake-turbulence-cat")}`;

  let field10 = `-${getData("#equipment")}\r\n`;

  let field13 = `-${getData("#departure-aerodrome")}${getDofAndTime("#departure-time", 0)}\r\n`;

  let field15 = `-${getData("#cruising-speed")}${getData("#flight-level")} ${getData(
    "#route"
  )}\r\n`;

  let field16 = `-${getData("#destination-aerodrome")}${getDofAndTime("#total-eet", 0)} ${getData(
    "#altn-aerodrome"
  )} ${getData("#second-altn-aerodrome")}\r\n`;

  let field18 = `-DOF/${getDofAndTime("#dof", 2)} OPR/${getData("#opr")} ${getData(
    "#other-information"
  )} RMK/TEL ${getData("#tel")}`;

  let field19 = ")";

  fplMsg =
    field3 + field7 + field8 + field9 + field10 + field13 + field15 + field16 + field18 + field19;

  finalFpl.innerHTML = fplMsg;

  createSendLink();
}

function getData(idStr) {
  return document.querySelector(idStr) ? document.querySelector(idStr).value : "";
}

function getDofAndTime(str, position) {
  let data = document.querySelector(str).value;
  data = data.slice(position);
  data = data.replace(/\D/g, "");
  return data;
}

function createSendLink() {
  let email = document.querySelectorAll("#email a");
  let sendLink = document.querySelector("#send-button");
  let emailAdressMain = "";
  let emailAdressCopy = "";

  emailAdressMain = email[0].innerHTML;
  for (i = 1; i < email.length; i++) emailAdressCopy += `${email[i].innerHTML},`;

  sendLink.href = `mailto:${emailAdressMain}?subject=${getData(
    "#aircraft-id"
  )} -DOF/${getDofAndTime("#dof", 2)}&cc=${emailAdressCopy}&body=${fplMsg}`;

  console.log(fplMsg);
}
