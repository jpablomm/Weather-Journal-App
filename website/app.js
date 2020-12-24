// const { response } = require("express");

/* Global Variables */
const base_url = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const rest_url = '&appid=';
const api_key = '5d10671a156bc50f016005850c1b873a&units=metric';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Requesting data, posting it and updating UI
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const newZipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getTemperature(base_url, newZipCode, api_key).then((data)=> {
        postData('/otro', {date: newDate, temp: data.main.temp, feelings: feelings});
        updateUI();
    });
};

// GET request
const getTemperature= async (url, zipcode, key) => {
    const newURL = url + zipcode + rest_url + key;
    const res = await fetch(newURL);
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.log("error", error);
    }
}

// POST request of temperature, date, and user input
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log("error", error)
    }
}

const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        let index = allData.length - 1;
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.feelings;
    } catch(error) {
        console.log("Error", error);
    }
}