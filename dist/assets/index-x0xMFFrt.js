var v=Object.defineProperty;var k=(e,t,s)=>t in e?v(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var i=(e,t,s)=>(k(e,typeof t!="symbol"?t+"":t,s),s);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}})();const L=document.querySelector("[ data-js='search-pokemon']"),g=document.querySelectorAll("input[type='checkbox']"),P=document.querySelector("#clearFilter"),h=document.querySelector("#filterTypeButton");let c=[];const u=document.querySelector(".pokedex-list"),_=document.querySelector(".menu__btn-mobile");_.addEventListener("click",e=>{e.currentTarget.classList.toggle("active")});const l=20;let d=0;class S{constructor(){i(this,"number");i(this,"name");i(this,"image");i(this,"type");i(this,"types",[])}}const q=e=>{const t=new S;t.name=e.name,t.number=e.id,t.image=e.sprites.other["official-artwork"].front_default;const s=e.types.map(o=>o.type.name),[r]=s;return t.types=s,t.type=r,t},f=async e=>{const s=await(await fetch(e.url)).json();return q(s)},T=async(e,t)=>{const n=await(await(await(await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${e}&limit=${t}`)).json()).results).map(f);return Promise.all(n)},y=async()=>await(await(await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1080")).json()).results,E=async e=>(await y()).filter(r=>r.name.toLowerCase().startsWith(e)),$=async e=>(await y()).filter(r=>r.url.endsWith(`/${e}/`)),b=async e=>{const s=await(await y()).map(f);return(await Promise.all(s)).filter(n=>e.some(a=>a==n.types))};function M(e,t){return e.toString().padStart(t,"0")}const p=e=>`
    <li class="card cursor-pointer">
      <div class="card__image ${e.type}">
        <img src="${e.image}" alt="Poke">
        <div class="effect__image">
          <img src="icons-type/${e.type}.svg" alt="${e.type}">
        </div>
      </div>
      <div class="card__details">
        <div class="card__info">
          <span class="card__number">n.º ${M(e.number,3)}</span>
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
  `;function m(e,t,s=!1){s&&(e=0,u.innerHTML=""),T(e,t).then((r=[])=>{const o=Array.from(u.querySelectorAll(".card__name")).map(a=>a.textContent.trim()),n=r.filter(a=>!o.includes(a.name)).map(p).join("");u.innerHTML+=n})}m(d,l,!1);const j=document.querySelector("[data-js='modal-types']"),B=document.querySelector("#close-modal"),H=document.querySelector("#modal"),w=document.querySelector("#fade"),N=()=>{H.classList.toggle("hide"),w.classList.toggle("hide")};[j,B,w,h].forEach(e=>{e.addEventListener("click",()=>N())});function O(e=10){const t=window.scrollY+window.innerHeight,s=document.documentElement.scrollHeight;return t>=s-e}function A(e){if(e.checked==!0&&(c.push(e.dataset.js),console.log(c)),e.checked==!1){let t=c.indexOf(e.dataset.js);c.splice(t,1),console.log(c)}}window.addEventListener("DOMContentLoaded",()=>{document.addEventListener("scroll",()=>{O()&&(d+=l,m(d,l,!1))}),L.addEventListener("input",async e=>{const t=e.currentTarget.value,s=!isNaN(t),r=t.toLowerCase();let o;if(t.trim()==="")return m(d,l,!0);s?o=await $(t):o=await E(r);const a=(await Promise.all(o.map(f))).map(p).join("");u.innerHTML=a}),g.forEach(e=>{e.addEventListener("click",t=>{const s=t.target;c.includes(s.value)||A(s)})}),P.addEventListener("click",()=>{g.forEach(e=>{e.checked=!1,c=[]})}),h.addEventListener("click",async()=>{if(c.length>0){const t=(await b(c)).map(p).join("");u.innerHTML=t}else m(d,l,!0)})});
