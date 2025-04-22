document.getElementById('order-submit-button').addEventListener('click', e => {
    e.preventDefault();
    updateOrder();
    document.getElementById('menu-overlay').style.display = 'flex';
});

document.getElementById('menu-close-btn').addEventListener('click', () => {
    document.getElementById('menu-overlay').style.display = 'none';
});

const orderTable = document.querySelector('.order-table tbody');

function updateOrder() {
    const count = 121;
    document.getElementById('menu-content').textContent = `Вы заказали ${count} ${formatNumeric(count, 'напиток', 'напитка', 'напитков')}`;
    const beverages = document.querySelectorAll('.beverage');
    orderTable.innerHTML = '';
    beverages.forEach(beverage => {
        const drinkSelect = beverage.querySelector('select');
        const drinkValue = drinkSelect.value;
        const drinkName = drinkSelect.querySelector(`option[value="${drinkValue}"]`).textContent;

        const milkRadio = beverage.querySelector('input[type="radio"][name^="milk"]:checked');
        const milkValue = milkRadio.value;
        const milkName = milkRadio.nextElementSibling.textContent.trim();

        const options = Array.from(beverage.querySelectorAll('input[type="checkbox"][name^="options"]:checked'))
            .map(checkbox => checkbox.nextElementSibling.textContent.trim())
            .join(', ');

        createRow(drinkName, milkName, options)
    })
}

function createRow(drink, milk, addition) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${drink}</td>
        <td>${milk}</td>
        <td>${addition}</td>
      `;

    orderTable.appendChild(row);
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
let count = 0;
addButton.addEventListener('click', () => {
    let newBeverage = beverageTemplate.content.cloneNode(true).querySelector('.beverage');
    const newNumber = number++;
    count++;
    updateBeverageFields(newBeverage, newNumber);
    const addButtonDiv = addButton.parentElement;
    form.insertBefore(newBeverage, addButtonDiv);
});

function updateBeverageFields(beverage, number) {
    beverage.querySelector('.beverage-count').textContent = `Напиток №${number}`;
    beverage.querySelector('.beverage-remove-btn').addEventListener('click', () => {
        if (count <= 1) {
            return;
        }
        count--;
        beverage.remove();
    });
    const select = beverage.querySelector('select');
    select.name = `drink-${number}`;

    beverage.querySelectorAll(`input[type="radio"][name="milk"]`).forEach(radio => {
        radio.name = `milk-${number}`;
    });

    beverage.querySelectorAll(`input[type="checkbox"][name="options"]`).forEach(checkbox => {
        checkbox.name = `options-${number}`;
    });
}
