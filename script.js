// gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
// ScrollTrigger.normalizeScroll(true)

// create the smooth scroller FIRST!
let smoother = ScrollSmoother.create({
    smooth: 1.5,
    effects: true,
    smoothTouch: 0.2,
});


// Seleccionar el elemento que contiene el contenido a refrescar
let reloadContent = document.getElementById("smooth-wrapper");

// Variables para guardar el estado del gesto de scroll
let startY = 0; // La posición inicial del dedo al tocar la pantalla
let deltaY = 0; // La distancia recorrida por el dedo al moverse
let threshold = 150; // El umbral de distancia para activar el refrescar

// Función para manejar el evento touchstart
function handleTouchStart(e) {
    // Solo se considera el primer dedo que toca la pantalla
    if (e.touches.length === 1) startY = e.touches[0].clientY;
}

// Función para manejar el evento touchmove
function handleTouchMove(e) {
    // Solo se considera el primer dedo que se mueve en la pantalla
    if (e.touches.length === 1) {
        // Calcular la distancia recorrida por el dedo
        deltaY = e.touches[0].clientY - startY;

        // Si la distancia es positiva y el contenido está en el límite superior del scroll
        if (deltaY > 0 && window.pageYOffset === 0) {
            // Prevenir el comportamiento por defecto del navegador (refrescar)
            e.preventDefault();
            reloadContent.style.transform = "translateY(" + deltaY + "px)";
        }
    }
}

// Función para manejar el evento touchend
function handleTouchEnd(e) {
    // Si se estaba tocando la pantalla y se suelta el dedo
    if (window.pageYOffset <= 0) {
        // Restablecer la posición del contenido y el indicador con una transición suave
        reloadContent.style.transition = "transform 0.3s ease-out";
        reloadContent.style.transform = "translateY(0)";

        setTimeout(() => { reloadContent.style.transition = "none" }, 300);

        // Si la distancia superaba el umbral, indicar que se está refrescando y cambiar el texto del indicador
        if (deltaY >= threshold) location.reload();
    }
}

// Añadir los listeners para los eventos touchstart, touchmove y touchend
document.addEventListener("touchstart", handleTouchStart);
document.addEventListener("touchmove", handleTouchMove);
document.addEventListener("touchend", handleTouchEnd);




// Dropdown
let flags_dd = document.getElementById("flags_dd");
flags_dd.addEventListener("mouseenter", () =>  flags_dd.classList.add("active") )
flags_dd.addEventListener("mouseleave", () =>  flags_dd.classList.remove("active") )



let scrollPos = window.scrollY;
let scrollBtnContainer = document.getElementById("scrollBtnContainer");
let scrollBtn = document.querySelector("#scrollBtnContainer a");
let target = document.getElementById("lastSec");
let triggerHeader = false;
let header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (!triggerHeader) {
        header.classList.add("active");
        triggerHeader = true;
    }

    if (window.scrollY < 10) {
        header.classList.remove("active");
        triggerHeader = false;
    }

    let currentScroll = window.scrollY;
    (currentScroll < scrollPos) ? scrollBtnContainer.classList.remove("active") : scrollBtnContainer.classList.add("active");
    scrollPos = currentScroll;

    let targetRect = target.getBoundingClientRect();
    let targetBottom = targetRect.top + targetRect.height;

    if ((targetBottom - 200) <= window.innerHeight) {
        scrollBtnContainer.classList.remove("active");
    }
});


const setScrollBtn = cookiesState => {
    if (cookiesState) {
        if (window.matchMedia('(max-width: 700px)').matches) {
            scrollBtn.style.marginBottom = "300px";
        } else if (window.matchMedia('(min-width: 701px)').matches && window.matchMedia('(max-width: 997px)').matches) {
            scrollBtn.style.marginBottom = "130px";
        } else {
            scrollBtn.style.marginBottom = "90px";
        }
    } else {
        scrollBtn.style.marginBottom = "0px";
    }
}

