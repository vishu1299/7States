// Filters object for sidebar functionality
let currentFilters = {
  search: "",
  make: "",
  model: "",
  minPrice: "",
  maxPrice: "",
  minYear: "",
  maxYear: "",
  minMileage: "",
  maxMileage: "",
  location: "",
  type: "",
  transmission: "",
  fuelType: "",
  bodyColor: "",
  sortBy: "relevance",
};

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, initializing...");

  // Check login status and update UI on page load
  updateAuthUI();

  // Render car cards first
  renderCarCards();

  // Setup event listeners for filters
  setupEventListeners();

  // Setup card and heart functionality
  setupCardInteractions();

  console.log("Initialization complete");
});

// Setup event listeners
function setupEventListeners() {
  console.log("Setting up event listeners...");

  // Test if transmission buttons exist
  const transmissionBtns = document.querySelectorAll(".transmission-btn");
  console.log("Found transmission buttons:", transmissionBtns.length);

  // Search functionality
  const carSearch = document.getElementById("carSearch");
  if (carSearch) {
    carSearch.addEventListener("input", function (e) {
      currentFilters.search = e.target.value.toLowerCase();
      applyFilters();
    });
  }

  // Filter dropdowns
  const makeFilter = document.getElementById("makeFilter");
  if (makeFilter) {
    makeFilter.addEventListener("change", function (e) {
      currentFilters.make = e.target.value;
      applyFilters();
    });
  }

  const modelFilter = document.getElementById("modelFilter");
  if (modelFilter) {
    modelFilter.addEventListener("change", function (e) {
      currentFilters.model = e.target.value;
      applyFilters();
    });
  }

  const sortBy = document.getElementById("sortBy");
  if (sortBy) {
    sortBy.addEventListener("change", function (e) {
      currentFilters.sortBy = e.target.value;
      applyFilters();
    });
  }

  // Price range inputs
  const minPrice = document.getElementById("minPrice");
  if (minPrice) {
    minPrice.addEventListener("input", function (e) {
      currentFilters.minPrice = e.target.value;
      applyFilters();
    });
  }

  const maxPrice = document.getElementById("maxPrice");
  if (maxPrice) {
    maxPrice.addEventListener("input", function (e) {
      currentFilters.maxPrice = e.target.value;
      applyFilters();
    });
  }

  // Year range
  const minYear = document.getElementById("minYear");
  if (minYear) {
    minYear.addEventListener("change", function (e) {
      currentFilters.minYear = e.target.value;
      applyFilters();
    });
  }

  const maxYear = document.getElementById("maxYear");
  if (maxYear) {
    maxYear.addEventListener("change", function (e) {
      currentFilters.maxYear = e.target.value;
      applyFilters();
    });
  }

  // Mileage range
  const minMileage = document.getElementById("minMileage");
  if (minMileage) {
    minMileage.addEventListener("input", function (e) {
      currentFilters.minMileage = e.target.value;
      applyFilters();
    });
  }

  const maxMileage = document.getElementById("maxMileage");
  if (maxMileage) {
    maxMileage.addEventListener("input", function (e) {
      currentFilters.maxMileage = e.target.value;
      applyFilters();
    });
  }

  // Clear filters
  const clearFiltersBtn = document.querySelector(".clear-filters");
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", function (e) {
      e.preventDefault();
      clearAllFilters();
    });
  }

  // Transmission buttons
  const transmissionButtons = document.querySelectorAll(".transmission-btn");
  console.log("Setting up transmission buttons:", transmissionButtons.length);

  transmissionButtons.forEach((btn, index) => {
    console.log(`Button ${index}:`, btn.textContent, btn.dataset.transmission);
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Transmission button clicked:", this.dataset.transmission);

      // Remove active class from all buttons
      document.querySelectorAll(".transmission-btn").forEach((b) => {
        b.classList.remove("active");
        console.log("Removed active from:", b.textContent);
      });

      // Add active class to clicked button
      this.classList.add("active");
      console.log("Added active to:", this.textContent);

      currentFilters.transmission = this.dataset.transmission;
      applyFilters();
    });
  });

  // Fuel type buttons
  const fuelTypeButtons = document.querySelectorAll(".fuel-type-btn");
  console.log("Setting up fuel type buttons:", fuelTypeButtons.length);

  fuelTypeButtons.forEach((btn, index) => {
    console.log(`Fuel Button ${index}:`, btn.textContent, btn.dataset.fuel);
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Fuel type button clicked:", this.dataset.fuel);

      // Remove active class from all buttons
      document.querySelectorAll(".fuel-type-btn").forEach((b) => {
        b.classList.remove("active");
      });

      // Add active class to clicked button
      this.classList.add("active");
      console.log("Added active to fuel:", this.textContent);

      currentFilters.fuelType = this.dataset.fuel;
      applyFilters();
    });
  });

  // Body type buttons
  document.querySelectorAll(".body-type-item").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".body-type-item")
        .forEach((b) => b.classList.remove("selected"));
      this.classList.add("selected");
      currentFilters.type = this.dataset.type;
      applyFilters();
    });
  });

  // Body color buttons
  document.querySelectorAll(".color-item").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".color-item")
        .forEach((b) => b.classList.remove("selected"));
      this.classList.add("selected");
      currentFilters.bodyColor = this.dataset.color;
      applyFilters();
    });
  });

  // Quick select buttons
  document.querySelectorAll(".quick-select-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const section = this.closest(".filter-section");
      section
        .querySelectorAll(".quick-select-btn")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      // Handle different quick select types
      if (this.dataset.price) {
        const [min, max] = this.dataset.price.split("-");
        currentFilters.minPrice = min;
        currentFilters.maxPrice = max;
        document.getElementById("minPriceSelect").value = min;
        document.getElementById("maxPriceSelect").value = max;
      } else if (this.dataset.year) {
        const [min, max] = this.dataset.year.split("-");
        currentFilters.minYear = min;
        currentFilters.maxYear = max;
        document.getElementById("minYearSelect").value = min;
        document.getElementById("maxYearSelect").value = max;
      } else if (this.dataset.mileage) {
        const [min, max] = this.dataset.mileage.split("-");
        currentFilters.minMileage = min;
        currentFilters.maxMileage = max;
        document.getElementById("minMileageSelect").value = min;
        document.getElementById("maxMileageSelect").value = max;
      }

      applyFilters();
    });
  });

  // Price select dropdowns
  document
    .getElementById("minPriceSelect")
    ?.addEventListener("change", function (e) {
      currentFilters.minPrice = e.target.value;
      applyFilters();
    });

  document
    .getElementById("maxPriceSelect")
    ?.addEventListener("change", function (e) {
      currentFilters.maxPrice = e.target.value;
      applyFilters();
    });

  // Year select dropdowns
  document
    .getElementById("minYearSelect")
    ?.addEventListener("change", function (e) {
      currentFilters.minYear = e.target.value;
      applyFilters();
    });

  document
    .getElementById("maxYearSelect")
    ?.addEventListener("change", function (e) {
      currentFilters.maxYear = e.target.value;
      applyFilters();
    });

  // Mileage select dropdowns
  document
    .getElementById("minMileageSelect")
    ?.addEventListener("change", function (e) {
      currentFilters.minMileage = e.target.value;
      applyFilters();
    });

  document
    .getElementById("maxMileageSelect")
    ?.addEventListener("change", function (e) {
      currentFilters.maxMileage = e.target.value;
      applyFilters();
    });
}

