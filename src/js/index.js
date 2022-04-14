(() => {
    /*inject styles*/
    const styleElem = document.head.appendChild(document.createElement("style"));
    styleElem.innerText = `
main { padding: 1rem; } /*GENERAL*/ .p { border: 1px solid dodgerblue; border-radius: .5rem; padding: .5rem; margin: 1rem 5rem; font-size: 15px; line-height: 21px; } .hidden { display: none; } /*DEFINITION GROUP*/ .def-div { background-color: dodgerblue; color: black; position: fixed; top: 0; min-width: 100%; height: 32px; z-index: 99999999; text-align: left; line-height: 1rem; font-size: 12px; font-style: italic; font-weight: 100; font-family: Verdana, Geneva, Tahoma, sans-serif; word-spacing: -1px; letter-spacing: -1px; } .def-span { padding: 0 0 12px 4px; text-align: center; color: blue; font-weight: bold; font-style: italic; margin: 0.5rem; } .def-help { margin: 0 0 0 0.5rem; } .def-help a:link { color: blue; } .def-help a:visited { color: purple; } .def-help a:hover { color: orange; } .def-help a:active { color: white; } .def-audio { width: 32px; height: 32px; margin-bottom: -.3rem; padding-left: 4px; display: inline-block; background-image: url("data:image/svg+xml,%3Csvg width='20px' height='20px' viewBox='-1 -15 32 42' xmlns='http://www.w3.org/2000/svg'%3E%3Ctitle%3Efile_type_audio%3C/title%3E%3Cpath d='M17.229,4a.9.9,0,0,0-.569.232l-7.6,6.32a1.158,1.158,0,0,1-.955.328H3.208A1.2,1.2,0,0,0,2,12.088v7.826A1.2,1.2,0,0,0,3.208,21.12H8.1a1.158,1.158,0,0,1,.955.328l7.6,6.32c.521.433,1.081.224,1.081-.289V4.522A.494.494,0,0,0,17.229,4ZM27,6.3,25.209,8.093a14.708,14.708,0,0,1,0,15.844l1.785,1.776A17.19,17.19,0,0,0,27,6.3Zm-4.333,4.323L20.905,12.4a6.035,6.035,0,0,1,0,7.237l1.756,1.756a8.554,8.554,0,0,0,.01-10.769Z' style='fill:%23000000'/%3E%3C/svg%3E"); } .def-svg { margin-right: -.4rem; } /*TOOLTIPS*/ .def-tooltip { content: (data-tooltip); position: relative; -webkit-transition: all 0.3s ease; -o-transition: all 0.3s ease; transition: all 0.3s ease; text-decoration: none; cursor: -webkit-grabbing; cursor: grabbing; z-index: 999999; -webkit-box-sizing: border-box; box-sizing: border-box; } .def-tooltip-not-found { color: white; font-weight: bold; background: red; } /*TOGGLE SWITCH*/ input[type=checkbox], .def-input { margin: 0; -webkit-appearance: none; -moz-appearance: none; appearance: none; padding: 0 0 0 30px; border-radius: 16px; background: -o-radial-gradient(circle 12px, white 100%, transparent calc(100% + 1px)) #ccc -16px; background: radial-gradient(circle 12px, white 100%, transparent calc(100% + 1px)) #ccc -16px; -webkit-transition: 0.3s ease-in-out; -o-transition: 0.3s ease-in-out; transition: 0.3s ease-in-out; position: inherit; height: 32px; width: 64px; top: 0; bottom: 0; -webkit-box-shadow: none; box-shadow: none; } .def-input::before { content: "OFF"; font: bold 12px/32px Verdana; color: white; text-shadow: 0 1px black; } .def-input:checked { padding: 0 0 0 8px; background-color: rgb(37, 151, 62); background-position: 16px; height: 32px; width: 64px; } .def-input:checked::before { content: "ON"; }
    `;
    /*set up elements*/
    const body = document.getElementsByTagName("body")[0];
    const defDiv = document.createElement("div");
    defDiv.classList.add("def-div");
    body.insertBefore(defDiv, body.firstChild);
    const defSwitch = document.createElement("label");
    defDiv.appendChild(defSwitch);
    const defSpan = (document.createElement("span"));
    defSpan.classList.add("def-span");
    defSpan.innerText = "Definitions";
    defSwitch.appendChild(defSpan);
    const defToggle = document.createElement("input");
    defToggle.setAttribute("type", "checkbox");
    defToggle.classList.add('def-input');
    defSwitch.appendChild(defToggle);
    const defHelp = document.createElement("span");
    defHelp.setAttribute("id", "def-help");
    defHelp.classList.add('hidden', 'def-help');
    defHelp.innerText = "Hover over a word to highlight, then click/tap to show definition tooltip.";
    defSwitch.appendChild(defHelp);
    let spans;
    let p = document.getElementsByTagName("p");
    let originalP = [];
    /*break p into words, wrap with spans*/
    const addSpans = (paragraph) => {
        let words = paragraph.split(" ");
        let newParagraph = '';
        words.forEach(word => {
            if(word.includes(",")) {
                newParagraph += `<span>${word.split(",")[0]}</span>,`;
                newParagraph += `<span>${word.split(",")[1]}</span> `;
            } else if (word.indexOf(/\xC2\xA0\s/) !== -1) {
                newParagraph += `<span>${word.split(" ")[0]}</span>,`;
                newParagraph += `<span>${word.split(" ")[1]}</span> `;
            } else {
                newParagraph += `<span>${word}</span> `;
            }
        });
        return newParagraph;
    }
    /*add listeners*/
    defToggle.onchange = () => {
        if (defToggle.checked) {
            /*add spans and toggle ON*/
            defHelp.classList.remove('hidden');
            for (let i = 0; i < p.length; i++) {
                if (p[i] == undefined || p[i].innerText === '') continue;
                p[i].classList.add("p");
                originalP.push(p[i].innerHTML);
                p[i].innerHTML = addSpans(p[i].innerText);
                spans = p[i].getElementsByTagName("span");
                for (let a = 0; a < spans.length; a++) {
                    spans[a].onmouseover = onmouseoverspan;
                    spans[a].onmouseout = onmouseoutspan;
                    spans[a].onclick = onclickspan;
                }
            }
        } else {
            /*remove spans and toggle OFF*/
            defHelp.classList.add('hidden');
            defHelp.innerText = "Hover over a word to highlight, then click/tap to show definition tooltip.";
            for (let i = 0; i < p.length; i++) {
                if (p[i] == undefined || p[i].innerText === '') continue;
                p[i].classList.remove("p");
                p[i].innerHTML = originalP[i]
            }
        }
    }
})();
/*fetch word*/
const wordLookupRequest = async (lookup) => {
    lookup = lookup.replace(/[\u2000-\u206F\u2E00-\u2E7F!"#$%&()*+,\.\/:;<=>?@\[\]^_`{|}~]/g, ''); //all punct but - and '
    lookup = lookup.replace(/'(.*?)'/g, '$1'); //add ' if not just one (quoted)
    console.log(lookup);
    let response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${lookup}`
    );
    const sorry = `Sorry, we could not find "${lookup}" in the dictionary, or the service is down. You can try the search again at later time or head to the <a href="https://www.dictionary.com/" target="_blank">web</a> instead.`
    if (response.status >= 200 && response.status <= 299) {
        let json = await response.json();
        let phon = ""; 
        if (json[0]) {
            // console.log(json[0]);
            const word = json[0].word;
            const speechPart = json[0].meanings[0].partOfSpeech ? json[0].meanings[0].partOfSpeech : '';
            const phonText = (json[0].phonetics.length && json[0].phonetics[0].text) ? json[0].phonetics[0].text : '';
            let audio = '';
            if (phonText.length) {
                phon = ` (${phonText})`
            }
            if(json[0].phonetics.length) {
                const phonetics = json[0].phonetics
                phonetics.forEach(item => {
                    if(item.audio !== undefined && item.audio.length) return audio = `<a href="${item.audio}" target="_blank"><svg class="def-svg" width="25px" height="20px" viewBox="-1 -14 40 40" xmlns="http://www.w3.org/2000/svg"><title>file_type_audio</title><path d="M17.229,4a.9.9,0,0,0-.569.232l-7.6,6.32a1.158,1.158,0,0,1-.955.328H3.208A1.2,1.2,0,0,0,2,12.088v7.826A1.2,1.2,0,0,0,3.208,21.12H8.1a1.158,1.158,0,0,1,.955.328l7.6,6.32c.521.433,1.081.224,1.081-.289V4.522A.494.494,0,0,0,17.229,4ZM27,6.3,25.209,8.093a14.708,14.708,0,0,1,0,15.844l1.785,1.776A17.19,17.19,0,0,0,27,6.3Zm-4.333,4.323L20.905,12.4a6.035,6.035,0,0,1,0,7.237l1.756,1.756a8.554,8.554,0,0,0,.01-10.769Z" style="fill:#00007f"/></svg></a>`;
                });
            }
            const defo = json[0].meanings[0].definitions[0].definition ? json[0].meanings[0].definitions[0].definition : '';
            return `${word.toUpperCase()}${audio} - ${speechPart}${phon}: ${defo}`
        } else {
            return sorry;
        }
    } else {
        return sorry;
    }
}
/*highlight the word*/
function onmouseoverspan() {
    this.style.backgroundColor = "yellow";
}
/*unhighlight word, remove tooltip*/
function onmouseoutspan() {
    this.style.backgroundColor = "transparent";
    this.classList.remove('def-tooltip');
}
/*fetch word, then add data/class*/
function onclickspan(e) {
    const tag = e.target;
    const defHelp = document.getElementById("def-help");
    const defDiv = document.getElementsByClassName("def-div")[0];
    defHelp.innerText = "";
    wordLookupRequest(e.target.innerText).then((word) => {
        defHelp.innerHTML = word;
        word.includes("Sorry, we could not find ") ? defDiv.classList.add('def-tooltip-not-found') : defDiv.classList.remove('def-tooltip-not-found');
    });
}