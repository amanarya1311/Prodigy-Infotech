async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = `<p class="weather-info">Please enter a city name.</p>`;
    return;
  }

  const apiKey = "21f54ecf758c5a9a59b5405acd82ef3b";
 const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    const icon = data.weather[0].icon;
    const desc = data.weather[0].description;
    const temp = data.main.temp;
    const humidity = data.main.humidity;

    resultDiv.innerHTML = `
      <div class="weather-info">
        <h2>${data.name}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" />
        <p><strong>${desc.toUpperCase()}</strong></p>
        <p>🌡️ Temperature: ${temp}°C</p>
        <p>💧 Humidity: ${humidity}%</p>
      </div>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p class="weather-info">Error: ${error.message}</p>`;
  }
}
