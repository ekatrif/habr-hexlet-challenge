const app = document.querySelector('#app');
const timeInput = document.querySelector('#time-input');
const addBtn = document.querySelector('#add-timer');
const list = document.querySelector('#timers');

let timerId = 0;

const createButtons = () => '<button class="stop-timer">Stop</button><button class="delete-timer">Delete</button>';

const createItem = (value, timerId) => `<li id="timer-${timerId}"><span class="countdown">${value}</span>${createButtons()}</li>`;

const onStop = (timer) => {
  console.log({
    timer
  })
  clearInterval(timer);
}

const onDelete = (timer, item) => {
  console.log({
    timer, item
  })
  clearInterval(timer);
  item.remove();
}

const addTimer = () => {
  timerId ++;
  const value = timeInput.value;
  list.innerHTML += createItem(value, timerId);

  const currentItem = list.querySelector(`#timer-${timerId}`);

  const valueWrapper = currentItem.querySelector('.countdown');
  let currentValue = +valueWrapper.innerText;

  const currentTimer= setInterval(() => {
    currentValue --;
    valueWrapper.innerText = currentValue;
    if (currentValue <= 0) {
      clearInterval(currentTimer);
    }
  }, 1000)

  const stopBtn = currentItem.querySelector('.stop-timer');
  const deleteBtn = currentItem.querySelector('.delete-timer');
  console.log(currentTimer)

  stopBtn.addEventListener('click', () => onStop(currentTimer));

  deleteBtn.addEventListener('click', () => onDelete(currentTimer, currentItem));
}

addBtn.addEventListener('click', addTimer);