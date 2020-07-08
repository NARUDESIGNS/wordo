import {renderData} from "/processData.js"

//ERROR | TIP MESSAGES
const messages = document.getElementById("messages");
const warning = document.getElementById("warning");
const loader = document.getElementById("loader");
const searchTip = document.getElementById("search-tip");
const connectionTip = document.getElementById("connection-tip");

//INTRO VIEW RESOURCES
const introView = document.getElementById("intro-view");
const introMessage = document.getElementById("intro-message");
const logo = document.getElementById("logo");
const aboutWordo = document.getElementById("about-wordo");
const introExploreBtn = document.getElementById("intro-explore-btn");
const introBody = document.getElementById("intro-body");
const introViewExploreBtn = document.getElementById("intro-view-explore-btn"); //explore btn in same page as images

//MAIN VIEW RESOURCES
const mainView = document.getElementById("main-view");
const mainBody = document.getElementById("main-body");
const menu = document.getElementById("menu");
const menuIcon = document.getElementById("menu-icon");
const closeMenuIcon = document.getElementById("close-menu");
const recentSearchHeader = document.getElementById("recent-search-header");
const recentSearch = document.getElementById("recent-search");
const userInput = document.getElementById("user-input");
const searchBtn = document.getElementById("search-btn");

//BOOKMARK VIEW
const bookmarkView = document.getElementById("bookmark-view");
const wordsSaved = document.getElementById("words-saved");
//const wordOfTheDay = document.getElementById("word-of-the-day");
const bookmarkExitBtn = document.getElementById("bookmark-exit-btn");
const savedWordsContainer = document.getElementById("saved-words-container");


//-------------------- FUNCTIONS ----------------------
//show element
function show(element, value = "block") {
    element.style.display = value;
}
//hide element
function hide(element) {
    element.style.display = "none";
}


//-------------------- LOG MESSAGES ---------------------
export function logMessage(element) {
    hide(mainBody);
    hide(searchTip);
    hide(connectionTip);
    hide(loader);
    show(messages, "flex");
    show(element, "flex");
}
export function logWarning(message) {
    warning.innerText = message;
    warning.classList.toggle("slide-warning-up");
    show(warning);
    setTimeout(() => {
        warning.classList.toggle("slide-warning-up");
        warning.classList.toggle("slide-warning-down");
        setTimeout(() => {
           hide(warning);  
        }, 100)
    }, 3500);
}
//logMessage(loader);


//----------------------- CREATE ELEMENTS ------------------
//create word container
export function createWordContainer(word, partOfSpeech, transcription, definition){
    if(partOfSpeech === null) partOfSpeech = "unknown";
    mainBody.innerHTML += `
        <section id="${word}-${partOfSpeech}" class="word-container">
            <div class="word-utils">
                <p class="word-utils__part-of-speech">${partOfSpeech.toLowerCase()}</p>
                <p class="word-utils__save">save</p>
            </div>

            <div class="word">
                <h3 class="word__text">${word.toUpperCase()}</h3>
                <p class="word__transcription">/ ${transcription} /</p>
                <p class="word__definition">${definition}</p>
            </div>
        </section>
    `;
    //to make id unique for each word container, set id as word-partofspeech
    let wordContainer = document.getElementById(`${word}-${partOfSpeech}`);
    //capitalize the part of speech
    wordContainer.firstElementChild.firstElementChild.style.textTransform = "capitalize";
    wordContainer.style.backgroundColor = `var(--${partOfSpeech.toLowerCase()})`;
}

//create definitions
export function createDefinitions(word, partOfSpeech, definitions) {
    mainBody.innerHTML += `
        <section id="${word}-${partOfSpeech}-definitions" class="definitions-container">
            <h4 class="definitions-container__header">Definitions</h4>
        </section>
    `;
    let definitionsContainer = document.getElementById(`${word}-${partOfSpeech}-definitions`);
    //note definitions is an array of sentences (stings)
    for(let definition of definitions){
        definitionsContainer.innerHTML += `
            <p class="definitions-container__text">${definition}</p>
        `;
    }
}

//create examples
export function createExamples(word, partOfSpeech, examples){
    mainBody.innerHTML += `
        <section class="examples-overall-container">
            <h4 class="examples-overall-container__header">Examples</h4>

            <div id="${word}-${partOfSpeech}-examples" class="example-container">
            </div>
        </section>
    `;
    let examplesContainer = document.getElementById(`${word}-${partOfSpeech}-examples`);
    for(let example of examples) {
        examplesContainer.innerHTML += `
            <section class="example">
                <p class="example__text"> ${example} </p>
            </section>
        `;
    }
}

