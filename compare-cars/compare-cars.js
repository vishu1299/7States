// Compare Cars JavaScript

// Car data
const availableCars = [
  {
    id: 1,
    name: "Toyota Camry 2024",
    price: "AED 125,000",
    image: "../images/productimages/image 19.png",
    year: "2024",
    type: "sedan",
  },
  {
    id: 2,
    name: "Honda Accord 2024",
    price: "AED 118,000",
    image: "../images/productimages/image 20.png",
    year: "2024",
    type: "sedan",
  },
  {
    id: 3,
    name: "BMW X3 2024",
    price: "AED 195,000",
    image: "../images/productimages/image 34.png",
    year: "2024",
    type: "suv",
  },
  {
    id: 4,
    name: "Audi Q5 2024",
    price: "AED 210,000",
    image: "../images/productimages/image 35.png",
    year: "2024",
    type: "suv",
  },
  {
    id: 5,
    name: "Mercedes C-Class 2024",
    price: "AED 175,000",
    image: "../images/productimages/image 36.png",
    year: "2024",
    type: "sedan",
  },
  {
    id: 6,
    name: "Ford Mustang 2024",
    price: "AED 165,000",
    image: "../images/productimages/image 37.png",
    year: "2024",
    type: "coupe",
  },
  {
    id: 7,
    name: "Nissan Altima 2024",
    price: "AED 95,000",
    image: "../images/productimages/image 38.png",
    year: "2024",
    type: "sedan",
  },
  {
    id: 8,
    name: "Hyundai Elantra 2024",
    price: "AED 85,000",
    image: "../images/productimages/image 40.png",
    year: "2024",
    type: "sedan",
  },
  {
    id: 9,
    name: "Kia Sportage 2024",
    price: "AED 135,000",
    image: "../images/productimages/image 41.png",
    year: "2024",
    type: "suv",
  },
  {
    id: 10,
    name: "Volkswagen Golf 2024",
    price: "AED 105,000",
    image: "../images/productimages/image 42.png",
    year: "2024",
    type: "hatchback",
  },
  {
    id: 11,
    name: "Mazda CX-5 2024",
    price: "AED 145,000",
    image: "../images/productimages/image 43.png",
    year: "2024",
    type: "suv",
  },
  {
    id: 12,
    name: "Subaru Impreza 2024",
    price: "AED 115,000",
    image: "../images/productimages/image 44.png",
    year: "2024",
    type: "hatchback",
  },
];

// Selected cars for comparison (only 2 cars now)
let selectedCars = {
  1: null,
  2: null,
};

// Current car selector position
let currentSelectorPosition = 1;

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  console.log("Compare Cars page loaded");
  updateCompareButton();
  initializeCarousels();
});

