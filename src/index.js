import './css/styles.css';
import API from './fetchCountries.js';
import Lobash from "lodash.debounce";
import Notiflix from "notiflix";

const input = document.getElementById('search-box')
const listEl = document.querySelector('.country-list')
const infoEl = document.querySelector('.country-info')

const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(function (e) {
  e.preventDefault()
  const inputValue = e.target.value.trim();
  console.log(inputValue);

  API.fetchCountries(inputValue)
  .then((countries) => {
    if (countries.length === 0) { 
    Error("Oops, there is no country with that name")
    }
  else if(countries.length >= 2 && countries.length <= 10){
    return countries.map(country => markupCountryList(country))
    .then(updateList)
  }
  else if(countries.length === 1){
  return countries.map(country => markupCountryInfo(country))
  .then(updateInfo)
  }
  //.finally(()=>input.reset())
  })
},DEBOUNCE_DELAY)
)

function markupCountryList({name,flags,capital}){
  return `<li>
  <img src=${flags.svg} alt=":${name}>
  <p>Capital: ${capital}</p>
  </li>`
}

function updateList(markup){
  document.querySelector('.country-list').innerHTML = markup;
}

function markupCountryInfo({name,flags,capital,languages,population}){
  return `<li>${name}
  <img src=${flags.svg} alt=":${name}">
  <p>Capital: ${capital}</p>
  <p>Languages: ${languages}</p>
  <p>Population: ${population}</p>
  </li>`
}

function updateInfo(markup){
  document.querySelector('.country-info').innerHTML = markup;
}

