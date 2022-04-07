# Mashup API Project: Word Lookup Bookmarklet
![The bookmarklet toolbar](dist/images/word-lookup-bookmarklet-bar.png)
## This application uses the [Free Dictionary API](https://dictionaryapi.dev/) to define words.


### What is a Bookmarklet (BKMT)?
- [Wikipedia Definition](https://en.wikipedia.org/wiki/Bookmarklet#:~:text=A%20bookmarklet%20is%20a%20bookmark,when%20user%20clicks%20on%20them.)

### How do I install a BKMT?
- [Matthew Reidsma's Github instructions](https://mreidsma.github.io/bookmarklets/installing.html)

More Instructions: Get the JavaScript code [here](https://github.com/john-chase/projects_mashups_word-lookup-bookmarklet/blob/main/dist/js/index.min.js) to paste into the URL input of your bookmarklet.

Notes: This BKMT works best on pages with text content like blogs, articles, news stories, etc. Tested on most modern browsers (not mobile devices - there are apps for that).

TL;DR

The application inspects the document for "p" (paragraph) tags, wraps them in blue borders to denote "active" lookup areas, and splits them into words that can then be highlighted and clicked for definition lookup. You can disable the functionality by toggling the Definitions switch at the top of the page or simply by refreshing.  

You can also visit the original [Project page](https://projects.theartoftechllc.com/mashups/word-lookup/index.html) for a demonstration.

If you enjoy this BKMT, consider a donation to the [API creator](https://www.paypal.com/paypalme/paytosuraj).