// Initialize Swiper carousels
function initializeCarousels() {
  // Popular Comparisons Carousel
  const popularSwiper = new Swiper(".popularComparisonsSwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".popular-next",
      prevEl: ".popular-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  // Featured Comparisons Carousel
  const featuredSwiper = new Swiper(".featuredComparisonsSwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".featured-next",
      prevEl: ".featured-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  console.log("Carousels initialized successfully");
}

// Open car selector modal
function openCarSelector(position) {
  currentSelectorPosition = position;
  const modal = new bootstrap.Modal(
    document.getElementById("carSelectorModal")
  );
  populateCarSelector();
  modal.show();
}

// Populate car selector with available cars
function populateCarSelector() {
  const grid = document.getElementById("carSelectionGrid");
  grid.innerHTML = "";

  availableCars.forEach((car) => {
    const carOption = document.createElement("div");
    carOption.className = "col-md-4 col-sm-6";
    carOption.innerHTML = `
      <div class="car-option" onclick="selectCar(${car.id})">
        <img src="${car.image}" alt="${car.name}" class="img-fluid">
        <h6>${car.name}</h6>
        <p>${car.price}</p>
      </div>
    `;
    grid.appendChild(carOption);
  });
}

// Select a car for comparison
function selectCar(carId) {
  const car = availableCars.find((c) => c.id === carId);
  if (car) {
    selectedCars[currentSelectorPosition] = car;
    updateCarCard(currentSelectorPosition, car);
    updateCompareButton();

    // Close modal
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("carSelectorModal")
    );
    modal.hide();
  }
}

// Update car card display
function updateCarCard(position, car) {
  const cardBody = document.querySelector(`#car${position} .compare-card-body`);

  if (car) {
    cardBody.innerHTML = `
      <div class="selected-car">
        <img src="${car.image}" alt="${car.name}" class="img-fluid">
        <h6>${car.name}</h6>
        <p>${car.price}</p>
        <button class="remove-car" onclick="removeCar(${position})">
          <i class="fas fa-times"></i> Remove
        </button>
      </div>
    `;
  } else {
    cardBody.innerHTML = `
      <div class="add-car-placeholder" onclick="openCarSelector(${position})">
        <i class="fas fa-plus fa-2x text-muted mb-3"></i>
        <p class="text-muted mb-0">Add Car</p>
      </div>
    `;
  }
}

// Remove a car from comparison
function removeCar(position) {
  selectedCars[position] = null;
  updateCarCard(position, null);
  updateCompareButton();
}

// Update compare button state
function updateCompareButton() {
  const compareBtn = document.getElementById("compareBtn");
  const selectedCount = Object.values(selectedCars).filter(
    (car) => car !== null
  ).length;

  if (selectedCount === 2) {
    compareBtn.disabled = false;
    compareBtn.classList.remove("btn-secondary");
    compareBtn.classList.add("btn-primary");
    compareBtn.innerHTML = `Compare (${selectedCount} cars)`;
  } else if (selectedCount === 1) {
    compareBtn.disabled = true;
    compareBtn.classList.remove("btn-primary");
    compareBtn.classList.add("btn-secondary");
    compareBtn.innerHTML = "Select 1 more car to compare";
  } else {
    compareBtn.disabled = true;
    compareBtn.classList.remove("btn-primary");
    compareBtn.classList.add("btn-secondary");
    compareBtn.innerHTML = "compare";
  }
}

// Compare selected cars
function compareSelectedCars() {
  const selectedCarsList = Object.values(selectedCars).filter(
    (car) => car !== null
  );

  if (selectedCarsList.length === 2) {
    // In a real application, this would navigate to a detailed comparison page
    alert(
      `Comparing 2 cars:\n${selectedCarsList
        .map((car) => car.name)
        .join(" VS ")}`
    );
    console.log("Selected cars for comparison:", selectedCarsList);
  } else {
    alert("Please select exactly 2 cars to compare.");
  }
}

// Filter by body type
function filterByBodyType(type) {
  // Update active button
  document.querySelectorAll(".btn-group .btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");

  // Filter and display comparisons (placeholder functionality)
  console.log(`Filtering by body type: ${type}`);

  // In a real application, this would filter the comparison grid
  // For now, we'll just log the action
}

// Pagination functions
function previousPage() {
  console.log("Previous page clicked");
  // Implement pagination logic here
}

function nextPage() {
  console.log("Next page clicked");
  // Implement pagination logic here
}

function previousFeaturedPage() {
  console.log("Previous featured page clicked");
  // Implement pagination logic here
}

function nextFeaturedPage() {
  console.log("Next featured page clicked");
  // Implement pagination logic here
}

// Mega dropdown functionality
document.addEventListener("DOMContentLoaded", function () {
  // Ensure mega dropdown stays open on hover
  const megaDropdown = document.querySelector(".mega-dropdown");
  if (megaDropdown) {
    megaDropdown.addEventListener("mouseenter", function () {
      this.style.display = "block";
    });

    megaDropdown.addEventListener("mouseleave", function () {
      // Add a small delay before hiding
      setTimeout(() => {
        if (!this.matches(":hover")) {
          this.style.display = "none";
        }
      }, 100);
    });
  }
});
