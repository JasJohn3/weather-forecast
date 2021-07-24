let apiKey ='9c4fb1938de2911a2efa8d463ac83a48'
let searchSubmit = document.getElementById('submit-search');
// api.openweathermap.org/data/2.5/weather?q=Phoenix&units=imperial&appid=9c4fb1938de2911a2efa8d463ac83a48
console.log(apiKey);
console.log(searchSubmit);
function openweatherFetchRequest(e){
  e.preventDefault();
  let search = document.getElementById('search');
  let searchValue = search.value;
  localStorageHistory(searchValue);
  let fetchAPIURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=imperial&appid=${apiKey}`
  
  fetch(fetchAPIURL)
  .then(response => response.json())
  .then(data => { recipeResponse(data);
   
  })
  .catch(err =>err);
}
recipeResponse=(data)=>{
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
  console.log(uniqueHistory);
  searchHistoryUL = document.getElementById('search-history');
  searchHistoryUL.innerHTML ='';
  uniqueHistory.forEach(item =>{
    console.log(item);
    liEl = document.createElement('li');
    liEl.classList.add("list-group-item");
    liEl.classList.add('text-dark');
    console.log(liEl)
    // liEl.className("list-group-item text-dark");
    liEl.textContent =item;
    searchHistoryUL.append(liEl);
  });
}
loadLocalHistory=()=>{
  let localHistory =JSON.parse(localStorage.getItem('city'))||[];
  createSearchHistoryEl(localHistory);
};
loadLocalHistory();
searchSubmit.addEventListener('click',openweatherFetchRequest);