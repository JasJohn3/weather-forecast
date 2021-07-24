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
  .then(data => { currentWeatheResponse(data);
   
  })
  .catch(err =>err);
}
currentWeatheResponse=(data)=>{
  console.log(data); 
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
loadLocalHistory();
searchSubmit.addEventListener('click',openweatherFetchRequest);