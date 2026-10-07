

(() => {
    "use strict";

    const COUNT_DURATION = 1600;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const counters = document.querySelectorAll(".counter");


    /* Counts from 0 to the target number with an ease-out curve. */
    function countUp(element) {
        const target = Number(element.dataset.target) || 0;
        const start = performance.now();

        function step(now) {
            const ratio = Math.min((now - start) / COUNT_DURATION, 1);
            const eased = 1 - Math.pow(1 - ratio, 3);

            element.textContent = Math.round(target * eased);

            if (ratio < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }

    function initCounters() {
        if (!counters.length || prefersReducedMotion || !("IntersectionObserver" in window)) {
            return; /* The final numbers are already in the markup. */
        }

        /* Only start from zero when we are certain we will animate. */
        counters.forEach((counter) => {
            counter.textContent = "0";
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        countUp(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.6 }
        );

        counters.forEach((counter) => observer.observe(counter));
    }

    initCounters();
})();
