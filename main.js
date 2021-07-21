const ts = 1;
const publicKey = "20196e6178ba2bbf91573b078209a06f";
// hash = ts + privateKey + publicKey => md5 generator
const hash = "e2458a9cf1c7e839361b093d7ec79552";

// Carrusel con series //////////////

let seriesHtml = "";
let offsetSe = parseInt(Math.random()*(53-0)-0);
const urlSeries = `http://gateway.marvel.com/v1/public/events?ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${offsetSe}`;
let series = document.getElementById("series");
fetch(urlSeries)
.then(response => response.json())
.then(response => {
    response.data.results.forEach(series => {
        let seriesDescription;
        let string = series.description;
        seriesDescription = string;
        if(string.length > 200){
           seriesDescription = string.slice(0,199).concat("...");
        }
        seriesHtml += `
        <div class="series-div-img">
            <img class="series-img" src="${series.thumbnail.path}.${series.thumbnail.extension}" alt="${series.title}">
            <a href="${series.urls[0].url}" target="_blank">
                <div class="series-title">
                    <h2 class="series-h2">${series.title}</h2>
                    <p class="series-p">${seriesDescription}</p>
                </div>
            </a>
        </div>
        `;
       
    });
    series.innerHTML = seriesHtml;
})
.catch(series.innerHTML = "");

// Funcion de flechas izquierda y derecha //////////////

const flechaIzq = document.getElementById("flecha-izq");
const flechaDer = document.getElementById("flecha-der");

flechaDer.addEventListener("click", () => {
    series.scrollLeft +=series.offsetWidth;
});
flechaIzq.addEventListener("click", () => {
    series.scrollLeft -=series.offsetWidth;
});


// heroes //////////

const search = document.getElementById("search");
const pj = document.getElementById("pj");
const results = document.getElementById("results");
const searchHero = nombreHeroe => {
    heroe = encodeURIComponent(nombreHeroe);
    const urlPj = `http://gateway.marvel.com/v1/public/characters?name=${heroe}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    let pjHtml = "";
    fetch(urlPj)
    .then(response => response.json())
    .then(response => {
        response.data.results.forEach(personaje => {
            pjHtml += `
            <div class="pj-container-img">
                <img class="pj-img" src="${personaje.thumbnail.path}.${personaje.thumbnail.extension}" alt="${personaje.name}">
            </div>
            <div class="pj-info">
                <h2>${personaje.name}</h2>
                <p>${personaje.description}</p>
                <a href="${personaje.urls[0].url}" target="_blank" target="_blank">Ver Mas!</a>
            </div>
            `;
        });
        pj.innerHTML = pjHtml;
    })
    .catch(pj.innerHTML = "");      
}
        
search.addEventListener("keyup",(e)=>{
    if(e.keyCode === 13){
        searchHero(e.target.value.trim())
        search.value = "";
    }
});

let charactersHtml = "";
// Datos totales 1493

let offsetCha = parseInt(Math.random()*(1473-0)-0);
const urlCharacters = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${offsetCha}`;
let characters = document.getElementById("characters");
fetch(urlCharacters)
.then(response => response.json())
.then(response => {
    response.data.results.forEach(hero => {
        charactersHtml += `
        <div class="characters-div-img">
            <a href="${hero.urls[0].url}" target="_blank" target="_blank">
                <img class="characters-heroe-img" src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}">
            </a>
            <div class="characters-heroe-nombre">
                <p>${hero.name}</p>
            </div>
        </div>
        `;
    });
    characters.innerHTML = charactersHtml;
})
.catch(characters.innerHTML = "");

// Desaparecer y aparecer barra de navegacion ////////////////////////////

const header = document.querySelector("header");
let lastScroll = 0;
window.addEventListener("scroll", barra)

function barra(){
    const currentScroll = window.pageYOffset;
    if(currentScroll > lastScroll){
        header.classList.add("desaparecer");
    }else{
        header.classList.remove("desaparecer");
    }
    lastScroll = currentScroll;
};

const headerBarra = document.getElementsByClassName("header-barra-elements");
for(let i = 0; i < headerBarra.length; i++){
    headerBarra[i].addEventListener("click",()=>{
        header.classList.add("desaparecer");
        window.removeEventListener("scroll", barra);
        setTimeout(()=>{
            window.addEventListener("scroll", barra) 
        },500)
    });
}