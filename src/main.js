  import "./input.css"

  const inputSearchByPokemon = document.querySelector("[ data-js='search-pokemon']")
  const inputSearchByType = document.querySelectorAll("input[type='checkbox']");
  const clearFilterButton = document.querySelector("#clearFilter");
  const filterTypeButton = document.querySelector("#filterTypeButton");

  
  const pokemonList = document.querySelector("[ data-js='pokemon-list']");

  const btnMenuMobile = document.querySelector(".menu__btn-mobile");
  btnMenuMobile.addEventListener("click", (e) => {
    e.currentTarget.classList.toggle("active")
  })
  
  const limit = 20;
  let offset = 0;
  let arrTypes = [];

  class Pokemon {
    constructor(detail) {
      this.number = detail.id;
      this.name = detail.name;
      this.image = detail.sprites.other["official-artwork"]["front_default"];
      this.types = detail.types.map(typeSlot => typeSlot.type.name);
      this.type = this.types[0];
    }
  }

  function leftFillNum(num, targetLength) {
    return num.toString().padStart(targetLength, "0");
  }

  const convertModelPokemon = (detail) => new Pokemon(detail);

  const getPokemonsInfo = async apiResults => {
    const promises = apiResults.map(result => fetch(result.url));
    const responses = await Promise.allSettled(promises);
    const fulfilled = responses.filter(response => response.status === 'fulfilled');
    const pokePromises = fulfilled.map(url => url.value.json());
    const pokemons = await Promise.all(pokePromises);
    return pokemons.map(pokemon => convertModelPokemon(pokemon));
  }

  const getPokemons = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=15&offset=0`)

      if(!response.ok) {
        throw new Error('Não foi possivel obter as informçaões');
      }

      const { results: apiResults } = await response.json();
      const pokemons = await getPokemonsInfo(apiResults);
      
      return pokemons;
    } catch (error) {
      console.log('algo deu errado', error);
    }
  }

  const createHTMLElement = (tag, classNames = []) => {
    const element = document.createElement(tag);
    element.classList.add(...classNames);
    return element;
  };

  // <div class="effect__image">
  //           <img src="icons-type/${pokemon.type}.svg" alt="${pokemon.type}">
  //         </div>
  
  const renderPokemons = pokemons => {
    const ul = document.querySelector("[data-js='pokemon-list']");
    const fragment = new DocumentFragment();
  
    pokemons.forEach(({ number, name, image, types, type }) => {
      const li = createHTMLElement('li', ['card', 'cursor-pointer']);
      const containerImg = createHTMLElement('div', ['card__image', type]);
      const containerImgEffect = createHTMLElement('div', ['effect__image']);
      const imgType = createHTMLElement('img');
      const img = createHTMLElement('img');
      const details = createHTMLElement('div', ['card__details']);
      const detailsInfo = createHTMLElement('div', ['card__info']);
      const id = createHTMLElement('span', ['card__number']);
      const namePokemon = createHTMLElement('span', ['card__name']);
      const typesPokemon = createHTMLElement('div', ['card__types']);
  
      if (types.length > 1) {
        types.forEach(type => {
          const typeImage = createHTMLElement('img')
          const typeSpan = createHTMLElement('span', ['type', type]);
          typeImage.src = `/icons-type/${type}.svg`
          typeSpan.textContent = type;
          typeSpan.appendChild(typeImage);
          typesPokemon.appendChild(typeSpan);
        });
      } else {
        const type = createHTMLElement('span', ['type', types[0]]);
        const imageType = createHTMLElement('img');
        imageType.src = `/icons-type/${types[0]}.svg`
        type.textContent = types[0];
        type.appendChild(imageType);
        typesPokemon.appendChild(type);
      }

      imgType.src = `/icons-type/${type}.svg`;
      imgType.setAttribute('alt', type);
  
      img.src = image;
      img.setAttribute('alt', name);
      id.textContent = `n.º ${leftFillNum(number, 3)}`;
      namePokemon.textContent = name;
      
      containerImgEffect.append(imgType);
      detailsInfo.append(id, namePokemon);
      containerImg.appendChild(img);
      containerImg.appendChild(containerImgEffect);
      details.append(detailsInfo, typesPokemon);
      li.append(containerImg, details);
  
      fragment.appendChild(li);
    });
  
    ul.appendChild(fragment);
  };
  
  

  // const renderPokemons = pokemons => {
  //   const ul = document.querySelector("[ data-js='pokemon-list']");
  //   let fragment = new DocumentFragment();

  //   pokemons.forEach(({number, name, image, types, type}) => {
  //     const li = document.createElement('li');
  //     const containerImg = document.createElement('div');
  //     const img = document.createElement('img');
  //     const details = document.createElement('div');
  //     const detailsInfo = document.createElement('div');
  //     const id = document.createElement('span');
  //     const namePokemon = document.createElement('span');
  //     const typesPokemon = document.createElement('div');

  //     if(types.length > 1) {
  //       const type1 = document.createElement('span');
  //       const type2 = document.createElement('span');

  //       type1.classList.add('type', types[0]) 
  //       type2.classList.add('type', types[1])
        
  //       type1.textContent = types[0]
  //       type2.textContent = types[1];
        
  //       typesPokemon.append(type1, type2)
  //     } else {
  //       const type = document.createElement('span');
  //       type.classList.add('type', types[0]) 

  //       type.textContent = types[0]

  //       typesPokemon.append(type)
  //     }

  //     li.classList.add('card', 'cursor-pointer');
  //     containerImg.classList.add('card__image', type);
  //     img.src = image;
  //     img.setAttribute('alt', name)
  //     details.classList.add('card__details');
  //     detailsInfo.classList.add('card__info');
  //     id.classList.add('card__number');
  //     id.textContent = `n.º ${leftFillNum(number, 3)}`;
  //     namePokemon.classList.add('card__name');
  //     namePokemon.textContent = name;
  //     typesPokemon.classList.add('card__types');
      
  //     detailsInfo.append(id, namePokemon)
  //     containerImg.append(img);
  //     details.append(detailsInfo, typesPokemon)
  //     li.append(containerImg, details)

  //     fragment.append(li);
  //   })

  //   ul.append(fragment)
  // };


  const handlePageLoaded = async () => {
   const pokemons = await getPokemons();
   renderPokemons(pokemons);
  }

  handlePageLoaded()


  // const getPokemons = async () => await
  //   fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
  //     .then(response => response.json())
  //     .then(data => data.results);


  // const logPokemons = async () => {
  //   const pokemons = await getPokemons()
  //   console.log(pokemons);
  // }

  // logPokemons()

  

    
  //   console.log(getPokemons());
    
    // const detailsPromises = pokemons.map(async (pokemon) => {
  //   const detailsResponse = await fetch(pokemon.url);
  //   const detailsData = await detailsResponse.json();
  //   return convertDetailsToModelPokemon(detailsData);
  // });

    // return Promise.all(detailsPromises);

//   const getAllPokemons = async () => {
//     const response = await fetch(
//       `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1080`);
//     const data = await response.json();
//     return await data.results;
//   }

//   const getAllTypes = async () => {
//     const response = await fetch(
//       `https://pokeapi.co/api/v2/type/`);
//     const data = await response.json();
//     const results = await data.results
//     const detailsPromises = results.map(async (results) => {
//       const detailsResponse = await fetch(results.url);
//       const detailsData = await detailsResponse.json();
//       return detailsData;
//     });

