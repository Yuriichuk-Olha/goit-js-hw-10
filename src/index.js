import './css/styles.css';
import API from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const input = document.getElementById('search-box')
const listEl = document.querySelector('.country-list')
const infoEl = document.querySelector('.country-info')
const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(function (e) {
  e.preventDefault()
  const inputValue = e.target.value.trim();

clear();

  API.fetchCountries(inputValue)
  .then((countries) =>  {
  
    if (countries.length === 0) { 
      Notiflix.Notify.failure("Oops, there is no country with that name");
    } 

    if(countries.length > 10){
      Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    }

    if(countries.length >= 2 && countries.length <= 10){
      const markup = countries.map(country => markupCountryList(country)).join("")
      listEl.innerHTML = markup;
    
    }  
      if (countries.length === 1){
        const markup = countries.map(country => markupCountryInfo(country)).join("")
        infoEl.innerHTML = markup;
      
    }
    
}, DEBOUNCE_DELAY)
}
));

function markupCountryList({name, flags, capital}){

  return  `<li>
  <h2>Country: ${name.official}</h2>
  <img src="${flags.svg}" alt="${name.official}" width="70" heigth="50">
  <p>Capital: ${capital}</p>
  </li>`
};

function markupCountryInfo({name, flags, capital, languages, population}){

  return `<li>
  <h2>Country: ${name.official}</h2>
  <img src="${flags.svg}" alt="${name.official}" width="70" heigth="50">
  <p>Capital: ${capital}</p>
  <p>Languages: ${Object.values(languages)}</p>
  <p>Population: ${population}</p>
  </li>`
};

function clear(){
  listEl.innerHTML = "";
  infoEl.innerHTML = "";
};







//.then(updateInfo) // (abo .then((markup)=>updateInfo(markup)) (te same)