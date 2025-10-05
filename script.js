let income = 0;
let expenses = [];

document.getElementById("addBtn").addEventListener("click", addExpense);
document.getElementById("calcBtn").addEventListener("click", calculateBudget);
document.getElementById("resetBtn").addEventListener("click", resetAll);

// Додавання витрат через prompt
function addExpense() {
  const category = prompt("Введіть назву категорії витрат:");
  if (!category) {
    alert("Назву категорії не введено!");
    return;
  }

  const expense = parseFloat(prompt(`Введіть суму витрат для категорії "${category}" (грн):`));
  if (isNaN(expense) || expense <= 0) {
    alert("Будь ласка, введіть правильну суму!");
    return;
  }

  expenses.push({ category: category, amount: expense });
  displayExpenses();
}

// Показати всі витрати
function displayExpenses() {
  let output = "<h3>Витрати по категоріях:</h3><ul>";
  let total = 0;

  expenses.forEach((item, index) => {
    output += `
      <li>
        ${item.category}: ${item.amount} грн
        <button onclick='deleteExpense(${index})'>❌</button>
      </li>
    `;
    total += item.amount;
  });

  output += `</ul><strong>Загальні витрати: ${total} грн</strong>`;
  if (expenses.length === 0) output = ""; // Якщо немає витрат, очищаємо вивід
  document.getElementById("output").innerHTML = output;
}

// Видалення окремої витрати
function deleteExpense(index) {
  if (index >= 0 && index < expenses.length) {
    expenses.splice(index, 1);
    displayExpenses();
  }
}

// Повне очищення всіх даних
function resetAll() {
  if (confirm("Ви впевнені, що хочете видалити всі дані?")) {
    income = 0;
    expenses = [];
    document.getElementById("output").innerHTML = "";
  }
}

// Підрахунок бюджету
function calculateBudget() {
  income = parseFloat(prompt("Введіть ваш місячний дохід (грн):"));

  if (isNaN(income) || income <= 0) {
    alert("Введіть коректний місячний дохід!");
    return;
  }

  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const balance = income - totalExpenses;

  let message = "";
  let cssClass = "";

  if (balance > 0) {
    message = `✅ У вас залишок: ${balance} грн`;
    cssClass = "positive";
  } else if (balance < 0) {
    message = `⚠️ Ви перевищили бюджет на ${Math.abs(balance)} грн`;
    cssClass = "negative";
  } else {
    message = `💸 Ваш бюджет дорівнює нулю.`;
    cssClass = "neutral";
  }

  let output = `
    <h3>Звіт бюджету</h3>
    <p><strong>Дохід:</strong> ${income} грн</p>
    <p><strong>Витрати:</strong> ${totalExpenses} грн</p>
    <p class="${cssClass}"><strong>${message}</strong></p>
  `;

  if (expenses.length > 0) {
    output += "<hr><h4>Витрати по категоріях:</h4><ul>";
    expenses.forEach(item => {
      output += `<li>${item.category}: ${item.amount} грн</li>`;
    });
    output += "</ul>";
  }

  document.getElementById("output").innerHTML = output;
}
