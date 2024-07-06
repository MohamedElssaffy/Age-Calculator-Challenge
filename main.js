let form = document.forms[0];
let inputs = document.querySelectorAll('input[type="number"]');

window.onload = () => inputs[0].focus();
Array.from(inputs).forEach((input) => {
  input.addEventListener('keyup', function (e) {
    if (e.target.id !== 'year' && e.target.value.length === 2) {
      e.target.parentNode.nextElementSibling.children[1].focus();
    }

    if (
      e.key === 'Backspace' &&
      e.target.value.length === 0 &&
      e.target.id !== 'day'
    ) {
      e.target.parentNode.previousElementSibling.children[1].focus();
    }
  });
});

inputs[2].setAttribute('max', new Date().getFullYear() - 1);
inputs[2].setAttribute('min', new Date().getFullYear() - 150);

form.addEventListener('submit', handleSubmit);

function getDaysInMonths(month, year) {
  return new Date(year, month, 0).getDate();
}

function handleSubmit(e) {
  e.preventDefault();
  let day = inputs[0].value;
  let month = inputs[1].value;
  let year = inputs[2].value;
  let daysNumOfMonth = getDaysInMonths(year, month);
  // Check if day exist in month
  if (day > daysNumOfMonth) return alert('Please check the day you wrote');
  let age = new Date() - new Date(year, month - 1, day);
  let years = Math.floor(age / 1000 / 3600 / 24 / 365.25);
  let months = Math.floor((age / 1000 / 3600 / 24 / 365.25) * 12) - years * 12;
  let days = Math.floor(
    age / 1000 / 3600 / 24 - years * 365.25 - (months * 365.25) / 12
  );

  let daySpan = document.querySelector('.result p.days span');
  let monthSpan = document.querySelector('.result p.months span');
  let yearSpan = document.querySelector('.result p.years span');

  daySpan.innerHTML = days;
  monthSpan.innerHTML = months;
  yearSpan.innerHTML = years;

  // reset inputs value and focus on days input
  inputs[2].value = '';
  inputs[1].value = '';
  inputs[0].value = '';
  inputs[0].focus();
}
