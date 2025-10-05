let income = 0;
let expenses = [];

document.getElementById("addBtn").addEventListener("click", addExpense);
document.getElementById("calcBtn").addEventListener("click", calculateBudget);

// Додавання витрат
function addExpense() {
  const category = document.getElementById("category").value;
  const expense = parseFloat(document.getElementById("expense").value);

  if (category === "" || isNaN(expense) || expense <= 0) {
    alert("Будь ласка, введіть правильні дані!");
    return;
  }

  expenses.push({ category: category, amount: expense });
  document.getElementById("category").value = "";
  document.getElementById("expense").value = "";

  displayExpenses();
}

// Показати всі витрати
function displayExpenses() {
  let output = "<h3>Витрати по категоріях:</h3><ul>";
  let total = 0;

  expenses.forEach(item => {
    output += `<li>${item.category}: ${item.amount} грн</li>`;
    total += item.amount;
  });

  output += `</ul><strong>Загальні витрати: ${total} грн</strong>`;
  document.getElementById("output").innerHTML = output;
}

// Підрахунок бюджету
function calculateBudget() {
  income = parseFloat(document.getElementById("income").value);

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

  output += "<hr><h4>Витрати по категоріях:</h4><ul>";
  for (let item of expenses) {
    output += `<li>${item.category}: ${item.amount} грн</li>`;
  }
  output += "</ul>";

  document.getElementById("output").innerHTML = output;
}
