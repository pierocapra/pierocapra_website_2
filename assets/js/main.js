/**
 * Template Name: Personal - v4.2.0
 * Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);

    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    "#navbar .nav-link",
    function (e) {
      let section = select(this.hash);
      if (section) {
        e.preventDefault();

        let navbar = select("#navbar");
        let header = select("#header");
        let sections = select("section", true);
        let navlinks = select("#navbar .nav-link", true);

        navlinks.forEach((item) => {
          item.classList.remove("active");
        });

        this.classList.add("active");

        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }

        if (this.hash == "#header") {
          header.classList.remove("header-top");
          sections.forEach((item) => {
            item.classList.remove("section-show");
          });
          return;
        }

        if (!header.classList.contains("header-top")) {
          header.classList.add("header-top");
          setTimeout(function () {
            sections.forEach((item) => {
              item.classList.remove("section-show");
            });
            section.classList.add("section-show");
          }, 350);
        } else {
          sections.forEach((item) => {
            item.classList.remove("section-show");
          });
          section.classList.add("section-show");
        }

        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash);

      if (initial_nav) {
        let header = select("#header");
        let navlinks = select("#navbar .nav-link", true);

        header.classList.add("header-top");

        navlinks.forEach((item) => {
          if (item.getAttribute("href") == window.location.hash) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });

        setTimeout(function () {
          initial_nav.classList.add("section-show");
        }, 350);

        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select(".skills-content");
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: "80%",
      handler: function (direction) {
        let progress = select(".progress .progress-bar", true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  }

  /**
   * Testimonials slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Initiate portfolio details lightbox
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: ".portfolio-details-lightbox",
    width: "90%",
    height: "90vh",
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });
})();

// //////////////////////////////THREE/////////////////
// const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1e3
// );

// const canvas = document.querySelector(".webgl");
// const cubeArea = document.getElementById("cubeArea");
// const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: !0 });
// (canvas.width = canvas.clientWidth),
//   (canvas.height = canvas.clientHeight),
//   renderer.setViewport(0, 0, canvas.clientWidth, canvas.clientHeight),
//   (camera.aspect = canvas.clientWidth / canvas.clientHeight),
//   camera.updateProjectionMatrix(),
//   cubeArea.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry(1.45, 1.45, 1.45),
//   textureAll = [],
//   texture1 = new THREE.TextureLoader().load("assets/img/cube/css.png"),
//   texture2 = new THREE.TextureLoader().load("assets/img/cube/js.png"),
//   texture3 = new THREE.TextureLoader().load("assets/img/cube/html.png"),
//   texture4 = new THREE.TextureLoader().load("assets/img/cube/python.png"),
//   texture5 = new THREE.TextureLoader().load("assets/img/cube/java.png"),
//   texture6 = new THREE.TextureLoader().load("assets/img/cube/php.png");
// textureAll.push(
//   new THREE.MeshBasicMaterial({ color: 16777215, map: texture1 })
// ),
//   textureAll.push(new THREE.MeshBasicMaterial({ map: texture2 })),
//   textureAll.push(new THREE.MeshBasicMaterial({ map: texture3 })),
//   textureAll.push(new THREE.MeshBasicMaterial({ map: texture4 })),
//   textureAll.push(new THREE.MeshBasicMaterial({ map: texture5 })),
//   textureAll.push(new THREE.MeshBasicMaterial({ map: texture6 }));

// const cube = new THREE.Mesh(geometry, textureAll);

// scene.add(cube),
//   (camera.position.z = 2),
//   document.addEventListener("mousemove", onDocumentMouseMove);

// let mouseX = 0,
//   mouseY = 0,
//   targetX = 0,
//   targetY = 0;

// const windowHalfx = window.innerWidth / 2;
// const windowHalfy = window.innerHeight / 2;

// function onDocumentMouseMove(e) {
//   (mouseX = e.clientX - windowHalfx), (mouseY = e.clientX - windowHalfy);
// }

// const clock = new THREE.Clock();
// function animate() {
//   (targetX = 0.01 * mouseX),
//     (targetY = 0.01 * mouseY),
//     requestAnimationFrame(animate),
//     renderer.render(scene, camera);

//   const e = clock.getElapsedTime();
//   (cube.rotation.x += 0.05 * e),
//     (cube.rotation.y += 0.04 * e),
//     (cube.rotation.y += 0.05 * (targetX - cube.rotation.y)),
//     (cube.rotation.x += 0.05 * (targetY - cube.rotation.x));
// }
// animate();
