document.addEventListener("DOMContentLoaded", function() {
    document.body.classList.add("fade-in");
});
// toggle links off on on for mobile or small screened devices
function toggleMenu() {
  const menu = document.querySelector('.center-links');
  
  menu.classList.toggle('show');
}


//====== Resource Slide Show ======//
// Wait for page to load before getting elements
// for slide show on homepage 
window.addEventListener("DOMContentLoaded", () => {
  let slideIndex = 0;
  const slide = document.getElementById("slidesImg");

  fetch('resourceImages.json')
    .then(response => response.json())
    .then(data => {
      const images = data.images;

      function showSlides() {
        slide.style.opacity = 0;

        setTimeout(() => {
          slide.src = images[slideIndex];
          slide.style.opacity = 1;
        }, 500);

        slideIndex = (slideIndex + 1) % images.length;
        setTimeout(showSlides, 4000);
      }

      showSlides();
    })
    .catch(err => console.error("Error Loading image:", err));
});


//================ Reservation Slide Show =============//
// Wait for page to load before getting elements
// for slide Reservation slide show
let slide ;
let resSlideIndex = 0;
let images;

window.addEventListener("DOMContentLoaded", () => {

  slide = document.getElementById("resSlidesImg");
  // Next/previous controls
  fetch('reservationImages.json')
    .then(response => response.json())
    .then(data => {
      images = data.images;
      slide.src = images[0];
    })
    .catch(err => console.error("Error Loading image:", err));
});

function plusSlides(n) {
  showResSlides(resSlideIndex += n);
}


function showResSlides(n) {

  if (n > images.length){
    resSlideIndex = 1;
   
  }
  if (n < 1){
    resSlideIndex = images.length;
    
  }
  console.log(resSlideIndex);
  slide.src = images[resSlideIndex-1];

}


// ========== History Slideshow ============//
window.addEventListener("DOMContentLoaded", loadHistory);

let historyData = [];
let historyIndex = 0;
let historyLength = 0;

// Array to store the 3 slide DOM objects
const slides = [];

function loadHistory() {
  // Collect the 3 display objects
  for (let i = 1; i <= 3; i++) {
    const container = document.querySelector(`.year-obj-${i}`);
    slides.push({
      year: container.querySelector(".year"),
      img: container.querySelector(".historyImg"),
      blurb: container.querySelector(".historyBlurb")
    });
  }

  fetch("history.json")
    .then(res => res.json())
    .then(data => {
      historyData = data.history;
      historyLength = historyData.length;
      updateSlides(0);
    });
}

function plusHisSlides(n) {
  historyIndex += n;

  // Clamp the index
  if (historyIndex < 0) historyIndex = 0;
  if (historyIndex > historyLength - 3) historyIndex = historyLength - 3;

  updateSlides(historyIndex);
}

function updateSlides(index) {
  // Ensure valid range
  if (index < 0) index = 0;
  if (index > historyLength - 3) index = historyLength - 3;

  // Update the 3 display slots using a loop
  for (let i = 0; i < 3; i++) {
    const entry = historyData[index + i];
    slides[i].year.textContent = entry.year;
    slides[i].img.src = entry.image;
    slides[i].blurb.textContent = entry.blurb;
  }
}


// === Grant Slideshow ===
window.addEventListener("DOMContentLoaded", loadGrants);

let grantData = [];
let grantIndex = 0;
let grantLength = 0;

// Store references to the 3 slide DOM objects
const grantSlides = [];

function loadGrants() {
  // Load DOM slide containers
  for (let i = 1; i <= 3; i++) {
    const container = document.querySelector(`.grant-obj-${i}`);
    grantSlides.push({
      amount: container.querySelector(".grant-amount"),
      img: container.querySelector(".grantImg"),
      blurb: container.querySelector(".grantBlurb")
    });
  }

  // Load JSON
  fetch("grants.json")
    .then(res => res.json())
    .then(data => {
      grantData = data.grants;
      grantLength = grantData.length;
      updateGrantSlides(0);
    });
}

function plusGrantSlides(n) {
  grantIndex += n;

  // Clamp index
  if (grantIndex < 0) grantIndex = 0;
  if (grantIndex > grantLength - 3) grantIndex = grantLength - 3;

  updateGrantSlides(grantIndex);
}

function updateGrantSlides(index) {
  // Ensure valid range
  if (index < 0) index = 0;
  if (index > grantLength - 3) index = grantLength - 3;

  // Loop through the 3 visible slides
  for (let i = 0; i < 3; i++) {
    const entry = grantData[index + i];
    grantSlides[i].amount.textContent = entry.amount;
    grantSlides[i].img.src = entry.image;
    grantSlides[i].blurb.textContent = entry.blurb;
  }
}


// Grant Info Download //
function downloadPDF(button) {
  if (button.dataset.cooldown === "true") return;

  const type = button.dataset.download;

  const files = {
    guidelines: "grantFiles/GrantGuidelines.pdf",
    application: "grantFiles/GrantApplication.pdf"
  };

  const path = files[type];
  if (!path) return;

  // start cooldown
  button.dataset.cooldown = "true";
  button.disabled = true;
  const originalText = button.textContent;
  button.textContent = "Preparing...";

  setTimeout(() => {
    const a = document.createElement("a");
    a.href = path;
    a.download = path.split("/").pop();
    document.body.appendChild(a);
    a.click();
    a.remove();
  }, 300);

  // re-enable after cooldown
  setTimeout(() => {
    button.disabled = false;
    button.textContent = originalText;
    delete button.dataset.cooldown;
  }, 3000);
}