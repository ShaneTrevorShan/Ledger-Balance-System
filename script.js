//Ledger Balance System  

import { User } from "./user.js";

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
  const percent = (balance / salary) * 100;
  const amount = balance < 0 ? `-RM${Math.abs(balance).toFixed(2)}` : `RM${Math.abs(balance).toFixed(2)}`

  rows.push({
    label: balance >= 0 ? "Remaining" : "Overspent",
    amount: Math.abs(balance),
    color: balance >= 0 ? "lightgreen" : "salmon",
  });

  drawTable(rows, salary);

  const result = document.getElementById("result");
  result.textContent = `Net Balance: ${amount} (${
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
        <td><span id=currency"></span>${(row.amount)}</td>
        <td>
          <div class="bar-track">
            <div class="bar-fill" style="width: ${barWidth}%; background-color: ${row.color};"></div>
            <span class="bar-text">${percent.toFixed(1)}%</span>         
          </div>
        </td>
      </tr>  
    `;
  }
  tbody.innerHTML = html;
}

