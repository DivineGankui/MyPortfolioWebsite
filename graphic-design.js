/* =========================================================
   GRAPHIC DESIGN PAGE
========================================================= */


/* =========================================================
   POP-IN SCROLL ANIMATION
========================================================= */

const popElements =
    document.querySelectorAll(".pop-in");


const popObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                } else {

                    /*
                     * Remove the class when the element
                     * leaves the viewport.
                     *
                     * This allows the animation to play
                     * again when the user scrolls back.
                     */

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



/* =========================================================
   OPEN DESIGN GALLERY
========================================================= */

function openGallery(galleryId) {

    const gallery =
        document.getElementById(galleryId);


    if (!gallery) {

        return;

    }


    /*
     * Show the selected gallery.
     */

    gallery.classList.add("active");


    /*
     * Stop the main page from scrolling
     * while the gallery is open.
     */

    document.body.classList.add("gallery-open");


    /*
     * Start the gallery from the top.
     */

    gallery.scrollTop = 0;

}



/* =========================================================
   CLOSE DESIGN GALLERY
========================================================= */

function closeGallery(galleryId) {

    const gallery =
        document.getElementById(galleryId);


    if (!gallery) {

        return;

    }


    /*
     * Hide the gallery.
     */

    gallery.classList.remove("active");


    /*
     * Allow the main page to scroll again.
     */

    document.body.classList.remove("gallery-open");

}



/* =========================================================
   CLOSE WITH ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",

    (event) => {

        if (event.key !== "Escape") {

            return;

        }


        const openGallery =
            document.querySelector(
                ".gallery-overlay.active"
            );


        if (openGallery) {

            openGallery.classList.remove("active");

            document.body.classList.remove(
                "gallery-open"
            );

        }

    }

);



/* =========================================================
   CLICK OUTSIDE GALLERY
========================================================= */

document.querySelectorAll(
    ".gallery-overlay"
).forEach((overlay) => {


    overlay.addEventListener(
        "click",
        (event) => {


            /*
             * Only close when the user clicks
             * the dark area outside the gallery window.
             */

            if (event.target === overlay) {

                overlay.classList.remove(
                    "active"
                );

                document.body.classList.remove(
                    "gallery-open"
                );

            }

        }
    );

});



/* =========================================================
   IMAGE ERROR HANDLING
========================================================= */

const galleryImages =
    document.querySelectorAll(
        ".gallery-item img"
    );


galleryImages.forEach((image) => {


    image.addEventListener(
        "error",
        () => {

            /*
             * Hide broken images instead of
             * showing a broken-image icon.
             */

            image.style.display = "none";

        }
    );

});