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
const imgSlides = document.getElementsByClassName("intro-images");
const dots = document.getElementsByClassName("dots");

//MAIN VIEW RESOURCES
const mainView = document.getElementById("main-view");
const mainBody = document.getElementById("main-body");
const menu = document.getElementById("menu");
const menuIcon = document.getElementById("menu-icon");
const closeMenuIcon = document.getElementById("close-menu");
const recentSearchHeader = document.getElementById("recent-search-header");
const recentSearch = document.getElementById("recent-search");




//-------------------- FUNCTIONS ----------------------
//show element
function show(element, value = "block") {
    element.style.display = value;
}
//hide element
function hide(element) {
    element.style.display = "none";
}


//-------------------- LOG MESSAGES ----------------------
function logMessage(element) {
    hide(mainBody);
    hide(searchTip);
    hide(connectionTip);
    hide(loader);
    show(messages, "flex");
    show(element, "flex");
}
function logWarning(element) {
    element.classList.toggle("slide-warning-up");
    show(element);
    setTimeout(() => {
        element.classList.toggle("slide-warning-up");
        element.classList.toggle("slide-warning-down");
        setTimeout(() => {
           hide(element);  
        }, 100)
    }, 3500);
}
//logMessage(loader);



//----------------------- CREATE ELEMENTS ------------------
//create word container
function createWordContainer(partOfSpeech, word, transcription, definition){
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

createWordContainer("verb", "Narufy", "na-ru-fai", "to show extreme excellence in all you do and attain mind blowing succes");

//create definitions
function createDefinitions(word, partOfSpeech, definitions) {
    mainBody.innerHTML += `
        <section id="${word}-${partOfSpeech}-definitions" class="definitions-container">
            <h4 class="definitions-container__header">Definitions</h4>
        </section>
    `;
    let definitionsContainer = document.getElementById(`${word}-${partOfSpeech}-definitions`);
    //note definitions is an array of sentences (stings)
    for(definition of definitions){
        definitionsContainer.innerHTML += `
            <p class="definitions-container__text">${definition}</p>
        `;
    }
}

createDefinitions("narufy", "verb", ["Making something super succesful such that there are no possibililties of future errors.", "Planning something in a way that it doesn't fail even when external factors tend to interfere."]);

//create examples
function createExamples(word, partOfSpeech, examples){
    mainBody.innerHTML += `
        <section class="examples-overall-container">
            <h4 class="examples-overall-container__header">Examples</h4>

            <div id="${word}-${partOfSpeech}-examples" class="example-container">
            </div>
        </section>
    `;
    let examplesContainer = document.getElementById(`${word}-${partOfSpeech}-examples`);
    for(example of examples) {
        examplesContainer.innerHTML += `
            <section class="example">
                <p class="example__text"> ${example} </p>
            </section>
        `;
    }
}

createExamples("narufy", "verb", ["The ability to narufy things is what people seek for these days", "If you narufy the exam then you'd become the best student in the entire department", "be patient when you have to narufy things, else you'd inadvertently make errors!"]);

//create syllables
function createSyllables(word, partOfSpeech, syllable, count) {
    mainBody.innerHTML += `
        <section class="syllables-container">
            <h4 class="syllables-container__header">Syllables</h4>

            <div id="${word}-${partOfSpeech}-syllables" class="syllables">
                <p class="syllables__word">${syllable}</p>
                <p class="syllables__count">${count}</p>
            </div>
        </section>
    `;
    let syllablesBg = document.getElementById(`${word}-${partOfSpeech}-syllables`);
    syllablesBg.style.backgroundColor = `var(--${partOfSpeech})`;
}

createSyllables("narufy", "verb", "na-ru-fy", "3");

//create  synonyms & antonyms
function createSynonymAntonym(synonyms = "none", antonyms = "none"){
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

createSynonymAntonym(["plan", "success", "exceed", "prevail", "overcome", "progress", "pass", "win"], ["fail", "loose", "regress", "defeat", "fall"]);

//create recent searches
function createRecentSearch(word) {
    let searchContainer = document.createElement("section");
    searchContainer.setAttribute("class", "recent-search");
    searchContainer.innerHTML = `
        <p class="recent-search__word">${word}</p>
        <span class="recent-search__remove-icon"><i class="fa fa-times"></i></span>
    `;
    recentSearch.insertBefore(searchContainer, recentSearch.children[0]);
}
//createRecentSearch("holistic");





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
})

//intro view is clicked and links to main view
introViewExploreBtn.addEventListener("click", () => {
    hide(introView);
    show(mainView);
    mainView.classList.add("fade-element-in");
})


//---------- MAIN VIEW ------------------
//menu icon is clicked
menuIcon.addEventListener("click", () => {
    menu.classList.toggle("slide-menu-down");
    show(menu, "flex");
})

//menu icon is clicked
closeMenuIcon.addEventListener("click", () => {
    menu.classList.toggle("slide-menu-down");
    menu.classList.toggle("slide-menu-up");
    setTimeout(() => {
        hide(menu);
        menu.classList.toggle("slide-menu-up");
    }, 100);
})
















//small image slider dot is clicked 
// function dotActive(n) {
//     for(dot of dots) dot.classList.remove("active");
//     dots[n].classList.add("active");
// }