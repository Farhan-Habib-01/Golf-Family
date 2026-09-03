"use strict";


/* =====================================
   DOM ELEMENTS
===================================== */

const header = document.getElementById("header");

const menuButton = document.getElementById("menuButton");

const navLinksContainer =
    document.getElementById("navLinks");

const navLinks =
    document.querySelectorAll(".nav-link");

const cursor =
    document.getElementById("cursor");

const cursorBlur =
    document.getElementById("cursor-blur");

const newsletterForm =
    document.getElementById("newsletterForm");

const newsletterEmail =
    document.getElementById("newsletterEmail");

const newsletterMessage =
    document.getElementById("newsletterMessage");

const bookingForm =
    document.getElementById("bookingForm");

const bookingMessage =
    document.getElementById("bookingMessage");

const bookingDate =
    document.getElementById("bookingDate");

const backToTop =
    document.getElementById("backToTop");

const currentYear =
    document.getElementById("currentYear");


/* =====================================
   CURRENT YEAR
===================================== */

if (currentYear) {
    currentYear.textContent =
        new Date().getFullYear();
}


/* =====================================
   MINIMUM BOOKING DATE
===================================== */

if (bookingDate) {
    const today =
        new Date();

    const localDate =
        new Date(
            today.getTime() -
            today.getTimezoneOffset() * 60000
        )
            .toISOString()
            .split("T")[0];

    bookingDate.min = localDate;
}


/* =====================================
   HEADER SCROLL EFFECT
===================================== */

const updateHeader = () => {

    if (!header) return;

    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

};


window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true,
    }
);


updateHeader();


/* =====================================
   MOBILE MENU
===================================== */

const closeMenu = () => {

    if (!menuButton || !navLinksContainer) {
        return;
    }

    menuButton.classList.remove("active");

    navLinksContainer.classList.remove("open");

    document.body.classList.remove("menu-open");

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

};


const openMenu = () => {

    if (!menuButton || !navLinksContainer) {
        return;
    }

    menuButton.classList.add("active");

    navLinksContainer.classList.add("open");

    document.body.classList.add("menu-open");

    menuButton.setAttribute(
        "aria-expanded",
        "true"
    );

};


if (menuButton && navLinksContainer) {

    menuButton.addEventListener(
        "click",
        () => {

            const menuIsOpen =
                navLinksContainer.classList.contains(
                    "open"
                );

            if (menuIsOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        }
    );

}


document
    .querySelectorAll(
        "#navLinks a"
    )
    .forEach((link) => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    }
);


/* =====================================
   SMOOTH INTERNAL NAVIGATION
===================================== */

document
    .querySelectorAll('a[href^="#"]')
    .forEach((anchor) => {

        anchor.addEventListener(
            "click",
            function (event) {

                const href =
                    this.getAttribute("href");

                if (
                    !href ||
                    href === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(href);

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });

            }
        );

    });


/* =====================================
   ACTIVE NAVIGATION LINK
===================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const activateNavigation = () => {

    const scrollPosition =
        window.scrollY + 180;

    sections.forEach(
        (section) => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            const sectionId =
                section.getAttribute("id");

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                sectionTop + sectionHeight
            ) {

                navLinks.forEach(
                    (link) => {

                        link.classList.remove(
                            "active"
                        );

                        if (
                            link.getAttribute("href") ===
                            `#${sectionId}`
                        ) {
                            link.classList.add(
                                "active"
                            );
                        }

                    }
                );

            }

        }
    );

};


window.addEventListener(
    "scroll",
    activateNavigation,
    {
        passive: true,
    }
);


/* =====================================
   CUSTOM CURSOR
===================================== */

const supportsFinePointer =
    window.matchMedia(
        "(pointer: fine)"
    ).matches;


