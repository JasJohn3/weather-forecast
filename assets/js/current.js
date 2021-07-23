let apiKey ='9c4fb1938de2911a2efa8d463ac83a48'
let searchSubmit = document.getElementById('submit-search');
// api.openweathermap.org/data/2.5/weather?q=Phoenix&units=imperial&appid=9c4fb1938de2911a2efa8d463ac83a48
console.log(apiKey);
console.log(searchSubmit);
function openweatherFetchRequest(e){
  e.preventDefault();
  alert('Submit Button Pressed');
  let search = document.getElementById('search');
  let searchValue = search.value;
  console.log(searchValue);
  let fetchAPIURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=imperial&appid=${apiKey}`
  
  fetch(fetchAPIURL)
  .then(response => response.json())
  .then(data => {
   console.log(data); 
  })
  .catch(err =>err);
}
searchSubmit.addEventListener('click',openweatherFetchRequest);