// Apply all filters
function applyFilters() {
  console.log("Filters applied:", currentFilters);

  // Filter the cars based on current filters
  let filteredCars = carsData.filter((car) => {
    // Search filter
    if (
      currentFilters.search &&
      !car.title.toLowerCase().includes(currentFilters.search)
    ) {
      return false;
    }

    // Transmission filter
    if (
      currentFilters.transmission &&
      car.transmission.toLowerCase() !==
        currentFilters.transmission.toLowerCase()
    ) {
      return false;
    }

    // Add more filters as needed
    return true;
  });

  // Re-render the filtered cars
  renderFilteredCarCards(filteredCars);
}

// Clear all filters
function clearAllFilters() {
  currentFilters = {
    search: "",
    make: "",
    model: "",
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    minMileage: "",
    maxMileage: "",
    location: "",
    type: "",
    transmission: "",
    fuelType: "",
    bodyColor: "",
    sortBy: "relevance",
  };

  // Reset form elements (with null checks)
  const carSearch = document.getElementById("carSearch");
  if (carSearch) carSearch.value = "";

  const makeFilter = document.getElementById("makeFilter");
  if (makeFilter) makeFilter.value = "";

  const modelFilter = document.getElementById("modelFilter");
  if (modelFilter) modelFilter.value = "";

  const sortBy = document.getElementById("sortBy");
  if (sortBy) sortBy.value = "relevance";

  const minPrice = document.getElementById("minPrice");
  if (minPrice) minPrice.value = "";

  const maxPrice = document.getElementById("maxPrice");
  if (maxPrice) maxPrice.value = "";

  const minYear = document.getElementById("minYear");
  if (minYear) minYear.value = "";

  const maxYear = document.getElementById("maxYear");
  if (maxYear) maxYear.value = "";

  const minMileage = document.getElementById("minMileage");
  if (minMileage) minMileage.value = "";

  const maxMileage = document.getElementById("maxMileage");
  if (maxMileage) maxMileage.value = "";

  // Reset dropdown selectors
  document.getElementById("minPriceSelect") &&
    (document.getElementById("minPriceSelect").value = "");
  document.getElementById("maxPriceSelect") &&
    (document.getElementById("maxPriceSelect").value = "");
  document.getElementById("minYearSelect") &&
    (document.getElementById("minYearSelect").value = "");
  document.getElementById("maxYearSelect") &&
    (document.getElementById("maxYearSelect").value = "");
  document.getElementById("minMileageSelect") &&
    (document.getElementById("minMileageSelect").value = "");
  document.getElementById("maxMileageSelect") &&
    (document.getElementById("maxMileageSelect").value = "");

  // Reset button states
  document
    .querySelectorAll(".transmission-btn")
    .forEach((btn) => btn.classList.remove("active"));
  document
    .querySelectorAll(".fuel-type-btn")
    .forEach((btn) => btn.classList.remove("active"));
  document
    .querySelectorAll(".body-type-item")
    .forEach((btn) => btn.classList.remove("selected"));
  document
    .querySelectorAll(".color-item")
    .forEach((btn) => btn.classList.remove("selected"));
  document
    .querySelectorAll(".quick-select-btn")
    .forEach((btn) => btn.classList.remove("active"));

  // Set default active states
  document
    .querySelector(".transmission-btn[data-transmission='automatic']")
    ?.classList.add("active");
  document
    .querySelector(".fuel-type-btn[data-fuel='petrol']")
    ?.classList.add("active");

  // Clear selected filter badges
  const selectedFilters = document.querySelector(".selected-filters");
  if (selectedFilters) {
    selectedFilters.innerHTML = "";
  }

  // Re-render all cars
  renderCarCards();

  console.log("All filters cleared");
}

