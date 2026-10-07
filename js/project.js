

(() => {
    "use strict";

    const mount = document.getElementById("project-root");
    const data = window.PROJECTS;

    if (!mount || !data) {
        return;
    }

    const id = new URLSearchParams(window.location.search).get("id");
    const project = data.items.find((p) => p.id === id);

    const lang = () => (window.Samir ? window.Samir.getLanguage() : "ar");
    const L = (ar, en) => (lang() === "ar" ? ar : en);
    const text = (obj) => (obj ? obj[lang()] || obj.ar || "" : "");
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

    function gallery(list, alt) {
        return `<div class="pd-gallery">${list.slice(0, 4).map((src) => `
            <img src="${esc(src)}" alt="${esc(alt)}" width="1280" height="720" loading="lazy" decoding="async">`).join("")}</div>`;
    }

    // function video(v) {
    //     const ratio = v.ratio || "16/9";

    //     return `
    //         <div class="pd-video${ratio === "9/16" ? " is-vertical" : ""}" style="aspect-ratio:${esc(ratio)}">
    //             <button type="button" class="pd-play" data-video="${esc(v.youtube)}"
    //                     style="background-image:url('${esc(project.poster)}')" aria-label="${L("تشغيل الفيديو", "Play video")}">
    //                 <span class="pd-play-icon" aria-hidden="true"><i class="fa-solid fa-play"></i></span>
    //             </button>
    //         </div>`;
    // }

    function video(v) {
        const ratio = v.ratio || "16/9";

        return `
            <div class="pd-video${ratio === "9/16" ? " is-vertical" : ""}" style="aspect-ratio:${esc(ratio)}">
                <button type="button" class="pd-play" data-video="${esc(v.youtube)}"
                        style="background-image:url('${esc(v.thumb || project.poster)}')" aria-label="${L("تشغيل الفيديو", "Play video")}">
                    <span class="pd-play-icon" aria-hidden="true"><i class="fa-solid fa-play"></i></span>
                </button>
            </div>`;
    }

    function block(number, title, body) {
        return `
            <section class="pd-block">
                <div class="section-kicker">
                    <span class="kicker-line" aria-hidden="true"></span>
                    <span>${number} / ${esc(title)}</span>
                </div>
                ${body}
            </section>`;
    }

    function render() {
        if (!project) {
            document.title = L("المشروع غير موجود", "Project not found");
            mount.innerHTML = `
                <div class="pd-missing">
                    <h1>${L("المشروع غير موجود", "Project not found")}</h1>
                    <a class="btn btn-primary" href="work.html"><span>${L("كل الأعمال", "ALL WORK")}</span></a>
                </div>`;
            return;
        }

        const title = text(project.title);
        const category = data.categories.find((c) => c.id === project.category);
        const date = new Date(project.date).toLocaleDateString(lang() === "ar" ? "ar-EG" : "en-GB", { year: "numeric", month: "long", day: "numeric" });
        const sameCategory = data.items.filter((p) => p.category === project.category);
        const next = sameCategory[(sameCategory.indexOf(project) + 1) % sameCategory.length];

        document.title = `${title} | SAMIR EL-HOSARY`;

        const parts = [];
        let n = 0;
        const num = () => String(++n).padStart(2, "0");

        if (project.idea) {
            parts.push(block(num(), L("الفكرة", "The Idea"), `<p class="pd-text">${esc(text(project.idea))}</p>`));
        }

        if (project.challenge) {
            parts.push(block(num(), L("التحدي والوصف", "Challenge & Description"), `<p class="pd-text">${esc(text(project.challenge))}</p>`));
        }

        if (project.raw && project.raw.length) {
            parts.push(block(num(), L("الخام", "Raw Footage"), gallery(project.raw, title)));
        }

        // if (project.final && project.final.youtube) {
        //     parts.push(block(num(), L("الملف النهائي", "Final Film"), video(project.final)));
        // }
                const finalIds = project.final
            ? (project.final.playlist && project.final.playlist.length
                ? project.final.playlist
                : (project.final.youtube ? [project.final.youtube] : []))
            : [];

        if (finalIds.length) {
            const ratio = project.final.ratio || "16/9";
            const body = finalIds.length === 1
                ? video({ youtube: finalIds[0], ratio })
                : `<div class="pd-videos${ratio === "9/16" ? " is-vertical-list" : ""}">${finalIds.map((vid) => video({
                    youtube: vid,
                    ratio,
                    thumb: `https://img.youtube.com/vi/${encodeURIComponent(vid)}/hqdefault.jpg`
                })).join("")}</div>`;

            parts.push(block(num(), L("الملف النهائي", "Final Film"), body));
        }

        // if (project.bts && ((project.bts.images && project.bts.images.length) || project.bts.youtube)) {
        //     const images = project.bts.images && project.bts.images.length ? gallery(project.bts.images, title) : "";
        //     const clip = project.bts.youtube ? video({ youtube: project.bts.youtube, ratio: "16/9" }) : "";
        //     parts.push(block(num(), L("الكواليس", "Behind the Scenes"), images + clip));
        // }
                if (project.bts) {
            const btsImages = project.bts.images && project.bts.images.length ? gallery(project.bts.images, title) : "";
            const btsVideos = project.bts.videos && project.bts.videos.length
                ? project.bts.videos
                : (project.bts.youtube ? [{ youtube: project.bts.youtube, ratio: "16/9" }] : []);
            const btsClips = btsVideos.length
                ? `<div class="pd-bts-videos">${btsVideos.map((v) => video({
                    youtube: v.youtube,
                    ratio: v.ratio || "16/9",
                    thumb: v.thumb || `https://img.youtube.com/vi/${encodeURIComponent(v.youtube)}/hqdefault.jpg`
                })).join("")}</div>`
                : "";

            if (btsImages || btsClips) {
                parts.push(block(num(), L("الكواليس", "Behind the Scenes"), btsImages + btsClips));
            }
        }

        if (project.feedback) {
            parts.push(block(num(), L("الفيدباك", "Feedback"), `<blockquote class="pd-feedback">${esc(text(project.feedback))}</blockquote>`));
        }

        mount.innerHTML = `
            <header class="pd-hero">
                <img class="pd-poster" src="${esc(project.poster)}" alt="${esc(title)}" width="1280" height="720" decoding="async">
                <div class="pd-hero-text">
                    <a class="pd-back" href="work.html?cat=${esc(project.category)}">
                        <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                        <span>${esc(text(category.label))}</span>
                    </a>
                    <h1>${esc(title)}</h1>
                    <div class="pd-date"><span>${L("التاريخ", "Date")}</span><time datetime="${esc(project.date)}">${esc(date)}</time></div>
                </div>
            </header>

            ${parts.join("")}

            <nav class="pd-next">
                <a href="project.html?id=${esc(next.id)}">
                    <small>${L("المشروع التالي", "NEXT PROJECT")}</small>
                    <strong>${esc(text(next.title))}</strong>
                </a>
                <a class="btn btn-secondary" href="work.html?cat=${esc(project.category)}"><span>${L("كل الأعمال", "ALL WORK")}</span></a>
            </nav>`;
    }

/* Replace the poster with the YouTube player once play is pressed. */
mount.addEventListener("click", (event) => {
    const button = event.target.closest(".pd-play");

    if (!button) {
        return;
    }

    let rawVideo = button.dataset.video || "";
    let videoId = rawVideo;

    if (rawVideo.includes("youtu.be/")) {
        videoId = rawVideo.split("youtu.be/")[1].split("?")[0];
    } else if (rawVideo.includes("v=")) {
        videoId = rawVideo.split("v=")[1].split("&")[0];
    }

    const iframe = document.createElement("iframe");

    iframe.src = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    iframe.title = text(project.title);
    iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    iframe.allowFullscreen = true;

    button.parentElement.replaceChildren(iframe);
});


    render();
    document.addEventListener("samir:languagechange", render);
})();
