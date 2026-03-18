const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealNodes = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window && revealNodes.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  revealNodes.forEach((node) => revealObserver.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}

const pageLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const sectionTargets = pageLinks
  .map((link) => {
    const target = document.querySelector(link.getAttribute("href"));
    return target ? { link, target } : null;
  })
  .filter(Boolean);

if ("IntersectionObserver" in window && sectionTargets.length > 0) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const match = sectionTargets.find(({ target }) => target === entry.target);
        if (!match) {
          return;
        }

        if (entry.isIntersecting) {
          pageLinks.forEach((link) => link.classList.remove("is-active"));
          match.link.classList.add("is-active");
        }
      });
    },
    {
      threshold: 0.45,
      rootMargin: "-15% 0px -45% 0px",
    },
  );

  sectionTargets.forEach(({ target }) => sectionObserver.observe(target));
}
