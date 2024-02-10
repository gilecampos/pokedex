  import "./input.css"

  const inputSearchByPokemon = document.querySelector("[ data-js='search-pokemon']")
  const inputSearchByType = document.querySelectorAll("input[type='checkbox']");
  const clearFilterButton = document.querySelector("#clearFilter");
  const filterTypeButton = document.querySelector("#filterTypeButton");
  const btnMorePokemons = document.querySelector(".more-pokemons");
  const btnScrollTop = document.querySelector(".scroll-top");

  
  const pokemonList = document.querySelector("[ data-js='pokemon-list']");

  const btnMenuMobile = document.querySelector(".menu__btn-mobile");
  btnMenuMobile.addEventListener("click", (e) => {
    e.currentTarget.classList.toggle("active")
  })
  
  const paginationInfo = (() => {
    const limit = 20;
    let offset = 0;

    const getLimit = () => limit
    const getOffset = () => offset
    const incrementOffset = () => offset += limit

    return {getLimit, getOffset, incrementOffset}
  })()


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
      const {getLimit, getOffset, incrementOffset} = paginationInfo
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${getLimit()}&offset=${getOffset()}`)

      if(!response.ok) {
        throw new Error('Não foi possivel obter as informçaões');
      }

      const { results: apiResults } = await response.json();
      const pokemons = await getPokemonsInfo(apiResults);

      incrementOffset()
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

  
  const renderPokemons = pokemons => {
    const ul = document.querySelector("[data-js='pokemon-list']");
    const fragment = document.createDocumentFragment();
  
    pokemons.forEach(({ number, name, image, types, type }) => {
      const li = createHTMLElement('li', ['card', 'cursor-pointer']);
      const containerImg = createHTMLElement('div', ['card__image', type]);
      const img = createHTMLElement('img');
      const details = createHTMLElement('div', ['card__details']);
      const detailsInfo = createHTMLElement('div', ['card__info']);
      const id = createHTMLElement('span', ['card__number']);
      const namePokemon = createHTMLElement('span', ['card__name']);
      const typesPokemon = createHTMLElement('div', ['card__types']);
  
      if (types.length > 1) {
        types.forEach(type => {
          const typeSpan = createHTMLElement('span', ['type', type]);
          typeSpan.textContent = type;
          typesPokemon.appendChild(typeSpan);
        });
      } else {
        const type = createHTMLElement('span', ['type', types[0]]);
        type.textContent = types[0];
        typesPokemon.appendChild(type);
      }

      li.setAttribute("data-aos", "fade-up");
      li.setAttribute("data-aos-anchor-placement", "top-bottom");
  
      img.src = image;
      img.setAttribute('alt', name);
      id.textContent = `n.º ${leftFillNum(number, 3)}`;
      namePokemon.textContent = name;
      

      detailsInfo.append(id, namePokemon);
      containerImg.appendChild(img);
      details.append(detailsInfo, typesPokemon);
      li.append(containerImg, details);
  
      fragment.appendChild(li);
    });
  
    ul.appendChild(fragment);
  };

  
  const displayButtonScrollTop = () => {
    let bodyProperties = document.querySelector("body").getBoundingClientRect();
    if(bodyProperties.top < -30) {
      btnScrollTop.style.display = "block";
    } else {
      btnScrollTop.style.display = "none";
    }
  }

  const scrollToTopDocument = () => {
    window.scrollTo(0, 0)
  }

  const observeLastPokemon = pokemonsObserver => {
    const lastPokemon = pokemonList.lastChild;
    pokemonsObserver.observe(lastPokemon)
  }

  const handleNextPokemonsRender = () => {
    const pokemonsObserver = new IntersectionObserver(async ([lastPokemon], observer) => {
      if(!lastPokemon.isIntersecting) {
        return
      }
      observer.unobserve(lastPokemon.target);
      const pokemons = await getPokemons()
      renderPokemons(pokemons)
      observeLastPokemon(pokemonsObserver)
    }, {rootMargin: '500px'});
    
    observeLastPokemon(pokemonsObserver)
  }
  
  
  const handlePageLoaded = async () => {
    const pokemons = await getPokemons()
    renderPokemons(pokemons)
    handleNextPokemonsRender();
  }
  
  window.addEventListener("scroll", displayButtonScrollTop)
  btnScrollTop.addEventListener("click", scrollToTopDocument)
  handlePageLoaded()
