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
  const percent = salary < 0 ? (balance / salary) * 100 : 0;  //if salary is 0, prevent percent from -NaN or -infinity
  const amount = balance < 0 ? `-RM${Math.abs(balance)}` : `RM${balance}`;  //show minus sign after RM. Math.abs removes minus from number
  
  const result = document.getElementById("result");
  result.textContent = `Net Balance: ${amount} (${percent.toFixed(2) + '%'} of income)`; //change balance to amount, toFixed(1) to toFixed(2)

  result.style.backgroundColor = balance >= 0 ? "#d4edda" : "#f8d7da";
  result.style.color = balance >= 0 ? "#155724" : "#721c24";
}
document.getElementById("calc-btn").addEventListener("click", calculate); //add event listener for calculate button in index.html