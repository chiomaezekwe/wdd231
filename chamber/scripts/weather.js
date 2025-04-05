document.addEventListener("DOMContentLoaded", function () {

    // Select HTML Elements in The Document
    const myCity = document.querySelector("#city");
    const myDescription = document.querySelector("#description");
    const myGraphic = document.querySelector("#graphic");
    const myTemperature = document.querySelector("#temperature");
    const myHighTemperature = document.querySelector("#high-temp");
    const myLowTemperature = document.querySelector("#low-temp");
    const myHumidity = document.querySelector("#humidity");
    const mySunrise = document.querySelector("#sunrise");
    const mySunset = document.querySelector("#sunset");
    const forecastContainer = document.querySelector(".forecast");

    // Weather API Information
    const myKey = "769ec278cfe5b39ed57d64fd27dcc796";
    const myLat = "6.452629968088259";
    const myLong = "3.387964698518249";

    const myURL = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&units=metric&appid=${myKey}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&units=metric&appid=${myKey}`;

    async function apiFetch() {
        try {
            const response = await fetch(myURL);
            if (response.ok) {
                const data = await response.json();
                displayResults(data);
            } else {
                throw Error(await response.text());
            }
        } catch (error) {
            console.log(error);
        }
    }

    function displayResults(data) {
        myCity.innerHTML = data.name;
        myDescription.innerHTML = data.weather[0].description;
        myTemperature.innerHTML = Math.round(data.main.temp);
        const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        myGraphic.setAttribute('SRC', iconsrc);
        myGraphic.setAttribute('alt', data.weather[0].description);

        myHighTemperature.innerHTML = Math.round(data.main.temp_max);
        myLowTemperature.innerHTML = Math.round(data.main.temp_min);
        myHumidity.innerHTML = data.main.humidity;

        const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
        const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

        mySunrise.innerHTML = sunriseTime;
        mySunset.innerHTML = sunsetTime;

        myGraphic.style.width = "45px";
        myGraphic.style.height = "auto";
    }

    async function fetchForecast() {
        try {
            const response = await fetch(forecastURL);
            if (response.ok) {
                const data = await response.json();
                displayForecast(data);
            } else {
                throw new Error("Failed to fetch forecast data");
            }
        } catch (error) {
            console.error("Error fetching forecast:", error);
        }
    }

    function displayForecast(data) {
        const forecastDays = {};
        const today = new Date();

        data.list.forEach((item) => {
            const date = new Date(item.dt * 1000);
            const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

            if (date > today && !forecastDays[dayName]) {
                forecastDays[dayName] = {
                    tempMax: item.main.temp_max,
                    icon: item.weather[0].icon,
                };
            } else if (forecastDays[dayName]) {
                forecastDays[dayName].tempMax = Math.max(forecastDays[dayName].tempMax, item.main.temp_max);
            }
        });

        Object.keys(forecastDays).slice(0, 3).forEach((day) => {
            const dayData = forecastDays[day];
            const dayDiv = document.createElement("div");
            dayDiv.classList.add("forecast-day");

            const iconSrc = `https://openweathermap.org/img/wn/${dayData.icon}.png`;

            dayDiv.innerHTML = `
                <p><strong>${day}:</strong> <img src="${iconSrc}" alt="Weather icon"> ${Math.round(dayData.tempMax)}°C</p>
            `;
            forecastContainer.appendChild(dayDiv);
        });
    }

    apiFetch();
    fetchForecast();
});
