(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();document.querySelector("[ data-js='search-pokemon']");document.querySelectorAll("input[type='checkbox']");document.querySelector("#clearFilter");document.querySelector("#filterTypeButton");document.querySelector("[ data-js='pokemon-list']");const P=document.querySelector(".menu__btn-mobile");P.addEventListener("click",e=>{e.currentTarget.classList.toggle("active")});class _{constructor(o){this.number=o.id,this.name=o.name,this.image=o.sprites.other["official-artwork"].front_default,this.types=o.types.map(r=>r.type.name),this.type=this.types[0]}}function b(e,o){return e.toString().padStart(o,"0")}const v=e=>new _(e),w=async e=>{const o=e.map(n=>fetch(n.url)),t=(await Promise.allSettled(o)).filter(n=>n.status==="fulfilled").map(n=>n.value.json());return(await Promise.all(t)).map(n=>v(n))},S=async()=>{try{const e=await fetch("https://pokeapi.co/api/v2/pokemon?limit=15&offset=0");if(!e.ok)throw new Error("Não foi possivel obter as informçaões");const{results:o}=await e.json();return await w(o)}catch(e){console.log("algo deu errado",e)}},c=(e,o=[])=>{const r=document.createElement(e);return r.classList.add(...o),r},L=e=>{const o=document.querySelector("[data-js='pokemon-list']"),r=new DocumentFragment;e.forEach(({number:i,name:t,image:s,types:n,type:k})=>{const p=c("li",["card","cursor-pointer"]),u=c("div",["card__image",k]),l=c("img"),m=c("div",["card__details"]),f=c("div",["card__info"]),h=c("span",["card__number"]),y=c("span",["card__name"]),d=c("div",["card__types"]);if(n.length>1)n.forEach(a=>{const g=c("span",["type",a]);g.textContent=a,d.appendChild(g)});else{const a=c("span",["type",n[0]]);a.textContent=n[0],d.appendChild(a)}l.src=s,l.setAttribute("alt",t),h.textContent=`n.º ${b(i,3)}`,y.textContent=t,f.append(h,y),u.appendChild(l),m.append(f,d),p.append(u,m),r.appendChild(p)}),o.appendChild(r)},C=async()=>{const e=await S();L(e)};C();
