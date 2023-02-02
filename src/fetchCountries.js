

function fetchCountries(name){
  return fetch(`https://restcountries.com/v3/name/${name}?fields=name,flags,capital,languages,population`)
  
  .then((response) => {
    return response.json();
  })
}
export default {fetchCountries};