window.addEventListener("load", () => {
    setTimeout(() => {
        let cookiesContainer = document.getElementById("onetrust-banner-sdk");

        if (cookiesContainer) {
            setScrollBtn(true);

            cookiesContainer.addEventListener("click", (e) => {
                if (e.target.id == "onetrust-reject-all-handler" || e.target.id == "onetrust-accept-btn-handler" || e.target.className.includes("onetrust-close-btn-handler")) {
                    setScrollBtn(false);
                }
            })
        } else {
            setScrollBtn(false);
        }
    }, 10);

});





// Slogan animation
let tlSlogan = gsap.timeline({ ease: "none" })
tlSlogan.from(".left", { xPercent: -100 })
    .from(".right", { xPercent: 100 }, 0)
    .from(".underline", { opacity: 0 }, "<0.2")


ScrollTrigger.create({
    trigger: "#slogan_title",
    start: "top 85%",
    end: "bottom 0%",
    animation: tlSlogan,
    scrub: 1
})


let panelsContainer = document.getElementById("panels_container")
let containerWidth = panelsContainer.scrollWidth;
let horizontalScrollLength = containerWidth - window.innerWidth;
let video_row = document.getElementById("video_row");

let phenomBkgndMarkers;
let endHScroll;
let endCardsScroll;
if (window.matchMedia('(max-width: 700px)').matches) {
    phenomBkgndMarkers = ["top 40%", "bottom 50%"]
    endHScroll = containerWidth * 1.7;
    endCardsScroll = video_row.scrollWidth * 1.4;
} else {
    phenomBkgndMarkers = ["top 50%", "bottom 50%"]
    endHScroll = containerWidth;
    endCardsScroll = video_row.scrollWidth;
}

//Panels
horizontalScrollLength;
gsap.to(panelsContainer, {
    x: -horizontalScrollLength,
    scrollTrigger: {
        trigger: "#panels_container",
        pin: true,
        start: "center center",
        end: endHScroll,
        scrub: 0.8,
    }
});


//Background transition
let tlGradPanels = gsap.timeline()
tlGradPanels.to("#horizontalSec", { backgroundImage: "linear-gradient(0deg, rgba(245,246,255,1) 50%, rgba(6,68,67,1) 100%)" })
    .to("#horizontalSec", { backgroundImage: "linear-gradient(0deg, rgba(245,246,255,1) 100%, rgba(6,68,67,1) 100%)" })

ScrollTrigger.create({
    trigger: "#panels_container",
    start: "center 80%",
    end: "bottom 40%",
    scrub: 1,
    animation: tlGradPanels,
})

// 2014 stroke
gsap.from("#stroke_date", {
    xPercent: 100,
    scrollTrigger: {
        trigger: "#stroke_date",
        start: "top 85%",
        end: "bottom 85%",
        scrub: 1,
    }
});


// ingredients fadein
let ingredientsRow = document.querySelectorAll(".ingredients_row");
ingredientsRow.forEach((row, index) => {
    let elems = row.querySelectorAll("img");
    let arr;

    (index == 0) ? arr = [...elems] : arr = [...elems].reverse();

    gsap.from(arr, {
        opacity: 0,
        stagger: 0.13,
        scrollTrigger: {
            trigger: row,
            start: "50% 100%",
        }
    });
})




// phenomenonSec background transition
let tlPhenomenonSec = gsap.timeline()
tlPhenomenonSec.to("#phenomenonSec", { background: "#2d2a48" })
    .to("#ingredientsSec", { background: "#2d2a48" }, "<")
    .to("#phenomenonSec h2, #ingredientsSec h3", { color: "#fff" }, "<")


ScrollTrigger.create({
    trigger: "#phenomenonSec h2",
    start: phenomBkgndMarkers[0],
    end: phenomBkgndMarkers[1],
    scrub: 1,
    // 	markers: true,
    animation: tlPhenomenonSec,
})

