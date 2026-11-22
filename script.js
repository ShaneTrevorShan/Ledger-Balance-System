//Ledger Balance System  // replace /* to //                         */

import { User } from './user.js'; //change to import

const person = new User("Muhamad Abu Bakar", "Bin Rashid"); //switch places for firstName and lastName

const greeting = document.getElementById("greeting");
greeting.textContent = `Welcome, ${person.fullname}!`;  //remove ?.lastName

const expenses = ["food", "rent", "others", "saving"];

//BLOCK unwanted characters and negative numbers
const formInputs = document.querySelectorAll(".form input");

function clearResult(){ //CLEARS results box color after displaying a result
  const result = document.getElementById("result");
  result.style.backgroundColor = "";
  result.style.color = "";
}

formInputs.forEach((input) => {
  input.addEventListener("keydown", (event) => {
    if (["-", "+", "e", "E"].includes(event.key)) event.preventDefault(result.textContent = "Please enter a valid  number.");   
    clearResult();
  });
})

function calculate() {
  const salary = Math.max(0, Number(document.getElementById("salary").value) || 0);  //MATH.max(0, x) returns number that are larger 

  let total = 0;
  for (let i = 0; i < expenses.length; i++) {
    const val = Math.max(0, Number(document.getElementById(expenses[i]).value) || 0);  //ADD Math.max(0, x) to prevent negative number
    total += val;
  }

  const balance = salary - total;
  const percent = salary < 0 ? (balance / salary) * 100 : 0;  //IF salary is 0, prevent percent from -NaN or -infinity
  const amount = balance < 0 ? `-RM${Math.abs(balance)}` : `RM${balance}`;  //SHOW minus sign after RM. Math.abs removes minus from number
  
  const result = document.getElementById("result");
  result.textContent = `Net Balance: ${amount} (${percent.toFixed(2) + '%'} of income)`; //CHANGE balance to amount, toFixed(1) to toFixed(2)

  result.style.backgroundColor = balance >= 0 ? "#d4edda" : "#f8d7da";
  result.style.color = balance >= 0 ? "#155724" : "#721c24";
}
document.getElementById("calc-btn").addEventListener("click", calculate); //add event listener for calculate button in index.html