// Car data array
const carsData = [
  {
    id: 1,
    title: "Audi A3 Sedan 2023",
    year: "2024",
    location: "Dubai",
    mileage: "4k/KM",
    transmission: "Manual",
    price: "AED 84,500",
    address: "Industrial Area 3, Dubai, UAE",
    image: "../images/productimages/image 19.png",
    alt: "Audi A3 Sedan",
  },
  {
    id: 2,
    title: "Audi A4 Premium Plus 2024",
    year: "2024",
    location: "Dubai",
    mileage: "4k/KM",
    transmission: "Manual",
    price: "AED 111,400",
    address: "Industrial Area 3, Dubai, UAE",
    image: "../images/productimages/image 20.png",
    alt: "Audi A4 Premium Plus",
  },
  {
    id: 3,
    title: "Audi Q3 Sportback",
    year: "2024",
    location: "Dubai",
    mileage: "4k/KM",
    transmission: "Manual",
    price: "AED 150,800",
    address: "Industrial Area 3, Dubai, UAE",
    image: "../images/productimages/image 34.png",
    alt: "Audi Q3 Sportback",
  },
  {
    id: 4,
    title: "BMW X3 2024",
    year: "2024",
    location: "Dubai",
    mileage: "8k/KM",
    transmission: "Automatic",
    price: "AED 195,000",
    address: "Al Quoz, Dubai, UAE",
    image: "../images/productimages/image 35.png",
    alt: "BMW X3",
  },
  {
    id: 5,
    title: "Mercedes C-Class 2023",
    year: "2023",
    location: "Dubai",
    mileage: "12k/KM",
    transmission: "Automatic",
    price: "AED 175,500",
    address: "Business Bay, Dubai, UAE",
    image: "../images/productimages/image 36.png",
    alt: "Mercedes C-Class",
  },
  {
    id: 6,
    title: "Toyota Camry 2024",
    year: "2024",
    location: "Dubai",
    mileage: "5k/KM",
    transmission: "Automatic",
    price: "AED 125,000",
    address: "Deira, Dubai, UAE",
    image: "../images/productimages/image 37.png",
    alt: "Toyota Camry",
  },
  {
    id: 7,
    title: "Honda Accord 2023",
    year: "2023",
    location: "Dubai",
    mileage: "15k/KM",
    transmission: "Automatic",
    price: "AED 98,000",
    address: "Jumeirah, Dubai, UAE",
    image: "../images/productimages/image 38.png",
    alt: "Honda Accord",
  },
  {
    id: 8,
    title: "Nissan Altima 2024",
    year: "2024",
    location: "Dubai",
    mileage: "7k/KM",
    transmission: "CVT",
    price: "AED 89,500",
    address: "Motor City, Dubai, UAE",
    image: "../images/productimages/image 40.png",
    alt: "Nissan Altima",
  },
  {
    id: 9,
    title: "Lexus ES 350 2023",
    year: "2023",
    location: "Dubai",
    mileage: "18k/KM",
    transmission: "Automatic",
    price: "AED 165,000",
    address: "Downtown Dubai, UAE",
    image: "../images/productimages/image 41.png",
    alt: "Lexus ES",
  },
];

