const fields = ["paper", "plastic", "ewaste", "copper", "printers", "iron", "aluminium", "books", "ferrous"];
const inputDiv = document.getElementById("inputs");

fetch('http://localhost:5000/api/prices')
  .then(res => res.json())
  .then(prices => {
    fields.forEach(field => {
      const label = field.charAt(0).toUpperCase() + field.slice(1);
      const input = document.createElement("input");
      input.type = "number";
      input.name = field;
      input.placeholder = `Enter ${label} Price`;
      input.value = prices[field] || 0;
      inputDiv.appendChild(input);
    });
  });

document.getElementById("priceForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const updatedPrices = {};
  fields.forEach(field => {
    updatedPrices[field] = parseFloat(formData.get(field));
  });

  fetch("http://192.168.78.200:5000/api/update", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(updatedPrices)
})

    .then(res => res.json())
    .then(data => alert(data.message))
    .catch(() => alert("Failed to update prices"));
});
