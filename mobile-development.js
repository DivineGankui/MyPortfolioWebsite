/* =====================================================
   MOBILE DEVELOPMENT PROJECTS PAGE
===================================================== */


/* =====================================================
   POP-IN ANIMATION ON SCROLL
===================================================== */

const popElements = document.querySelectorAll(".pop-in");

const popObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            } else {

                entry.target.classList.remove("show");

            }

        });

    },
    {
        threshold: 0.15
    }
);


popElements.forEach((element) => {

    popObserver.observe(element);

});



/* =====================================================
   PROJECT IMAGE FALLBACK
===================================================== */

const projectImages =
    document.querySelectorAll(".project-image img");


projectImages.forEach((image) => {

    image.addEventListener("error", () => {

        image.style.display = "none";

        image.parentElement.classList.add("image-error");

    });

});