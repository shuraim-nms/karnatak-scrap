document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "https://shuraimnms123.pythonanywhere.com/api/prices";
  const itemContainer = document.getElementById("itemContainer");

  if (!itemContainer) {
    // 🛑 Exit if there's no price section on this page
    return;
  }

  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const priceMap = {
        "📄 Paper Scrap": "paper",
        "🧴 Plastic Scrap": "plastic",
        "💻 E-Waste": "ewaste",
        "🔌 Copper Cables": "copper",
        "🖨️ Printers": "printers",
        "🧱 Iron Scrap": "iron",
        "⚙️ Aluminium Cables": "aluminium",
        "📚 Books": "books",
        "🧲 Ferrous / Non-Ferrous": "ferrous"
      };

      const items = itemContainer.querySelectorAll(".item");
      items.forEach(item => {
        const titleElement = item.querySelector("h3");
        const priceElement = item.querySelector("p");

        if (!titleElement || !priceElement) return;

        const title = titleElement.innerText.trim();
        const key = priceMap[title];
        const price = data[key];

        if (price !== undefined) {
          const unit = (title === "🖨️ Printers") ? "unit" : "kg";
          priceElement.innerText = `₹ ${price} /${unit}`;
        }
      });
    })
    .catch(error => {
      console.error("❌ Error fetching prices:", error);
    });
});
