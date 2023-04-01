import { Notify } from 'notiflix/build/notiflix-notify-aio';

let form = document.querySelector('.form');

form.addEventListener('submit', onSubmitForm);

function createPromise(position, delayValue) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delayValue });
      } else {
        reject({ position, delayValue });
      }
    }, delayValue);
  });
}

function onSubmitForm(event) {
  event.preventDefault();

  let delayValue = Number(form.delay.value);

  for (let position = 1; position <= Number(form.amount.value); position += 1) {
    createPromise(position, delayValue)
      .then(({ position, delayValue }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delayValue}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delayValue}ms`);
      });
    delayValue += Number(form.step.value);
  }
  event.currentTarget.reset();
}
