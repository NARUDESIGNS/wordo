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
const wordsSaved = document.getElementById("words-saved-link");
const bookmarkExitBtn = document.getElementById("bookmark-exit-btn");
const savedWordsContainer = document.getElementById("saved-words-container");
let savedWordsMessage = document.getElementById("saved-words-message");

//WORD OF THE DAY
const wordOfTheDay = document.getElementById("word-of-the-day");
wordOfTheDay.addEventListener("click", () => { alert("This feature will be added soon") });


//----------------------------------------     FUNCTIONS     ------------------------------------------
//show element
function show(element, value = "block") {
    element.style.display = value;
}
//hide element
function hide(element) {
    element.style.display = "none";
}


//-------------------- LOG MESSAGES ---------------------
function logMessage(element) {
    hide(mainBody);
    hide(searchTip);
    hide(connectionTip);
    hide(loader);
    show(messages, "flex");
    show(element, "flex");
}
function logWarning(message) {
    warning.innerText = message;
    warning.classList.toggle("slide-warning-up");
    show(warning);
    setTimeout(() => {
        warning.classList.toggle("slide-warning-up");
        warning.classList.toggle("slide-warning-down");
    }, 3500);
}
//log message to user when no word has been added
function logNoSavedWords(){
    if(savedWordsContainer.childElementCount < 1) {
        savedWordsContainer.innerHTML = `
            <div id="saved-words-message" class="saved-words-message">
                <span class="saved-words-message__exclamation-icon"><i class="fa fa-exclamation-circle"></i></span>
                <p class="saved-words-message__message-text">you haven't saved any word yet, <br> go ahead save some words you'd <br> like to remember</p>
            </div>
        `;
        savedWordsMessage = document.getElementById("saved-words-message");
    }
}  


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


//------------------------- API REQUEST --------------------------
function getWordData(word){
    fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
		    "x-rapidapi-key": process.env.ACCESS_KEY
	}
    })
    .then(response => response.json())
    .then(data => {
        if(data.success !== false && data.results){
            console.log(data);
            createRecentSearch(word);
            //prevent number of recently searched words from exceeding 10
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



//----------------------------------------    VIEWS    ---------------------------------

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

//hide recent search when user clicks on screen
mainBody.addEventListener("click", () => {
    hide(recentSearchHeader);
    hide(recentSearch);
})

//user inputs data
userInput.addEventListener("input", () => {
    //prevent input from starting with space
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

//searchbar is clicked
// userInput.addEventListener("focus", () => {
//         //if there are recently searched words, display them
//         if(recentSearch.childElementCount > 0) {
//             recentSearch.classList.add("slide-recentSearch-up");
//             recentSearchHeader.classList.add("slide-recentSearch-up");
//             show(recentSearchHeader);
//             show(recentSearch, "flex");
//         }     
// })

//search button is clicked
searchBtn.addEventListener("click", () => {
    if(userInput.value){
        logMessage(loader);
        getWordData(userInput.value);   
        hide(recentSearchHeader);
        hide(recentSearch);  
    }
})

//change save button background color to white, to show it has been saved
function indicateSave(element) {
    //get background color of the main word container
    let bgColor = element.parentElement.parentElement.style.backgroundColor;
    element.innerText = "saved";
    element.style.backgroundColor = "white";
    element.style.color = bgColor;
}

//save button is clicked
export function enableSave() {
    let save = document.getElementsByClassName("word-utils__save");
    for(let i = 0; i < save.length; i++) { 
        //save word from the API data in word container
        let word = save[i].parentElement.nextElementSibling.firstElementChild.innerText;
        save[i].addEventListener("click", () => {
            console.log(word + " saved to saved words list");
            indicateSave(save[i]);
            if(savedWordsContainer.lastElementChild.id === "saved-words-message") {
                savedWordsContainer.removeChild(savedWordsMessage);                
            }
            renderSavedWords(word);
        })
    }
}


//---------- BOOKMARK VIEW ------------------
//words saved header is clicked and leads to words saved page
wordsSaved.addEventListener("click", () => {
    mainView.classList.add("slide-element-out");
    setTimeout(() => {
        hide(mainView);
        hide(menu);
        menu.classList.remove("slide-menu-down");//so that menu doesn't loose its slide down effect
        mainView.classList.remove("slide-element-out");
        bookmarkView.classList.add("fade-in");
        show(bookmarkView);
    }, 250)
})

//bookmark view is exited
bookmarkExitBtn.addEventListener("click", () => {
    bookmarkView.classList.add("fade-out");
    bookmarkView.classList.remove("fade-in");
    setTimeout(() => {
        hide(bookmarkView);
        show(mainView);
        bookmarkView.classList.remove("fade-out");
    }, 250)
})

//render saved words
let wordExists = []; //this array variable (woreExists) is used for making sure a word is saved before we make saved words unique
function renderSavedWords(word){ 
    //add to saved words and make sure a word doesn't get saved multiple times
    if(!wordExists.includes(word)){
        savedWordsContainer.innerHTML += `
            <div class="saved">
                <p class="saved__word">${word.toLowerCase()}</p>
                <span id="saved-remove-btn" class="saved__remove-icon"><i class="fa fa-times"></i></span>
            </div>
        `;
        wordExists.push(word);    
        //save to local storage
        storeUserSession(wordExists);
    }

    //saved word is deleted
    const deleteSavedWordBtns = document.getElementsByClassName("saved__remove-icon");
    for(let deleteBtn of deleteSavedWordBtns) {
        deleteBtn.addEventListener("click", () => {
            deleteBtn.parentElement.classList.add("fade-out");
            console.log(deleteBtn.parentElement);
            savedWordsContainer.removeChild(deleteBtn.parentElement);
            let text = deleteBtn.previousElementSibling.innerText.toUpperCase(); //we converted to uppercase cos all words in wordExists are in uppercase
            wordExists.splice(wordExists.indexOf(text), 1);
            console.log(text.toUpperCase() + " deleted from saved words list")
            //save to local storage
            storeUserSession(wordExists);
            logNoSavedWords();
        })
    }
    //display saved word info when the saved word is clicked
    let savedWord = document.getElementsByClassName("saved__word");
    for(let each of savedWord){
        each.addEventListener("click", () => {
            hide(bookmarkView);
            show(mainView);
            logMessage(loader);
            getWordData(each.innerText);
        })
    }
}

//save to local storage
function storeUserSession(data){
    localStorage.setItem("savedWords", data);
}

//get data from local storage
if(localStorage.savedWords){
    //render all saved words retrieved from the local storage
    let listOfWords = localStorage.savedWords.split(",");
    for(let list of listOfWords) {
        renderSavedWords(list);
    }
    //if there are saved words, hide the bookmark message: "you haven't saved any word yet..."
    if(savedWordsContainer.firstElementChild.id === "saved-words-message") {
        savedWordsContainer.removeChild(savedWordsContainer.firstElementChild);             
    }
    console.log(listOfWords);
}