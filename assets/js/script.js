document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
            Fixed Header
    ========================== */

    const header = document.querySelector(".header");
    const logo = document.querySelector(".logo img");

    function toggleHeader() {

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

            logo.src = logo.dataset.light;

        } else {

            header.classList.remove("scrolled");

            logo.src = logo.dataset.dark;

        }

    }

    toggleHeader();

    window.addEventListener("scroll", toggleHeader);

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
        document.body.classList.toggle("menu-open");
    });

    /* ==========================
       Active Navigation
    ========================== */

    const sections = document.querySelectorAll("main section");
    const navLinks = document.querySelectorAll(".nav-menu a");

    function updateActiveLink() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight) {

                currentSection = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active");
            }

        });

    }

    updateActiveLink();

    window.addEventListener("scroll", updateActiveLink);



    /* ==========================
       Counter Animation
    ========================== */

    const counters = document.querySelectorAll(".about-stat-number");

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const value = counter.textContent.trim();

            // Cari angka pertama
            const match = value.match(/[\d.]+/);

            if (!match) return;

            const target = parseFloat(match[0]);

            const suffix = value.replace(match[0], "");

            const duration = 2000; // 2 detik

            let start = null;

            function animate(timestamp){

                if(!start) start = timestamp;

                const progress = Math.min((timestamp - start) / duration, 1);

                const current = target * progress;

                if(target % 1 !== 0){
                    counter.textContent = current.toFixed(1) + suffix;
                }else{
                    counter.textContent = Math.floor(current) + suffix;
                }

                if(progress < 1){
                    requestAnimationFrame(animate);
                }else{
                    counter.textContent = value;
                }

            }

            requestAnimationFrame(animate);

            observer.unobserve(counter);

        });

    });

    counters.forEach(counter => observer.observe(counter));



    /* ==========================
       Contact Form
    ========================== */

    const form = document.querySelector(".contact-form");

    if (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            const email = form.querySelector('input[type="email"]');

            if (!email.checkValidity()) {

                alert("Please enter a valid email address.");

                email.focus();

                return;

            }

            alert("Terima kasih! Kami akan segera menghubungi Anda.");

            form.reset();

        });

    }

});