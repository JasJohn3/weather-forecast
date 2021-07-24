let apiKey ='9c4fb1938de2911a2efa8d463ac83a48'
let searchSubmit = document.getElementById('submit-search');
// Current Weather
// api.openweathermap.org/data/2.5/weather?q=Phoenix&units=imperial&appid=9c4fb1938de2911a2efa8d463ac83a48
// 5 Day Forecast
// https://api.openweathermap.org/data/2.5/forecast?q=phoenix&appid=9c4fb1938de2911a2efa8d463ac83a48&cnt=5&units=imperial
function openweatherFetchRequest(e){
  e.preventDefault();
  let search = document.getElementById('search');
  let searchValue = search.value;
  localStorageHistory(searchValue);
  let fetchAPIURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=imperial&appid=${apiKey}`
  fetchForecast(searchValue);
  fetch(fetchAPIURL)
  .then(response => response.json())
  .then(data => { 
    parseCurrentWeather(data);
  })
  .catch(err =>err);
}
parseCurrentWeather=(data)=>{
  console.log(data); 
}
createCurrentWeatherCard=(city,wx,img, unixdate,temp,humidity,wind,uv)=>{
let date = moment().unix(unixdate);
date = date.format('MMMM Do YYYY');
let card =`
<div class="card bg-white text-dark border border-success">
  <div class="card-body">          
    <ul class="list-group list-group-flush">
      <li class="list-group-item text-dark">
        <h5 class="card-title float-left">${city}</h5>         
      </li>
      <li class="list-group-item text-dark">
        <span class="d-inline-block float-left">
        <p>Weather:</p> 
        <p class="badge badge-success">
        ${wx}
        </p> 
        </span>
          <img class="w-25 float-right bg-primary" src="http://openweathermap.org/img/wn/${img}.png" alt="Card image cap">
      </li>
      <li class="list-group-item text-dark">
        <h6 class="card-subtitle text-muted">Date: 
          <span class="float-right">${date}</span>
        </h6>
      </li>
      <li class="list-group-item text-dark">Temp: 
        <span class="float-right">${temp} &#8457;</span>
      </li>
      <li class="list-group-item text-dark">Humidity: 
        <span class="float-right">${humidity}%</span>
      </li>
      <li class="list-group-item text-dark">Wind: 
        <span class="float-right">${wind} MPH
        </span>
      </li>
      <li class="list-group-item text-dark">UV Index: <span class="badge badge-success float-right">${uv}</span></li>
    </ul>
  </div>
</div>
`;
}
localStorageHistory =(store_data)=>{
  // Local Storage Steps
  let localHistory =JSON.parse(localStorage.getItem('city'))||[];
  localHistory.push(store_data);
  localStorage.setItem('city',JSON.stringify(localHistory));
  createSearchHistoryEl(localHistory);
  // Local Storage Steps
}
createSearchHistoryEl=(localHistory)=>{
  let uniqueHistory = [...new Set(localHistory)];
  uniqueHistory.splice(10);
  searchHistoryUL = document.getElementById('search-history');
  searchHistoryUL.innerHTML ='';
  uniqueHistory.forEach(item =>{
    liEl = document.createElement('li');
    liEl.classList.add("list-group-item");
    liEl.classList.add('text-dark');
    // liEl.className("list-group-item text-dark");
    liEl.textContent =item;
    searchHistoryUL.append(liEl);
  });
}
loadLocalHistory=()=>{
  let localHistory =JSON.parse(localStorage.getItem('city'))||[];
  createSearchHistoryEl(localHistory);
};
fetchForecast=(city)=>{
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&cnt=5&units=imperial`)
  .then(response => response.json())
  .then(data =>{
    parseForecastData(data);
  })
  .catch(err => console.log(err));
}
parseForecastData=(data)=>{
  console.log(data.list);
}
createForecastWeatherCard=(unixdate,wx,img,temp,humidity,wind)=>{
let date = moment().unix(unixdate);
date = date.format('MMMM Do YYYY');
let card = `
  <div class="col-md-5 my-3">
    <div class="card bg-white text-dark border border-success">
        <div class="card-body">  
          <ul class="list-group list-group-flush">
            <li class="list-group-item text-dark">
              <h6 class="card-title float-left">${date}</h6>
            </li>
            <li class="list-group-item text-dark">
              <span class="d-inline-block float-left">
              <p>Weather:</p> 
              <p class="badge badge-success">${wx}</p> 
              </span>
                <img class="w-25 float-right bg-primary" src="http://openweathermap.org/img/wn/${img}.png" alt="Card image cap">
            </li>
            <li class="list-group-item text-dark">Temp: 
              <span class="float-right">${temp} &#8457;</span>
            </li>
            <li class="list-group-item text-dark">Humidity: 
              <span class="float-right">${humidity}%</span>
            </li>
            <li class="list-group-item text-dark">Wind: 
              <span class="float-right">${wind} MPH
              </span>
            </li>
        </div>
      </div>
  </div>
`;
}
loadLocalHistory();
searchSubmit.addEventListener('click',openweatherFetchRequest);