  import "./input.css"

  const inputSearchByPokemon = document.querySelector("[ data-js='search-pokemon']")
  const inputSearchByType = document.querySelectorAll("input[type='checkbox']");
  const clearFilterButton = document.querySelector("#clearFilter");
  const filterTypeButton = document.querySelector("#filterTypeButton");

  let arrTypes = [];

  const pokemonList = document.querySelector(".pokedex-list");
  const btnMenuMobile = document.querySelector(".menu__btn-mobile");
  btnMenuMobile.addEventListener("click", (e) => {
    e.currentTarget.classList.toggle("active")
  })

  const limit = 20;
  let offset = 0;

  let appState = {
    pokemonDetails: [],
  }
  class Pokemon {
    constructor(detail) {
      this.number = detail.id;
      this.name = detail.name;
      this.image = detail.sprites.other["official-artwork"]["front_default"];
      this.types = detail.types.map(typeSlot => typeSlot.type.name);
      this.type = this.types[0];
    }
  }

  const convertDetailsToModelPokemon = (detail) => new Pokemon(detail);

  const getPokemons = async (offset, limit) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    const pokemons = data.results;

    const detailsPromises = pokemons.map(async (pokemon) => {
      const detailsResponse = await fetch(pokemon.url);
      const detailsData = await detailsResponse.json();
      return convertDetailsToModelPokemon(detailsData);
    });

      return Promise.all(detailsPromises);
  }


  const getAllPokemons = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1080`);
    const data = await response.json();
    return await data.results;
  }

  const getAllTypes = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/type/`);
    const data = await response.json();
    const results = await data.results
    const detailsPromises = results.map(async (results) => {
      const detailsResponse = await fetch(results.url);
      const detailsData = await detailsResponse.json();
      return detailsData;
    });

    console.log(Promise.all(detailsPromises))

    return Promise.all(detailsPromises);
  }

  getAllTypes()

  const getDetails = async (pokemon) => {
    const response = await fetch(pokemon.url);
    const data = await response.json();
    return convertDetailsToModelPokemon(data);
  }

  // async function loadAllPokemonDetails() {
  //   const allPokemons = await getAllPokemons();
  //   appState.pokemonDetails = await Promise.all(allPokemons.map(getDetails));
  // }

  // await loadAllPokemonDetails()



  const filterByName = async (name) => {
    const allPokemons = await getAllPokemons();
    const result = allPokemons.filter(pokemon => {
      return pokemon.name.toLowerCase().startsWith(name)
    })

    return result;
  }

  const filterById = async (id) => {
    const allPokemons = await getAllPokemons();
    const result = allPokemons.filter(pokemon => {
      return pokemon.url.endsWith(`/${id}/`)
    })
    return result;
  }


  const filterByType = async (type) => {
    const pokemons = await getAllPokemons();
    const details = await pokemons.map(getDetails);
    const detailsRequest = await Promise.all(details);

    const filteredTypes = detailsRequest.filter(pokemon => type.some(type => type == pokemon.types));


    return filteredTypes;
  }


  function leftFillNum(num, targetLength) {
    return num.toString().padStart(targetLength, "0");
  }

  // const loadedImages = new Set();

  // const isImageLoaded = (imageUrl) => loadedImages.has(imageUrl);

  // const addLoadedImage = (imageUrl) => loadedImages.add(imageUrl);

  // const createCardPokemon = (pokemon) => {
  //   if (!isImageLoaded(pokemon.image)) {
  //     addLoadedImage(pokemon.image);

  //     const cardHtml = `
  //       <li class="card cursor-pointer">
  //         <div class="card__image ${pokemon.type}">
  //           <img src="${pokemon.image}" alt="${pokemon.name}">
  //           <div class="effect__image">
  //             <img src="icons-type/${pokemon.type}.svg" alt="${pokemon.type}">
  //           </div>
  //         </div>
  //         <div class="card__details">
  //           <div class="card__info">
  //             <span class="card__number">n.º ${leftFillNum(pokemon.number, 3)}</span>
  //             <span class="card__name"> ${pokemon.name}</span>
  //           </div>
  //           <div class="card__types">
  //             ${pokemon.types.map((type) => `
  //               <span class="type ${type}">
  //                 <img src="icons-type/${type}.svg" alt="">
  //                 ${type}
  //               </span>`).join("")}
  //           </div>
  //         </div>
  //       </li>
  //     `;
  //     pokemonList.insertAdjacentHTML('beforeend', cardHtml);
  //   } 
  // };

  const createCardPokemon = (pokemon) => {
    return `
      <li class="card cursor-pointer">
        <div class="card__image ${pokemon.type}">
          <img src="${pokemon.image}" alt="${pokemon.name}">
          <div class="effect__image">
            <img src="icons-type/${pokemon.type}.svg" alt="${pokemon.type}">
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

  const renderPokemonList = (pokemons) => {
    const allCardsName = pokemonList.querySelectorAll(".card__name");
    const currentPokemonNames = Array.from(allCardsName).map(name => name.textContent.trim());

    const newHtml = pokemons
      .filter(pokemon => !currentPokemonNames.includes(pokemon.name))
      .map(createCardPokemon)
      .join('');

    pokemonList.innerHTML += newHtml;
  };

  const loadPokemonItems = async (offset, limit, reloadList = false) => {
    if (reloadList) {
      offset = 0;
      pokemonList.innerHTML = '';
    }

    const allPokemons = await getPokemons(offset, limit);
    renderPokemonList(allPokemons);
  };

  loadPokemonItems(offset, limit, false);


  // Toggle Modal
  const openModalButton = document.querySelector("[data-js='modal-types']");
  const closeModalButton = document.querySelector("#close-modal");
  const modal = document.querySelector("#modal");
  const fade = document.querySelector("#fade");

  const toggleModal = () => {
    modal.classList.toggle("hide");
    fade.classList.toggle("hide");
  };

  [openModalButton, closeModalButton, fade, filterTypeButton].forEach((el) => {
    el.addEventListener("click", () => toggleModal());
  });


  function userNearBottom(threshold = 10) {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    return scrollPosition >= documentHeight - threshold;
  }

  function addInArray(input) {
    if(input.checked == true) {
      arrTypes.push(input.dataset.js)
      console.log(arrTypes)
    } 
    
    if(input.checked == false){
      let indice = arrTypes.indexOf(input.dataset.js);
      arrTypes.splice(indice, 1);
      console.log(arrTypes);
    }
  }


  window.addEventListener("DOMContentLoaded", () => {

    document.addEventListener("scroll", () => {
      if (userNearBottom()) {
        offset += limit;
        loadPokemonItems(offset, limit, false);
      }
    })

    inputSearchByPokemon.addEventListener("input", async (input) => {
      const inputValue = input.currentTarget.value;
      const id = !isNaN(inputValue);
      const valueString = inputValue.toLowerCase();

      let result;
      if (inputValue.trim() === '') {
        return loadPokemonItems(offset, limit, true)
      } else if (id) {
        result = await filterById(inputValue);
      } else {
        result = await filterByName(valueString);
      }

      const details = await Promise.all(result.map(getDetails));
      const newHtml = details.map(createCardPokemon).join('');
      console.log(details)
      pokemonList.innerHTML = newHtml;
    });

    document.addEventListener("click", (e) => {
      const element = e.target;
      if(element.matches("input[type='checkbox']") && !arrTypes.includes(element.dataset.js)) {
        addInArray(element)
      }
    })
    

    clearFilterButton.addEventListener("click", () => {
      inputSearchByType.forEach(input => {
        input.checked = false;  
        arrTypes = [];
      })
    })

    filterTypeButton.addEventListener("click", async () => {
      if(arrTypes.length > 0) {
        const results = await filterByType(arrTypes);
        const newHtml = results.map(createCardPokemon).join('');
        pokemonList.innerHTML = newHtml;
      } else {
        loadPokemonItems(offset, limit, true);
      }
    })





  })



