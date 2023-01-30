import './css/styles.css';
import API from './fetchCountries.js';
import debounce from 'lodash.debounce';
import notiflix from 'notiflix';

const input = document.getElementById('search-box')
const listEl = document.querySelector('.country-list')
const infoEl = document.querySelector('.country-info')

const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(function (e) {
  e.preventDefault()
  const inputValue = e.target.value.trim();


  API.fetchCountries(inputValue)
  .then((countries) => {
  
    if (countries.length === 404) { 
      Notiflix.Notify.failure("Oops, there is no country with that name")

    } else if(countries.length > 10){
      Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")

    } else if(countries.length >= 2 && countries.length <= 10){
      return countries.reduce((markup, country) => 
      markupCountryList(country) + markup,
      ""
      )}  else if (countries.length === 1){
    return countries.reduce((markup, country) =>
    markupCountryInfo(country),
      ""
      )}
      
  }).then(updateList)
  .then(updateInfo) 
  
}, DEBOUNCE_DELAY)
)



function markupCountryList({name, flags, capital}){
  return `
  <h2>Country: ${name}</h2>
  <img src=${flags.svg} alt=":${name} width="70" heigth="100>
  <p>Capital: ${capital}</p>
  `
}

function updateList(markup){
  document.querySelector('.country-list').innerHTML = markup;
}

function markupCountryInfo({name, flags, capital, languages, population}){
  const lang = languages.map(lang => lang.name).join(", ")

  return `
  <h2>Country: ${name}</h2>
  <img src=${flags.svg} alt=":${name}" width="70" heigth="100">
  <p>Capital: ${capital}</p>
  <p>Languages: ${lang}</p>
  <p>Population: ${population}</p>
  `
}

function updateInfo(markup){
  document.querySelector('.country-info').innerHTML = markup;
}




//.then(updateInfo) // (abo .then((markup)=>updateInfo(markup)) (te same))