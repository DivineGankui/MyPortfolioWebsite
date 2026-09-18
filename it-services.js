
/* =====================================================
   IT SERVICES PAGE
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
   SERVICE ITEM INTERACTION
===================================================== */

const serviceItems =
    document.querySelectorAll(".service-item");


serviceItems.forEach((item) => {

    item.addEventListener("mouseenter", () => {

        item.classList.add("active");

    });


    item.addEventListener("mouseleave", () => {

        item.classList.remove("active");

    });

});



/* =====================================================
   SMOOTH SCROLL
===================================================== */

const serviceLinks =
    document.querySelectorAll('a[href^="#"]');


serviceLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        const target =
            document.querySelector(targetId);


        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});
