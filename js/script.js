'use strict'

//Determine the day of the week.
const weekday = ["mon", "tue", "wed", "fri", "sat", "sun"];
const d = new Date();
let day = weekday[d.getDay()];

fetch("data.json")
.then(data => data.json())
.then(data => {
    let jsonData = data;

    //Collect all the spending amounts in an array.
    const amountArray = [];

    jsonData.forEach(week => amountArray.push(week.amount));

    //Determine the highest spending amount.
    let maxAmount = Math.max(...amountArray);

    //Set the height of the bars based on the spending amounts in comparison with the max amount in %
    jsonData.forEach(week => document.querySelector(`.${week.day}`).style.height = `${(week.amount / maxAmount) * 100}%`);

    //Find the current day of the week and change the background color of the bar of that day.
    const found = jsonData.find(week => week.day === day);
    
    //Give the bar of the current day of the week an ID of "current__day" 
    document.querySelector(`.${found.day}`).setAttribute("id", "current__day");

    //Show the spending amount in the hover bars
    jsonData.forEach(week => document.querySelector(`.${week.day}__hidden`).textContent = `$${week.amount}`);
})

