async function getWeather(city) {
  try {
    const url = `https://weather-proxy.freecodecamp.rocks/api/city/${encodeURIComponent(city)}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Network error: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error(err); // ✅ required
    return null;
  }
}

async function showWeather(city) {
  const data = await getWeather(city);

  if (!data) {
    alert("Something went wrong, please try again later.");
    return;
  }

  document.getElementById("weather-display").classList.remove("hidden");

  document.getElementById("location").textContent = data.name || "N/A";
  document.getElementById("weather-icon").src = data.weather?.[0]?.icon || "";
  document.getElementById("weather-main").textContent = data.weather?.[0]?.main || "N/A";
  document.getElementById("main-temperature").textContent = data.main?.temp ?? "N/A";
  document.getElementById("feels-like").textContent = data.main?.feels_like ?? "N/A";
  document.getElementById("humidity").textContent = data.main?.humidity ?? "N/A";
  document.getElementById("wind").textContent = data.wind?.speed ?? "N/A";
  document.getElementById("wind-gust").textContent = data.wind?.gust ?? "N/A";
}

document.getElementById("get-weather-btn").addEventListener("click", () => {
  const city = document.getElementById("city-select").value;
  if (!city) return; // Do nothing if no city
  showWeather(city);
});