//create syllables
export function createSyllables(word, partOfSpeech, syllable, count) {
    if(partOfSpeech === null) partOfSpeech = "unknown";
    mainBody.innerHTML += `
        <section class="syllables-container">
            <h4 class="syllables-container__header">Syllables</h4>

            <div id="${word}-${partOfSpeech}-syllables" class="syllables">
                <p class="syllables__word">${syllable}</p>
                <p id="syllables-count" class="syllables__count">${count}</p>
            </div>
        </section>
    `;
    let syllablesBg = document.getElementById(`${word}-${partOfSpeech}-syllables`);
    syllablesBg.style.backgroundColor = `var(--${partOfSpeech})`;
    //change syllable count color to match syllable background color
    let syllablesCount = document.getElementById("syllables-count");
    syllablesCount.style.color = `var(--${partOfSpeech})`;
}

//create  synonyms & antonyms
export function createSynonymAntonym(synonyms = "none", antonyms = "none"){
    //antonyms and synonyms to from array to string
    if(synonyms) synonyms = synonyms.join(", ");
    if(synonyms) antonyms = antonyms.join(", ");
    mainBody.innerHTML += `
        <section class="synonym-antonym">
            <h4 class="synonym-antonym__header">Synonyms</h4>

            <div class="synonyms">
                <p class="synonyms__text">${synonyms}</p>
            </div>

            <hr class="synonym-antonym__divider"/>

            <h4 class="synonym-antonym__header">Antonyms</h4>

            <div class="synonyms">
                <p class="synonyms__text">${antonyms}</p>
            </div>
        </section>
    `;
}

//create recent searches
function createRecentSearch(word) {
    let searchContainer = document.createElement("section");
    searchContainer.setAttribute("class", "recent-search");
    searchContainer.innerHTML = `
        <p class="recent-search__word">${word}</p>
        <span class="recent-search__remove-icon"><i class="fa fa-times"></i></span>
    `;
    recentSearch.insertBefore(searchContainer, recentSearch.children[0]);

    //recently searched word is clicked
    let recentlySearchedWords = document.getElementsByClassName("recent-search__word");
    for(let word of recentlySearchedWords) {
        word.addEventListener("click", () => {
            userInput.value = word.innerText;
        })
    }

    //recently searched word is deleted
    let removeRecentSearchWord = document.getElementsByClassName("recent-search__remove-icon");
    for(let btn of removeRecentSearchWord) {
        btn.addEventListener("click", () => {
            recentSearch.removeChild(btn.parentElement);
            if(recentSearch.childElementCount < 1) { //if there are no recent searches
                hide(recentSearchHeader);
                hide(recentSearch);
            }
        })
    }
}
//createRecentSearch("holistic");


//--------------- API request ------------------
function getWordData(word){
    fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
		"x-rapidapi-key": "181bdbd4d8msh2fc3880ee0d5a4bp1f9d15jsna810d4b9bacf"
	}
    })
    .then(response => response.json())
    .then(data => {
        if(data.success !== false && data.results){
            console.log(data);
            createRecentSearch(word);
            if(recentSearch.childElementCount > 10) recentSearch.removeChild(recentSearch.lastElementChild);
            hide(loader);
            hide(messages);
            mainBody.innerHTML = "";
            userInput.value = "";
            show(mainBody);
            renderData(data);    
        }
        else {
            hide(messages);
            hide(loader);
            show(mainBody);
            setTimeout(() => {
                logWarning("word not found!");   
            }, 300);         
        }
    })
    .catch(error => {
        console.log(error);
        if(error.message === "Failed to fetch"){
            logMessage(connectionTip);
        }
        else {
            alert("error encountered searching that word! please search another");
        }
    }); 
}



//-------------------- VIEWS ----------------------

//----------- INTRO VIEW ---------------
//explore button on first page is clicked
introExploreBtn.addEventListener("click", () =>{
    introExploreBtn.style.display = "none";
    logo.classList.add("fade-out-logo");
    aboutWordo.classList.add("slide-out-text");
    setTimeout(() => {
        hide(introMessage);
        show(introBody);        
    }, 1300);
});

//intro view is clicked and links to main view
introViewExploreBtn.addEventListener("click", () => {
    hide(introView);
    show(mainView);
    logMessage(searchTip);
    mainView.classList.add("fade-element-in");
});


//---------- MAIN VIEW ------------------
//menu icon is clicked
menuIcon.addEventListener("click", () => {
    menu.classList.toggle("slide-menu-down");
    show(menu, "flex");
});

//menu icon is clicked
closeMenuIcon.addEventListener("click", () => {
    menu.classList.toggle("slide-menu-down");
    menu.classList.toggle("slide-menu-up");
    setTimeout(() => {
        hide(menu);
        menu.classList.toggle("slide-menu-up");
    }, 100);
});

createRecentSearch("samuel");
createRecentSearch("grace");
createRecentSearch("rich");
//searchbar is clicked
userInput.addEventListener("input", () => {
    if(userInput.value.startsWith(" ")) userInput.value = userInput.value.replace(" ", "");
    if(userInput.value === "") {
        hide(recentSearchHeader);
        hide(recentSearch);
    }
    else {
        //if there are recently searched words, display them
        if(recentSearch.childElementCount > 0) {
            recentSearch.classList.add("slide-recentSearch-up");
            recentSearchHeader.classList.add("slide-recentSearch-up");
            show(recentSearchHeader);
            show(recentSearch, "flex");
        }        
    }
})

