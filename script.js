const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 70);
});

menuToggle.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
  });
});

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add("visible"), index * 60);
    }
  });
}, { threshold: 0.15 });

reveals.forEach((element) => revealObserver.observe(element));

document.querySelectorAll(".glass-hover").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--x", `${x}%`);
    card.style.setProperty("--y", `${y}%`);
  });
});

const menuData = {
  vorspeisen: [
    { icon: "🥖", name: "Bruschetta Classica", desc: "Geröstetes Brot mit Tomaten, Basilikum und Olivenöl.", price: "8,90 €" },
    { icon: "🥗", name: "Mediterraner Salat", desc: "Frische Blattsalate, Gemüse, Kräuter und Hausdressing.", price: "9,90 €" },
    { icon: "🧀", name: "Antipasti Teller", desc: "Auswahl aus Gemüse, Käse, Oliven und feinen Kleinigkeiten.", price: "13,90 €" },
    { icon: "🍲", name: "Suppe des Tages", desc: "Saisonal gekocht und mit frischen Kräutern serviert.", price: "7,50 €" }
  ],
  hauptgerichte: [
    { icon: "🍝", name: "Hausgemachte Pasta", desc: "Frische Pasta mit cremiger Sauce, Kräutern und Parmesan.", price: "14,90 €" },
    { icon: "🥩", name: "Rinderfilet", desc: "Zart gebraten mit Gemüse, Kartoffeln und feiner Sauce.", price: "26,90 €" },
    { icon: "🐟", name: "Gegrillter Lachs", desc: "Mit Zitronenbutter, Marktgemüse und Beilage.", price: "21,90 €" },
    { icon: "🍛", name: "Saisonales Risotto", desc: "Cremig gekocht mit frischen Zutaten der Saison.", price: "16,90 €" }
  ],
  desserts: [
    { icon: "🍰", name: "Tiramisu", desc: "Klassisch, cremig und hausgemacht.", price: "6,90 €" },
    { icon: "🍫", name: "Schokoladenküchlein", desc: "Warm serviert mit weichem Kern und Vanilleeis.", price: "8,50 €" },
    { icon: "🍓", name: "Panna Cotta", desc: "Mit Beerenragout und frischer Minze.", price: "6,90 €" },
    { icon: "🍨", name: "Sorbet Variation", desc: "Leicht, fruchtig und perfekt zum Abschluss.", price: "6,50 €" }
  ],
  getraenke: [
    { icon: "🍷", name: "Hauswein", desc: "Rot oder Weiß, sorgfältig ausgewählt.", price: "5,90 €" },
    { icon: "🍹", name: "Aperitif", desc: "Spritzig, frisch und ideal zum Start.", price: "7,90 €" },
    { icon: "☕", name: "Espresso", desc: "Kräftig, aromatisch und frisch zubereitet.", price: "2,90 €" },
    { icon: "🍋", name: "Hauslimonade", desc: "Erfrischend mit Zitrus, Minze und Eis.", price: "4,90 €" }
  ]
};

const menuGrid = document.getElementById("menuGrid");
const tabs = document.querySelectorAll(".tab");

function renderMenu(category) {
  menuGrid.classList.add("menu-changing");

  setTimeout(() => {
    menuGrid.innerHTML = menuData[category].map(item => `
      <article class="menu-card glass-hover">
        <div class="menu-icon">${item.icon}</div>
        <div>
          <h3>${item.name}</h3>
          <p>${item.desc}</p>
        </div>
        <strong class="menu-price">${item.price}</strong>
      </article>
    `).join("");

    document.querySelectorAll(".menu-card.glass-hover").forEach((card) => {
      card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--x", `${x}%`);
        card.style.setProperty("--y", `${y}%`);
      });
    });

    menuGrid.classList.remove("menu-changing");
  }, 180);
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(item => item.classList.remove("active"));
    tab.classList.add("active");
    renderMenu(tab.dataset.category);
  });
});

renderMenu("vorspeisen");
