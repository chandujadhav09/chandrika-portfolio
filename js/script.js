$(function () {
  // Set the footer year automatically.
  $(".current-year").text(new Date().getFullYear());

  // Mobile navigation.
  $(".menu-toggle").on("click", function () {
    const isOpen = $(".main-nav").toggleClass("open").hasClass("open");
    $(this).attr("aria-expanded", isOpen ? "true" : "false");
    $(this).attr("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  // Close the mobile menu after choosing a page.
  $(".main-nav a").on("click", function () {
    $(".main-nav").removeClass("open");
    $(".menu-toggle").attr("aria-expanded", "false");
  });

  // Theme switcher; remember the visitor's choice when browser storage is available.
  const savedTheme = localStorage.getItem("chandrika-theme");
  if (savedTheme === "dark") {
    $("body").addClass("dark-mode");
    $(".theme-icon").text("☀");
  }

  $(".theme-toggle").on("click", function () {
    $("body").toggleClass("dark-mode");
    const darkOn = $("body").hasClass("dark-mode");
    $(".theme-icon").text(darkOn ? "☀" : "◐");
    localStorage.setItem("chandrika-theme", darkOn ? "dark" : "light");
  });

  // Reveal content as it enters the viewport.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // Contact form: client-side validation only; no message is transmitted.
  $("#contactForm").on("submit", function (event) {
    event.preventDefault();
    const name = $("#visitorName").val().trim();
    const email = $("#visitorEmail").val().trim();
    const message = $("#visitorMessage").val().trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const $status = $("#formStatus");

    if (!name || !email || !message) {
      $status.removeClass("success").addClass("error").text("Please complete all fields before continuing.");
      return;
    }
    if (!emailPattern.test(email)) {
      $status.removeClass("success").addClass("error").text("Please enter a valid email address.");
      return;
    }
    $status.removeClass("error").addClass("success").text("All fields look good. This demo form does not send messages; please email me directly.");
    this.reset();
  });
});
