const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
      const nav = document.querySelector("nav");
      const body = document.body;
      const dropdowns = document.querySelectorAll(".dropdown");

      mobileMenuBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
        body.style.overflow = nav.classList.contains("active") ? "hidden" : "";

        // Change icon
        const icon = mobileMenuBtn.querySelector("i");
        if (nav.classList.contains("active")) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-times");
        } else {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      });

      // Close mobile menu when clicking on a link
      const navLinks = document.querySelectorAll(
        "nav ul li a:not(.dropdown > a)"
      );
      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          nav.classList.remove("active");
          body.style.overflow = "";

          // Reset icon
          const icon = mobileMenuBtn.querySelector("i");
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        });
      });

      // Dropdown toggle for mobile
      dropdowns.forEach((dropdown) => {
        const link = dropdown.querySelector("a");

        link.addEventListener("click", (e) => {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle("active");
          }
        });
      });

      // Dark Mode Toggle
      const themeToggle = document.getElementById("themeToggle");
      const themeIcon = themeToggle.querySelector("i");

      // Check for saved theme preference or respect OS preference
      if (
        localStorage.getItem("theme") === "dark" ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches &&
          !localStorage.getItem("theme"))
      ) {
        document.documentElement.setAttribute("data-theme", "dark");
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
      }

      themeToggle.addEventListener("click", () => {
        if (document.documentElement.getAttribute("data-theme") === "dark") {
          document.documentElement.removeAttribute("data-theme");
          localStorage.setItem("theme", "light");
          themeIcon.classList.remove("fa-sun");
          themeIcon.classList.add("fa-moon");
        } else {
          document.documentElement.setAttribute("data-theme", "dark");
          localStorage.setItem("theme", "dark");
        }
      });

      // Scroll animations
      function checkScroll() {
        const sections = document.querySelectorAll("section");
        const cards = document.querySelectorAll(".year-card, .activity-card");
        const backToTop = document.querySelector(".back-to-top");

        sections.forEach((section) => {
          const sectionTop = section.getBoundingClientRect().top;
          const triggerHeight = window.innerHeight * 0.8;

          if (sectionTop < triggerHeight) {
            section.classList.add("visible");
          }
        });

        cards.forEach((card) => {
          const cardTop = card.getBoundingClientRect().top;
          const triggerHeight = window.innerHeight * 0.8;

          if (cardTop < triggerHeight) {
            card.classList.add("visible");
          }
        });

        // Show/hide back to top button
        if (window.scrollY > 500) {
          backToTop.classList.add("visible");
        } else {
          backToTop.classList.remove("visible");
        }
      }

      window.addEventListener("scroll", checkScroll);
      window.addEventListener("load", checkScroll);

      // Back to top functionality
      const backToTopBtn = document.querySelector(".back-to-top");

      backToTopBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });

      // Alumni Page Functionality
      const yearCards = document.querySelectorAll(".year-card");
      const alumniTahunSection = document.getElementById("alumni-tahun");
      const alumniDetailSection = document.getElementById("alumni-detail");
      const alumniGaleriSection = document.getElementById("alumni-galeri");
      const detailTitle = document.getElementById("detail-title");
      const galleryTitle = document.getElementById("gallery-title");
      const backToYearsBtn = document.getElementById("back-to-years");
      const backToDetailBtn = document.getElementById("back-to-detail");
      const activityCtas = document.querySelectorAll(".activity-cta");

      // Show year detail when a year card is clicked
      yearCards.forEach((card) => {
        card.addEventListener("click", () => {
          const year = card.getAttribute("data-year");
          detailTitle.textContent = `Kegiatan Alumni ${year}`;

          alumniTahunSection.style.display = "none";
          alumniDetailSection.style.display = "block";

          // Scroll to top of detail section
          window.scrollTo({
            top: alumniDetailSection.offsetTop - 100,
            behavior: "smooth",
          });
        });
      });

      // Back to years list
      backToYearsBtn.addEventListener("click", (e) => {
        e.preventDefault();
        alumniDetailSection.style.display = "none";
        alumniTahunSection.style.display = "block";

        // Scroll to top of years section
        window.scrollTo({
          top: alumniTahunSection.offsetTop - 100,
          behavior: "smooth",
        });
      });

      // Show gallery when activity CTA is clicked
      activityCtas.forEach((cta) => {
        cta.addEventListener("click", (e) => {
          e.preventDefault();
          const activity = cta.getAttribute("data-gallery");
          galleryTitle.textContent = `Galeri ${
            activity.charAt(0).toUpperCase() + activity.slice(1)
          }`;

          alumniDetailSection.style.display = "none";
          alumniGaleriSection.style.display = "block";

          // Scroll to top of gallery section
          window.scrollTo({
            top: alumniGaleriSection.offsetTop - 100,
            behavior: "smooth",
          });
        });
      });

      // Back to detail from gallery
      backToDetailBtn.addEventListener("click", (e) => {
        e.preventDefault();
        alumniGaleriSection.style.display = "none";
        alumniDetailSection.style.display = "block";

        // Scroll to top of detail section
        window.scrollTo({
          top: alumniDetailSection.offsetTop - 100,
          behavior: "smooth",
        });
      });

      // Lightbox functionality
      const lightbox = document.getElementById("lightbox");
      const lightboxImage = document.getElementById("lightbox-image");
      const lightboxCaption = document.getElementById("lightbox-caption");
      const lightboxClose = document.getElementById("lightbox-close");
      const lightboxPrev = document.getElementById("lightbox-prev");
      const lightboxNext = document.getElementById("lightbox-next");
      const galleryItems = document.querySelectorAll(".gallery-item");

      let currentImageIndex = 0;
      const images = [];
      const captions = [];

      // Prepare images and captions for lightbox
      galleryItems.forEach((item, index) => {
        const img = item.querySelector("img");
        const caption = item.querySelector(".gallery-caption");

        images.push(img.src);
        captions.push(caption.textContent);

        item.addEventListener("click", () => {
          currentImageIndex = index;
          openLightbox();
        });
      });

      // Open lightbox with current image
      function openLightbox() {
        lightboxImage.src = images[currentImageIndex];
        lightboxCaption.textContent = captions[currentImageIndex];
        lightbox.classList.add("active");
        body.style.overflow = "hidden";
      }

      // Close lightbox
      lightboxClose.addEventListener("click", () => {
        lightbox.classList.remove("active");
        body.style.overflow = "";
      });

      // Navigate to previous image
      lightboxPrev.addEventListener("click", () => {
        currentImageIndex =
          (currentImageIndex - 1 + images.length) % images.length;
        lightboxImage.src = images[currentImageIndex];
        lightboxCaption.textContent = captions[currentImageIndex];
      });

      // Navigate to next image
      lightboxNext.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightboxImage.src = images[currentImageIndex];
        lightboxCaption.textContent = captions[currentImageIndex];
      });

      // Close lightbox when clicking outside the image
      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
          lightbox.classList.remove("active");
          body.style.overflow = "";
        }
      });

      // Keyboard navigation for lightbox
      document.addEventListener("keydown", (e) => {
        if (lightbox.classList.contains("active")) {
          if (e.key === "Escape") {
            lightbox.classList.remove("active");
            body.style.overflow = "";
          } else if (e.key === "ArrowLeft") {
            currentImageIndex =
              (currentImageIndex - 1 + images.length) % images.length;
            lightboxImage.src = images[currentImageIndex];
            lightboxCaption.textContent = captions[currentImageIndex];
          } else if (e.key === "ArrowRight") {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            lightboxImage.src = images[currentImageIndex];
            lightboxCaption.textContent = captions[currentImageIndex];
          }
        }
      });
