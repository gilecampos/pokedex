var y=Object.defineProperty;var g=(e,t,n)=>t in e?y(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var i=(e,t,n)=>(g(e,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const w=document.querySelector("[ data-js='search-pokemon']"),c=document.querySelector(".pokedex-list"),v=document.querySelector(".menu__btn-mobile");v.addEventListener("click",e=>{e.currentTarget.classList.toggle("active")});const l=20;let m=0;class h{constructor(){i(this,"number");i(this,"name");i(this,"image");i(this,"type");i(this,"types",[])}}const P=e=>{const t=new h;t.name=e.name,t.number=e.id,t.image=e.sprites.other["official-artwork"].front_default;const n=e.types.map(s=>s.type.name),[r]=n;return t.types=n,t.type=r,t},d=async e=>{const n=await(await fetch(e.url)).json();return P(n)},k=async(e,t)=>{const o=await(await(await(await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${e}&limit=${t}`)).json()).results).map(d);return Promise.all(o)},_=async e=>(await p()).filter(r=>r.name.toLowerCase().startsWith(e)),L=async e=>(await p()).filter(r=>r.url.endsWith(`/${e}/`)),p=async()=>await(await(await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1080")).json()).results;function $(e,t){return e.toString().padStart(t,"0")}const f=e=>`
    <li class="card">
      <div class="card__image ${e.type}">
        <img src="${e.image}" alt="Poke">
        <div class="effect__image">
          <img src="icons-type/${e.type}.svg" alt="${e.type}">
        </div>
      </div>
      <div class="card__details">
        <div class="card__info">
          <span class="card__number">n.º ${$(e.number,4)}</span>
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
  `;function u(e,t,n=!1){n&&(e=0,c.innerHTML=""),k(e,t).then((r=[])=>{const s=Array.from(c.querySelectorAll(".card__name")).map(a=>a.textContent.trim()),o=r.filter(a=>!s.includes(a.name)).map(f).join("");c.innerHTML+=o})}u(m,l,!1);function b(){const e=window.scrollY+window.innerHeight,t=document.documentElement.offsetHeight;return e>=t}window.addEventListener("scroll",()=>{b()&&(m+=l,u(m,l,!1))});w.addEventListener("keyup",async e=>{const t=e.currentTarget.value,n=!isNaN(t),r=t.toLowerCase();let s;if(t.trim()==="")return u(m,l,!0);n?s=await L(t):s=await _(r);const a=(await Promise.all(s.map(d))).map(f).join("");c.innerHTML=a});
