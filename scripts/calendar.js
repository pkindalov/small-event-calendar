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

const closeBackdrop = () => {
  const backdrops = document.getElementsByClassName("js-backdrop");
  Array.from(backdrops).forEach(backdrop => backdrop.remove());
}

const createBackdrop = () => {
  const div = document.createElement("div");
  div.setAttribute("class", "js-backdrop");
  const closeBackdropBtn = document.createElement("button");
  closeBackdropBtn.setAttribute("class", "js-backdrop-close");
  closeBackdropBtn.innerText = "X";
  closeBackdropBtn.onclick = () => closeBackdrop();
  div.append(closeBackdropBtn);
  return div;
}

//TODO to implement these later
function moveToPrevDate(dayEvents) {}
function moveToNextDate(dayEvents) {}

function showDayEvents(e, dayEvents) {
  const selectedDay = +e.currentTarget.innerText;
  const backgdrop = createBackdrop();
  document.body.prepend(backgdrop);
  const modalWindow = document.createElement("div");
  modalWindow.setAttribute("class", "js-modal-dayEvent");

  //Header part of the modal
  const modalHeaderCont = document.createElement("div");
  modalHeaderCont.setAttribute("class", "js-modal-dayEvent__header-cont");

  const prevDayCont = document.createElement("div");
  prevDayCont.setAttribute("class", "js-modal-dayEvent__header-cont__prev-cont");
  const prevDayBtn = document.createElement("button");
  prevDayBtn.setAttribute("class", "js-modal-dayEvent__header-cont__prev-btn");
  prevDayBtn.innerText = "<";
  prevDayBtn.onclick = () => moveToPrevDate(dayEvents);
  prevDayCont.appendChild(prevDayBtn);
  
  const currentSelectedDayCont = document.createElement("div");
  currentSelectedDayCont.setAttribute("class", "js-modal-dayEvent__header-cont__day");
  currentSelectedDayCont.innerText = selectedDay;

  const nextDayCont = document.createElement("div");
  nextDayCont.setAttribute("class", "js-modal-dayEvent__header-cont__next-cont");
  const nextDayBtn = document.createElement("button");
  nextDayBtn.setAttribute("class", "js-modal-dayEvent__header-cont__next-btn");
  nextDayBtn.innerText = ">";
  nextDayBtn.onclick = () => moveToNextDate(dayEvents);
  nextDayCont.appendChild(nextDayBtn);

  modalHeaderCont.appendChild(prevDayCont);
  modalHeaderCont.appendChild(currentSelectedDayCont);
  modalHeaderCont.appendChild(nextDayCont);

  modalWindow.appendChild(modalHeaderCont);

  //Body of the modal
  const modalBodyCont = document.createElement("div");
  modalBodyCont.setAttribute("class", "js-modal-dayEvent__body-cont");
  // console.log(dayEvents);
  
  if(dayEvents && dayEvents.length > 0) {
    const listTaskItemsCont = document.createElement("ul");
    listTaskItemsCont.setAttribute("class", "js-modal-dayEvent__body-cont__tasks");
    let taskLi = null;
    let checkBox = null;
    
    dayEvents.forEach(event => {
      console.log(event);
      taskLi = document.createElement("li");
      taskLi.setAttribute("class", "js-modal-dayEvent__body-cont__tasks-item");
      taskLi.innerText = event.task;
      checkBox = document.createElement("input");
      checkBox.setAttribute("type", "checkbox"); // Set the type to "checkbox"
      checkBox.setAttribute("class", "js-modal-dayEvent__body-cont__tasks-item__checkbox");
      checkBox.checked = event.checked;
      // checkBox.setAttribute("checked", event.checked);
      // taskLi.appendChild(checkBox);
      // checkBox = document.createElement("checkbox");
      // checkBox.setAttribute("class", "js-modal-dayEvent__body-cont__tasks-item__checkbox");
      // checkBox.setAttribute("checked", event.checked);
      taskLi.prepend(checkBox);
      listTaskItemsCont.appendChild(taskLi);
    });
    modalBodyCont.appendChild(listTaskItemsCont);

  } else {
    modalBodyCont.innerHTML = "<h3>There are no events for today</h3>";
  }

  modalWindow.appendChild(modalBodyCont);
  backgdrop.append(modalWindow);


  // console.log(selectedDay);
  // console.log(dayEvents);
}

