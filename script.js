const temperatureField = document.querySelector(".temp p");
const locationField = document.querySelector(".time_location p"); 
const dateandTimeField = document.querySelector(".time_location span");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");

form.addEventListener('submit', searchForLocation);

let target = 'Delhi';

const fetchResults = async (targetLocation) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=5a1b1ded28b447ecb81103320242107&q=${targetLocation}&aqi=no`;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        console.log(data);
        let locationName = data.location.name;
        let time = data.location.localtime;
        let temp = data.current.temp_c;
        let condition = data.current.condition.text;
        updateDetails(temp, locationName, time, condition);
    } catch (error) {
        console.error('Fetching data failed:', error);
        alert('Failed to fetch weather data. Please check the API key or the location.');
    }
};

function updateDetails(temp, locationName, time, condition) {
    temperatureField.innerText = `${temp}°C`;
    locationField.innerText = locationName;
    dateandTimeField.innerText = time;
    conditionField.innerText = condition;
}

function searchForLocation(e) {
    e.preventDefault();
    target = searchField.value;
    fetchResults(target);
}

// Initial fetch for default location
fetchResults(target);
