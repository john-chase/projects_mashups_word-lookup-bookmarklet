javascript: (() => {
    var styleElem = document.createElement('link');
    styleElem.setAttribute("rel", "stylesheet");
    styleElem.setAttribute("href", "https://projects.theartoftechllc.com/mashups/bookmarklet/css/bookmarklet.css");
    document.getElementsByTagName("head")[0].appendChild(styleElem);
    var body = document.getElementsByTagName("body")[0];
    var defDiv = document.createElement("div");
    defDiv.classList.add("def-div");
    body.insertBefore(defDiv, body.firstChild);
    var defSwitch = document.createElement("label");
    defSwitch.classList.add('def-label');
    defDiv.appendChild(defSwitch);
    var defSpan = (document.createElement("span"));
    defSpan.classList.add("def-span");
    defSpan.innerText = "Definitions";
    defSwitch.appendChild(defSpan);
    var defToggle = document.createElement("input");
    defToggle.setAttribute("type", "checkbox");
    defToggle.classList.add('def-input');
    defSwitch.appendChild(defToggle);
    var defHelp = document.createElement("span");
    defHelp.setAttribute("id", "def-help");
    defHelp.classList.add('hidden', 'def-help');
    defHelp.innerText = "Hover over a word to highlight, then click/tap to show definition tooltip.";
    defSwitch.appendChild(defHelp);
    var spans;
    var p = document.getElementsByTagName("p");
    var originalP = [];

    function onmouseoverspan() {
        this.style.backgroundColor = "yellow";
    }

    function onmouseoutspan() {
        this.style.backgroundColor = "transparent";
        this.classList.remove('def-tooltip');
    }

    function onclickspan(e) {
        var tag = e.target;
        wordLookupRequest(e.target.innerText);
    }
    var addSpans = function(paragraph) {
        var words = paragraph.split(" ");
        var newParagraph = '';
        words.forEach(function(word) {
            if (word.includes(",")) {
                newParagraph += `<span>${word.split(",")[0]}</span>,`;
                newParagraph += `<span>${word.split(",")[1]}</span> `;
            } else if (word.indexOf(/\xC2\xA0\s/) !== -1) {
                newParagraph += `<span>${word.split(" ")[0]}</span>,`;
                newParagraph += `<span>${word.split(" ")[1]}</span> `;
            } else {
                newParagraph += `<span>${word}</span> `;
            }
        });
        console.log("AddSpans ", newParagraph);
        return newParagraph;
    };
    defToggle.onchange = function() {
        if (defToggle.checked) {
            defHelp.classList.remove('hidden');
            for (var i = 0; i < p.length; i++) {
                if (p[i] == undefined || p[i].innerText === '') continue;
                p[i].classList.add("p");
                originalP.push(p[i].innerHTML);
                p[i].innerHTML = addSpans(p[i].innerText);
                spans = p[i].getElementsByTagName("span");
                for (var a = 0; a < spans.length; a++) {
                    spans[a].onmouseover = onmouseoverspan;
                    spans[a].onmouseout = onmouseoutspan;
                    spans[a].onclick = onclickspan;
                }
            }
        } else {
            defHelp.classList.add('hidden');
            defHelp.innerText = "Hover over a word to highlight, then click/tap to show definition tooltip.";
            for (var i = 0; i < p.length; i++) {
                if (p[i] == undefined || p[i].innerText === '') continue;
                p[i].classList.remove("p");
                p[i].innerHTML = originalP[i]
            }
        }
    };
})();
var wordLookupRequest = function(lookup) {
    lookup = lookup.replace(/[^\w\s]|_/g, '').replace(/\s+/g, " ");
    console.log("String to lookup: ", lookup);
    var defDiv = document.getElementsByClassName("def-div")[0];
    var sorry = `Sorry, we could not find ${lookup} in the dictionary, or the service is down. You can try the search again at later time or head to the <a href="https://www.dictionary.com/" target="_blank">web</a> instead.`;
    var defHelp = document.getElementById("def-help");
    defHelp.innerHTML = "";
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${lookup}`).then((response) => {
        if (response.status >= 200 && response.status <= 299) {
            return response.json();
        }
        throw new Error(sorry);
    }).then((json) => {
        var phon = "";
        if (json[0]) {
            var word = json[0].word;
            var speechPart = json[0].meanings[0].partOfSpeech ? json[0].meanings[0].partOfSpeech : '';
            var phonText = (json[0].phonetics.length && json[0].phonetics[0].text) ? json[0].phonetics[0].text : '';
            var audio = '';
            if (phonText.length) {
                phon = ` (${phonText})`
            }
            if (json[0].phonetics.length) {
                var phonetics = json[0].phonetics;
                phonetics.forEach(item => {
                    if (item.audio !== undefined && item.audio.length) return audio = `<a href="${item.audio}" target="_blank"><svg class="def-svg" width="25px" height="20px" viewBox="-1 -14 40 40" xmlns="http://www.w3.org/2000/svg"><title>file_type_audio</title><path d="M17.229,4a.9.9,0,0,0-.569.232l-7.6,6.32a1.158,1.158,0,0,1-.955.328H3.208A1.2,1.2,0,0,0,2,12.088v7.826A1.2,1.2,0,0,0,3.208,21.12H8.1a1.158,1.158,0,0,1,.955.328l7.6,6.32c.521.433,1.081.224,1.081-.289V4.522A.494.494,0,0,0,17.229,4ZM27,6.3,25.209,8.093a14.708,14.708,0,0,1,0,15.844l1.785,1.776A17.19,17.19,0,0,0,27,6.3Zm-4.333,4.323L20.905,12.4a6.035,6.035,0,0,1,0,7.237l1.756,1.756a8.554,8.554,0,0,0,.01-10.769Z" style="fill:#00007f"/></svg></a>`;
                });
            }
            var defo = json[0].meanings[0].definitions[0].definition ? json[0].meanings[0].definitions[0].definition : '';
            console.log(`${word.toUpperCase()}${audio} - ${speechPart}${phon}: ${defo}`);
            defDiv.classList.remove('def-tooltip-not-found');
            defHelp.innerHTML = `${word.toUpperCase()}${audio} - ${speechPart}${phon}: ${defo}`;
        } else {
            defDiv.classList.add('def-tooltip-not-found');
            defHelp.innerHTML = sorry;
        }
    }).catch((error) => {
        defDiv.classList.add('def-tooltip-not-found');
        defHelp.innerHTML = sorry;
        console.log(error);
    });
};