const getCurrentlySelMont = () => {
  const montSelect = document.getElementsByClassName("js-calendar__controls-month-year-selects_cont__item")[0];
  return +montSelect.value + 1 < 10 ? "0" + (+montSelect.value + 1) : +montSelect.value + 1;
}

const getCurrentlySelYear = () => {
  const yearSelect = document.getElementsByClassName("js-calendar__controls-month-year-selects_cont__item")[1];
  return yearSelect.value;
}

const drawBody = ({ monthIndex, year, events }) => {
  const { dayOfWeek, dayOfWeekIndex } = getFirstDayOfMonth(monthIndex, year);
  let numberOfDays = getDaysInMonth(monthIndex, year);
  numberOfDays += dayOfWeekIndex;
  const todayNumber = new Date().getDate();
  const calendar = document.getElementsByClassName("js-calendar")[0];
  const bodyDiv = document.getElementsByClassName("js-calendar__body")[0]
    ? document.getElementsByClassName("js-calendar__body")[0]
    : document.createElement("div");
  bodyDiv.setAttribute("class", "js-calendar__body");
  bodyDiv.innerHTML = "";
  let dayCell = null;
  let eventSpan = null;
  let eventsFound = null;
  let date = "";
  let day = null;

  for (let i = 0; i < numberOfDays; i++) {
    dayCell = document.createElement("div");
    dayCell.setAttribute("class", "js-calendar__body-item");
    if (i < dayOfWeekIndex) {
      dayCell.innerText = "";
      dayCell.classList.remove("js-calendar__body-item");
      dayCell.classList.add("js-calendar__body-empty");
    } else {
      day = i + 1 - dayOfWeekIndex;
      dayCell.innerText = day;
      day = day < 10 ? "0" + day : day;
      date =
        day +
        "-" +
        (monthIndex + 1 < 10 ? "0" + (monthIndex + 1) : monthIndex + 1) +
        "-" +
        year;
      // eventsFound = events[0][date];
      eventsFound = events.find((event) => event[date]);
      //  events[0][date];
      // console.log(date + " =>" + eventsFound);
      if (eventsFound) {
        eventSpan = document.createElement("span");
        eventSpan.setAttribute("class", "js-calendar__body-event-span");
        dayCell.appendChild(eventSpan);
      }

      //Because onclick is async, when click on the calendar cell it is not sure if the eventsFound
      //is with the correct value. For this reason I am using a closure to capture and to keep
      //the correct value of the eventsFound and to pass it to the showDayEvents when user click
      //on date cell of the callendar.
      dayCell.onclick = (function(eventsFound = {}) {
        return function(e) {
          const date = +e.currentTarget.innerText < 10 ? "0" + e.currentTarget.innerText : e.currentTarget.innerText;
          const clickedDate = date + '-' + getCurrentlySelMont() + '-' + getCurrentlySelYear();
          showDayEvents(e, eventsFound[clickedDate]);
        };
      })(eventsFound);



      // console.log(eventsFound);
      if (i + 1 - dayOfWeekIndex === todayNumber) {
        dayCell.classList.add("class", "js-calendar__body-item__today");
        if (eventsFound) {
          eventSpan.classList.add("js-calendar__body-event-span-today");
          dayCell.appendChild(eventSpan);
        }
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

const getPrevMonth = (events) => {
  const monthSelect = document.getElementById(
    "js-calendar__controls-month-year-selects_cont__months"
  );
  const monthIndex = parseInt(monthSelect.value) - 1;
  const yearsSelect = document.getElementById(
    "js-calendar__controls-month-year-selects_cont__years"
  );
  // console.log(monthSelect.value);
  if (monthIndex < 0) return;
  monthSelect.value = monthIndex;
  drawBody({ monthIndex, year: +yearsSelect.value, events: events });
};

const getNextMonth = (events) => {
  const monthSelect = document.getElementById(
    "js-calendar__controls-month-year-selects_cont__months"
  );
  const monthIndex = parseInt(monthSelect.value) + 1;
  const yearsSelect = document.getElementById(
    "js-calendar__controls-month-year-selects_cont__years"
  );
  if (monthIndex > 11) return;
  monthSelect.value = monthIndex;
  drawBody({ monthIndex, year: +yearsSelect.value, events: events });
};

const createMonthChangeBtn = ({ direction, id, cls, events }) => {
  let button = null;
  switch (direction) {
    case "prev":
      button = document.createElement("button");
      button.setAttribute("class", cls);
      button.innerText = "<";
      button.onclick = () => getPrevMonth(events);
      break;
    case "next":
      button = document.createElement("button");
      button.setAttribute("class", cls);
      button.innerText = ">";
      button.onclick = () => getNextMonth(events);
      break;
    default:
      throw new Error(`Unknow button ${direction}`);
      return;
  }

  return button;
};

const changeCurrentMonth = (select, events) => {
  const monthIndex = +select.value;
  const yearsSelect = document.getElementById(
    "js-calendar__controls-month-year-selects_cont__years"
  );
  drawBody({ monthIndex, year: +yearsSelect.value, events: events });
};

const createMonthSelect = ({ lang, cls, events }) => {
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
  select.setAttribute(
    "id",
    "js-calendar__controls-month-year-selects_cont__months"
  );
  select.setAttribute("name", "months");
  let option = null;
  for (let index = 0; index < monthNames.length; index++) {
    option = document.createElement("option");
    option.setAttribute("value", index);
    if (index === currentMonth) option.setAttribute("selected", true);
    option.innerText = monthNames[index];
    select.appendChild(option);
  }
  select.onchange = () => changeCurrentMonth(select, events);
  return select;
};

const addPrevYears = ({ currentYear, limitYears, select }) => {
  let option = null;
  let year = currentYear;
  for (let i = 1; i <= limitYears; i++) {
    year--;
    option = document.createElement("option");
    option.setAttribute("value", year);
    option.innerText = year;
    select.prepend(option);
  }
};

const addNextYears = ({ currentYear, limitYears, select }) => {
  let option = null;
  let year = currentYear;
  for (let i = 1; i <= limitYears; i++) {
    year++;
    option = document.createElement("option");
    option.setAttribute("value", year);
    option.innerText = year;
    select.append(option);
  }
};

const changeCurrentYear = (select, events) => {
  const year = +select.value;
  const monthsSelect = document.getElementById(
    "js-calendar__controls-month-year-selects_cont__months"
  );
  drawBody({ monthIndex: +monthsSelect.value, year, events });
};

function createYearSelect({ cls, events }) {
  const currentYear = new Date().getFullYear();
  const limitYears = 20;
  let select = document.createElement("select");
  select.setAttribute("class", cls);
  select.setAttribute("name", "year");
  select.setAttribute(
    "id",
    "js-calendar__controls-month-year-selects_cont__years"
  );
  const firstOption = document.createElement("option");
  firstOption.setAttribute("value", currentYear);
  firstOption.setAttribute("selected", "selected");
  firstOption.innerText = currentYear;
  select.append(firstOption);
  addPrevYears({ currentYear, limitYears, select });
  addNextYears({ currentYear, limitYears, select });
  select.onchange = () => changeCurrentYear(select, events);
  return select;
}

function loadControls(lang, events) {
  const containerCls = "js-calendar__controls";
  const container = document.getElementsByClassName(containerCls)[0];
  const prevMonthBtn = createMonthChangeBtn({
    direction: "prev",
    id: "js-calendar__controls-prevBtn",
    cls: "js-calendar__controls-btn",
    events: events,
  });

  const monthAndYearSelectsCont = document.createElement("div");
  monthAndYearSelectsCont.setAttribute(
    "class",
    "js-calendar__controls-month-year-selects_cont"
  );
  const monthsSelect = createMonthSelect({
    lang: lang,
    cls: "js-calendar__controls-month-year-selects_cont__item",
    events: events,
  });

  const yearsSelect = createYearSelect({
    cls: "js-calendar__controls-month-year-selects_cont__item",
    events: events,
  });

  monthAndYearSelectsCont.append(monthsSelect);
  monthAndYearSelectsCont.append(yearsSelect);

  const nextMonthBtn = createMonthChangeBtn({
    direction: "next",
    id: "js-calendar__controls-nextBtn",
    cls: "js-calendar__controls-btn",
    events: events,
  });
  container.append(prevMonthBtn);
  container.append(monthAndYearSelectsCont);
  container.append(nextMonthBtn);
}

function drawCalendar({ lang, events }) {
  const dayNames = pickDayNamesLangStartMon(lang);
  loadControls(lang, events);
  drawHeader(dayNames);
  drawBody({
    monthIndex: new Date().getMonth(),
    year: new Date().getFullYear(),
    events: events,
  });
}

export { drawCalendar };
