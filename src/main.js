import "./input.css"

const pokemonList = document.querySelector(".pokedex-list");
const btnMenuMobile = document.querySelector(".menu__btn-mobile");
btnMenuMobile.addEventListener("click", (e) => {
  e.currentTarget.classList.toggle("active")
})

const limit = 20;
let offset = 0;
let arrTypes = [];

class Pokemon {
  number;
  name;
  image;
  type;
  types = [];
}

const convertDetailsToModelPokemon = (detail) => {
  const pokemon = new Pokemon();
  pokemon.name = detail.name;
  pokemon.number = detail.id;
  pokemon.image = detail.sprites.other.dream_world.front_default;

  const types = detail.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;
  
  return pokemon;
}

const getDetails = async (pokemon) => {
  const response = await fetch(pokemon.url);
  const data = await response.json();
  const modelPokemon = convertDetailsToModelPokemon(data);
  return modelPokemon;
}

const getPokemons = async (offset, limit) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  const data = await response.json();
  const pokemons = await data.results;
  const details = await pokemons.map(getDetails);
  const detailsRequest = Promise.all(details);

  return detailsRequest;
}

getPokemons(offset, limit).then((pokemonsDetails) => {
  console.log(pokemonsDetails);
})

function leftFillNum(num, targetLength) {
  return num.toString().padStart(targetLength, "0");
}


const convertPokemonToCard = (pokemon) => {
  return `
    <li class="card">
      <div class="card__image ${pokemon.type}">
        <img src="${pokemon.image}" alt="Poke">
        <div class="effect__image">
          <img src="../icons-type/${pokemon.type}.svg" alt="${pokemon.type}">
        </div>
      </div>
      <div class="card__details">
        <div class="card__info">
          <span class="card__number">n.º ${leftFillNum(pokemon.number, 3)}</span>
          <span class="card__name"> ${pokemon.name}</span>
        </div>
        <div class="card__types">
        ${pokemon.types.map((type) => `
        <span class="type ${type}">
          <img src="icons-type/${type}.svg" alt="">
          ${type}
        </span>`).join("")}
          
        </div>
      </div>
    </li>
  `
}

function loadPokemonItens(offset, limit) {
  getPokemons(offset, limit).then((pokemons = []) => {
      const newHtml = pokemons.map(convertPokemonToCard).join('')
      pokemonList.innerHTML += newHtml;
  })
}

loadPokemonItens(offset, limit)




