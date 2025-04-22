document.getElementById('order-submit-button').addEventListener('click', e => {
    e.preventDefault();
    updateOrder();
    document.getElementById('menu-overlay').style.display = 'flex';
});

document.getElementById('menu-close-btn').addEventListener('click', () => {
    document.getElementById('menu-overlay').style.display = 'none';
});

function updateOrder() {
    const count = 121;
    document.getElementById('menu-content').textContent = `Вы заказали ${count} ${formatNumeric(count, 'напиток', 'напитка', 'напитков')}`;
}

function formatNumeric(number, form1, form2, form5) {
    const number100 = number % 100;
    if (number100 > 4 && number100 < 21) {
      return form5;
    }
    const number10 = number % 10;
    if (number10 === 1) {
      return form1;
    }
    if (number10 > 1 && number10 < 5) {
      return form2;
    }
    return form5;
  }
  
const addButton = document.querySelector('.add-button');
const form = document.querySelector('form')

const beverageTemplate = document.querySelector('#beverage-template');

let number = 1;
addButton.addEventListener('click', () => {
    let newBeverage = beverageTemplate.content.cloneNode(true);

    const newNumber = number++;
    newBeverage.querySelector('.beverage-count').textContent = `Напиток №${newNumber}`;
    updateBeverageFields(newBeverage, newNumber);

    const addButtonDiv = addButton.parentElement;
    form.insertBefore(newBeverage, addButtonDiv);
});

function updateBeverageFields(beverage, number) {
    const select = beverage.querySelector('select');
    select.name = `drink-${number}`;

    beverage.querySelectorAll(`input[type="radio"][name="milk"]`).forEach(radio => {
        radio.name = `milk-${number}`;
    });

    beverage.querySelectorAll(`input[type="checkbox"][name="options"]`).forEach(checkbox => {
        checkbox.name = `options-${number}`;
    });
}