let apiKey ='9c4fb1938de2911a2efa8d463ac83a48'
let searchSubmit = document.getElementById('submit-search');
// Current Weather
// api.openweathermap.org/data/2.5/weather?q=Phoenix&units=imperial&appid=9c4fb1938de2911a2efa8d463ac83a48
// 5 Day Forecast
// https://api.openweathermap.org/data/2.5/forecast?q=phoenix&appid=9c4fb1938de2911a2efa8d463ac83a48&cnt=5&units=imperial
function createCurrentWeatherCard(city,wx,img,unixdate,temp,humidity,wind){
  let date = moment.unix(unixdate).format('LL');
  let cardContainer = document.getElementById('current-weather-wrapper');
  cardContainer.innerHTML ='';
  let card =`
  <h2>Current Weather</h2>
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
      </ul>
    </div>
  </div>
  `;
  cardContainer.innerHTML=card;
  console.log(cardContainer);
}
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
  //city
  let pcity =data.name;
  console.log(pcity);
  // wx
  let pwx = data.weather[0].description;
  console.log(pwx);
  // img
  let pimg = data.weather[0].icon;
  console.log(pimg);
  //unixdate
  let punixdate =data.dt;
  console.log(punixdate);
  //temp
  let ptemp = data.main.temp;
  console.log(ptemp);
  //humidity
  let phumidity =data.main.humidity;
  console.log(phumidity);
  //wind
  let pwind = data.wind.speed;
  console.log(pwind);
  createCurrentWeatherCard(pcity,pwx,pimg,punixdate,ptemp,phumidity,pwind);
}

function container(city,wx,img,unixdate){
  console.log(city);
  console.log(wx);
  console.log(img);
  let date = moment(unixdate).unix();
  console.log(date);

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
  let cardContainer = document.getElementById('forecast-card-wrapper');
  cardContainer.innerHTML ='';
  let dataArr =data.list;
  dataArr.forEach(item =>{
   let div= document.createElement('div');
   div.classList.add('col-md-5');
   div.classList.add('my-3');
    //unixdate
    let punixdate =item.dt;
    console.log(punixdate);
    // wx
    let pwx = item.weather[0].description;
    console.log(pwx);
    // img
    let pimg = item.weather[0].icon;
    console.log(pimg);
    //temp
    let ptemp = item.main.temp;
    console.log(ptemp);
    //humidity
    let phumidity =item.main.humidity;
    console.log(phumidity);
    //wind
    let pwind = item.wind.speed;
    console.log(pwind);
    div.innerHTML = createForecastWeatherCard(punixdate,pwx,pimg,ptemp,phumidity,pwind);
    cardContainer.append(div);
  });
}
function createForecastWeatherCard(unixdate,wx,img,temp,humidity,wind){
let date = moment.unix(unixdate).format('LL');
let card = `
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
`;
  return card;
}
loadLocalHistory();
searchSubmit.addEventListener('click',openweatherFetchRequest);