//     console.log(Promise.all(detailsPromises))

//     return Promise.all(detailsPromises);
//   }

//   getAllTypes()

//   const getDetails = async (pokemon) => {
//     const response = await fetch(pokemon.url);
//     const data = await response.json();
//     return convertDetailsToModelPokemon(data);
//   }

//   const filterByName = async (name) => {
//     const allPokemons = await getAllPokemons();
//     const result = allPokemons.filter(pokemon => {
//       return pokemon.name.toLowerCase().startsWith(name)
//     })

//     return result;
//   }

//   const filterById = async (id) => {
//     const allPokemons = await getAllPokemons();
//     const result = allPokemons.filter(pokemon => {
//       return pokemon.url.endsWith(`/${id}/`)
//     })
//     return result;
//   }


//   const filterByType = async (type) => {
//     const pokemons = await getAllPokemons();
//     const details = await pokemons.map(getDetails);
//     const detailsRequest = await Promise.all(details);

//     const filteredTypes = detailsRequest.filter(pokemon => type.some(type => type == pokemon.types));


//     return filteredTypes;
//   }




//   const createCardPokemon = (pokemon) => {
//     return `
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
//           ${pokemon.types.map((type) => `
//           <span class="type ${type}">
//             <img src="icons-type/${type}.svg" alt="">
//             ${type}
//           </span>`).join("")}
            
