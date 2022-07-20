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
    email: "zc_samara@mail.ru, smena.cpivp@cv.gkovd .ru",
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

let select = "";
document.addEventListener("DOMContentLoaded", fpl());

function fpl() {
  buildAtcList();
  showContacts();
  checkInput();
}

function buildAtcList() {
  select = document.querySelector("#atc-untits");
  for (let key in AtcCener) {
    select.innerHTML += `<option value=${key}>${AtcCener[key].name}</opion>`;
  }
}

function checkInput() {
  select.addEventListener("change", showContacts);
}

function showContacts() {
  let option = select.options[select.selectedIndex];
  let atcUnit = AtcCener[option.value];

  let phone = document.querySelector("#phone");
  let email = document.querySelector("#email");
  let finalFpl = document.querySelector("#final-fpl").innerHTML;

  let phoneArry = convertStrToArry(atcUnit.phone);
  let emailArry = convertStrToArry(atcUnit.email);

  phone.innerHTML = composeContact(phoneArry, "tel:", "");
  email.innerHTML = composeContact(emailArry, "mailto:", finalFpl);
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

function composeContact(arry, prefix, body = "") {
  let contact = "";
  let msg = body != "" ? `?body=${body}` : "";
  arry.forEach((elem) => (contact += `<a href="${prefix}${elem}${msg}">${elem}</a>`));
  return contact;
}
