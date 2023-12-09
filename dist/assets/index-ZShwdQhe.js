var m=Object.defineProperty;var u=(e,t,n)=>t in e?m(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var a=(e,t,n)=>(u(e,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const p=document.querySelector(".pokedex-list"),f=document.querySelector(".menu__btn-mobile");f.addEventListener("click",e=>{e.currentTarget.classList.toggle("active")});const i=20;let l=0;class y{constructor(){a(this,"number");a(this,"name");a(this,"image");a(this,"type");a(this,"types",[])}}const g=e=>{const t=new y;t.name=e.name,t.number=e.id,t.image=e.sprites.other.dream_world.front_default;const n=e.types.map(s=>s.type.name),[r]=n;return t.types=n,t.type=r,t},v=async e=>{const n=await(await fetch(e.url)).json();return g(n)},d=async(e,t)=>{const o=await(await(await(await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${e}&limit=${t}`)).json()).results).map(v);return Promise.all(o)};d(l,i).then(e=>{console.log(e)});function _(e,t){return e.toString().padStart(t,"0")}const h=e=>`
    <li class="card">
      <div class="card__image ${e.type}">
        <img src="${e.image}" alt="Poke">
        <div class="effect__image">
          <img src="../icons-type/${e.type}.svg" alt="${e.type}">
        </div>
      </div>
      <div class="card__details">
        <div class="card__info">
          <span class="card__number">n.º ${_(e.number,3)}</span>
          <span class="card__name"> ${e.name}</span>
        </div>
        <div class="card__types">
        ${e.types.map(t=>`
        <span class="type ${t}">
          <img src="icons-type/${t}.svg" alt="">
          ${t}
        </span>`).join("")}
          
        </div>
      </div>
    </li>
  `;function P(e,t){d(e,t).then((n=[])=>{const r=n.map(h).join("");p.innerHTML+=r})}P(l,i);
