/* =========================================================
   SAMIR EL-HOSARY
   HOME PAGE 
========================================================= */

(() => {
    "use strict";

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let clientsSlider = null;
    let brandsSlider = null;
    

/* =====================================================
   BRANDS STRIP
   Continuous marquee. Always LTR (dir="ltr" in the HTML), so
   language changes do not affect it. Created once.
===================================================== */

function createBrandsSlider() {
    const element = document.querySelector(".brands-swiper");

    if (brandsSlider || !element || typeof Swiper === "undefined") {
        return;
    }

    brandsSlider = new Swiper(element, {
        loop: true,
        slidesPerView: "auto",
        spaceBetween: 0,
        speed: 4500,
        allowTouchMove: true,
        grabCursor: true,
        freeMode: { enabled: true, momentum: false },
        autoplay: prefersReducedMotion
            ? false
            : { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
    });

    /* Recalculate once every logo has finished loading. */
    window.addEventListener("load", () => brandsSlider && brandsSlider.update());
}


    /* =====================================================
       CLIENTS CAROUSEL
       Swiper reads the text direction when it is created, so the
       slider is rebuilt whenever the language changes.
    ===================================================== */

    function createClientsSlider() {
        const element = document.querySelector(".clients-swiper");

        if (!element || typeof Swiper === "undefined") {
            return;
        }

        if (clientsSlider) {
            clientsSlider.destroy(true, true);
            clientsSlider = null;
        }

        clientsSlider = new Swiper(element, {
            loop: true,
            speed: 850,
            grabCursor: true,
            slidesPerView: 1,
            spaceBetween: 18,
            autoplay: prefersReducedMotion
                ? false
                : { delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true },
            navigation: {
                nextEl: ".clients-next",
                prevEl: ".clients-prev"
            },
            keyboard: { enabled: true, onlyInViewport: true },
            breakpoints: {
                701: { slidesPerView: 2, spaceBetween: 18 },
                901: { slidesPerView: 3, spaceBetween: 22 },
                1200: { slidesPerView: 4, spaceBetween: 24 }
            }
        });
    }


    /* =====================================================
       INITIALISATION
       core.js has already applied the language (and fired
       "samir:languagechange") by the time this file runs, so the
       sliders are created right away instead of waiting for that event.
    ===================================================== */

    createBrandsSlider();
    createClientsSlider();

    /* Rebuild the clients slider after every later language switch. */
    document.addEventListener("samir:languagechange", createClientsSlider);
})();
