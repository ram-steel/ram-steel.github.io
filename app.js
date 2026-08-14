document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================================
       1. NAVIGATION MENU TOGGLE LOGIC
    ========================================================== */
    const navBar = document.querySelector("header nav .bar");
    const navMenu = document.querySelector("header nav ul");

    if (navBar && navMenu) {
        // Toggle mobile navbar state
        navBar.addEventListener("click", function (event) {
            event.stopPropagation();
            navBar.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Close menu when clicking on any menu link
        const navLinks = navMenu.querySelectorAll("a");
        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                navBar.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });

        // Close menu when clicking anywhere outside
        document.addEventListener("click", function (event) {
            if (!navBar.contains(event.target) && !navMenu.contains(event.target)) {
                navBar.classList.remove("active");
                navMenu.classList.remove("active");
            }
        });
    }

    /* ==========================================================
       2. DYNAMIC COUNTER ANIMATION FOR LANDING CARDS
    ========================================================== */
    function initDynamicCounters() {
        const counters = document.querySelectorAll(".landing .js-counter");

        counters.forEach(counter => {
            const targetValue = parseInt(counter.getAttribute("data-target"), 10);
            if (isNaN(targetValue)) return;

            const duration = 2500; // Total duration in ms
            const frameDuration = 1000 / 60; // 60fps
            const totalFrames = Math.round(duration / frameDuration);
            let frame = 0;

            const animateCounter = () => {
                frame++;
                const progress = frame / totalFrames;
                // Ease-out function for smooth slowdown at the end
                const easeOutProgress = 1 - Math.pow(1 - progress, 3);
                const currentCount = Math.floor(easeOutProgress * targetValue);

                counter.textContent = currentCount;

                if (frame < totalFrames) {
                    requestAnimationFrame(animateCounter);
                } else {
                    counter.textContent = targetValue;
                }
            };

            animateCounter();
        });
    }

    initDynamicCounters();

    /* ==========================================================
       3. TRUNCATED PARAGRAPH TOGGLE WITH THREE DOTS (...)
    ========================================================== */
    function initExpandableParagraphs() {
        const expandableParagraphs = document.querySelectorAll(".expandable-paragraph");

        expandableParagraphs.forEach(paragraph => {
            // Check if paragraph actually overflows line clamp
            const isOverflowing = paragraph.scrollHeight > paragraph.clientHeight;

            if (isOverflowing) {
                paragraph.classList.add("is-overflowing");

                // Create the three dots toggle element
                const dotsBtn = document.createElement("span");
                dotsBtn.className = "expandable-dots-btn";
                dotsBtn.textContent = "...";
                dotsBtn.title = "Click to expand";
                paragraph.after(dotsBtn);

                // Expand paragraph on clicking dots or paragraph
                const expandAction = function (event) {
                    event.stopPropagation();
                    
                    // Collapse any other expanded paragraphs first
                    document.querySelectorAll(".expandable-paragraph.expanded").forEach(el => {
                        el.classList.remove("expanded");
                    });

                    paragraph.classList.add("expanded");
                };

                dotsBtn.addEventListener("click", expandAction);
                paragraph.addEventListener("click", expandAction);
            }
        });

        // Collapse all expanded paragraphs when clicking anywhere outside
        document.addEventListener("click", function () {
            document.querySelectorAll(".expandable-paragraph.expanded").forEach(paragraph => {
                paragraph.classList.remove("expanded");
            });
        });
    }

    initExpandableParagraphs();

    /* ==========================================================
       4. INFINITE BRANDS LOOP SETUP
    ========================================================== */
    function initInfiniteBrands() {
        const imagesContainer = document.querySelector(".partners .logos .images");
        if (imagesContainer) {
            // Duplicate images container content seamlessly for continuous infinity loop
            imagesContainer.innerHTML += imagesContainer.innerHTML;
        }
    }

    initInfiniteBrands();
});
