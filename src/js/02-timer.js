import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  buttonStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let selectedTime = null;
refs.buttonStart.disabled = true;

const flatPicker = new flatpickr(refs.inputDate, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedTime = selectedDates[0];
    let currentTime = Date.now();
    if (selectedDates[0] < currentTime) {
      Notify.failure('Please choose a date in the future');
      refs.buttonStart.disabled = true;
      return;
    }
    refs.buttonStart.disabled = false;
  },
});

let idInterval = null;
let timePeriod = null;

refs.buttonStart.addEventListener('click', () => {
  idInterval = setInterval(() => {
    const startTime = selectedTime.getTime();
    timePeriod = startTime - Date.now();

    changeTimer();

    if (timePeriod <= 1000 || timePeriod <= 0) {
      refs.buttonStart.disabled = true;
      clearInterval(idInterval);
    }
  }, 1000);
});

// function pad(value) {
//   return String(value).padStart(2, '0');
// }

function changeTimer(time) {
  const milliseconds = convertMs(timePeriod);
  const { days, hours, minutes, seconds } = milliseconds;
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
