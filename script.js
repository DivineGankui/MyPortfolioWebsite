// Scroll Progress Bar
const scrollProgress = document.getElementById("scrollProgress");

function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollHeight > 0
        ? scrollTop / scrollHeight
        : 0;

    scrollProgress.style.transform = `scaleX(${progress})`;
}

window.addEventListener("scroll", updateScrollProgress, {
    passive: true
});

window.addEventListener("resize", updateScrollProgress);

updateScrollProgress();


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

// Smart Back to Top Button
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
}, { passive: true });

// Scroll smoothly to the top
backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});




/* =========================================
   DIVINE GANKUI - PORTFOLIO AI ASSISTANT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. SELECT HTML ELEMENTS
    // =====================================

    const chatToggle = document.getElementById("aiChatToggle");
    const chatWindow = document.getElementById("aiChatWindow");
    const chatClose = document.getElementById("aiChatClose");
    const chatClear = document.getElementById("aiChatClear");

    const chatForm = document.getElementById("aiChatForm");
    const chatInput = document.getElementById("aiChatInput");
    const chatMessages = document.getElementById("aiChatMessages");

    const chatSend = document.getElementById("aiChatSend");
    const typingIndicator = document.getElementById("aiTyping");
    const suggestions = document.getElementById("aiSuggestions");

    // Stop if chatbot HTML is missing
    if (
        !chatToggle ||
        !chatWindow ||
        !chatClose ||
        !chatClear ||
        !chatForm ||
        !chatInput ||
        !chatMessages ||
        !chatSend ||
        !typingIndicator
    ) {
        console.warn("Portfolio chatbot HTML elements were not found.");
        return;
    }

    // =====================================
    // 2. CHAT CONFIGURATION
    // =====================================

    const API_URL = "/.netlify/functions/chat";

    const STORAGE_KEY = "divinePortfolioChatHistory";

    let conversationHistory = [];

    let isSending = false;

    // =====================================
    // 3. PREDEFINED KNOWLEDGE BASE
    // =====================================

    const knowledgeBase = [

        {
            keywords: [
                "who are you",
                "who is divine",
                "about divine",
                "tell me about divine",
                "who is divine gankui"
            ],

            answer: `
                Divine Kojo Gankui is a software developer and
                graphic designer passionate about building
                digital solutions and creating meaningful
                visual experiences.

                He works across web development, application
                development, graphic design and emerging
                technologies.
            `
        },

        {
            keywords: [
                "programming languages",
                "coding languages",
                "technical skills",
                "what languages",
                "what technologies",
                "your skills"
            ],

            answer: `
                Divine works with technologies including:

                HTML, CSS, JavaScript, PHP, Python, Java,
                MySQL, Bootstrap and Django.

                He also works with design tools such as
                Adobe Photoshop, Adobe Illustrator and Figma.
            `
        },

        {
            keywords: [
                "services",
                "what do you offer",
                "what services",
                "your services",
                "what can you do"
            ],

            answer: `
                Divine offers several digital services:

                • Website Development
                • Mobile App Development
                • Graphic Design
                • AI and Robotics Solutions
                • Desktop Application Development
                • IT Services

                Visit the Services section of this portfolio
                to learn more.
            `
        },

        {
            keywords: [
                "graphic design",
                "graphic designer",
                "design services",
                "design work"
            ],

            answer: `
                Divine provides graphic design services,
                including branding, promotional designs,
                social media graphics and other visual
                communication materials.
            `
        },

        {
            keywords: [
                "web development",
                "website development",
                "websites",
                "web developer"
            ],

            answer: `
                Divine develops websites using technologies
                such as HTML, CSS, JavaScript, Bootstrap,
                PHP, Python and Django.

                His work focuses on functionality,
                responsiveness and user experience.
            `
        },

        {
            keywords: [
                "projects",
                "portfolio projects",
                "your projects",
                "what have you built",
                "applications developed"
            ],

            answer: `
                Divine has worked on projects involving
                website development, restaurant ordering
                systems, digital platforms and application
                development.

                Explore the project sections of this
                portfolio to see his work.
            `
        },

        {
            keywords: [
                "awards",
                "achievements",
                "recognition",
                "awards won"
            ],

            answer: `
                Divine has received recognition including
                Graphic Designer of the Year and Innovative
                Student of the Year at Koforidua Technical
                University.

                He has also served as a Ghana Tertiary
                Awards Ambassador.
            `
        },

        {
            keywords: [
                "hire you",
                "hire divine",
                "work with you",
                "collaborate",
                "need a developer",
                "need a designer"
            ],

            answer: `
                Thank you for considering Divine!

                You can reach out through the Contact
                section of this portfolio to discuss your
                project, requirements and collaboration.
            `
        },

        {
            keywords: [
                "contact",
                "email",
                "reach you",
                "get in touch",
                "phone number"
            ],

            answer: `
                You can contact Divine through the Contact
                section of this website.

                Send a message describing your enquiry
                or project requirements.
            `
        },

        {
            keywords: [
                "cv",
                "resume",
                "curriculum vitae"
            ],

            answer: `
                You can check the portfolio for Divine's
                professional background and skills.

                If a CV download option is available on
                the website, you can download it there.
            `
        },

        {
            keywords: [
                "thank you",
                "thanks",
                "thank"
            ],

            answer: `
                You're very welcome! I'm happy to help.
                Is there anything else you'd like to know
                about Divine?
            `
        },

        {
            keywords: [
                "hello",
                "hi",
                "hey",
                "good morning",
                "good afternoon",
                "good evening"
            ],

            answer: `
                Hello! 👋 Welcome to Divine Gankui's portfolio.
                What would you like to know about his work?
            `
        }

    ];

    // =====================================
    // 4. SAVE AND RESTORE CHAT HISTORY
    // =====================================

    function saveHistory() {
        try {
            sessionStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(conversationHistory)
            );
        } catch (error) {
            console.warn("Could not save chat history.", error);
        }
    }

    function loadHistory() {
        try {
            const saved = sessionStorage.getItem(STORAGE_KEY);

            if (saved) {
                const parsed = JSON.parse(saved);

                if (Array.isArray(parsed)) {
                    conversationHistory = parsed
                        .filter(item =>
                            item &&
                            ["user", "assistant"].includes(item.role) &&
                            typeof item.content === "string"
                        )
                        .slice(-8);
                }
            }
        } catch (error) {
            conversationHistory = [];
        }
    }

    loadHistory();

    // =====================================
    // 5. CHAT WINDOW CONTROLS
    // =====================================

    function openChat() {
        chatWindow.classList.add("active");

        chatToggle.setAttribute("aria-expanded", "true");

        setTimeout(() => {
            chatInput.focus();
        }, 200);
    }

    function closeChat() {
        chatWindow.classList.remove("active");

        chatToggle.setAttribute("aria-expanded", "false");
    }

    chatToggle.addEventListener("click", () => {
        if (chatWindow.classList.contains("active")) {
            closeChat();
        } else {
            openChat();
        }
    });

    chatClose.addEventListener("click", closeChat);

    // =====================================
    // 6. DISPLAY CHAT MESSAGES
    // =====================================

    function addMessage(message, sender) {

        const messageWrapper = document.createElement("div");

        messageWrapper.className =
            sender === "user"
                ? "user-message"
                : "ai-message assistant-message";

        if (sender === "assistant") {

            const avatar = document.createElement("div");

            avatar.className = "message-avatar";

            const icon = document.createElement("i");

            icon.className = "fas fa-robot";

            avatar.appendChild(icon);

            messageWrapper.appendChild(avatar);
        }

        const content = document.createElement("div");

        content.className = "message-content";

        // Use textContent to prevent HTML/script injection.
        // Convert newlines into separate paragraphs.
        message.split("\n").forEach(line => {

            const paragraph = document.createElement("p");

            paragraph.textContent = line;

            content.appendChild(paragraph);

        });

        messageWrapper.appendChild(content);

        chatMessages.appendChild(messageWrapper);

        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // =====================================
    // 7. TYPING INDICATOR
    // =====================================

    function showTyping() {
        typingIndicator.classList.add("active");
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function hideTyping() {
        typingIndicator.classList.remove("active");
    }

    // =====================================
    // 8. PREDEFINED RESPONSE SYSTEM
    // =====================================

    function getPredefinedResponse(message) {

        const question = message
            .toLowerCase()
            .replace(/[^\w\s]/g, " ")
            .replace(/\s+/g, " ")
            .trim();

        // Prefer longer keyword matches to avoid
        // generic greetings matching complex questions.
        const matches = knowledgeBase
            .flatMap(item =>
                item.keywords.map(keyword => ({
                    keyword,
                    answer: item.answer
                }))
            )
            .filter(item =>
                question.includes(item.keyword)
            )
            .sort((a, b) =>
                b.keyword.length - a.keyword.length
            );

        return matches.length ? matches[0].answer.trim() : null;
    }

    // =====================================
    // 9. AI BACKEND CONNECTION
    // =====================================

    async function getAIResponse(message) {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                message: message,

                history: conversationHistory.slice(-8)

            })

        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "AI service unavailable."
            );
        }

        if (!data.reply) {
            throw new Error("The assistant returned an empty response.");
        }

        return data.reply;
    }

    // =====================================
    // 10. SEND MESSAGE
    // =====================================

    async function sendMessage(message) {

        message = message.trim();

        if (!message || isSending) return;

        isSending = true;

        chatSend.disabled = true;
        chatInput.disabled = true;

        if (suggestions) {
            suggestions.style.display = "none";
        }

        addMessage(message, "user");

        const previousHistory = [...conversationHistory];

        conversationHistory.push({
            role: "user",
            content: message
        });

        showTyping();

        try {

            // Check predefined knowledge first.
            const predefinedAnswer =
                getPredefinedResponse(message);

            let answer;

            if (predefinedAnswer) {

                // Instant JavaScript response.
                answer = predefinedAnswer;

            } else {

                // Use AI for other questions.
                answer = await getAIResponse(message);

            }

            hideTyping();

            addMessage(answer, "assistant");

            conversationHistory.push({
                role: "assistant",
                content: answer
            });

            conversationHistory =
                conversationHistory.slice(-8);

            saveHistory();

        } catch (error) {

            console.error("Portfolio assistant:", error);

            hideTyping();

            addMessage(
                "I'm having trouble connecting to my AI service right now. Please try again shortly, or use the Contact section to reach Divine.",
                "assistant"
            );

            // Keep the previous successful history.
            conversationHistory = previousHistory;

        } finally {

            isSending = false;

            chatSend.disabled = false;
            chatInput.disabled = false;

            chatInput.focus();

        }
    }

    // =====================================
    // 11. FORM SUBMISSION
    // =====================================

    chatForm.addEventListener("submit", async event => {

        event.preventDefault();

        const message = chatInput.value;

        if (!message.trim()) return;

        chatInput.value = "";

        await sendMessage(message);

    });

    // =====================================
    // 12. SUGGESTED QUESTIONS
    // =====================================

    if (suggestions) {

        suggestions.addEventListener("click", async event => {

            const button = event.target.closest(".suggestion-btn");

            if (!button || isSending) return;

            const question = button.dataset.question;

            if (question) {
                await sendMessage(question);
            }

        });

    }

    // =====================================
    // 13. CLEAR CONVERSATION
    // =====================================

    chatClear.addEventListener("click", () => {

        conversationHistory = [];

        sessionStorage.removeItem(STORAGE_KEY);

        chatMessages.innerHTML = "";

        const welcomeMessage = document.createElement("div");

        welcomeMessage.className =
            "ai-message assistant-message";

        welcomeMessage.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>Hello again! 👋</p>
                <p>I'm ready to answer your questions about Divine's skills, projects and services.</p>
            </div>
        `;

        chatMessages.appendChild(welcomeMessage);

        if (suggestions) {
            suggestions.style.display = "flex";
            chatMessages.appendChild(suggestions);
        }

        hideTyping();

        chatInput.value = "";

        chatInput.focus();

    });

    // =====================================
    // 14. ESCAPE KEY TO CLOSE CHAT
    // =====================================

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            chatWindow.classList.contains("active")
        ) {
            closeChat();
        }

    });

    // =====================================
    // 15. RESTORE PREVIOUS CONVERSATION
    // =====================================

    if (conversationHistory.length > 0) {

        conversationHistory.forEach(item => {
            addMessage(item.content, item.role);
        });

        if (suggestions) {
            suggestions.style.display = "none";
        }

    }

    console.log("Divine's Portfolio Assistant initialized.");

});
