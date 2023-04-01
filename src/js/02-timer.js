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
let idInterval = null;
refs.buttonStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedTime = selectedDates[0].getTime();
    if (selectedTime < Date.now()) {
      Notify.failure('Please choose a date in the future');
    }
    refs.buttonStart.disabled = false;
  },
};

function onStartTimer() {
  refs.inputDate.disabled = true;

  idInterval = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedTime - currentTime;
    changeTimer(deltaTime);
    if (deltaTime < 1000) {
      onStopTimer();
      refs.inputDate.disabled = false;
      refs.buttonStart.disabled = true;
    }
  }, 1000);
}

function onStopTimer() {
  clearInterval(idInterval);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function changeTimer(time) {
  refs.days.textContent = pad(convertMs(time).days);
  refs.hours.textContent = pad(convertMs(time).hours);
  refs.minutes.textContent = pad(convertMs(time).minutes);
  refs.seconds.textContent = pad(convertMs(time).seconds);
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

flatpickr(refs.inputDate, options);
refs.buttonStart.addEventListener('click', onStartTimer);
