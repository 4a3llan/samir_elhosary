/* =========================================================
   SAMIR EL-HOSARY
   WORK PAGE JAVASCRIPT
   Loads the featured film only when the visitor presses play,
   so the page stays fast.
   Shared behaviour (language, loader, menu) lives in core.js.
========================================================= */

(() => {
    "use strict";

    const poster = document.getElementById("film-poster");
    const frame = document.getElementById("film-frame");

    if (!poster || !frame) {
        return;
    }

    poster.addEventListener("click", () => {
        const videoId = poster.dataset.video;

        if (!videoId) {
            return;
        }

        const iframe = document.createElement("iframe");

        iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
        iframe.title = poster.dataset.title || "Film";
        iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
        iframe.allowFullscreen = true;

        frame.replaceChildren(iframe);
        frame.classList.add("is-playing");
    });
})();
