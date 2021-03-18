// DOM Objects
const mainScreen = document.querySelector('.main-screen');
const pokeName = document.querySelector('.poke-name');
const pokeId = document.querySelector('.poke-id');
const pokeFrontImage = document.querySelector('.poke-front-image');
const pokeBackImage = document.querySelector('.poke-back-image');
const pokeTypeOne = document.querySelector('.poke-type-one');
const pokeTypeTwo = document.querySelector('.poke-type-two');
const pokeWeight = document.querySelector('.poke-weight');
const pokeHeight = document.querySelector('.poke-height');
const pokeListItems = document.querySelectorAll('.list-item');
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');

// Constants and variables
const TYPES = [
    'normal', 'fighting', 'flying',
    'poison', 'ground', 'rock',
    'bug', 'ghost', 'steel',
    'fire', 'water', 'grass', 
    'electric', 'psychic', 'ice',
    'dragon', 'dark', 'fairy'
];
let prevUrl = null;
let nextUrl = null;


// Functions
const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

const resetScreen = () => {
    mainScreen.classList.remove('hide');
    for(const type of TYPES) {
        mainScreen.classList.remove(type);   
    }
}

const fetchPokeScreen = (url) => {
    // Get data for left side of screen
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);

        resetScreen();
        // Types traitments
        const dataTypes = data['types'];
        const dataFirstType = dataTypes[0];
        const dataSecondType = dataTypes[1];
        pokeTypeOne.textContent = capitalize(dataFirstType['type']['name']);
        // If dataSecondType === true 
        if (dataSecondType) {
            pokeTypeTwo.classList.remove('hide');
            pokeTypeTwo.textContent = capitalize(dataSecondType['type']['name']);
        } else {
            pokeTypeTwo.classList.add('hide');
            pokeTypeTwo.textContent = '';
        }
        mainScreen.classList.add(dataFirstType['type']['name']);

        pokeName.textContent = capitalize(data['name']);
        pokeId.textContent = '#' + data['id'].toString().padStart(3, '0');
        pokeWeight.textContent = data['weight'];
        pokeHeight.textContent = data['height'];
        
        // Images traitment
        pokeFrontImage.src = data['sprites']['front_default'] || '';
        pokeBackImage.src = data['sprites']['back_default'] || '';
    })
}

const fetchPokeList = url => {  
    // Get data for rigth side of screen
    fetch(url)
    .then(res => res.json())
    .then(data => {
        // Destructuring: const results = data['results'] <=> const {results} = data
        const { results, previous, next } = data;
        prevUrl = previous;
        nextUrl = next;
        for(let i = 0; i < pokeListItems.length; i++) {
            const pokeListItem = pokeListItems[i];
            const resultData = results[i];
            
            if (resultData) {
                // const name = resultData['name'];
                const { name, url } = resultData;
                const urlArray = url.split('/');
                const id = urlArray[urlArray.length - 2]; 
                pokeListItem.textContent = id.padStart(3, '0') + '. ' + capitalize(name);
            } else {
                
            }
        }
    })
}

const handleRightButtonClick = () => {
    if (nextUrl) {
        fetchPokeList(nextUrl);
    }
}

const handleLeftButtonClick = () => {
    if (prevUrl) {
        fetchPokeList(prevUrl);
    }
}

const printPokemon = e => {
    if (!e.target) return;
        let pokeArray = e.target.textContent.split('');
        let pokeStr = pokeArray.slice(5, pokeArray.length).join('');
        pokeStr = pokeStr[0].toLowerCase() + pokeStr.substr(1);
        let newURL = 'https://pokeapi.co/api/v2/pokemon/' + pokeStr;
        fetchPokeScreen(newURL);
}

// Event Listeners
leftButton.addEventListener('click', handleLeftButtonClick);
rightButton.addEventListener('click', handleRightButtonClick);

pokeListItems.forEach(item => {
    item.addEventListener('click', printPokemon);
})

// Initialize app
fetchPokeList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');