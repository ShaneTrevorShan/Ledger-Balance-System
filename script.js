//Ledger Balance System  // replace /* to //                         */

import { User } from './user.js'; //change to import

const person = new User("Muhamad Abu Bakar", "Bin Rashid"); //switch places for firstName and lastName

const greeting = document.getElementById("greeting");
greeting.textContent = `Welcome, ${person.fullname}!`;  //remove ?.lastName

const expenses = ["food", "rent", "others", "saving"];

function calculate() {
  const salary = Number(document.getElementById("salary").value) || 0;

  let total = 0;
  for (let i = 0; i < expenses.length; i++) {
    const val = Number(document.getElementById(expenses[i]).value) || 0;
    total += val;
  }

  const balance = salary - total;
  const percent = (balance / salary) * 100;

  const result = document.getElementById("result");
  result.textContent = `Net Balance: $${balance} (${
    percent.toFixed(1) + '%'
  } of income)`;

  result.style.backgroundColor = balance >= 0 ? "#d4edda" : "#f8d7da";
  result.style.color = balance >= 0 ? "#155724" : "#721c24";
}
document.getElementById("calc-btn").addEventListener("click", calculate); //add event listener for calculate button in index.html