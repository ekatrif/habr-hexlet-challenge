const app = document.querySelector('#app');
const timeInput = document.querySelector('#time-input');
const addBtn = document.querySelector('#add-timer');
const list = document.querySelector('#timers');
const error = document.querySelector('.error-wrapper');

const onValidate = (e) => {
  const target = e.target;
  const value = target.value;

  // Check if value is positive number
  if (isNaN(value) || value <= 0) {
    error.textContent = 'Please enter a positive number';
    timeInput.classList.add('error');
    addBtn.disabled = true;
    return;
  }

  error.textContent = '';
  timeInput.classList.remove('error');
  addBtn.disabled = false;
}

timeInput.addEventListener('keyup', (e) => onValidate(e));
timeInput.addEventListener('change', (e) => onValidate(e));

let timerId = 0;

const createButtons = () => '<button class="stop-timer">Stop</button><button class="delete-timer">Delete</button>';

const createItem = (value, timerId) => `<li id="timer-${timerId}"><span class="countdown">${value}</span>${createButtons()}</li>`;

const onStop = (timer) => {
  clearInterval(timer);
}

const onDelete = (timer, item) => {
  clearInterval(timer);
  item.remove();
}

const addTimer = () => {
  timerId ++;
  // Take value from input
  const value = timeInput.value;

  // Reset value in input
  timeInput.value = '';
  // Disable button
  addBtn.disabled = true;

  // Create list item with countdown and stop/delete buttons
  const listItemHtml = createItem(value, timerId);
  list.insertAdjacentHTML('beforeend', listItemHtml);

  const currentItem = list.querySelector(`#timer-${timerId}`);

  const valueWrapper = currentItem.querySelector('.countdown');

  // Start countdown timer
  let currentValue = value;
  const currentTimer = setInterval(() => {
    currentValue --;
    valueWrapper.innerText = currentValue;
    if (currentValue <= 0) {
      clearInterval(currentTimer);
    }
  }, 1000)

  // Add event listeners for stop and delete buttons
  const stopBtn = currentItem.querySelector('.stop-timer');
  const deleteBtn = currentItem.querySelector('.delete-timer');

  stopBtn.addEventListener('click', () => onStop(currentTimer));
  deleteBtn.addEventListener('click', () => onDelete(currentTimer, currentItem));
}

addBtn.addEventListener('click', addTimer);