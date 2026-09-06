"use strict";

/* =====================================================
   DOM READY
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ===================================================
     ELEMENTS
  =================================================== */

  const header = document.querySelector("#site-header");

  const cursor = document.querySelector("#cursor");

  const cursorBlur = document.querySelector("#cursor-blur");

  const menuToggle =
    document.querySelector("#menu-toggle");

  const mobileMenu =
    document.querySelector("#mobile-menu");

  const newsletterForm =
    document.querySelector("#newsletter-form");

  const emailInput =
    document.querySelector("#email");

  const formStatus =
    document.querySelector("#form-status");

  const yearElement =
    document.querySelector("#current-year");


  /* ===================================================
     CURRENT YEAR
  =================================================== */

  if (yearElement) {
    yearElement.textContent =
      new Date().getFullYear();
  }


  /* ===================================================
     MOBILE MENU
  =================================================== */

  const closeMobileMenu = () => {

    if (!menuToggle || !mobileMenu) {
      return;
    }

    menuToggle.classList.remove("active");

    mobileMenu.classList.remove("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    mobileMenu.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "menu-open"
    );
  };


  const openMobileMenu = () => {

    if (!menuToggle || !mobileMenu) {
      return;
    }

    menuToggle.classList.add("active");

    mobileMenu.classList.add("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "true"
    );

    mobileMenu.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add(
      "menu-open"
    );
  };


  if (menuToggle) {

    menuToggle.addEventListener(
      "click",
      () => {

        const isOpen =
          menuToggle.getAttribute(
            "aria-expanded"
          ) === "true";

        if (isOpen) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }

      }
    );
  }


  /* Close menu after clicking a link */

  document
    .querySelectorAll("#mobile-menu a")
    .forEach((link) => {

      link.addEventListener(
        "click",
        closeMobileMenu
      );

    });


  /* Close menu with Escape */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {
        closeMobileMenu();
      }

    }
  );


  /* ===================================================
     HEADER SCROLL
  =================================================== */

  const updateHeader = () => {

    if (!header) {
      return;
    }

    if (window.scrollY > 50) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }
  };


  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );

  updateHeader();


  /* ===================================================
     SMOOTH NAVIGATION
  =================================================== */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          const targetId =
            link.getAttribute("href");

          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }

          const target =
            document.querySelector(
              targetId
            );

          if (!target) {
            return;
          }

          event.preventDefault();

          target.scrollIntoView({
            behavior:
              window.matchMedia(
                "(prefers-reduced-motion: reduce)"
              ).matches
                ? "auto"
                : "smooth",

            block: "start"
          });

        }
      );

    });


  /* ===================================================
     CURSOR
  =================================================== */

  const finePointer =
    window.matchMedia(
      "(pointer: fine)"
    );

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );


  if (
    finePointer.matches &&
    !reducedMotion.matches &&
    cursor &&
    cursorBlur
  ) {

    let mouseX = window.innerWidth / 2;

    let mouseY = window.innerHeight / 2;

    let blurX = mouseX;

    let blurY = mouseY;


    document.addEventListener(
      "mousemove",
      (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

      },
      { passive: true }
    );


    const animateCursor = () => {

      blurX +=
        (mouseX - blurX) * 0.12;

      blurY +=
        (mouseY - blurY) * 0.12;


      cursor.style.left =
        `${mouseX}px`;

      cursor.style.top =
        `${mouseY}px`;

      cursorBlur.style.left =
        `${blurX}px`;

      cursorBlur.style.top =
        `${blurY}px`;


      requestAnimationFrame(
        animateCursor
      );
    };


    animateCursor();


    /* Cursor interaction */

    document
      .querySelectorAll(
        "a, button"
      )
      .forEach((element) => {

        element.addEventListener(
          "mouseenter",
          () => {

            cursor.style.transform =
              "translate(-50%, -50%) scale(2.5)";

            cursor.style.backgroundColor =
              "transparent";

            cursor.style.border =
              "1px solid #fff";

          }
        );


        element.addEventListener(
          "mouseleave",
          () => {

            cursor.style.transform =
              "translate(-50%, -50%) scale(1)";

            cursor.style.backgroundColor =
              "var(--green)";

            cursor.style.border =
              "0";

          }
        );

      });

  }


  /* ===================================================
     GSAP
  =================================================== */

  if (
    typeof gsap === "undefined" ||
    typeof ScrollTrigger === "undefined"
  ) {

    console.warn(
      "GSAP or ScrollTrigger failed to load."
    );

    return;

  }


  gsap.registerPlugin(
    ScrollTrigger
  );


  /* ===================================================
     REDUCED MOTION
  =================================================== */

  if (reducedMotion.matches) {

    gsap.set(
      ".reveal",
      {
        opacity: 1,
        y: 0,
        scale: 1
      }
    );

    return;

  }


  /* ===================================================
     HERO ANIMATION
  =================================================== */

  const heroTimeline =
    gsap.timeline({
      defaults: {
        ease: "power3.out"
      }
    });


  heroTimeline
    .from(
      ".hero-badge",
      {
        y: 30,
        opacity: 0,
        duration: 0.8
      }
    )
    .from(
      ".hero h1",
      {
        y: 50,
        opacity: 0,
        duration: 0.8
      },
      "-=0.2"
    )
    .from(
      ".hero h2",
      {
        y: 25,
        opacity: 0,
        duration: 0.6
      },
      "-=0.4"
    )
    .from(
      ".hero p",
      {
        y: 20,
        opacity: 0,
        duration: 0.6
      },
      "-=0.3"
    )
    .from(
      ".hero-actions",
      {
        y: 20,
        opacity: 0,
        duration: 0.6
      },
      "-=0.3"
    );


  /* ===================================================
     SCROLL REVEALS
  =================================================== */

  gsap.utils
    .toArray(".reveal")
    .forEach((element) => {

      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 60
        },
        {
          opacity: 1,
          y: 0,

          duration: 1,

          ease: "power3.out",

          scrollTrigger: {
            trigger: element,

            start: "top 85%",

            toggleActions:
              "play none none reverse"
          }
        }
      );

    });


  /* ===================================================
     CARDS
  =================================================== */

  gsap.utils
    .toArray(".service-card")
    .forEach((card, index) => {

      gsap.from(
        card,
        { 
          opacity: 0,
          y: 80,

          duration: 0.8,

          delay: index * 0.1,

          ease: "power3.out",

          scrollTrigger: {
            trigger: card,

            start: "top 85%",

            toggleActions:
              "play none none reverse"
          }
        }
      );

    });


  /* ===================================================
     CARD TILT
  =================================================== */

  if (finePointer.matches) {

    document
      .querySelectorAll(".service-card")
      .forEach((card) => {

        card.addEventListener(
          "mousemove",
          (event) => {

            const rect =
              card.getBoundingClientRect();

            const x =
              event.clientX -
              rect.left;

            const y =
              event.clientY -
              rect.top;


            const centerX =
              rect.width / 2;

            const centerY =
              rect.height / 2;


            const rotateX =
              ((y - centerY) /
                centerY) *
              -4;

            const rotateY =
              ((x - centerX) /
                centerX) *
              4;


            gsap.to(
              card,
              {
                rotateX,
                rotateY,

                duration: 0.3,

                ease: "power2.out",

                transformPerspective:
                  1000
              }
            );

          }
        );


        card.addEventListener(
          "mouseleave",
          () => {

            gsap.to(
              card,
              {
                rotateX: 0,
                rotateY: 0,

                duration: 0.5,

                ease: "power3.out"
              }
            );

          }
        );

      });

  }


  /* ===================================================
     TESTIMONIAL
  =================================================== */

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

      delay: 1,

    }
  );

  gsap.from(
    ".quote-left",
    {
      x: -80,
      y: -50,
      opacity: 0,

      scrollTrigger: {
        trigger: ".testimonial",

        start: "top 70%",

        end: "top 35%",

        scrub: 2
      }
    }
  );

  gsap.from(
    ".quote-right",
    {
      x: 80,
      y: 50,
      opacity: 0,

      scrollTrigger: {
        trigger: ".testimonial",

        start: "top 70%",

        end: "top 35%",

        scrub: 2
      }
    }
  );


  /* ===================================================
     NEWSLETTER
  =================================================== */

  if (newsletterForm) {

    newsletterForm.addEventListener(
      "submit",
      async (event) => {

        event.preventDefault();


        const email =
          emailInput.value.trim();


        /* Email validation */

        const emailRegex =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!email) {

          showFormMessage(
            "Please enter your email address.",
            "error"
          );

          emailInput.focus();

          return;

        }


        if (!emailRegex.test(email)) {

          showFormMessage(
            "Please enter a valid email address.",
            "error"
          );

          emailInput.focus();

          return;

        }


        const submitButton =
          newsletterForm.querySelector(
            ".submit-btn"
          );


        if (submitButton) {

          submitButton.disabled = true;

          submitButton.textContent =
            "Subscribing...";

        }


        /*
          DEMO SUBMISSION

          Replace this section with your
          backend API when you have one.
        */

        await new Promise(
          (resolve) =>
            setTimeout(resolve, 800)
        );


        showFormMessage(
          "Thanks! You're now subscribed to Golf Family news.",
          "success"
        );


        newsletterForm.reset();


        if (submitButton) {

          submitButton.disabled = false;

          submitButton.textContent =
            "Subscribe";

        }

      }
    );

  }


  /* ===================================================
     FORM MESSAGE
  =================================================== */

  function showFormMessage(
    message,
    type
  ) {

    if (!formStatus) {
      return;
    }

    formStatus.textContent =
      message;

    formStatus.className =
      `form-status ${type}`;

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


  /* ===================================================
     REFRESH SCROLLTRIGGER
  =================================================== */

  window.addEventListener(
    "load",
    () => {

      ScrollTrigger.refresh();

    }
  );

}); 