const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');
let count = 0;

let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQuote() {
    showLoadingSpinner();
    // Pick a random quote from apiQuotes array
    setTimeout(() => {
        let randNum = Math.ceil(Math.random() * apiQuotes.length);
        const quote = apiQuotes[randNum];

        if(!quote.author) {
            quote.author = 'Anonymous';
        }

        // Check Quote length to determine styling
        if(quote.text.length > 100) {
            quoteText.classList.add('long-quote');
        }
        else {
            quoteText.classList.remove('long-quote');
        }

        authorText.textContent = quote.author;
        quoteText.textContent = quote.text;

        removeLoadingSpinner();
    }, 400);
}

async function getQuotesFromAPI() {
    showLoadingSpinner();
    const apiUrl ="https://jacintodesign.github.io/quotes-api/data/quotes.json";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        // throw new Error("o");
        newQuote();
    } catch(error) {
        if(count == 10) {
            console.log("ERROR FECTHING THE QUOTES");
            removeLoadingSpinner();
        }
        else {
            count += 1;
            getQuotesFromAPI();
        }
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    open(twitterUrl, '_blank');
}

// On load 
getQuotesFromAPI();

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