// phenomenonSec imgs parallax
smoother.effects(".parallax_box img", { speed: "auto" });


// txt mask animation
let tlMask_txt = gsap.timeline()
tlMask_txt.from("#mask_txt  p", { y: "110%", duration: 0.6 })
    .from("#countriesBox > img, #countriesBox + img", { stagger: 0.1, opacity: 0 }, "<0.4")

ScrollTrigger.create({
    trigger: "#countriesBox",
    start: "center 85%",
    animation: tlMask_txt,
})


// France img pin
gsap.fromTo("#franceImg", { scale: 0.4 }, {
    scale: 1,
    scrollTrigger: {
        trigger: "#franceImg",
        start: "center center",
        // 		end: "+=500px",
        end: "bottom 20%",
        pin: true,
        pinSpacing: false,
        scrub: 1,
    }
});

// Video cards animation
let video_cards = document.querySelectorAll("#video_row > .video_card");

// Pin
let cardsPin = gsap.from(video_row, {
    x: -(video_row.scrollWidth),
    scrollTrigger: {
        trigger: video_row,
        pin: true,
        start: "center center",
        end: "+=" + endCardsScroll,
        scrub: 1.2,
    }
});



// cards animations
const commonScrollTrigger = {
    containerAnimation: cardsPin,
    start: "right left",
    end: "left 50%",
    scrub: 1.2,
    //   markers: { startColor: "orange", endColor: "purple", fontSize: "12px" },
};

const animationsCardsVideos = [
    { rotation: -7, yPercent: -10, scrollTrigger: Object.assign({}, commonScrollTrigger, { trigger: video_cards[0] }) },
    { rotation: 7, scrollTrigger: Object.assign({}, commonScrollTrigger, { trigger: video_cards[1] }) },
    { yPercent: 10, scrollTrigger: Object.assign({}, commonScrollTrigger, { trigger: video_cards[2] }) },
    { rotation: -7, scrollTrigger: Object.assign({}, commonScrollTrigger, { trigger: video_cards[3] }) },
];

animationsCardsVideos.forEach((animation, index) => {
    gsap.to(video_cards[index], animation);
});


let videoGallery = new LiteBoxPro({
    dom_element: '#video_row',

    line_width: 3,
    arrows: {
        default: {
            img_width: "65px",
            img_height: "65px",
            position_left: {
                left: "60px",
            },
            position_right: {
                right: "60px"
            }
        },

        mobile: {
            hide: false,
            img_width: "33px",
            img_height: "53px",

            position_left: {
                left: "55px",
            },
            position_right: {
                right: "55px"
            }
        }
    },

    pager: {
        default: {
            hide: false,
            click_width: "12",
            click_height: "32"
        },
    },
});

let galleryContainer = document.querySelector(".lbxp > div:nth-child(2)");
galleryContainer.addEventListener("click", (e) => {
    if (e.target != galleryContainer.childNodes[0]) document.querySelector(".lbxp > div").click()
});

//Pagination settings
const setPager = () => {
    document.querySelectorAll(".lbxp > div:nth-child(3) svg circle").forEach(pager => {
        let computedStyle = window.getComputedStyle(pager);
        let opacity = computedStyle.fillOpacity;

        (opacity == 1) ? pager.parentNode.classList.add("pagerActive") : pager.parentNode.classList.remove("pagerActive");
    })
}

const galleryBox = document.querySelector('.lbxp > div:nth-child(2)');

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') setPager();
    });
});

const config = { childList: true, subtree: true, attributes: true };
observer.observe(galleryBox, config);


const showList = (arr) => {
    if (arr.length) {
        arr.forEach((element, i) => {
            console.log(`Elemento #${i + 1}: ${element}`)
        });
        console.log(`Longitud: ${arr.length}`)
    } else {
        console.log("lista vacia")
    }
}
showList();