//           </div>
//         </div>
//       </li>
//     `
//   }



//   const loadPokemonItems = async (offset, limit, reloadList = false) => {
//     if (reloadList) {
//       offset = 0;
//       pokemonList.innerHTML = '';
//     }

//     const allPokemons = await getPokemons(offset, limit);
//     renderPokemonList(allPokemons);
//   };

//   loadPokemonItems(offset, limit, false);


//   // Toggle Modal
//   const openModalButton = document.querySelector("[data-js='modal-types']");
//   const closeModalButton = document.querySelector("#close-modal");
//   const modal = document.querySelector("#modal");
//   const fade = document.querySelector("#fade");

//   const toggleModal = () => {
//     modal.classList.toggle("hide");
//     fade.classList.toggle("hide");
//   };

//   [openModalButton, closeModalButton, fade, filterTypeButton].forEach((el) => {
//     el.addEventListener("click", () => toggleModal());
//   });


//   function userNearBottom(threshold = 10) {
//     const scrollPosition = window.scrollY + window.innerHeight;
//     const documentHeight = document.documentElement.scrollHeight;
//     return scrollPosition >= documentHeight - threshold;
//   }

//   function addInArray(input) {
//     if(input.checked == true) {
//       arrTypes.push(input.dataset.js)
//       console.log(arrTypes)
//     } 
    
//     if(input.checked == false){
//       let indice = arrTypes.indexOf(input.dataset.js);
//       arrTypes.splice(indice, 1);
//       console.log(arrTypes);
//     }
//   }


//   window.addEventListener("DOMContentLoaded", () => {

//     document.addEventListener("scroll", () => {
//       if (userNearBottom()) {
//         offset += limit;
//         loadPokemonItems(offset, limit, false);
//       }
//     })

//     inputSearchByPokemon.addEventListener("input", async (input) => {
//       const inputValue = input.currentTarget.value;
//       const id = !isNaN(inputValue);
//       const valueString = inputValue.toLowerCase();

//       let result;
//       if (inputValue.trim() === '') {
//         return loadPokemonItems(offset, limit, true)
//       } else if (id) {
//         result = await filterById(inputValue);
//       } else {
//         result = await filterByName(valueString);
//       }

//       const details = await Promise.all(result.map(getDetails));
//       const newHtml = details.map(createCardPokemon).join('');
//       console.log(details)
//       pokemonList.innerHTML = newHtml;
//     });

//     document.addEventListener("click", (e) => {
//       const element = e.target;
//       if(element.matches("input[type='checkbox']") && !arrTypes.includes(element.dataset.js)) {
//         addInArray(element)
//       }
//     })
    

//     clearFilterButton.addEventListener("click", () => {
//       inputSearchByType.forEach(input => {
//         input.checked = false;  
//         arrTypes = [];
//       })
//     })

//     filterTypeButton.addEventListener("click", async () => {
//       if(arrTypes.length > 0) {
//         const results = await filterByType(arrTypes);
//         const newHtml = results.map(createCardPokemon).join('');
//         pokemonList.innerHTML = newHtml;
//       } else {
//         loadPokemonItems(offset, limit, true);
//       }
//     })





//   })

// loadPokemonItems(offset, limit, true)


