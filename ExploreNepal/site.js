"use strict";
(() => {
  const names = {kathmandu:"Kathmandu",pokhara:"Pokhara",manang:"Manang & Mustang"};
  const cards = [...document.querySelectorAll(".destination-card")];
  const search = document.querySelector("#destination-search");
  const category = document.querySelector("#category-filter");
  const storageKey = "explorenepal-favorites-v1";
  let favorites = [];
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (Array.isArray(stored)) favorites = stored.filter(id => Object.hasOwn(names, id));
  } catch { favorites = []; }

  function filterCards() {
    const query = search.value.trim().toLocaleLowerCase();
    let visible = 0;
    for (const card of cards) {
      const matches = (category.value === "all" || card.dataset.category === category.value)
        && (card.dataset.search || "").includes(query);
      card.hidden = !matches;
      if (matches) visible++;
    }
    document.querySelector("#empty-state").hidden = visible > 0;
  }
  search.addEventListener("input", filterCards);
  category.addEventListener("change", filterCards);
  document.querySelector("#clear-filters").addEventListener("click", () => {
    search.value = "";
    category.value = "all";
    filterCards();
    search.focus();
  });

  function renderFavorites() {
    document.querySelector("#saved-count").textContent = favorites.length;
    document.querySelector("#saved-list").textContent = favorites.length
      ? favorites.map(id => names[id]).join(" · ") : "Tap the heart on a destination to save it here.";
    document.querySelectorAll("[data-save]").forEach(button => {
      const active = favorites.includes(button.dataset.save);
      button.setAttribute("aria-pressed", String(active));
      button.setAttribute("aria-label", (active ? "Remove " : "Save ") + names[button.dataset.save]);
      button.textContent = active ? "♥" : "♡";
    });
    try { localStorage.setItem(storageKey, JSON.stringify(favorites)); } catch {}
  }
  document.querySelectorAll("[data-save]").forEach(button => button.addEventListener("click", () => {
    const id = button.dataset.save;
    favorites = favorites.includes(id) ? favorites.filter(item => item !== id) : [...favorites, id];
    renderFavorites();
  }));

  const suggestions = {
    balanced: ["kathmandu","pokhara","manang"],
    culture: ["kathmandu","pokhara","manang"],
    nature: ["pokhara","kathmandu","manang"],
    adventure: ["pokhara","manang","kathmandu"]
  };
  const activities = {
    kathmandu: ["Explore Kathmandu's historic neighborhoods","Discover temples and cultural sites","Try a local food walk"],
    pokhara: ["Walk by Phewa Lake","Explore Pokhara's viewpoints","Enjoy a relaxed lakeside day"],
    manang: ["Prepare for Himalayan travel","Discover mountain landscapes","Take a slow, acclimatization-focused day"]
  };
  let selected = [];
  function buildItinerary() {
    const days = Number(document.querySelector("#trip-days").value);
    const style = document.querySelector("#trip-style").value;
    const preferred = [...new Set([...selected, ...suggestions[style]])];
    const lines = Array.from({length:days}, (_, index) => {
      const id = preferred[Math.min(Math.floor(index / Math.ceil(days / preferred.length)),preferred.length-1)];
      const activity = activities[id][index % activities[id].length];
      return `<li><strong>Day ${index + 1} · ${names[id]}</strong> — ${activity}</li>`;
    });
    const result = document.querySelector("#planner-result");
    result.replaceChildren();
    const heading = document.createElement("h4");
    heading.textContent = `Your ${days}-day sample itinerary`;
    const list = document.createElement("ol");
    lines.forEach(line => {
      const item = document.createElement("li");
      // The itinerary uses only fixed, developer-controlled strings.
      item.innerHTML = line;
      list.append(item);
    });
    const warning = document.createElement("p");
    warning.className = "muted";
    warning.textContent = "Inspiration only, not a feasible route or booking. Allow additional transfer and acclimatization days for high-altitude areas, and check local conditions.";
    result.append(heading, list, warning);
  }
  document.querySelector("#planner-form").addEventListener("submit", e => {e.preventDefault();buildItinerary();});
  document.querySelectorAll("[data-add]").forEach(button => button.addEventListener("click", () => {
    const id = button.dataset.add;
    if (!selected.includes(id)) selected.push(id);
    buildItinerary();
    document.querySelector("#planner").scrollIntoView({behavior:"smooth"});
  }));
  const nav = document.querySelector("#primary-nav");
  const menuButton = document.querySelector("#menu-toggle");
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded","false");
    menuButton.setAttribute("aria-label","Open navigation");
  }));
  document.querySelector("#year").textContent = String(new Date().getFullYear());
  renderFavorites();
})();
