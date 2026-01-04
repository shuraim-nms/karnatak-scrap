// Hero Slider
let slides = document.querySelectorAll(".slide");
let index = 0;
setInterval(() => {
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
}, 4000);

// Counter Animation
function animateValue(id, start, end, duration) {
  let obj = document.getElementById(id);
  let range = end - start;
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    let progress = timestamp - startTime;
    let value = Math.floor(start + (range * progress) / duration);
    obj.textContent = value;
    if (progress < duration) requestAnimationFrame(step);
    else obj.textContent = end;
  }
  requestAnimationFrame(step);
}

animateValue("count1", 0, 1000, 2000);
animateValue("count2", 0, 2500, 2500);
animateValue("count3", 0, 35, 2000);

// ✅ Load Scrap Rates from localStorage
const storedRates = JSON.parse(localStorage.getItem("scrapRates"));
if (storedRates) {
  document.getElementById("ironRateShow").textContent = storedRates.iron || "--";
  document.getElementById("plasticRateShow").textContent = storedRates.plastic || "--";
  document.getElementById("copperRateShow").textContent = storedRates.copper || "--";
  document.getElementById("paperRateShow").textContent = storedRates.paper || "--";
}
