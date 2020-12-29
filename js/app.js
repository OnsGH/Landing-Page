
/******
 * 
 * Navigation is built dynamically as an unordered list.
 */
const sectionList = document.querySelectorAll("section");
let i;
let firstNav = document.querySelector("nav");
let navUlElement = document.querySelector("ul");
for (i = 0; i < sectionList.length; i++) {
    const sectionName = sectionList[i].getAttribute("data-nav");
    const liElement = document.createElement("li");
    liElement.innerHTML = sectionName;
    liElement.setAttribute("data-page", sectionName);
    navUlElement.appendChild(liElement);
}
firstNav.appendChild(navUlElement);


/*****
 * 
 * Set the active section and the active nav item.
 */

const sections = document.querySelectorAll("section");


/*****
 * 
 * Updating the Nav on Scroll if the screen height is between 280px and 370px,
 * set the active section and nav item using the method below 
 * and adding a listener to the MediaQueryListener 
 * that will run a custom callback function in response to the media query status changing.
 */
function setNavMenuSmallHeight(media) {
    if (media.matches) {
        // If media query matches

        window.addEventListener("scroll", function () {
            for (list of sections) {
                let position = list.getBoundingClientRect();
                console.log("media__1 matches", position);
                const idName = list.id;
                const activeAnchor = document.querySelector(`[data-page=${idName}]`);
                const activeSection = document.querySelector(`[data-nav=${idName}]`);
                if (position.top <= 150 && position.bottom >= 150) {
                    console.log("150 px", position.top);
                    activeSection.classList.add("section__active");
                    activeAnchor.classList.add("navbar__active");
                } else {
                    activeSection.classList.remove("section__active");
                    activeAnchor.classList.remove("navbar__active");
                }
            }
        });
    }
}
let media__1 = window.matchMedia("screen and (min-height: 280px) and (max-height:370px)");
media__1.addListener(setNavMenuSmallHeight);

/*******
 * 
 * Updating the Nav on Scroll using IntersectionObserver API.
 * The threshold option lets us set when and how frequently the callback function is called. 
 * I’ve set it to 0.3. 
 */

let options = {
  threshold: [0.3], 
};

let observer = new IntersectionObserver(navcheck, options);

function navcheck(entries) {
    entries.forEach((entry) => {
        const idName = entry.target.id;
        const activeAnchor = document.querySelector(`[data-page=${idName}]`);
        const activeSection = document.querySelector(`[data-nav=${idName}]`);

        if (entry.isIntersecting) {
            console.log("is inter thr", options.threshold);
            console.log("activeAnchor", activeAnchor.getAttribute("data-page"));
            activeAnchor.classList.add("navbar__active");

            const coords = activeSection.getBoundingClientRect();
            console.log("coords", coords);

            activeSection.classList.add("section__active");
        } else {
            activeAnchor.classList.remove("navbar__active");
            activeSection.classList.remove("section__active");
        }
    });
}
sections.forEach((section) => {
    observer.observe(section);
});


/****
 * Clicking on a navigation item to scroll
 *  to the appropriate section of the page.
 */

const navSelect = document.querySelector("nav");
navSelect.addEventListener("click", function (entry) {
    
    let sectionDestName = entry.target.getAttribute("data-page");
    let sectionDestScroll = document.getElementById(sectionDestName);
    sectionDestScroll.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
    });
});
