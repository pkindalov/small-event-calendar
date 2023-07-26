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

const getFirstDayOfMonth = (monthIndex, year) => {
  if (monthIndex < 0 || monthIndex > 11) {
    return "Invalid month index. Please provide a value between 0 and 11.";
  }

  const today = new Date().getDate();
  const currentDate = new Date(year, monthIndex, today);
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
  if (monthIndex < 0 || monthIndex > 11) {
    return "Invalid month index. Please provide a value between 0 and 11.";
  }

  const lastDayOfMonth = new Date(year, monthIndex + 1, 0);
  return lastDayOfMonth.getDate();
}

const drawBody = ({ monthIndex, year }) => {
  const { dayOfWeek, dayOfWeekIndex } = getFirstDayOfMonth(monthIndex, year);
  let numberOfDays = getDaysInMonth(monthIndex, year);
  numberOfDays += dayOfWeekIndex;
  const todayNumber = new Date().getDate();
  const calendar = document.getElementsByClassName("js-calendar")[0];
  const bodyDiv = document.getElementsByClassName("js-calendar__body")[0] ? document.getElementsByClassName("js-calendar__body")[0] : document.createElement("div");
  bodyDiv.setAttribute("class", "js-calendar__body");
  bodyDiv.innerHTML = "";
  let dayCell = null;

  for (let i = 0; i < numberOfDays; i++) {
    dayCell = document.createElement("div");
    dayCell.setAttribute("class", "js-calendar__body-item");
    if (i < dayOfWeekIndex) {
      dayCell.innerText = "";
    } else {
      dayCell.innerText = i + 1 - dayOfWeekIndex;
      if(i + 1 - dayOfWeekIndex === todayNumber) {
        dayCell.classList.add("class","js-calendar__body-item__today");
      }
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

const getPrevMonth = () => {
  const monthSelect = document.getElementById('js-calendar__controls-month-year-selects_cont__months');
  const monthIndex = parseInt(monthSelect.value) - 1;
  const yearsSelect = document.getElementById('js-calendar__controls-month-year-selects_cont__years');
  // console.log(monthSelect.value);
  if(monthIndex < 0) return;
  monthSelect.value = monthIndex;
  drawBody({monthIndex, year: +yearsSelect.value});
}

const getNextMonth = () => {
  const monthSelect = document.getElementById('js-calendar__controls-month-year-selects_cont__months');
  const monthIndex = parseInt(monthSelect.value) + 1;
  const yearsSelect = document.getElementById('js-calendar__controls-month-year-selects_cont__years');
  if(monthIndex > 11) return;
  monthSelect.value = monthIndex;
  drawBody({monthIndex, year: +yearsSelect.value});
}

const createMonthChangeBtn = ({ direction, id, cls }) => {
  let button = null;
  switch (direction) {
    case "prev":
      button = document.createElement("button");
      button.setAttribute("class", cls);
      button.innerText = "<";
      button.onclick = () => getPrevMonth();
      break;
    case "next":
      button = document.createElement("button");
      button.setAttribute("class", cls);
      button.innerText = ">";
      button.onclick = () => getNextMonth();
      break;
    default:
      throw new Error(`Unknow button ${direction}`);
      return;
  }

  return button;
};

const changeCurrentMonth = (select) => {
  const monthIndex = +select.value;
  const yearsSelect = document.getElementById('js-calendar__controls-month-year-selects_cont__years');
  drawBody({monthIndex, year: +yearsSelect.value});
}

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
        "Ноември",
        "Декември",
      ];
      break;
    default:
      throw new Error(`The language ${lang} is not supported yet`);
      return;
  }
  const currentMonth = new Date().getMonth();
  const select = document.createElement("select");
  select.setAttribute("class", cls);
  select.setAttribute("id", "js-calendar__controls-month-year-selects_cont__months");
  select.setAttribute("name", "months");
  let option = null;
  for(let index = 0; index < monthNames.length; index++) {
    option = document.createElement("option");
    option.setAttribute("value", index);
    if(index === currentMonth) option.setAttribute("selected", true);
    option.innerText = monthNames[index];
    select.appendChild(option);
  }
  select.onchange = () => changeCurrentMonth(select);
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

const changeCurrentYear = (select) => {
  const year = +select.value;
  const monthsSelect = document.getElementById('js-calendar__controls-month-year-selects_cont__months');
  drawBody({monthIndex: +monthsSelect.value, year});
}

function createYearSelect({cls}) {
  const currentYear = new Date().getFullYear();
  const limitYears = 20;
  let select = document.createElement("select");
  select.setAttribute("class", cls);
  select.setAttribute("name", "year");
  select.setAttribute("id", "js-calendar__controls-month-year-selects_cont__years")
  const firstOption = document.createElement("option");
  firstOption.setAttribute("value", currentYear);
  firstOption.setAttribute("selected", "selected");
  firstOption.innerText = currentYear;
  select.append(firstOption);
  addPrevYears({currentYear, limitYears, select});
  addNextYears({currentYear, limitYears, select});
  select.onchange = () => changeCurrentYear(select);
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
  drawBody({ monthIndex: new Date().getMonth(), year: new Date().getFullYear() });
}

document.addEventListener("DOMContentLoaded", function () {
  try {
    drawCalendar({ lang: "bg" });
  } catch (e) {
    console.log(e.message);
    console.log(e);
  }
});
