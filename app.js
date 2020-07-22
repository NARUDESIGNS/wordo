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

//-------------------- FUNCTIONS ----------------------
//show element
function show(element, value = "block") {
    element.style.display = value;
}
//hide element
function hide(element) {
    element.style.display = "none";
}

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

introViewExploreBtn.addEventListener("click", () => {
    hide(introView);
    show(mainView);
    mainView.classList.add("fade-element-in");
})

//slide intro images

//small image slider dot is clicked 
// function dotActive(n) {
//     for(dot of dots) dot.classList.remove("active");
//     dots[n].classList.add("active");
// }