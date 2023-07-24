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
      "Sunday"
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
  
  const drawBody = ({dayNames, monthIndex, year}) => {
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
  
  document.addEventListener("DOMContentLoaded", function () {
    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    drawHeader(dayNames);
    drawBody({dayNames, monthIndex: 11, year: 2023});
  });
  