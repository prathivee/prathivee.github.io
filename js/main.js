const revealCards = document.querySelectorAll(".reveal-card");

if (revealCards.length > 0) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.25
  });

  revealCards.forEach((card) => revealObserver.observe(card));
}
