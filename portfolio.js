let words = document.querySelectorAll(".word");
words.forEach((word)=>{
    let letters = word.textContent.split("");
    word.textContent="";
    letters.forEach((letter)=>{
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span);
    });
});

let currentWordIndex = 0;
let maxWordIndex = words.length -1;
words[currentWordIndex].style.opacity = "1";


//typing name effect
const nameText = "Divine Kojo Gankui";
const typingName = document.getElementById("typing-name");

let index = 0;
let deleting = false;

function typeName() {

    if (!deleting) {
        // Typing forward
        typingName.textContent = nameText.substring(0, index + 1);
        index++;
        if (index === nameText.length) {
            setTimeout(() => {
                deleting = true;
            }, 1500);
        }

    } else {
        // Deleting backward
        typingName.textContent = nameText.substring(0, index - 1);
        index--;
        if (index === 0) {
            deleting = false;
        }
    }
    const speed = deleting ? 80 : 120;
    setTimeout(typeName, speed);
    
}
typeName();


// ==================== MENU TOGGLE ====================
const menuIcon = document.getElementById("menu-icon");
const navList = document.querySelector(".navlist");
if (menuIcon && navList) {

    menuIcon.addEventListener("click", function () {
        navList.classList.toggle("active");
    });

}



let changeText = ()=>{
    let currentWord = words[currentWordIndex];
    let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

    Array.from(currentWord.children).forEach((letter,i)=>{
        setTimeout(()=>{
            letter.className = "letter out";
        },i  * 80);
    });
    nextWord.style.opacity = "1";
    Array.from(nextWord.children).forEach((letter,i)=>{
        letter.className = "letter behind";
        setTimeout(()=>{
            letter.className = "letter in";
        },340 + i *80);
    })
    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;

};

changeText();
setInterval(changeText,3000);


//circle skill //////////////////////////////////////////////////////
const circles = document.querySelectorAll('.circle');
circles.forEach(elem=>{
    var dots = elem.getAttribute("data-dots");
    var marked = elem.getAttribute("data-percent");
    var percent = Math.floor(dots*marked/100);
    var points = "";
    var rotate = 360 / dots;

    for(let i = 0; i < dots ; i++){
        points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`
    }
    elem.innerHTML = points;

    const pointsMarked = elem.querySelectorAll('points');
    for(let i=0; i<percent ; i++){
        
    }
})


// ==================== EMAILJS ====================

// Initialize EmailJS
(function () {
    emailjs.init({
        publicKey: "-z2M4WgpboMUqBJKb"
    });
})();

// Get the contact form
const contactForm = document.getElementById("contact-form");

// Check if the form exists
if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        // Prevent the page from refreshing/jumping to Home
        event.preventDefault();
        event.stopPropagation();

        const button = contactForm.querySelector(".send-message-btn");

        // Show sending status
        button.textContent = "Sending...";
        button.disabled = true;

        // Send form through EmailJS
        emailjs.sendForm(
            "service_xe8s6dd",
            "template_b8neoeq",
            contactForm
        )

        .then(function (response) {

            console.log("SUCCESS:", response.status, response.text);

            // Success message
            button.textContent = "✓ Message Sent Successfully!";

            // Clear the form
            contactForm.reset();

            // Return button to normal
            setTimeout(function () {
                button.textContent = "Send Message";
                button.disabled = false;
            }, 3000);

        })

        .catch(function (error) {

            console.error("EMAILJS ERROR:", error);

            // Error message
            button.textContent = "Failed to Send";

            setTimeout(function () {
                button.textContent = "Send Message";
                button.disabled = false;
            }, 3000);

        });

    });

}