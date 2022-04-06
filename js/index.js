(() => {
    /*inject styles*/
    // const styleElem = document.head.appendChild(document.createElement("style"));
    // styleElem.innerText = ` `;
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
    defHelp.classList.add('hidden', 'def-help');
    defHelp.innerText = "Hover over a word to highlight, then click/tap to show definition tooltip.";
    defSwitch.appendChild(defHelp);
    let spans;
    let p = document.getElementsByTagName("p");
    let originalP = [];
    /*break p into words, wrap with spans*/
    const addSpans = (paragraph) => {
        paragraph = paragraph.replace('&nbsp;', ' '); //!!!no workey
        let words = paragraph.split(" ");
        let newParagraph = '';
        words.forEach(word => {
            newParagraph += `<span>${word}</span> `;
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
    const sorry = `Sorry, we could not find "${lookup}" in the dictionary, or the service is down. You can try the search again at later time or head to the web instead.`
    if (response.status >= 200 && response.status <= 299) {
        let json = await response.json();
        let phon = "";
        if (json[0]) {
            const word = json[0].word;
            const speechPart = json[0].meanings[0].partOfSpeech ? json[0].meanings[0].partOfSpeech : '';
            const phonText = (json[0].phonetics.length && json[0].phonetics[0].text) ? json[0].phonetics[0].text : '';
            if (phonText.length) {
                phon = ` (${phonText})`
            }
            const defo = json[0].meanings[0].definitions[0].definition ? json[0].meanings[0].definitions[0].definition : '';
            return `${word} - ${speechPart}${phon}: ${defo}`
        } else {
            return sorry;
        }
    } else {
        return sorry;
    }
    // }
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
    wordLookupRequest(e.target.innerText).then((word) => {
        tag.setAttribute('data-tooltip', word);
        word.includes("Sorry, we could not find ") ? tag.classList.add('def-tooltip', 'def-tooltip-not-found') : tag.classList.add('def-tooltip');
    });
}