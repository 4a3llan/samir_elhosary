
(() => {
    "use strict";

    /* =====================================================
       CONFIGURATION
    ===================================================== */

    const STORAGE_KEY = "samir_language";
    const NAV_FLAG_KEY = "samir_nav";
    const DEFAULT_LANGUAGE = "ar";

    /* Loader timings (ms). Kept short so the site never feels slow. */
    const FIRST_LOAD_MS = 550;
    const NAVIGATION_MS = 380;
    const LANGUAGE_MS = 380;
    const FAILSAFE_MS = 4000;

    /* Attributes that can be translated with data-<attr>-ar / data-<attr>-en */
    const TRANSLATED_ATTRIBUTES = ["placeholder", "aria-label", "title", "alt", "content"];

    const MOBILE_BREAKPOINT = 768;


    /* =====================================================
       ELEMENT REFERENCES (queried once)
    ===================================================== */

    const root = document.documentElement;

    const loader = document.getElementById("page-loader");
    const loaderPercent = document.getElementById("loader-percent");
    const header = document.getElementById("main-header");
    const langButton = document.getElementById("lang-switch");
    const menuToggle = document.getElementById("menu-toggle");
    const mainNav = document.getElementById("main-nav");
    const menuBackdrop = document.getElementById("mobile-menu-backdrop");

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let currentLanguage = DEFAULT_LANGUAGE;
    let isBusy = false;
    let isReady = false;


    /* =====================================================
       SAFE STORAGE
       localStorage can throw (private mode, blocked cookies).
    ===================================================== */

    const storage = {
        get(key, store = "local") {
            try {
                return window[`${store}Storage`].getItem(key);
            } catch {
                return null;
            }
        },
        set(key, value, store = "local") {
            try {
                window[`${store}Storage`].setItem(key, value);
            } catch {
                /* Ignore: persistence is a convenience only. */
            }
        },
        remove(key, store = "local") {
            try {
                window[`${store}Storage`].removeItem(key);
            } catch {
                /* Ignore */
            }
        }
    };


    /* =====================================================
       LANGUAGE SYSTEM
       Every visible string lives in the markup as data-ar / data-en.
       The selected language is stored once and shared by all pages.
    ===================================================== */

    function readSavedLanguage() {
        return storage.get(STORAGE_KEY) === "en" ? "en" : DEFAULT_LANGUAGE;
    }

    function translateTexts(lang) {
        document.querySelectorAll("[data-ar][data-en]").forEach((element) => {
            const value = element.getAttribute(`data-${lang}`);

            if (value === null) {
                return;
            }

            /* data-html marks trusted markup (e.g. a highlighted word). */
            if (element.hasAttribute("data-html")) {
                element.innerHTML = value;
            } else {
                element.textContent = value;
            }
        });
    }

    function translateAttributes(lang) {
        TRANSLATED_ATTRIBUTES.forEach((attribute) => {
            const selector = `[data-${attribute}-ar][data-${attribute}-en]`;

            document.querySelectorAll(selector).forEach((element) => {
                element.setAttribute(
                    attribute,
                    element.getAttribute(`data-${attribute}-${lang}`)
                );
            });
        });
    }

    function updateLanguageButton(lang) {
        if (!langButton) {
            return;
        }

        const isArabic = lang === "ar";

        langButton.textContent = isArabic ? "EN" : "العربية";
        langButton.setAttribute("lang", isArabic ? "en" : "ar");
        langButton.setAttribute(
            "aria-label",
            isArabic ? "Switch to English" : "التبديل إلى العربية"
        );
    }

    function applyLanguage(lang) {
        currentLanguage = lang === "en" ? "en" : "ar";

        root.lang = currentLanguage;
        root.dir = currentLanguage === "ar" ? "rtl" : "ltr";

        translateTexts(currentLanguage);
        translateAttributes(currentLanguage);
        updateLanguageButton(currentLanguage);
        syncMenuLabel();

        storage.set(STORAGE_KEY, currentLanguage);

        document.dispatchEvent(
            new CustomEvent("samir:languagechange", { detail: { lang: currentLanguage } })
        );
    }


    /* =====================================================
       LOADING SYSTEM
       Visibility is a CSS class (html.is-loading).
       Progress is a CSS variable (--p) so no layout work is needed.
    ===================================================== */

    function setProgress(value) {
        if (!loader) {
            return;
        }

        loader.style.setProperty("--p", value.toFixed(3));

        if (loaderPercent) {
            loaderPercent.textContent = `${Math.round(value * 100)}%`;
        }
    }

    function animateProgress(from, to, duration) {
        const time = prefersReducedMotion ? 120 : duration;

        return new Promise((resolve) => {
            const start = performance.now();

            function step(now) {
                const ratio = Math.min((now - start) / time, 1);
                const eased = ratio < 0.5
                    ? 2 * ratio * ratio
                    : 1 - Math.pow(-2 * ratio + 2, 2) / 2;

                setProgress(from + (to - from) * eased);

                if (ratio < 1) {
                    requestAnimationFrame(step);
                } else {
                    resolve();
                }
            }

            requestAnimationFrame(step);
        });
    }

    function showLoader() {
        setProgress(0);
        root.classList.add("is-loading");
    }

    /* Starts the entrance animations at the same moment the loader fades. */
    function revealPage() {
        root.classList.remove("is-loading");
        root.classList.add("is-ready");

        if (!isReady) {
            isReady = true;
            document.dispatchEvent(new CustomEvent("samir:ready"));
        }
    }

    function replayEntrance() {
        root.classList.remove("is-ready");
        void root.offsetWidth; /* force reflow so animations restart */
        root.classList.add("is-ready");
    }


    /* =====================================================
       FIRST LOAD
       Arrived from another page of the site: the loader was already
       shown at 100% by the previous page, so just fade it out.
       Fresh visit: play a short 0 -> 100% sequence.
    ===================================================== */

    async function runFirstLoad() {
        const fontsReady = document.fonts && document.fonts.ready
            ? Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1200))])
            : Promise.resolve();

        const cameFromSite = storage.get(NAV_FLAG_KEY, "session") === "1";
        storage.remove(NAV_FLAG_KEY, "session");

        if (cameFromSite) {
            setProgress(1);
            await fontsReady;
            await new Promise((resolve) => requestAnimationFrame(resolve));
        } else {
            setProgress(0);
            await Promise.all([animateProgress(0, 1, FIRST_LOAD_MS), fontsReady]);
        }

        revealPage();
    }


    /* =====================================================
       LANGUAGE SWITCH
       Loader -> apply language -> replay entrance animation.
    ===================================================== */

    async function switchLanguage() {
        if (isBusy) {
            return;
        }

        isBusy = true;
        closeMobileMenu();

        const nextLanguage = currentLanguage === "ar" ? "en" : "ar";

        showLoader();
        await animateProgress(0, 1, LANGUAGE_MS);

        applyLanguage(nextLanguage);

        root.classList.remove("is-ready");
        root.classList.remove("is-loading");
        void root.offsetWidth;
        root.classList.add("is-ready");

        isBusy = false;
    }


    /* =====================================================
       PAGE NAVIGATION
       One delegated listener handles every internal link.
       Same-page anchors, external links, new-tab clicks and
       downloads are left to the browser.
    ===================================================== */

    function isInternalPageLink(link, url) {
        if (link.target && link.target !== "_self") return false;
        if (link.hasAttribute("download")) return false;
        if (link.hasAttribute("data-no-transition")) return false;
        if (url.origin !== window.location.origin) return false;

        /* "/" and "/index.html" are the same page. */
        const normalize = (path) => path.replace(/index\.html$/, "");

        const samePage =
            normalize(url.pathname) === normalize(window.location.pathname) &&
            url.search === window.location.search;

        return !samePage;
    }

    async function navigateWithLoader(url) {
        isBusy = true;
        closeMobileMenu();

        showLoader();
        await animateProgress(0, 1, NAVIGATION_MS);

        storage.set(NAV_FLAG_KEY, "1", "session");
        window.location.href = url.href;
    }

    function handleDocumentClick(event) {
        const link = event.target.closest("a[href]");

        if (!link || event.defaultPrevented) {
            return;
        }

        const href = link.getAttribute("href");

        /* Placeholder links must never jump or reload the page. */
        if (href === "#") {
            event.preventDefault();
            return;
        }

        if (
            event.button !== 0 ||
            event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
            /^(mailto:|tel:|javascript:)/i.test(href)
        ) {
            return;
        }

        let url;

        try {
            url = new URL(href, window.location.href);
        } catch {
            return;
        }

        if (!isInternalPageLink(link, url)) {
            return;
        }

        event.preventDefault();

        if (!isBusy) {
            navigateWithLoader(url);
        }
    }


    /* =====================================================
       HEADER
    ===================================================== */

    function initHeaderScroll() {
        if (!header) {
            return;
        }

        let ticking = false;

        const update = () => {
            header.classList.toggle("scrolled", window.scrollY > 50);
            ticking = false;
        };

        window.addEventListener(
            "scroll",
            () => {
                if (!ticking) {
                    ticking = true;
                    requestAnimationFrame(update);
                }
            },
            { passive: true }
        );

        update();
    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function syncMenuLabel() {
        if (!menuToggle) {
            return;
        }

        const isOpen = menuToggle.classList.contains("is-open");
        const isArabic = currentLanguage === "ar";

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? (isArabic ? "إغلاق القائمة" : "Close menu")
                : (isArabic ? "فتح القائمة" : "Open menu")
        );
    }

    function openMobileMenu() {
        if (!mainNav || !menuToggle) {
            return;
        }

        mainNav.classList.add("is-open");
        menuToggle.classList.add("is-open");
        menuBackdrop?.classList.add("is-open");
        document.body.classList.add("menu-open");
        menuToggle.setAttribute("aria-expanded", "true");
        syncMenuLabel();
    }

    function closeMobileMenu() {
        if (!mainNav || !menuToggle || !mainNav.classList.contains("is-open")) {
            return;
        }

        mainNav.classList.remove("is-open");
        menuToggle.classList.remove("is-open");
        menuBackdrop?.classList.remove("is-open");
        document.body.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
        syncMenuLabel();
    }

    function initMobileMenu() {
        if (!menuToggle || !mainNav) {
            return;
        }

        menuToggle.addEventListener("click", () => {
            if (mainNav.classList.contains("is-open")) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        menuBackdrop?.addEventListener("click", closeMobileMenu);

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && mainNav.classList.contains("is-open")) {
                closeMobileMenu();
                menuToggle.focus();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > MOBILE_BREAKPOINT) {
                closeMobileMenu();
            }
        });
    }


    /* =====================================================
       CUSTOM CURSOR
       Desktop / fine pointer only. Event delegation keeps the
       hover state working for elements created later as well.
    ===================================================== */

    function initCustomCursor() {
        const cursor = document.querySelector(".custom-cursor");
        const follower = document.querySelector(".custom-cursor-follower");
        const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

        if (!cursor || !follower || !canHover || window.innerWidth <= 1024) {
            return;
        }

        const INTERACTIVE = "a, button, input, textarea, select, [role='option'], .client-card, .expertise-card";

        let targetX = 0;
        let targetY = 0;
        let followerX = 0;
        let followerY = 0;
        let running = false;

        function render() {
            followerX += (targetX - followerX) * 0.18;
            followerY += (targetY - followerY) * 0.18;

            cursor.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
            follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;

            if (Math.abs(targetX - followerX) > 0.1 || Math.abs(targetY - followerY) > 0.1) {
                requestAnimationFrame(render);
            } else {
                running = false;
            }
        }

        document.addEventListener(
            "mousemove",
            (event) => {
                if (!cursor.classList.contains("is-active")) {
                    followerX = event.clientX;
                    followerY = event.clientY;
                    cursor.classList.add("is-active");
                    follower.classList.add("is-active");
                }

                targetX = event.clientX;
                targetY = event.clientY;

                if (!running) {
                    running = true;
                    requestAnimationFrame(render);
                }
            },
            { passive: true }
        );

        document.addEventListener("mouseover", (event) => {
            if (event.target.closest(INTERACTIVE)) {
                follower.classList.add("hovered");
            }
        });

        document.addEventListener("mouseout", (event) => {
            if (event.target.closest(INTERACTIVE)) {
                follower.classList.remove("hovered");
            }
        });

        document.documentElement.addEventListener("mouseleave", () => {
            cursor.classList.remove("is-active");
            follower.classList.remove("is-active");
        });
    }


    /* =====================================================
       SCROLL REVEAL
       Adds .is-visible once an element enters the viewport.
       Elements already on screen are revealed immediately.
    ===================================================== */

    function initScrollReveal() {
        const elements = document.querySelectorAll(".reveal");

        if (!elements.length) {
            return;
        }

        if (!("IntersectionObserver" in window)) {
            elements.forEach((element) => element.classList.add("is-visible"));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
        );

        elements.forEach((element) => observer.observe(element));
    }


    /* =====================================================
       PUBLIC API (used by page scripts)
    ===================================================== */

    window.Samir = {
        getLanguage: () => currentLanguage,

        /* Runs the callback once the page has finished its loader. */
        whenReady(callback) {
            if (isReady) {
                callback();
            } else {
                document.addEventListener("samir:ready", callback, { once: true });
            }
        }
    };


    /* =====================================================
       INITIALISATION
    ===================================================== */

    function init() {
        /* Apply the saved language while the loader still covers the page. */
        applyLanguage(readSavedLanguage());

        langButton?.addEventListener("click", switchLanguage);
        document.addEventListener("click", handleDocumentClick);

        initHeaderScroll();
        initMobileMenu();
        initCustomCursor();
        initScrollReveal();

        runFirstLoad();

        /* Never leave the visitor stuck behind the loader. */
        setTimeout(() => {
            if (!isReady) {
                revealPage();
            }
        }, FAILSAFE_MS);
    }

    /* Back/forward cache: the page is restored exactly as it was left. */
    window.addEventListener("pageshow", (event) => {
        if (event.persisted) {
            isBusy = false;
            revealPage();
        }
    });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
