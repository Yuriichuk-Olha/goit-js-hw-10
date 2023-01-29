//const ENDPOINT = ""

function fetchCountries(name){
   return fetch(`https://restcountries.com/v2/name/${name}?fields=name,flags,capital,languages,population`)
  .then((response) => {
    return response.json();
  })
//   .then((country) => {
//     console.log(country);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
//     console.log(name);
}
export default {fetchCountries};