if (
    supportsFinePointer &&
    cursor &&
    cursorBlur
) {

    window.addEventListener(
        "mousemove",
        (event) => {

            const {
                clientX,
                clientY,
            } = event;

            cursor.style.left =
                `${clientX}px`;

            cursor.style.top =
                `${clientY}px`;

            cursorBlur.style.left =
                `${clientX}px`;

            cursorBlur.style.top =
                `${clientY}px`;

        }
    );


    const interactiveElements =
        document.querySelectorAll(
            "a, button, input, textarea, select, .activity-card"
        );


    interactiveElements.forEach(
        (element) => {

            element.addEventListener(
                "mouseenter",
                () => {

                    cursor.style.transform =
                        "translate(-50%, -50%) scale(2.2)";

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    cursor.style.transform =
                        "translate(-50%, -50%) scale(1)";

                }
            );

        }
    );

}


/* =====================================
   NEWSLETTER FORM
===================================== */

if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            const email =
                newsletterEmail.value
                    .trim();

            if (!isValidEmail(email)) {

                showNewsletterMessage(
                    "Please enter a valid email address.",
                    false
                );

                return;
            }


            /*
             * Production:
             * Replace this demo logic with
             * your backend API request.
             *
             * Example:
             *
             * await fetch("/api/newsletter", {
             *   method: "POST",
             *   headers: {
             *     "Content-Type": "application/json"
             *   },
             *   body: JSON.stringify({ email })
             * });
             */


            showNewsletterMessage(
                "Thanks! You've successfully subscribed.",
                true
            );


            newsletterForm.reset();

        }
    );

}


function showNewsletterMessage(
    message,
    success
) {

    if (!newsletterMessage) {
        return;
    }

    newsletterMessage.textContent =
        message;

    newsletterMessage.style.color =
        success
            ? "#071000"
            : "#8b0000";

}


/* =====================================
   BOOKING FORM
===================================== */

if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const formData =
                new FormData(
                    bookingForm
                );


            const bookingData = {
                name:
                    formData
                        .get("name")
                        ?.trim(),

                email:
                    formData
                        .get("email")
                        ?.trim(),

                activity:
                    formData
                        .get("activity"),

                bookingDate:
                    formData
                        .get("bookingDate"),

                message:
                    formData
                        .get("message")
                        ?.trim(),
            };


            if (!bookingData.name) {

                showBookingMessage(
                    "Please enter your full name.",
                    false
                );

                return;
            }


            if (
                !isValidEmail(
                    bookingData.email
                )
            ) {

                showBookingMessage(
                    "Please enter a valid email address.",
                    false
                );

                return;
            }


            if (!bookingData.activity) {

                showBookingMessage(
                    "Please select an activity.",
                    false
                );

                return;
            }


            if (!bookingData.bookingDate) {

                showBookingMessage(
                    "Please choose a preferred date.",
                    false
                );

                return;
            }


            const selectedDate =
                new Date(
                    `${bookingData.bookingDate}T00:00:00`
                );


            const today =
                new Date();

            today.setHours(
                0,
                0,
                0,
                0
            );


            if (selectedDate < today) {

                showBookingMessage(
                    "Please choose today or a future date.",
                    false
                );

                return;
            }


            const submitButton =
                bookingForm.querySelector(
                    'button[type="submit"]'
                );


            const originalText =
                submitButton.textContent;


            try {

                submitButton.disabled =
                    true;

                submitButton.textContent =
                    "Sending...";


                /*
                 * =================================
                 * REAL BACKEND INTEGRATION
                 * =================================
                 *
                 * Replace the demo delay below:
                 *
                 * await fetch("/api/bookings", {
                 *     method: "POST",
                 *
                 *     headers: {
                 *         "Content-Type":
                 *             "application/json"
                 *     },
                 *
                 *     body:
                 *         JSON.stringify(
                 *             bookingData
                 *         )
                 * });
                 */


                await simulateRequest();


                showBookingMessage(
                    `Thanks ${bookingData.name}! Your ${bookingData.activity} booking request has been received.`,
                    true
                );


                bookingForm.reset();


                if (bookingDate) {

                    const now =
                        new Date();


                    const minimumDate =
                        new Date(
                            now.getTime() -
                            now.getTimezoneOffset() *
                            60000
                        )
                            .toISOString()
                            .split("T")[0];


                    bookingDate.min =
                        minimumDate;

                }

            } catch (error) {

                console.error(
                    "Booking error:",
                    error
                );


                showBookingMessage(
                    "Something went wrong. Please try again.",
                    false
                );

            } finally {

                submitButton.disabled =
                    false;

                submitButton.textContent =
                    originalText;

            }

        }
    );

}


