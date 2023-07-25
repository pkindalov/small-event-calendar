const drawHeader = (dayNames) => {
  const calendarCont = document.getElementsByClassName("js-calendar")[0];
  const calendarHeaderCont = document.createElement("div");
  calendarHeaderCont.setAttribute("class", "js-calendar__header");

  let divCell = null;
  dayNames.forEach((name) => {
    divCell = document.createElement("div");
    divCell.setAttribute("class", "js-calendar__header-item");
    divCell.innerText = name;
    calendarHeaderCont.append(divCell);
  });

  calendarCont.append(calendarHeaderCont);
};

const getFirstDayOfMonth = (monthIndex) => {
  if (monthIndex < 0 || monthIndex > 11) {
    return "Invalid month index. Please provide a value between 0 and 11.";
  }

  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), monthIndex, 1);
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const dayOfWeekIndex = (firstDayOfMonth.getDay() + 6) % 7; // Adjust the index to start from Sunday
  const dayOfWeek = daysOfWeek[dayOfWeekIndex];

  return { dayOfWeek, dayOfWeekIndex };
};

function getDaysInMonth(monthIndex, year) {
  // Check if the provided month index is valid (0 to 11, where 0 is January and 11 is December)
  console.log(year);
  if (monthIndex < 0 || monthIndex > 11) {
    return "Invalid month index. Please provide a value between 0 and 11.";
  }

  const lastDayOfMonth = new Date(new Date().getFullYear(), monthIndex + 1, 0);
  return lastDayOfMonth.getDate();
}

const drawBody = ({ monthIndex, year }) => {
  const { dayOfWeek, dayOfWeekIndex } = getFirstDayOfMonth(monthIndex, year);
  let numberOfDays = getDaysInMonth(monthIndex);
  numberOfDays += dayOfWeekIndex;
  const calendar = document.getElementsByClassName("js-calendar")[0];
  const bodyDiv = document.createElement("div");
  bodyDiv.setAttribute("class", "js-calendar__body");
  let dayCell = null;

  for (let i = 0; i < numberOfDays; i++) {
    dayCell = document.createElement("div");
    dayCell.setAttribute("class", "js-calendar__body-item");
    if (i < dayOfWeekIndex) {
      dayCell.innerText = "";
    } else {
      dayCell.innerText = i + 1 - dayOfWeekIndex;
    }

    bodyDiv.append(dayCell);
  }
  calendar.append(bodyDiv);
};

const pickDayNamesLangStartMon = (lang = "en") => {
  switch (lang) {
    case "en":
      return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    case "bg":
      return ["Пон", "Вто", "Сря", "Чет", "Пет", "Съб", "Нед"];
    default:
      return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  }
};

const createMonthChangeBtn = ({ direction, id, cls }) => {
  let button = null;
  switch (direction) {
    case "prev":
      button = document.createElement("button");
      button.setAttribute("class", cls);
      button.innerText = "<";
      break;
    case "next":
      button = document.createElement("button");
      button.setAttribute("class", cls);
      button.innerText = ">";
      break;
    default:
      throw new Error(`Unknow button ${direction}`);
      return;
  }

  return button;
};

const createMonthSelect = ({lang, cls}) => {
  let monthNames = null;
  switch (lang) {
    case "en":
      monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      break;
    case "bg":
      monthNames = [
        "Януари",
        "Февруари",
        "Март",
        "Април",
        "Май",
        "Юни",
        "Юли",
        "Август",
        "Септември",
        "Октомври",
        "Ноевмри",
        "Декември",
      ];
      break;
    default:
      throw new Error(`The language ${lang} is not supported yet`);
      return;
  }
  const select = document.createElement("select");
  select.setAttribute("class", cls);
  select.setAttribute("id", "js-calendar__controls-month-year-selects_cont__months");
  select.setAttribute("name", "months");
  const firstOption = document.createElement("option");
  firstOption.setAttribute("value", 0);
  firstOption.innerText = monthNames[0];
  firstOption.setAttribute("selected", "selected");
  select.appendChild(firstOption);
  let option = null;
  for(let index = 1; index < monthNames.length - 1; index++) {
    option = document.createElement("option");
    option.setAttribute("value", index);
    option.innerText = monthNames[index];
    select.appendChild(option);
  }
  return select;
};

const addPrevYears = ({currentYear, limitYears, select}) => {
  let option = null;
  let year = currentYear;
  for(let i = 1; i <= limitYears; i++){
    year--;
    option = document.createElement("option");
    option.setAttribute("value", year);
    option.innerText = year;
    select.prepend(option);
  }
}

const addNextYears = ({currentYear, limitYears, select}) => {
  let option = null;
  let year = currentYear;
  for(let i = 1; i <= limitYears; i++){
    year++;
    option = document.createElement("option");
    option.setAttribute("value", year);
    option.innerText = year;
    select.append(option);
  }
}

function createYearSelect({cls}) {
  const currentYear = new Date().getFullYear();
  const limitYears = 20;
  let select = document.createElement("select");
  select.setAttribute("class", cls);
  select.setAttribute("name", "year");
  const firstOption = document.createElement("option");
  firstOption.setAttribute("value", currentYear);
  firstOption.setAttribute("selected", "selected");
  firstOption.innerText = currentYear;
  select.append(firstOption);
  addPrevYears({currentYear, limitYears, select});
  addNextYears({currentYear, limitYears, select});
  return select;
}

function loadControls(lang) {
  const containerCls = "js-calendar__controls";
  const container = document.getElementsByClassName(containerCls)[0];
  const prevMonthBtn = createMonthChangeBtn({
    direction: "prev",
    id: "js-calendar__controls-prevBtn",
    cls: "js-calendar__controls-btn",
  });

  const monthAndYearSelectsCont = document.createElement("div");
  monthAndYearSelectsCont.setAttribute(
    "class",
    "js-calendar__controls-month-year-selects_cont"
  );
  const monthsSelect = createMonthSelect({
    lang: lang,
    cls: "js-calendar__controls-month-year-selects_cont__item",
  });

  const yearsSelect = createYearSelect({
    cls: "js-calendar__controls-month-year-selects_cont__item",
  });

  monthAndYearSelectsCont.append(monthsSelect);
  monthAndYearSelectsCont.append(yearsSelect);


  const nextMonthBtn = createMonthChangeBtn({
    direction: "next",
    id: "js-calendar__controls-nextBtn",
    cls: "js-calendar__controls-btn",
  });
  container.append(prevMonthBtn);
  container.append(monthAndYearSelectsCont);
  container.append(nextMonthBtn);
}

function drawCalendar({ lang }) {
  const dayNames = pickDayNamesLangStartMon(lang);
  loadControls(lang);
  drawHeader(dayNames);
  drawBody({ monthIndex: 11, year: 2023 });
}

document.addEventListener("DOMContentLoaded", function () {
  try {
    drawCalendar({ lang: "bg" });
  } catch (e) {
    console.log(e.message);
    console.log(e);
  }
});
