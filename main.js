/* =========================================================
   PRATHIVEE NAIRY — SHARED JAVASCRIPT
   Scroll reveal, sidebar state, homepage parallax, news ticker
   ========================================================= */

/* -------------------------------
   Scroll reveal
-------------------------------- */

const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length > 0) {
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
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

/* -------------------------------
   Sidebar toggle
-------------------------------- */

const sidebarToggle = document.querySelector("[data-sidebar-toggle]");
const sidebar = document.querySelector("[data-sidebar]");

if (sidebarToggle && sidebar) {
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("is-collapsed");
  });
}

/* -------------------------------
   Sidebar active state
-------------------------------- */

const currentPath = window.location.pathname.split("/").pop() || "index.html";
const sidebarLinks = document.querySelectorAll(".sidebar-link");

sidebarLinks.forEach((link) => {
  const linkPath = link.getAttribute("href");

  if (linkPath === currentPath) {
    link.classList.add("is-active");
  }
});

/* -------------------------------
   Homepage parallax
-------------------------------- */

const heroVisual = document.querySelector("[data-parallax]");
const profileFrame = document.querySelector("[data-profile-frame]");
const profileNote = document.querySelector("[data-profile-note]");

if (heroVisual && profileFrame && profileNote) {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    if (scrollY < window.innerHeight * 1.2) {
      profileFrame.style.transform = `translateY(${scrollY * 0.035}px) rotate(1.5deg)`;
      profileNote.style.transform = `translateY(${scrollY * -0.025}px)`;
    }
  });
}

/* -------------------------------
   Homepage tile reveal stagger
-------------------------------- */

const homeTiles = document.querySelectorAll(".home-tile");

if (homeTiles.length > 0) {
  const tileObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("is-visible");
          }, index * 90);

          tileObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14
    }
  );

  homeTiles.forEach((tile) => {
    tile.classList.add("reveal");
    tileObserver.observe(tile);
  });
}

/* -------------------------------
   News ticker
   Update only this array when you add new news.
   Keep maximum 5 items.
-------------------------------- */

const newsItems = [
  {
    headline: "Headline one — update this with your real news",
    date: "May 2025",
    url: "news.html"
  },
  {
    headline: "Headline two — update this with your real news",
    date: "Apr 2025",
    url: "news.html"
  },
  {
    headline: "Headline three — update this with your real news",
    date: "Mar 2025",
    url: "news.html"
  },
  {
    headline: "Headline four — update this with your real news",
    date: "Feb 2025",
    url: "news.html"
  },
  {
    headline: "Headline five — update this with your real news",
    date: "Jan 2025",
    url: "news.html"
  }
];

const tickerEl = document.getElementById("tickerItem");
const tickerEase = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
let currentTickerIndex = 0;

function showTicker(index) {
  if (!tickerEl || newsItems.length === 0) return;

  const item = newsItems[index];

  tickerEl.href = item.url;
  tickerEl.innerHTML =
    '<span class="ticker-headline">' + item.headline + '</span>' +
    '<span class="ticker-dot">·</span>' +
    '<span class="ticker-date">' + item.date + '</span>';

  tickerEl.style.transition = "none";
  tickerEl.style.transform = "translateX(110%)";

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      tickerEl.style.transition = "transform 0.5s " + tickerEase;
      tickerEl.style.transform = "translateX(0)";

      setTimeout(() => {
        tickerEl.style.transition = "transform 0.5s " + tickerEase;
        tickerEl.style.transform = "translateX(-110%)";

        setTimeout(() => {
          currentTickerIndex = (currentTickerIndex + 1) % newsItems.length;
          showTicker(currentTickerIndex);
        }, 520);
      }, 5000);
    });
  });
}

if (tickerEl && newsItems.length > 0) {
  setTimeout(() => {
    showTicker(0);
  }, 1200);
}