function showBookingMessage(
    message,
    success
) {

    if (!bookingMessage) {
        return;
    }

    bookingMessage.textContent =
        message;

    bookingMessage.style.color =
        success
            ? "#95c11e"
            : "#ff6b6b";

}


function simulateRequest() {

    return new Promise(
        (resolve) => {

            setTimeout(
                resolve,
                700
            );

        }
    );

}


/* =====================================
   EMAIL VALIDATION
===================================== */

function isValidEmail(email) {

    if (!email) {
        return false;
    }

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(
        email
    );

}


/* =====================================
   BACK TO TOP
===================================== */

if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

        }
    );

}


/* =====================================
   GSAP ANIMATIONS
===================================== */

window.addEventListener(
    "load",
    () => {

        const prefersReducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        if (
            prefersReducedMotion ||
            typeof gsap === "undefined"
        ) {
            return;
        }


        if (
            typeof ScrollTrigger !==
            "undefined"
        ) {

            gsap.registerPlugin(
                ScrollTrigger
            );

        }


        /* Hero entrance */

        gsap.from(
            ".hero-badge",
            {
                opacity: 0,
                y: 25,
                duration: 0.7,
            }
        );


        gsap.from(
            ".hero h1",
            {
                opacity: 0,
                y: 60,
                duration: 1,
                delay: 0.15,
                ease: "power3.out",
            }
        );


        gsap.from(
            ".hero h2, .hero p",
            {
                opacity: 0,
                y: 30,
                duration: 0.8,
                delay: 0.35,
                stagger: 0.12,
                ease: "power2.out",
            }
        );


        gsap.from(
            ".hero-buttons .button",
            {
                opacity: 0,
                y: 20,
                duration: 0.6,
                delay: 0.6,
                stagger: 0.12,
            }
        );


        /* About animation */

        gsap.from(
            ".about-image-left",
            {
                scrollTrigger: {
                    trigger: ".about",
                    start: "top 75%",
                },

                opacity: 0,
                x: -60,
                duration: 0.8,
            }
        );


        gsap.from(
            ".about-image-right",
            {
                scrollTrigger: {
                    trigger: ".about",
                    start: "top 75%",
                },

                opacity: 0,
                x: 60,
                duration: 0.8,
            }
        );


        gsap.from(
            ".about-content",
            {
                scrollTrigger: {
                    trigger: ".about",
                    start: "top 75%",
                },

                opacity: 0,
                y: 45,
                duration: 0.9,
            }
        );


        /* Activity cards */

        gsap.from(
            ".activity-card",
            {
                scrollTrigger: {
                    trigger:
                        ".activity-grid",

                    start:
                        "top 80%",
                },

                opacity: 0,

                y: 70,

                duration: 0.75,

                stagger: 0.15,

                ease:
                    "power3.out",
            }
        );


        /* Feature */

        gsap.from(
            ".feature-content",
            {
                scrollTrigger: {
                    trigger:
                        ".features",

                    start:
                        "top 75%",
                },

                opacity: 0,

                x: -60,

                duration: 0.8,
            }
        );


        gsap.from(
            ".feature-card",
            {
                scrollTrigger: {
                    trigger:
                        ".features",

                    start:
                        "top 75%",
                },

                opacity: 0,

                scale: 0.85,

                rotation: -4,

                duration: 1,

                ease:
                    "power3.out",
            }
        );


        /* Testimonial */

        gsap.from(
            ".testimonial blockquote",
            {
                scrollTrigger: {
                    trigger:
                        ".testimonial",

                    start:
                        "top 75%",
                },

                opacity: 0,

                y: 40,

                duration: 0.8,
            }
        );

    }
);