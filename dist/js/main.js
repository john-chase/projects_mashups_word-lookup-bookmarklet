javascript:(()=>{function e(){this.style.backgroundColor="yellow"}function t(){this.style.backgroundColor="transparent",this.classList.remove("def-tooltip")}function n(e){e.target;const t=document.getElementById("def-help"),n=document.getElementsByClassName("def-div")[0];t.innerText="",console.log(t),(async e=>{e=(e=e.replace(/[\u2000-\u206F\u2E00-\u2E7F!"#$%&()*+,\.\/:;<=>?@\[\]^_`{|}~]/g,"")).replace(/'(.*?)'/g,"$1"),console.log(e);let t=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${e}`);const n=`Sorry, we could not find "${e}" in the dictionary, or the service is down. You can try the search again at later time or head to the <a href="https://www.dictionary.com/" target="_blank">web</a> instead.`;if(t.status>=200&&t.status<=299){let e=await t.json(),i="";if(e[0]){console.log(e[0]);const t=e[0].word,n=e[0].meanings[0].partOfSpeech?e[0].meanings[0].partOfSpeech:"",o=e[0].phonetics.length&&e[0].phonetics[0].text?e[0].phonetics[0].text:"";let a="";o.length&&(i=` (${o})`),e[0].phonetics.length&&(e[0].phonetics.forEach((e=>{if(void 0!==e.audio&&e.audio.length)return a=`<a href="${e.audio}" target="_blank"><img src="images/audio.png" class="def-audio" alt="Click/tap for audio"/></a>`})),console.log(a));const d=e[0].meanings[0].definitions[0].definition?e[0].meanings[0].definitions[0].definition:"";return`${t.toUpperCase()}${a} - ${n}${i}: ${d}`}return n}return n})(e.target.innerText).then((e=>{t.innerHTML=e,e.includes("Sorry, we could not find ")?n.classList.add("def-tooltip-not-found"):n.classList.remove("def-tooltip-not-found")}))}(()=>{document.head.appendChild(document.createElement("style")).innerText='\n    /*GENERAL*/ .p { border: 1px solid dodgerblue; border-radius: .5rem; padding: .5rem; margin: 1rem 5rem; font-size: 15px; line-height: 21px; } .hidden { display: none; } /*DEFINITION GROUP*/ .def-div { background-color: dodgerblue; position: fixed; z-index: 99999999; min-width: 100%; height: 32px; top: 0; text-align: left; } .def-span { padding: 0 0 12px 4px; text-align: center; color: blue; font-weight: bold; font-style: italic; margin: 0.5rem; } .def-help { font-style: italic; margin: 0.5rem; } .def-audio { width: 20px; height: 20px; margin-bottom: -.3rem; padding-left: 4px; } /*TOOLTIPS*/ .def-tooltip { content: (data-tooltip); position: relative; transition: all 0.3s ease; text-decoration: none; cursor: grabbing; z-index: 999999; box-sizing: border-box; } .def-tooltip-not-found { color: white; font-weight: bold; background: red; } /*TOGGLE SWITCH*/ input[type=checkbox], .def-input { margin: 0; -webkit-appearance: none; appearance: none; padding: 0 0 0 30px; border-radius: 16px; background: radial-gradient(circle 12px, white 100%, transparent calc(100% + 1px)) #ccc -16px; transition: 0.3s ease-in-out; position: inherit; height: 32px; width: 64px; top: 0; bottom: 0; box-shadow: none; } .def-input::before { content: "OFF"; font: bold 12px/32px Verdana; color: white; text-shadow: 0 1px black; } .def-input:checked { padding: 0 0 0 8px; background-color: rgb(37, 151, 62); background-position: 16px; height: 32px; width: 64px; } .def-input:checked::before { content: "ON"; }\n    ';const i=document.getElementsByTagName("body")[0],o=document.createElement("div");o.classList.add("def-div"),i.insertBefore(o,i.firstChild);const a=document.createElement("label");o.appendChild(a);const d=document.createElement("span");d.classList.add("def-span"),d.innerText="Definitions",a.appendChild(d);const r=document.createElement("input");r.setAttribute("type","checkbox"),r.classList.add("def-input"),a.appendChild(r);const s=document.createElement("span");let l;s.setAttribute("id","def-help"),s.classList.add("hidden","def-help"),s.innerText="Hover over a word to highlight, then click/tap to show definition tooltip.",a.appendChild(s);let c=document.getElementsByTagName("p"),p=[];const h=e=>{let t=(e=e.replace("&nbsp;"," ")).split(" "),n="";return t.forEach((e=>{n+=`<span>${e}</span> `})),n};r.onchange=()=>{if(r.checked){s.classList.remove("hidden");for(let i=0;i<c.length;i++)if(null!=c[i]&&""!==c[i].innerText){c[i].classList.add("p"),p.push(c[i].innerHTML),c[i].innerHTML=h(c[i].innerText),l=c[i].getElementsByTagName("span");for(let i=0;i<l.length;i++)l[i].onmouseover=e,l[i].onmouseout=t,l[i].onclick=n}}else{s.classList.add("hidden"),s.innerText="Hover over a word to highlight, then click/tap to show definition tooltip.";for(let e=0;e<c.length;e++)null!=c[e]&&""!==c[e].innerText&&(c[e].classList.remove("p"),c[e].innerHTML=p[e])}}})()})();