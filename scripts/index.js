import { drawCalendar } from "./calendar.js";
import { events } from "./sampleEventsData.js";

document.addEventListener("DOMContentLoaded", function () {
  try {
    drawCalendar({ lang: "bg", events: events });
  } catch (e) {
    console.log(e.message);
    console.log(e);
  }
});
