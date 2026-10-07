

(() => {
    "use strict";

    const section = document.querySelector("[data-projects]");

    if (!section || !window.PROJECTS) {
        return;
    }

    const { categories, items } = window.PROJECTS;
    const tabsBox = section.querySelector(".proj-tabs");
    const grid = section.querySelector(".proj-grid");
    const more = section.querySelector(".proj-more a");
    const limit = parseInt(section.dataset.limit, 10) || 0;

    const lang = () => (window.Samir ? window.Samir.getLanguage() : "ar");
    const text = (obj) => obj[lang()] || obj.ar;
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

    const fromUrl = new URLSearchParams(window.location.search).get("cat");
    let current = categories.some((c) => c.id === fromUrl) ? fromUrl : categories[0].id;

    function formatDate(value) {
        return new Date(value).toLocaleDateString(lang() === "ar" ? "ar-EG" : "en-GB", { year: "numeric", month: "long" });
    }

    function renderTabs() {
        tabsBox.innerHTML = categories.map((c) => `
            <button type="button" class="proj-tab" role="tab" data-cat="${c.id}" aria-selected="${c.id === current}">${esc(text(c.label))}</button>`).join("");
    }

    function renderGrid(animate) {
        let list = items.filter((p) => p.category === current);

        if (limit) {
            list = list.slice(0, limit);
        }

        const readLabel = lang() === "ar" ? "عرض المشروع" : "VIEW PROJECT";

        grid.classList.toggle("is-animated", animate);
        grid.innerHTML = list.map((p, i) => `
            <article class="proj-card" style="--i:${i}">
                <a class="proj-thumb" href="project.html?id=${esc(p.id)}" tabindex="-1" aria-hidden="true">
                    <img src="${esc(p.thumb)}" alt="" width="640" height="400" loading="lazy" decoding="async">
                </a>
                <div class="proj-info">
                    <time datetime="${esc(p.date)}">${esc(formatDate(p.date))}</time>
                    <h3>${esc(text(p.title))}</h3>
                    <a class="proj-btn" href="project.html?id=${esc(p.id)}">
                        <span>${readLabel}</span>
                        <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                    </a>
                </div>
            </article>`).join("");

        if (more) {
            more.href = `${section.dataset.more || "work.html"}?cat=${current}`;
        }
    }

    tabsBox.addEventListener("click", (event) => {
        const tab = event.target.closest(".proj-tab");

        if (!tab || tab.dataset.cat === current) {
            return;
        }

        current = tab.dataset.cat;
        renderTabs();
        renderGrid(true);

        /* Keep the work page link shareable (?cat=reels). */
        if (!more) {
            history.replaceState(null, "", `?cat=${current}`);
        }
    });

    function render() {
        renderTabs();
        renderGrid(false);
    }

    render();
    document.addEventListener("samir:languagechange", render);
})();
