//each section in the page conatines a h1 header holding the title of the section
const sections = document.querySelectorAll("h1");

//the margin value is used in some situation where you want to scroll above the wanted section to make the section in the middle of the viewport
const margin = 120;

//jewelrySlider function will disply a jewelry card and hide the rest based on the given index
// and also highlights the number of the picked card
function jewelrySlider(index){
    const jewelryCard = document.getElementsByClassName("jewelry-con");
    const numbBox = document.getElementsByClassName("numb-button");
    for(let i=0;i<jewelryCard.length;i++){
        jewelryCard[i].style.display="none";
        numbBox[i].classList.remove("active-numb-button") ;
    }
    jewelryCard[index].style.display="flex";
    numbBox[index].classList.add("active-numb-button");
}

//the page will load on the first jewelry card as default
jewelrySlider(0);

// since every section contains h1 header that contains the section
// the function below retrives all the h1 titles and create the navbar with its text
const fragment = document.createDocumentFragment();
for(i of sections){
	const li = document.createElement("li");
    li.textContent=i.textContent;
    fragment.appendChild(li);
}
const ul = document.querySelector("ul");
ul.appendChild(fragment);

//when the a number button is clicked the jewelrySlider function will disply the jewelryCard that corrsponds to this number
document.querySelector(".container-numb-buttons").addEventListener("click",function(event){
    if(event.target.className === "numb-button"){
        let index=(event.target.textContent) - 1;
        jewelrySlider(index);
    }
});


//when the up button is clicked the page will be scrolled to top
document.querySelector(".up-button").addEventListener("click", function() {
    window.scroll({
        top: 0,
        behavior: "smooth"
    })
});

//the function hide the up button when currentview is on top
//also after scrolling 90px in height the function will dispaly the up button
//and convert the navbar display to fixed by adding "sticky-nav" class to it
function scrollTransforms(){
    if(window.scrollY===90||window.scrollY>90){
        document.querySelector(".up-button").style.display="block";
        document.querySelector("ul").classList.add("sticky-nav")
    }else{
        document.querySelector(".up-button").style.display="none";
        document.querySelector("ul").classList.remove("sticky-nav")
    }
    setTimeout(scrollTransforms,300);
}
scrollTransforms();


//after 1.5 second, if the viewport postion did not change. the navbar will be hidden untell  the current height value change.
let currentViewwport = 0;
function hideNavbar(){
    if(window.scrollY === currentViewwport && window.scrollY>90){
        document.querySelector("ul").classList.add("hidden-nav");
        document.querySelector("ul").classList.remove("nav-bar");
    }else{
        currentViewwport=window.scrollY;
        document.querySelector("ul").classList.add("nav-bar");
        document.querySelector("ul").classList.remove("hidden-nav");
	}
	setTimeout(hideNavbar,1500);
}
hideNavbar();

//when one of the navbar buttons is clicked the page will be scrolled to the corrsponding section
document.querySelector("ul").addEventListener("click",function(event){
    //the function will only be activated if only the "li" item were clicked
    if(event.target.nodeName === "LI"){
        for(i of sections){
            //searching for the section that corspondis to the "li" item by using its inner text
            if(i.textContent == event.target.textContent){
                window.scrollBy({
					top: i.getBoundingClientRect().y-margin,
					behavior: "smooth"
				})
            }
        }
    }
});


const list = document.querySelectorAll("li");
const sec = document.querySelectorAll("section");
const mainContainer = document.getElementsByClassName("main-container");

//the function checks which section is inside the viewport to highlight it on the navigation bar
//and also apply visual effects on the section that is currently in the view port
function activeSection(){
    for(let i=0 ;i<mainContainer.length ;i++){
        if(mainContainer[i].getBoundingClientRect().top <= margin+25 && mainContainer[i].getBoundingClientRect().bottom >=0){
            list[i].classList.add("active-nav-button");
            sec[i].classList.add("your-active-class");
        }else{
            list[i].classList.remove("active-nav-button");
            sec[i].classList.remove("your-active-class");
        }
    }
    setTimeout(activeSection,100);
    return true;
}

activeSection();