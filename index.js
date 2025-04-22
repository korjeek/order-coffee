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

const beverages = document.querySelectorAll('.beverage');
beverages.forEach((beverage, index) => {
    const number = index + 1;
    console.log(number)
    updateBeverageFields(beverage, number);
    beverage.querySelector('.beverage-count').textContent = `Напиток №${number}`;
});

const template = beverages[0].outerHTML;
addButton.addEventListener('click', () => {
    const newBeverage = new DOMParser()
        .parseFromString(template, 'text/html')
        .querySelector('.beverage');

    const newNumber = form.querySelectorAll('.beverage').length + 1;
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