// Function to render car cards
function renderCarCards() {
  console.log("Rendering car cards...");
  renderFilteredCarCards(carsData);
}

// Function to render filtered car cards
function renderFilteredCarCards(cars) {
  const carListingsContainer = document.getElementById("car-listings");

  if (!carListingsContainer) {
    console.error("Car listings container not found!");
    return;
  }

  console.log("Rendering", cars.length, "cars");

  const carCardsHTML = cars
    .map(
      (car) => `
    <div class="col-lg-4 col-md-6">
      <div class="car-card" data-car-id="${car.id}">
        <div class="heart-icon">
          <i class="far fa-heart"></i>
        </div>
        <img
          src="${car.image}"
          alt="${car.alt}"
          class="car-image"
        />
        <div class="car-title">${car.title}</div>
        <div class="car-specs">
          <span
            style="
              background-color: rgba(128, 128, 128, 0.234);
              border-radius: 10px;
              font-size: 12px;
            "
            class="spec-item p-2"
          >${car.year}</span>
          <span style="
              background-color: rgba(128, 128, 128, 0.234);
              border-radius: 10px;
              font-size: 12px;
            " class="spec-item p-2">${car.location}</span>
          <span style="
              background-color: rgba(128, 128, 128, 0.234);
              border-radius: 10px;
              font-size: 12px;
            " class="spec-item p-2">${car.mileage}</span>
          <span style="
              background-color: rgba(128, 128, 128, 0.234);
              border-radius: 10px;
              font-size: 12px;
            " class="spec-item p-2">${car.transmission}</span>
        </div>
        <div class="price">${car.price}</div>
        <div class="location">
          <i class="fas fa-map-marker-alt"></i>
          <span>${car.address}</span>
        </div>
      </div>
    </div>
  `
    )
    .join("");

  carListingsContainer.innerHTML = carCardsHTML;
  console.log("Car cards rendered successfully");
}

// Authentication functions
function checkLoginStatus() {
  const user = localStorage.getItem("loggedInUser");
  return user ? JSON.parse(user) : null;
}

