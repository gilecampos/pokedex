var g=Object.defineProperty;var w=(e,t,s)=>t in e?g(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var i=(e,t,s)=>(w(e,typeof t!="symbol"?t+"":t,s),s);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}})();const v=document.querySelector("[ data-js='search-pokemon']"),c=document.querySelector(".pokedex-list"),P=document.querySelector(".menu__btn-mobile");P.addEventListener("click",e=>{e.currentTarget.classList.toggle("active")});const l=20;let m=0;class h{constructor(){i(this,"number");i(this,"name");i(this,"image");i(this,"type");i(this,"types",[])}}const k=e=>{const t=new h;t.name=e.name,t.number=e.id,t.image=e.sprites.other["official-artwork"].front_default;const s=e.types.map(n=>n.type.name),[r]=s;return t.types=s,t.type=r,t},d=async e=>{const s=await(await fetch(e.url)).json();return k(s)},_=async(e,t)=>{const o=await(await(await(await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${e}&limit=${t}`)).json()).results).map(d);return Promise.all(o)},L=async e=>(await p()).filter(r=>r.name.toLowerCase().startsWith(e)),$=async e=>(await p()).filter(r=>r.url.endsWith(`/${e}/`)),p=async()=>await(await(await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1080")).json()).results;function b(e,t){return e.toString().padStart(t,"0")}const f=e=>`
    <li class="card">
      <div class="card__image ${e.type}">
        <img src="${e.image}" alt="Poke">
        <div class="effect__image">
          <img src="icons-type/${e.type}.svg" alt="${e.type}">
        </div>
      </div>
      <div class="card__details">
        <div class="card__info">
          <span class="card__number">n.º ${b(e.number,3)}</span>
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
  `;function u(e,t,s=!1){s&&(e=0,c.innerHTML=""),_(e,t).then((r=[])=>{const n=Array.from(c.querySelectorAll(".card__name")).map(a=>a.textContent.trim()),o=r.filter(a=>!n.includes(a.name)).map(f).join("");c.innerHTML+=o})}u(m,l,!1);window.addEventListener("load",()=>{function e(t=10){const s=window.scrollY+window.innerHeight,r=document.documentElement.scrollHeight;return s>=r-t}document.addEventListener("scroll",()=>{e()&&(m+=l,u(m,l))}),v.addEventListener("keyup",async t=>{const s=t.currentTarget.value,r=!isNaN(s),n=s.toLowerCase();let o;if(s.trim()==="")return u(m,l,!0);r?o=await $(s):o=await L(n);const y=(await Promise.all(o.map(d))).map(f).join("");c.innerHTML=y})});
