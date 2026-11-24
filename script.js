//Ledger Balance System  

import { User } from "./user.js";
import { currency, rates, loadRates, money, setCurrency } from "./currency.js";

const firstName = prompt("Please enter your first name: ") || "Future";
const lastName = prompt("Please enter your last name: ") || "Millionare";

const person = new User(firstName, lastName);

const greeting = document.getElementById("greeting");
greeting.textContent = `Welcome to the Money Pit, ${person.fullname}!`; 

const expenses = ["food", "rent", "others", "saving"];
const colors = {
  food: "#F5DEB3",
  rent: "#efbbf1",
  others: "#ADD8E6",
  saving: "#f7ee94",
};

function calculate() {
  const salary = Number(document.getElementById("salary").value) || 0;
  
  let total = 0;
  let rows = [];

  for (let i = 0; i < expenses.length; i++) {
    const name = expenses[i];
    const val = Number(document.getElementById(name).value) || 0;
    total += val;

    rows.push({
      label: name[0].toUpperCase() + name.slice(1),
      amount: val,
      color: colors[name],
    });
  }

  const balance = salary - total;
  const percent = salary > 0 ? (balance / salary) * 100 : 0;
  const amount = balance < 0 ? `-RM${Math.abs(balance).toFixed(2)}` : `RM${Math.abs(balance).toFixed(2)}`

  rows.push({
    label: balance >= 0 ? "Remaining" : "Overspent",
    amount: balance,
    color: balance >= 0 ? "lightgreen" : "salmon",
  });

  drawTable(rows, salary);

  const result = document.getElementById("result");
  result.textContent = `Net Balance: ${(money(balance))} (${
    percent.toFixed(2) + "%"
  } of income)`;
  result.style.backgroundColor = balance >= 0 ? "#d4edda" : "#f8d7da";
  result.style.color = balance >= 0 ? "#155724" : "#721c24";
}

document.getElementById("calc-btn").addEventListener("click", calculate)

document.querySelectorAll(".form input").forEach((input) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/[^0-9.]/g, "");
  });
});

function drawTable(rows, salary) {
  const tbody = document.getElementById('table-body');
  let html = '';

  for (const row of rows) {
    const percent = salary > 0 ? (row.amount / salary) * 100 : 0;
    const barWidth = Math.min(percent, 100);

    html += `
      <tr>
        <td>${row.label}</td>
        <td>${(money(row.amount))}</td>
        <td>
          <div class="bar-track">
            <div class="bar-fill" style="width: ${barWidth}%; background-color: ${row.color};"></div>
            <span class="bar-text">${percent.toFixed(2)}%</span>         
          </div>
        </td>
      </tr>  
    `;
  }
  tbody.innerHTML = html;
}

document.getElementById("currency").addEventListener("change", (event) => {
  const oldCode = currency;
  const newCode = event.target.value;
  
  if (!rates[oldCode] || !rates[newCode]){
    event.target.value = oldCode;
    alert("Exchange rates not available right now.");
    return;
  }

  const conversion = rates[newCode] / rates[oldCode];

  const ids = ["salary", ...expenses];

  for (const id of ids){
    const input = document.getElementById(id);
    if (input.value !== ""){
      input.value = (Number(input.value) * conversion).toFixed(2);
      console.log("currency converted", rates[oldCode], "to", rates[newCode] )
    }
  }
  setCurrency(newCode);
  console.log("currency set?", newCode)
  calculate();
});
loadRates().then(calculate)
console.log("rates ok?", loadRates, "then", calculate)
