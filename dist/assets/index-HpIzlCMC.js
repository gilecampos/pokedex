(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function o(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(s){if(s.ep)return;s.ep=!0;const n=o(s);fetch(s.href,n)}})();const v=document.querySelector("[ data-js='search-pokemon']"),P=document.querySelectorAll("input[type='checkbox']"),k=document.querySelector("#clearFilter"),f=document.querySelector("#filterTypeButton");let c=[];const d=document.querySelector(".pokedex-list"),L=document.querySelector(".menu__btn-mobile");L.addEventListener("click",e=>{e.currentTarget.classList.toggle("active")});const i=20;let l=0;class _{constructor(t){this.number=t.id,this.name=t.name,this.image=t.sprites.other["official-artwork"].front_default,this.types=t.types.map(o=>o.type.name),this.type=this.types[0]}}const y=e=>new _(e),S=async(e,t)=>{const n=(await(await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${e}&limit=${t}`)).json()).results.map(async r=>{const w=await(await fetch(r.url)).json();return y(w)});return Promise.all(n)},p=async()=>await(await(await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1080")).json()).results,j=async()=>{const a=(await(await(await fetch("https://pokeapi.co/api/v2/type/")).json()).results).map(async s=>await(await fetch(s.url)).json());return console.log(Promise.all(a)),Promise.all(a)};j();const h=async e=>{const o=await(await fetch(e.url)).json();return y(o)},T=async e=>(await p()).filter(a=>a.name.toLowerCase().startsWith(e)),q=async e=>(await p()).filter(a=>a.url.endsWith(`/${e}/`)),$=async e=>{const o=await(await p()).map(h);return(await Promise.all(o)).filter(n=>e.some(r=>r==n.types))};function b(e,t){return e.toString().padStart(t,"0")}const m=e=>`
      <li class="card cursor-pointer">
        <div class="card__image ${e.type}">
          <img src="${e.image}" alt="${e.name}">
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
    `,E=e=>{const t=d.querySelectorAll(".card__name"),o=Array.from(t).map(s=>s.textContent.trim()),a=e.filter(s=>!o.includes(s.name)).map(m).join("");d.innerHTML+=a},u=async(e,t,o=!1)=>{o&&(e=0,d.innerHTML="");const a=await S(e,t);E(a)};u(l,i,!1);const M=document.querySelector("[data-js='modal-types']"),B=document.querySelector("#close-modal"),H=document.querySelector("#modal"),g=document.querySelector("#fade"),N=()=>{H.classList.toggle("hide"),g.classList.toggle("hide")};[M,B,g,f].forEach(e=>{e.addEventListener("click",()=>N())});function O(e=10){const t=window.scrollY+window.innerHeight,o=document.documentElement.scrollHeight;return t>=o-e}function A(e){if(e.checked==!0&&(c.push(e.dataset.js),console.log(c)),e.checked==!1){let t=c.indexOf(e.dataset.js);c.splice(t,1),console.log(c)}}window.addEventListener("DOMContentLoaded",()=>{document.addEventListener("scroll",()=>{O()&&(l+=i,u(l,i,!1))}),v.addEventListener("input",async e=>{const t=e.currentTarget.value,o=!isNaN(t),a=t.toLowerCase();let s;if(t.trim()==="")return u(l,i,!0);o?s=await q(t):s=await T(a);const n=await Promise.all(s.map(h)),r=n.map(m).join("");console.log(n),d.innerHTML=r}),document.addEventListener("click",e=>{const t=e.target;t.matches("input[type='checkbox']")&&!c.includes(t.dataset.js)&&A(t)}),k.addEventListener("click",()=>{P.forEach(e=>{e.checked=!1,c=[]})}),f.addEventListener("click",async()=>{if(c.length>0){const t=(await $(c)).map(m).join("");d.innerHTML=t}else u(l,i,!0)})});
