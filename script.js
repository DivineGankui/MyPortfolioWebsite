/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       CHANGING ROLE TEXT
    ===================================================== */

    const words = document.querySelectorAll(".change-text .word");

    let currentWordIndex = 0;

    if (words.length > 0) {

        /* -----------------------------------------------
           Split every word into individual letters
        ------------------------------------------------ */

        words.forEach((word) => {

            const text = word.textContent.trim();

            word.textContent = "";

            [...text].forEach((letter) => {

                const span = document.createElement("span");

                span.classList.add("letter");

                span.textContent =
                    letter === " "
                        ? "\u00A0"
                        : letter;

                word.appendChild(span);
            });
        });


        /* -----------------------------------------------
           Prepare all words
        ------------------------------------------------ */

        words.forEach((word, index) => {

            word.style.opacity =
                index === 0 ? "1" : "0";

            word.style.visibility =
                index === 0 ? "visible" : "hidden";

            word.querySelectorAll(".letter").forEach((letter) => {

                letter.className = "letter";

                if (index !== 0) {
                    letter.classList.add("behind");
                }

            });
        });


        /* -----------------------------------------------
           Change role
        ------------------------------------------------ */

        function changeRoleText() {

            const currentWord =
                words[currentWordIndex];

            const nextWord =
                words[
                    (currentWordIndex + 1) % words.length
                ];


            /* CURRENT WORD OUT */

            const currentLetters =
                currentWord.querySelectorAll(".letter");

            currentLetters.forEach((letter, index) => {

                setTimeout(() => {

                    letter.className = "letter out";

                }, index * 60);

            });


            /* NEXT WORD */

            nextWord.style.opacity = "1";
            nextWord.style.visibility = "visible";


            const nextLetters =
                nextWord.querySelectorAll(".letter");


            nextLetters.forEach((letter, index) => {

                letter.className = "letter behind";

                setTimeout(() => {

                    letter.className = "letter in";

                }, 350 + index * 60);

            });


            /* Hide old word after animation */

            setTimeout(() => {

                currentWord.style.opacity = "0";
                currentWord.style.visibility = "hidden";

                currentLetters.forEach((letter) => {

                    letter.className = "letter behind";

                });

            }, 800);


            /* Move to next word */

            currentWordIndex =
                (currentWordIndex + 1) % words.length;
        }


        /* Start changing roles */

        setTimeout(() => {

            changeRoleText();

            setInterval(changeRoleText, 4000);

        }, 2500);

    }



    /* =====================================================
       TYPING NAME EFFECT
    ===================================================== */

    const typingName =
        document.getElementById("typing-name");

    const nameText =
        "Divine Kojo Gankui";

    let nameIndex = 0;
    let deleting = false;
    let pauseAfterTyping = false;


    function typeName() {

        if (!typingName) {
            return;
        }


        /* -----------------------------------------------
           TYPING
        ------------------------------------------------ */

        if (!deleting) {

            typingName.textContent =
                nameText.substring(0, nameIndex + 1);

            nameIndex++;


            /* Full name reached */

            if (nameIndex >= nameText.length) {

                nameIndex = nameText.length;

                if (!pauseAfterTyping) {

                    pauseAfterTyping = true;

                    setTimeout(() => {

                        deleting = true;
                        pauseAfterTyping = false;

                        typeName();

                    }, 1500);

                }

                return;
            }


            setTimeout(typeName, 120);

        }


        /* -----------------------------------------------
           DELETING
        ------------------------------------------------ */

        else {

            typingName.textContent =
                nameText.substring(0, nameIndex - 1);

            nameIndex--;


            /* Name completely deleted */

            if (nameIndex <= 0) {

                nameIndex = 0;

                deleting = false;

                setTimeout(typeName, 400);

                return;
            }


            setTimeout(typeName, 80);
        }
    }


    /* Start name animation */

    if (typingName) {
        typeName();
    }



    /* =====================================================
       MOBILE MENU
    ===================================================== */
       const menuIcon =
        document.getElementById("menu-icon") ||
        document.querySelector(".menu-icon");


    /*
       We search for the navigation by CLASS first.

       Your HTML should have:

       <ul class="navlist">
    */

    const navList =
        document.querySelector(".navlist") ||
        document.getElementById("navlist");


    /* -----------------------------------------------
       Check that both elements exist
    ------------------------------------------------ */

    if (menuIcon && navList) {

        console.log("Mobile menu connected successfully.");


        /* -------------------------------------------
           Open / Close menu
        ------------------------------------------- */

        menuIcon.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();


            navList.classList.toggle("active");


            const isOpen =
                navList.classList.contains("active");


            /* Change icon */

            if (isOpen) {

                menuIcon.innerHTML =
                    '<i class="fa-solid fa-xmark"></i>';

                menuIcon.setAttribute(
                    "aria-expanded",
                    "true"
                );

                menuIcon.setAttribute(
                    "aria-label",
                    "Close menu"
                );

            } else {

                menuIcon.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

                menuIcon.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuIcon.setAttribute(
                    "aria-label",
                    "Open menu"
                );
            }

        });


        /* -------------------------------------------
           Close menu when navigation link is clicked
        ------------------------------------------- */

        const navLinks =
            navList.querySelectorAll("a");


        navLinks.forEach((link) => {

            link.addEventListener("click", function () {

                navList.classList.remove("active");


                menuIcon.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';


                menuIcon.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuIcon.setAttribute(
                    "aria-label",
                    "Open menu"
                );

            });

        });


        /* -------------------------------------------
           Close menu when clicking outside
        ------------------------------------------- */

        document.addEventListener("click", function (event) {

            const clickedInsideMenu =
                navList.contains(event.target);

            const clickedIcon =
                menuIcon.contains(event.target);


            if (
                !clickedInsideMenu &&
                !clickedIcon
            ) {

                navList.classList.remove("active");


                menuIcon.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';


                menuIcon.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });


        /* -------------------------------------------
           Close menu when screen becomes desktop size
        ------------------------------------------- */

        window.addEventListener("resize", function () {

            if (window.innerWidth > 768) {

                navList.classList.remove("active");


                menuIcon.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';


                menuIcon.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    } else {

        console.error(
            "Mobile menu error: .menu-icon or .navlist was not found."
        );

    }


/* =====================================================
   CIRCLE SKILLS
===================================================== */

const circles = document.querySelectorAll(".circle");

circles.forEach((circle) => {

    const dots =
        parseInt(circle.getAttribute("data-dots")) || 0;

    const percentage =
        parseInt(circle.getAttribute("data-percent")) || 0;

    if (dots <= 0) {
        return;
    }

    const marked =
        Math.floor(dots * percentage / 100);

    const rotation =
        360 / dots;

    let pointsHTML = "";

    /* Create dots */

    for (let i = 0; i < dots; i++) {

        pointsHTML += `
            <div
                class="points"
                style="--i:${i}; --rot:${rotation}deg;"
            ></div>
        `;
    }

    circle.innerHTML = pointsHTML;

    const points =
        circle.querySelectorAll(".points");


    /* =================================================
       ANIMATE DOTS ACCORDING TO PERCENTAGE
    ================================================= */

    points.forEach((point, index) => {

        if (index < marked) {

            setTimeout(() => {

                point.classList.add("marked");

            }, index * 30);

        }

    });

});    /* =====================================================
       EMAILJS
    ===================================================== */

    if (
        typeof emailjs !== "undefined"
    ) {

        emailjs.init({
            publicKey: "-z2M4WgpboMUqBJKb"
        });


        const contactForm =
            document.getElementById("contact-form");


        if (contactForm) {

            contactForm.addEventListener(
                "submit",
                function (event) {

                    /* ---------------------------------
                       STOP PAGE REFRESH
                    --------------------------------- */

                    event.preventDefault();
                    event.stopPropagation();


                    /* ---------------------------------
                       BUTTON
                    --------------------------------- */

                    const button =
                        contactForm.querySelector(
                            ".send-message-btn"
                        );


                    if (!button) {

                        console.error(
                            "Send button not found."
                        );

                        return;
                    }


                    /* ---------------------------------
                       Prevent multiple submissions
                    --------------------------------- */

                    if (button.disabled) {
                        return;
                    }


                    /* ---------------------------------
                       Sending state
                    --------------------------------- */

                    button.disabled = true;

                    button.textContent =
                        "Sending...";


                    /* ---------------------------------
                       SEND EMAIL
                    --------------------------------- */

                    emailjs.sendForm(
                        "service_xe8s6dd",
                        "template_b8neoeq",
                        contactForm
                    )


                    /* ---------------------------------
                       SUCCESS
                    --------------------------------- */

                    .then(function (response) {

                        console.log(
                            "Email sent successfully:",
                            response.status,
                            response.text
                        );


                        button.textContent =
                            "✓ Message Sent Successfully!";


                        /* Clear form */

                        contactForm.reset();


                        /* Restore button */

                        setTimeout(function () {

                            button.textContent =
                                "Send Message";

                            button.disabled = false;

                        }, 3000);

                    })


                    /* ---------------------------------
                       ERROR
                    --------------------------------- */

                    .catch(function (error) {

                        console.error(
                            "EmailJS Error:",
                            error
                        );


                        button.textContent =
                            "Failed to Send";


                        setTimeout(function () {

                            button.textContent =
                                "Send Message";

                            button.disabled = false;

                        }, 3000);

                    });

                }
            );

        } else {

            console.warn(
                "Contact form #contact-form was not found."
            );

        }

    } else {

        console.error(
            "EmailJS library was not loaded."
        );

    }

});


/* =====================================================
   POP-IN ON SCROLL
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