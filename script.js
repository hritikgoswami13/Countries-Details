'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

////////////////////////////////////////
const renderCountry = function(data, className =""){
  
  const html =`
  <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} millions people</p>
              <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
              <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
          </article>
  
      
`;
countriesContainer.insertAdjacentHTML("beforeend",html);
countriesContainer.style.opacity=1;

};

const rederError = function(msg){

  countriesContainer.insertAdjacentText("beforeend", msg);
  countriesContainer.style.opacity=1;
}

const getPosition = function(){
  return new Promise( function( resolve, reject){
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

const whereAmI = async function(){
 try{  
  const pos = await getPosition();
  const {latitude : lat, longitude: lng} = pos.coords;

  const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth`)

  if(!resGeo.ok) throw new Error("problem getting location data")

  const dataGeo  = await resGeo.json();
 

  const res = await fetch (`https://restcountries.com/v2/name/${dataGeo.country}?fullText=true`)

  if(!res.ok) throw new Error("cann't find the country")


  const data = await res.json()

  renderCountry(data[0])

  return `you are in ${dataGeo.city}, ${dataGeo.country}`

  } catch(err){
    console.error(`${err} 💥💥`)
    rederError(` something went wrong 💥 ${err.message} 💥💥💥`)
  }

  throw err;

};

const showResult = async function (){
    console.log("1 : will get the location")
    try{
      const city = await whereAmI();
      console.log(`2 : ${city }`)
    }catch{
      console.error( `2 : ${err.message} `)
    }
    console.log("3 : finished getting the location")
  };
btn.addEventListener("click", showResult);
