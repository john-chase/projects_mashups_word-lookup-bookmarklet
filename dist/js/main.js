javascript:(()=>{function e(){this.style.backgroundColor="yellow"}function t(){this.style.backgroundColor="transparent",this.classList.remove("def-tooltip")}function n(e){e.target,function(e){e=(e=e.replace(/[\u2000-\u206F\u2E00-\u2E7F!"#$%&()*+,\.\/:;<=>?@\[\]^_`{|}~]/g,"")).replace(/'(.*?)'/g,"$1"),console.log(e);var t=`Sorry, we could not find "${e}" in the dictionary, or the service is down. You can try the search again at later time or head to the <a href="https://www.dictionary.com/" target="_blank">web</a> instead.`,n=document.getElementsByClassName("def-div")[0],i=document.getElementById("def-help");i.innerText="",fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${e}`).then((e=>{if(e.status>=200&&e.status<=299)return e.json();throw new Error(t)})).then((e=>{var o="";if(e[0]){var a=e[0].word,r=e[0].meanings[0].partOfSpeech?e[0].meanings[0].partOfSpeech:"",d=e[0].phonetics.length&&e[0].phonetics[0].text?e[0].phonetics[0].text:"",s="";d.length&&(o=` (${d})`),e[0].phonetics.length&&e[0].phonetics.forEach((e=>{if(void 0!==e.audio&&e.audio.length)return s=`<a href="${e.audio}" target="_blank"><svg class="def-svg" width="25px" height="20px" viewBox="-1 -14 40 40" xmlns="http://www.w3.org/2000/svg"><title>file_type_audio</title><path d="M17.229,4a.9.9,0,0,0-.569.232l-7.6,6.32a1.158,1.158,0,0,1-.955.328H3.208A1.2,1.2,0,0,0,2,12.088v7.826A1.2,1.2,0,0,0,3.208,21.12H8.1a1.158,1.158,0,0,1,.955.328l7.6,6.32c.521.433,1.081.224,1.081-.289V4.522A.494.494,0,0,0,17.229,4ZM27,6.3,25.209,8.093a14.708,14.708,0,0,1,0,15.844l1.785,1.776A17.19,17.19,0,0,0,27,6.3Zm-4.333,4.323L20.905,12.4a6.035,6.035,0,0,1,0,7.237l1.756,1.756a8.554,8.554,0,0,0,.01-10.769Z" style="fill:#00007f"/></svg></a>`}));var l=e[0].meanings[0].definitions[0].definition?e[0].meanings[0].definitions[0].definition:"";console.log(`${a.toUpperCase()}${s} - ${r}${o}: ${l}`),n.classList.remove("def-tooltip-not-found"),i.innerHTML=`${a.toUpperCase()}${s} - ${r}${o}: ${l}`}else n.classList.add("def-tooltip-not-found"),i.innerText=t})).catch((e=>{n.classList.add("def-tooltip-not-found"),i.innerText=t,console.log(e)}))}(e.target.innerText)}(()=>{document.head.appendChild(document.createElement("style")).innerText="\nmain { padding: 1rem; } /*GENERAL*/ .p { border: 1px solid dodgerblue; border-radius: .5rem; padding: .5rem; margin: 1rem 5rem; font-size: 15px; line-height: 21px; } .hidden { display: none; } /*DEFINITION GROUP*/ .def-div { background-color: dodgerblue; color: black; position: fixed; top: 0; min-width: 100%; height: 32px; z-index: 99999999; text-align: left; line-height: 1rem; font-size: 12px; font-style: italic; font-weight: 100; font-family: Verdana, Geneva, Tahoma, sans-serif; word-spacing: -1px; varter-spacing: -1px; } .def-span { padding: 0 0 12px 4px; text-align: center; color: blue; font-weight: bold; font-style: italic; margin: 0.5rem; } .def-help { margin: 0 0 0 0.5rem; } .def-help a:link { color: blue; } .def-help a:visited { color: purple; } .def-help a:hover { color: orange; } .def-help a:active { color: white; } .def-audio { width: 32px; height: 32px; margin-bottom: -.3rem; padding-left: 4px; display: inline-block; background-image: url(\"data:image/svg+xml,%3Csvg width='20px' height='20px' viewBox='-1 -15 32 42' xmlns='http://www.w3.org/2000/svg'%3E%3Ctitle%3Efile_type_audio%3C/title%3E%3Cpath d='M17.229,4a.9.9,0,0,0-.569.232l-7.6,6.32a1.158,1.158,0,0,1-.955.328H3.208A1.2,1.2,0,0,0,2,12.088v7.826A1.2,1.2,0,0,0,3.208,21.12H8.1a1.158,1.158,0,0,1,.955.328l7.6,6.32c.521.433,1.081.224,1.081-.289V4.522A.494.494,0,0,0,17.229,4ZM27,6.3,25.209,8.093a14.708,14.708,0,0,1,0,15.844l1.785,1.776A17.19,17.19,0,0,0,27,6.3Zm-4.333,4.323L20.905,12.4a6.035,6.035,0,0,1,0,7.237l1.756,1.756a8.554,8.554,0,0,0,.01-10.769Z' style='fill:%23000000'/%3E%3C/svg%3E\"); } .def-svg { margin-right: -.4rem; } /*TOOLTIPS*/ .def-tooltip { content: (data-tooltip); position: relative; -webkit-transition: all 0.3s ease; -o-transition: all 0.3s ease; transition: all 0.3s ease; text-decoration: none; cursor: -webkit-grabbing; cursor: grabbing; z-index: 999999; -webkit-box-sizing: border-box; box-sizing: border-box; } .def-tooltip-not-found { color: white; font-weight: bold; background: red; } /*TOGGLE SWITCH*/ input[type=checkbox], .def-input { margin: 0; -webkit-appearance: none; -moz-appearance: none; appearance: none; padding: 0 0 0 30px; border-radius: 16px; background: -o-radial-gradient(circle 12px, white 100%, transparent calc(100% + 1px)) #ccc -16px; background: radial-gradient(circle 12px, white 100%, transparent calc(100% + 1px)) #ccc -16px; -webkit-transition: 0.3s ease-in-out; -o-transition: 0.3s ease-in-out; transition: 0.3s ease-in-out; position: inherit; height: 32px; width: 64px; top: 0; bottom: 0; -webkit-box-shadow: none; box-shadow: none; } .def-input::before { content: \"OFF\"; font: bold 12px/32px Verdana; color: white; text-shadow: 0 1px black; } .def-input:checked { padding: 0 0 0 8px; background-color: rgb(37, 151, 62); background-position: 16px; height: 32px; width: 64px; } .def-input:checked::before { content: \"ON\"; }\n    ";var i=document.getElementsByTagName("body")[0],o=document.createElement("div");o.classList.add("def-div"),i.insertBefore(o,i.firstChild);var a=document.createElement("label");o.appendChild(a);var r=document.createElement("span");r.classList.add("def-span"),r.innerText="Definitions",a.appendChild(r);var d=document.createElement("input");d.setAttribute("type","checkbox"),d.classList.add("def-input"),a.appendChild(d);var s,l=document.createElement("span");l.setAttribute("id","def-help"),l.classList.add("hidden","def-help"),l.innerText="Hover over a word to highlight, then click/tap to show definition tooltip.",a.appendChild(l);var p=document.getElementsByTagName("p"),c=[],h=function(e){var t=e.split(" "),n="";return t.forEach((function(e){e.includes(",")?(n+=`<span>${e.split(",")[0]}</span>,`,n+=`<span>${e.split(",")[1]}</span> `):-1!==e.indexOf(/\xC2\xA0\s/)?(n+=`<span>${e.split(" ")[0]}</span>,`,n+=`<span>${e.split(" ")[1]}</span> `):n+=`<span>${e}</span> `})),n};d.onchange=function(){if(d.checked){l.classList.remove("hidden");for(var i=0;i<p.length;i++)if(null!=p[i]&&""!==p[i].innerText){p[i].classList.add("p"),c.push(p[i].innerHTML),p[i].innerHTML=h(p[i].innerText),s=p[i].getElementsByTagName("span");for(var o=0;o<s.length;o++)s[o].onmouseover=e,s[o].onmouseout=t,s[o].onclick=n}}else for(l.classList.add("hidden"),l.innerText="Hover over a word to highlight, then click/tap to show definition tooltip.",i=0;i<p.length;i++)null!=p[i]&&""!==p[i].innerText&&(p[i].classList.remove("p"),p[i].innerHTML=c[i])}})()})();