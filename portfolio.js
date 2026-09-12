
/* =========================================================
   CHANGING ROLE TEXT
========================================================= */

const words = document.querySelectorAll(".change-text .word");

let currentWordIndex = 0;

if (words.length > 0) {

    /* Split each word into individual letters */
    words.forEach((word) => {

        const letters = word.textContent.trim().split("");

        word.textContent = "";

        letters.forEach((letter) => {

            const span = document.createElement("span");

            span.textContent = letter === " " ? "\u00A0" : letter;

            span.className = "letter";

            word.appendChild(span);
        });
    });


    /* Show first word */
    words[0].style.opacity = "1";


    /* Change role */
    function changeRoleText() {

        const currentWord = words[currentWordIndex];

        const nextWord =
            currentWordIndex === words.length - 1
                ? words[0]
                : words[currentWordIndex + 1];


        /* -------------------------
           CURRENT WORD OUT
        ------------------------- */

        Array.from(currentWord.children).forEach((letter, i) => {

            setTimeout(() => {

                letter.className = "letter out";

            }, i * 80);

        });


        /* -------------------------
           NEXT WORD IN
        ------------------------- */

        nextWord.style.opacity = "1";

        Array.from(nextWord.children).forEach((letter, i) => {

            letter.className = "letter behind";

            setTimeout(() => {

                letter.className = "letter in";

            }, 340 + i * 80);

        });


        /* Move to next word */

        currentWordIndex =
            currentWordIndex === words.length - 1
                ? 0
                : currentWordIndex + 1;
    }


    /* Start after the first word has displayed */
    setTimeout(() => {

        changeRoleText();

        setInterval(changeRoleText, 3000);

    }, 2500);
}



/* =========================================================
   TYPING NAME EFFECT
========================================================= */

const nameText = "Divine Kojo Gankui";

const typingName = document.getElementById("typing-name");

let nameIndex = 0;

let deleting = false;


function typeName() {

    if (!typingName) return;


    /* -------------------------
       TYPING FORWARD
    ------------------------- */

    if (!deleting) {

        typingName.textContent =
            nameText.substring(0, nameIndex + 1);

        nameIndex++;


        /* When full name is typed */
        if (nameIndex === nameText.length) {

            setTimeout(() => {

                deleting = true;

            }, 1500);
        }

    }


    /* -------------------------
       DELETING BACKWARD
    ------------------------- */

    else {

        typingName.textContent =
            nameText.substring(0, nameIndex - 1);

        nameIndex--;


        /* When completely deleted */
        if (nameIndex === 0) {

            deleting = false;
        }
    }


    const speed = deleting ? 80 : 120;

    setTimeout(typeName, speed);
}


/* Start typing effect */
typeName();



/* =========================================================
   MOBILE MENU TOGGLE
========================================================= */

const menuIcon = document.getElementById("menu-icon");

const navList = document.getElementById("navlist");


if (menuIcon && navList) {

    menuIcon.addEventListener("click", () => {

        navList.classList.toggle("active");


        if (navList.classList.contains("active")) {

            menuIcon.innerHTML =
                '<i class="fa-solid fa-xmark"></i>';

        } else {

            menuIcon.innerHTML =
                '<i class="fa-solid fa-bars"></i>';
        }
    });


    /* Close menu after clicking a link */

    document.querySelectorAll(".navlist a").forEach((link) => {

        link.addEventListener("click", () => {

            navList.classList.remove("active");

            menuIcon.innerHTML =
                '<i class="fa-solid fa-bars"></i>';
        });

    });
}



/* =========================================================
   CIRCLE SKILLS
========================================================= */

const circles = document.querySelectorAll(".circle");


circles.forEach((elem) => {

    const dots = parseInt(
        elem.getAttribute("data-dots")
    );

    const marked = parseInt(
        elem.getAttribute("data-percent")
    );


    const percent = Math.floor(
        dots * marked / 100
    );


    let points = "";

    const rotate = 360 / dots;


    /* Create dots */

    for (let i = 0; i < dots; i++) {

        points += `
            <div
                class="points"
                style="--i:${i}; --rot:${rotate}deg"
            ></div>
        `;
    }


    elem.innerHTML = points;


    /* Mark percentage dots */

    const pointsMarked =
        elem.querySelectorAll(".points");


    for (let i = 0; i < percent; i++) {

        if (pointsMarked[i]) {

            pointsMarked[i].classList.add("marked");

        }
    }

});



/* =========================================================
   EMAILJS
========================================================= */


/* Initialize EmailJS */

(function () {

    emailjs.init({

        publicKey: "-z2M4WgpboMUqBJKb"

    });

})();



/* Get contact form */

const contactForm =
    document.getElementById("contact-form");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            /* Prevent page refresh */
            event.preventDefault();

            event.stopPropagation();


            /* Get button */

            const button =
                contactForm.querySelector(
                    ".send-message-btn"
                );


            if (!button) return;


            /* Sending status */

            button.textContent = "Sending...";

            button.disabled = true;


            /* Send form */

            emailjs.sendForm(

                "service_xe8s6dd",

                "template_b8neoeq",

                contactForm

            )


            /* -------------------------
               SUCCESS
            ------------------------- */

            .then(function (response) {

                console.log(
                    "SUCCESS:",
                    response.status,
                    response.text
                );


                button.textContent =
                    "✓ Message Sent Successfully!";


                /* Clear form */

                contactForm.reset();


                /* Reset button */

                setTimeout(function () {

                    button.textContent =
                        "Send Message";

                    button.disabled = false;

                }, 3000);

            })


            /* -------------------------
               ERROR
            ------------------------- */

            .catch(function (error) {

                console.error(
                    "EMAILJS ERROR:",
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

}

