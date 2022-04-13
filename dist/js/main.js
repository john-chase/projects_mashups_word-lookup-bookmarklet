javascript:(()=>{function e(){this.style.backgroundColor="yellow"}function t(){this.style.backgroundColor="transparent",this.classList.remove("def-tooltip")}function n(e){e.target;const t=document.getElementById("def-help"),n=document.getElementsByClassName("def-div")[0];t.innerText="",console.log(t),(async e=>{e=(e=e.replace(/[\u2000-\u206F\u2E00-\u2E7F!"#$%&()*+,\.\/:;<=>?@\[\]^_`{|}~]/g,"")).replace(/'(.*?)'/g,"$1"),console.log(e);let t=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${e}`);const n=`Sorry, we could not find "${e}" in the dictionary, or the service is down. You can try the search again at later time or head to the <a href="https://www.dictionary.com/" target="_blank">web</a> instead.`;if(t.status>=200&&t.status<=299){let e=await t.json(),i="";if(e[0]){console.log(e[0]);const t=e[0].word,n=e[0].meanings[0].partOfSpeech?e[0].meanings[0].partOfSpeech:"",o=e[0].phonetics.length&&e[0].phonetics[0].text?e[0].phonetics[0].text:"";let a="";o.length&&(i=` (${o})`),e[0].phonetics.length&&(e[0].phonetics.forEach((e=>{if(void 0!==e.audio&&e.audio.length)return a=`<a href="${e.audio}" target="_blank"><svg width="25px" height="20px" viewBox="-1 -14 40 40" xmlns="http://www.w3.org/2000/svg"><title>file_type_audio</title><path d="M17.229,4a.9.9,0,0,0-.569.232l-7.6,6.32a1.158,1.158,0,0,1-.955.328H3.208A1.2,1.2,0,0,0,2,12.088v7.826A1.2,1.2,0,0,0,3.208,21.12H8.1a1.158,1.158,0,0,1,.955.328l7.6,6.32c.521.433,1.081.224,1.081-.289V4.522A.494.494,0,0,0,17.229,4ZM27,6.3,25.209,8.093a14.708,14.708,0,0,1,0,15.844l1.785,1.776A17.19,17.19,0,0,0,27,6.3Zm-4.333,4.323L20.905,12.4a6.035,6.035,0,0,1,0,7.237l1.756,1.756a8.554,8.554,0,0,0,.01-10.769Z" style="fill:#00007f"/></svg></a>`})),console.log(a));const d=e[0].meanings[0].definitions[0].definition?e[0].meanings[0].definitions[0].definition:"";return`${t.toUpperCase()} ${a}- ${n}${i}: ${d}`}return n}return n})(e.target.innerText).then((e=>{t.innerHTML=e,e.includes("Sorry, we could not find ")?n.classList.add("def-tooltip-not-found"):n.classList.remove("def-tooltip-not-found")}))}(()=>{document.head.appendChild(document.createElement("style")).innerText="\n/*GENERAL*/ .p { border: 1px solid dodgerblue; border-radius: .5rem; padding: .5rem; margin: 1rem 5rem; font-size: 15px; line-height: 21px; } .hidden { display: none; } /*DEFINITION GROUP*/ .def-div { background-color: dodgerblue; position: fixed; z-index: 99999999; min-width: 100%; height: 32px; top: 0; text-align: left; } .def-span { padding: 0 0 12px 4px; text-align: center; color: blue; font-weight: bold; font-style: italic; margin: 0.5rem; } .def-help { font-style: italic; margin: 0.5rem; } .def-help a:link { color: blue; } .def-help a:visited { color: purple; } .def-help a:hover { color: orange; } .def-help a:active { color: white; } .def-audio { width: 32px; height: 32px; margin-bottom: -.3rem; padding-left: 4px; display: inline-block; background-image: url(\"data:image/svg+xml,%3Csvg width='25px' height='20px' viewBox='-1 -16 40 44' xmlns='http://www.w3.org/2000/svg'%3E%3Ctitle%3Efile_type_audio%3C/title%3E%3Cpath d='M17.229,4a.9.9,0,0,0-.569.232l-7.6,6.32a1.158,1.158,0,0,1-.955.328H3.208A1.2,1.2,0,0,0,2,12.088v7.826A1.2,1.2,0,0,0,3.208,21.12H8.1a1.158,1.158,0,0,1,.955.328l7.6,6.32c.521.433,1.081.224,1.081-.289V4.522A.494.494,0,0,0,17.229,4ZM27,6.3,25.209,8.093a14.708,14.708,0,0,1,0,15.844l1.785,1.776A17.19,17.19,0,0,0,27,6.3Zm-4.333,4.323L20.905,12.4a6.035,6.035,0,0,1,0,7.237l1.756,1.756a8.554,8.554,0,0,0,.01-10.769Z' style='fill:%23000000'/%3E%3C/svg%3E\"); } /*TOOLTIPS*/ .def-tooltip { content: (data-tooltip); position: relative; -webkit-transition: all 0.3s ease; -o-transition: all 0.3s ease; transition: all 0.3s ease; text-decoration: none; cursor: -webkit-grabbing; cursor: grabbing; z-index: 999999; -webkit-box-sizing: border-box; box-sizing: border-box; } .def-tooltip-not-found { color: white; font-weight: bold; background: red; } /*TOGGLE SWITCH*/ input[type=checkbox], .def-input { margin: 0; -webkit-appearance: none; -moz-appearance: none; appearance: none; padding: 0 0 0 30px; border-radius: 16px; background: -o-radial-gradient(circle 12px, white 100%, transparent calc(100% + 1px)) #ccc -16px; background: radial-gradient(circle 12px, white 100%, transparent calc(100% + 1px)) #ccc -16px; -webkit-transition: 0.3s ease-in-out; -o-transition: 0.3s ease-in-out; transition: 0.3s ease-in-out; position: inherit; height: 32px; width: 64px; top: 0; bottom: 0; -webkit-box-shadow: none; box-shadow: none; } .def-input::before { content: \"OFF\"; font: bold 12px/32px Verdana; color: white; text-shadow: 0 1px black; } .def-input:checked { padding: 0 0 0 8px; background-color: rgb(37, 151, 62); background-position: 16px; height: 32px; width: 64px; } .def-input:checked::before { content: \"ON\"; }\n    ";const i=document.getElementsByTagName("body")[0],o=document.createElement("div");o.classList.add("def-div"),i.insertBefore(o,i.firstChild);const a=document.createElement("label");o.appendChild(a);const d=document.createElement("span");d.classList.add("def-span"),d.innerText="Definitions",a.appendChild(d);const l=document.createElement("input");l.setAttribute("type","checkbox"),l.classList.add("def-input"),a.appendChild(l);const r=document.createElement("span");let s;r.setAttribute("id","def-help"),r.classList.add("hidden","def-help"),r.innerText="Hover over a word to highlight, then click/tap to show definition tooltip.",a.appendChild(r);let c=document.getElementsByTagName("p"),p=[];const h=e=>{let t=(e=e.replace("&nbsp;"," ")).split(" "),n="";return t.forEach((e=>{n+=`<span>${e}</span> `})),n};l.onchange=()=>{if(l.checked){r.classList.remove("hidden");for(let i=0;i<c.length;i++)if(null!=c[i]&&""!==c[i].innerText){c[i].classList.add("p"),p.push(c[i].innerHTML),c[i].innerHTML=h(c[i].innerText),s=c[i].getElementsByTagName("span");for(let i=0;i<s.length;i++)s[i].onmouseover=e,s[i].onmouseout=t,s[i].onclick=n}}else{r.classList.add("hidden"),r.innerText="Hover over a word to highlight, then click/tap to show definition tooltip.";for(let e=0;e<c.length;e++)null!=c[e]&&""!==c[e].innerText&&(c[e].classList.remove("p"),c[e].innerHTML=p[e])}}})()})();