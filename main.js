/* Scroll reveal */
const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("is-visible"), index * 90);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

/* Latest news ticker */
const newsItems = [
  {
    headline: "Portfolio draft is now live",
    date: "May 2026",
    url: "news.html"
  },
  {
    headline: "Writing archive and photography sections are being structured",
    date: "May 2026",
    url: "news.html"
  },
  {
    headline: "Résumé and contact pages coming next",
    date: "May 2026",
    url: "news.html"
  },
  {
    headline: "Thoughts archive will include short reflective writing",
    date: "May 2026",
    url: "news.html"
  },
  {
    headline: "Website design is being refined section by section",
    date: "May 2026",
    url: "news.html"
  }
];

const tickerEl = document.getElementById("newsTickerItem");
const tickerEase = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
let currentTickerIndex = 0;

function showTicker(index) {
  if (!tickerEl || newsItems.length === 0) return;

  const item = newsItems[index];

  tickerEl.href = item.url;
  tickerEl.innerHTML =
    '<span class="news-ticker-headline">' + item.headline + '</span>' +
    '<span class="news-ticker-dot">·</span>' +
    '<span class="news-ticker-date">' + item.date + '</span>';

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
  setTimeout(() => showTicker(0), 1200);
}