function updateAuthUI() {
  const user = checkLoginStatus();

  // Desktop elements
  const desktopNotLoggedIn = document.getElementById(
    "desktop-auth-not-logged-in"
  );
  const desktopLoggedIn = document.getElementById("desktop-auth-logged-in");
  const desktopUsername = document.getElementById("desktop-username");

  // Mobile elements
  const mobileNotLoggedIn = document.getElementById(
    "mobile-auth-not-logged-in"
  );
  const mobileLoggedIn = document.getElementById("mobile-auth-logged-in");
  const mobileUsername = document.getElementById("mobile-username");

  console.log("User login status:", user); // Debug log

  if (user) {
    // User is logged in
    console.log("Showing logged in state"); // Debug log
    if (desktopNotLoggedIn) {
      desktopNotLoggedIn.style.setProperty("display", "none", "important");
    }
    if (desktopLoggedIn) {
      desktopLoggedIn.style.setProperty("display", "flex", "important");
    }
    if (desktopUsername)
      desktopUsername.textContent = user.name || user.email || "User";

    if (mobileNotLoggedIn) {
      mobileNotLoggedIn.style.setProperty("display", "none", "important");
    }
    if (mobileLoggedIn) {
      mobileLoggedIn.style.setProperty("display", "block", "important");
    }
    if (mobileUsername)
      mobileUsername.textContent = user.name || user.email || "User";

    // Add logout functionality
    const desktopLogoutBtn = document.getElementById("desktop-logout-btn");
    const mobileLogoutBtn = document.getElementById("mobile-logout-btn");

    if (desktopLogoutBtn) {
      desktopLogoutBtn.addEventListener("click", function (e) {
        e.preventDefault();
        logout();
      });
    }

    if (mobileLogoutBtn) {
      mobileLogoutBtn.addEventListener("click", function (e) {
        e.preventDefault();
        logout();
      });
    }

    // Add My Ads functionality
    const desktopMyAdsBtn = document.getElementById("desktop-my-ads-btn");
    const mobileMyAdsBtn = document.getElementById("mobile-my-ads-btn");

    if (desktopMyAdsBtn) {
      desktopMyAdsBtn.addEventListener("click", function (e) {
        e.preventDefault();
        // Navigate to My Ads page (you can change this URL as needed)
        alert("My Ads functionality - Navigate to user's ads page");
      });
    }

    if (mobileMyAdsBtn) {
      mobileMyAdsBtn.addEventListener("click", function (e) {
        e.preventDefault();
        // Navigate to My Ads page (you can change this URL as needed)
        alert("My Ads functionality - Navigate to user's ads page");
      });
    }
  } else {
    // User is not logged in
    console.log("Showing not logged in state"); // Debug log
    if (desktopNotLoggedIn) {
      desktopNotLoggedIn.style.setProperty("display", "flex", "important");
    }
    if (desktopLoggedIn) {
      desktopLoggedIn.style.setProperty("display", "none", "important");
    }

    if (mobileNotLoggedIn) {
      mobileNotLoggedIn.style.setProperty("display", "block", "important");
    }
    if (mobileLoggedIn) {
      mobileLoggedIn.style.setProperty("display", "none", "important");
    }
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  updateAuthUI();
  // Optional: Show logout success message
  alert("You have been logged out successfully!");
}

// Simulate login function (for testing purposes)
function simulateLogin(userId, userName, userEmail) {
  const userData = {
    id: userId,
    name: userName,
    email: userEmail,
    loginTime: new Date().toISOString(),
  };
  localStorage.setItem("loggedInUser", JSON.stringify(userData));
  updateAuthUI();
  alert(`Login simulated! You are now logged in as ${userData.name}`);
}

// Setup card interactions
function setupCardInteractions() {
  // Logout button event listeners
  const desktopLogoutBtn = document.getElementById("desktop-logout-btn");
  const mobileLogoutBtn = document.getElementById("mobile-logout-btn");

  if (desktopLogoutBtn) {
    desktopLogoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      logout();
    });
  }

  if (mobileLogoutBtn) {
    mobileLogoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      logout();
    });
  }

  // Profile and My Cars links (placeholder functionality)
  const profileLinks = document.querySelectorAll(
    "#desktop-profile-link, #mobile-profile-link"
  );
  const myCarsLinks = document.querySelectorAll(
    "#desktop-my-cars-link, #mobile-my-cars-link"
  );

  profileLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      alert("Profile page - Coming soon!");
    });
  });

  myCarsLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      alert("My Cars page - Coming soon!");
    });
  });

  // Heart icon functionality (using event delegation)
  document.addEventListener("click", function (e) {
    if (e.target.closest(".heart-icon")) {
      e.stopPropagation(); // Prevent card click when clicking heart
      const heartIcon = e.target.closest(".heart-icon");
      const icon = heartIcon.querySelector("i");
      if (icon.classList.contains("far")) {
        icon.classList.remove("far");
        icon.classList.add("fas");
        icon.style.color = "#22c55e";
      } else {
        icon.classList.remove("fas");
        icon.classList.add("far");
        icon.style.color = "";
      }
    }
  });

  // Card click functionality to navigate to car details (using event delegation)
  document.addEventListener("click", function (e) {
    const carCard = e.target.closest(".car-card");
    if (carCard && !e.target.closest(".heart-icon")) {
      const carId = carCard.getAttribute("data-car-id");
      if (carId) {
        // Navigate to car details page with car ID
        window.location.href = `../car-details/car-details.html?id=${carId}`;
      }
    }
  });
}

// Global function to simulate login (for testing - you can call this from browser console)
window.simulateLogin = simulateLogin;