//search button is clicked
searchBtn.addEventListener("click", () => {
    if(userInput.value){
        logMessage(loader);
        getWordData(userInput.value);   
        hide(recentSearchHeader);
        hide(recentSearch);  
    }
})


//---------- BOOKMARK VIEW ------------------
wordsSaved.addEventListener("click", () => {
    mainView.classList.add("slide-element-out");
    setTimeout(() => {
        hide(mainView);
        hide(menu);
        mainView.classList.remove("slide-element-out");
        bookmarkView.classList.add("fade-in");
        show(bookmarkView);
    }, 250)
})

bookmarkExitBtn.addEventListener("click", () => {
    bookmarkView.classList.add("fade-out");
    bookmarkView.classList.remove("fade-in");
    setTimeout(() => {
        hide(bookmarkView);
        show(mainView);
        bookmarkView.classList.remove("fade-out");
    }, 250)
})




//you should take this out later on when the app is ready
show(mainBody);
createWordContainer("Narufy", "verb", "na-ru-fai", "to show extreme excellence in all you do and attain mind blowing succes");
createDefinitions("narufy", "verb", ["Making something super succesful such that there are no possibililties of future errors.", "Planning something in a way that it doesn't fail even when external factors tend to interfere.", "a succesful state of leadership"]);
createExamples("narufy", "verb", ["The ability to narufy things is what people seek for these days", "If you narufy the exam then you'd become the best student in the entire department", "be patient when you have to narufy things, else you'd inadvertently make errors!"]);
createSyllables("narufy", "verb", "na-ru-fy", "3");
createSynonymAntonym(["plan", "success", "exceed", "prevail", "overcome", "progress", "pass", "win"], ["fail", "loose", "regress", "defeat", "fall"]);
let jsonData = {
    "word": "love",
    "results": [
        {
            "definition": "get pleasure from",
            "partOfSpeech": "verb",
            "synonyms": [
                "enjoy"
            ],
            "antonyms": [
                "hate"
            ],
            "examples": [
                "I love cooking",
                "dancing is what they love to do"
            ]
        }, 
        {
            "definition": "sexual activities (often including sexual intercourse) between two people",
            "partOfSpeech": "noun",
            "synonyms": [
                "love life",
                "lovemaking",
                "sexual love"
            ],
            "examples": [
                "his lovemaing disgusted her",
                "he hadn't had any love in months",
                "he has a very complicated love life such that no one will want to stay with him"
            ]
        },
 
        {
            "definition": "any objet of warm affection of devotion",
            "partOfSpeech": "noun",
            "synonyms": [
                "passion"
            ],
            "antonyms": [
                "dislike"
            ],
            "examples": [
                "the theatre was her first love",
            ]
        }
    ],

    "syllables": {
        "count": 1,
        "list": [
            "love"
        ]
    },

    "pronunciation": {
        "all": "lov"
    }
}

renderData(jsonData);



//------------------ BOOKMARK VIEW -------------------------

//save button is clicked
export function enableSave() {
    let save = document.getElementsByClassName("word-utils__save");
    for(let i = 0; i < save.length; i++) { 
        //save word from the API data in word variable
        let word = save[i].parentElement.nextElementSibling.firstElementChild.innerText;
        save[i].addEventListener("click", () => {
            //saveWord(word);
            renderSavedWords(word);
        })
    }
}

//this variable is used for making sure a word is saved before we make saved words unique
let wordExists = [];
function renderSavedWords(word){ console.log(typeof wordExists);
    //add to saved words and make sure a word doesn't get saved multiple times
    if(!wordExists.includes(word)){
        savedWordsContainer.innerHTML += `
            <div class="saved">
                <p class="saved__word">${word.toLowerCase()}</p>
                <span id="saved-remove-btn" class="saved__remove-icon"><i class="fa fa-times"></i></span>
            </div>
        `;
        wordExists.push(word);    
    }

    //saved word is deleted
    const deleteSavedWordBtns = document.getElementsByClassName("saved__remove-icon");
    for(let deleteBtn of deleteSavedWordBtns) {
        deleteBtn.addEventListener("click", () => {
            deleteBtn.parentElement.classList.add("fade-out");
            setTimeout(() => {
                savedWordsContainer.removeChild(deleteBtn.parentElement);
            }, 500);
            let text = deleteBtn.previousElementSibling.innerText;
            wordExists.splice(wordExists.indexOf(text), 1);
        })
    }
    let saved = document.getElementsByClassName("saved");
    for(let each of saved){
        each.addEventListener("click", () => {
            hide(bookmarkView);
            show(mainView);
            logMessage(loader);
            getWordData(each.firstElementChild.innerText);
        })
    }
}