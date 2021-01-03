const weartherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#loader");
const messageTwo = document.querySelector("#searched_content");

weartherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "loading...";
  messageTwo.textContent = "";

  fetch(`http://localhost:4000/weather?address=${location}`).then(
    (response) => {
      console.log(response)
      response.json().then((data) => {
        messageOne.textContent = "";
        if (data.error) {
          messageTwo.textContent = data.error;
        } else {
          let forecastData = data[0];
          messageOne.textContent = forecastData.address;

          messageTwo.textContent = `In ${forecastData.address} it is ${forecastData.forecast.weather_descriptions} today, It is currently ${forecastData.forecast.temperature} degress out, but it feels like ${forecastData.forecast.feelslike} degress`;
          console.log(data);
        }
      });
    }
  );
});
