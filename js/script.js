const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const lightingSelector = document.querySelector('.white-light');
const pokemonType1 = document.querySelector('.pokemon__type_1');
const pokemonType2 = document.querySelector('.pokemon__type_2');
const pokemonAbilities1 = document.querySelector('.pokemon__abilitie_1');
const pokemonAbilities2 = document.querySelector('.pokemon__abilitie_2');
const pokemonAbilities3 = document.querySelector('.pokemon__abilitie_3');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonUp = document.querySelector('.btn-up');
const buttonDown = document.querySelector('.btn-down');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {    
        const data = await APIResponse.json();
        return data;
    }
    
}

const renderPokemon = async (pokemon) => {

    const data = await fetchPokemon(pokemon);

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    
    pokemonType1.innerHTML = '';
    pokemonType2.innerHTML = '';

    pokemonAbilities1.innerHTML = '-';
    pokemonAbilities2.innerHTML = '-';
    pokemonAbilities3.innerHTML = '-';

    if(data) {
        pokemonImage.style.display = 'block';
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonType1.innerHTML = data['types']['0']['type']['name'];
        pokemonType2.innerHTML = data['types']['1']['type']['name'];
        pokemonAbilities1.innerHTML = data['abilities']['0']['ability']['name'];
        pokemonAbilities2.innerHTML = data['abilities']['1']['ability']['name'];
        pokemonAbilities3.innerHTML = data['abilities']['2']['ability']['name'];
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :C';
        pokemonNumber.innerHTML = '';

        pokemonType1.innerHTML = '';
        pokemonType2.innerHTML = '';

        pokemonAbilities1.innerHTML = '';
        pokemonAbilities2.innerHTML = '';
        pokemonAbilities3.innerHTML = '';
    }   
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    input.value = '';
    lightingSelector.classList.add('active');
    setTimeout(() => {
        lightingSelector.classList.remove('active');
    }, 1000);

})

buttonUp.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon -=1;
        renderPokemon(searchPokemon);
        lightingSelector.classList.add('active');
        setTimeout(() => {
            lightingSelector.classList.remove('active');
        }, 1000);
    }
})

buttonDown.addEventListener('click', () => {
    searchPokemon +=1;
    renderPokemon(searchPokemon);
    lightingSelector.classList.add('active');
    setTimeout(() => {
        lightingSelector.classList.remove('active');
      }, 1000);
})

renderPokemon(searchPokemon);