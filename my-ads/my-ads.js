// My Ads Page JavaScript

// Sample data for active ads
const activeAdsData = [
  {
    id: 1,
    title: "Audi A3 Sedan 2023",
    year: "2024",
    price: "AED 84,500",
    location: "Dubai",
    mileage: "4,000km",
    specs: ["2024", "Dubai", "4,000km"],
    image: "../images/productimages/image 19.png",
    status: "sold",
    postedDate: "24-Aug-2025",
  },
  {
    id: 2,
    title: "Audi Q3 Sportback",
    year: "2024",
    price: "AED 150,800",
    location: "Dubai",
    mileage: "12,000km",
    specs: ["2024", "Dubai", "12,000km"],
    image: "../images/productimages/image 19.png",
    status: "pending",
    postedDate: "22-Aug-2025",
  },
  {
    id: 3,
    title: "Audi Q5 Sportback",
    year: "2024",
    price: "AED 150,800",
    location: "Dubai",
    mileage: "12,000km",
    specs: ["2024", "Dubai", "12,000km"],
    image: "../images/productimages/image 19.png",
    status: "active",
    postedDate: "20-Aug-2025",
  },
];

// Sample data for expired ads
const expiredAdsData = [
  {
    id: 4,
    title: "Audi A3 Sedan 2023",
    year: "2024",
    price: "AED 84,500",
    location: "Dubai",
    mileage: "4,000km",
    specs: ["2024", "Dubai", "4,000km"],
    image: "../images/productimages/image 19.png",
    status: "expired",
    postedDate: "24-Aug-2025",
  },
  {
    id: 5,
    title: "Audi Q3 Sportback",
    year: "2024",
    price: "AED 150,800",
    location: "Dubai",
    mileage: "12,000km",
    specs: ["2024", "Dubai", "12,000km"],
    image: "../images/productimages/image 19.png",
    status: "expired",
    postedDate: "22-Aug-2025",
  },
  {
    id: 6,
    title: "Audi Q5 Sportback",
    year: "2024",
    price: "AED 150,800",
    location: "Dubai",
    mileage: "12,000km",
    specs: ["2024", "Dubai", "12,000km"],
    image: "../images/productimages/image 19.png",
    status: "expired",
    postedDate: "20-Aug-2025",
  },
];

// Function to create car card HTML
function createCarCard(car, isExpired = false) {
  const statusClass = `status-${car.status}`;
  const statusText = car.status.charAt(0).toUpperCase() + car.status.slice(1);
  const cardClass = isExpired ? "car-card expired-card" : "car-card";

  return `
    <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
      <div class="${cardClass}" data-car-id="${car.id}">
        <div class="status-badge ${statusClass}">${statusText}</div>
        <div class="action-menu">
          <button class="action-btn" onclick="showActionMenu(${car.id})">
            <i class="fas fa-ellipsis-h"></i>
          </button>
        </div>
        <img src="${car.image}" alt="${car.title}" class="car-image" onerror="this.src='../images/placeholder-car.jpg'">
        <div class="car-details">
          <h5 class="car-title">${car.title}</h5>
          <div class="car-year">${car.year}</div>
          <div class="car-price">${car.price}</div>
          <div class="car-specs">
            <div class="spec-item">
              <i class="fas fa-calendar"></i>
              <span>${car.specs[0]}</span>
            </div>
            <div class="spec-item">
              <i class="fas fa-map-marker-alt"></i>
              <span>${car.specs[1]}</span>
            </div>
            <div class="spec-item">
              <i class="fas fa-tachometer-alt"></i>
              <span>${car.specs[2]}</span>
            </div>
          </div>
          <div class="car-location">${car.location}</div>
          <div class="posted-date">Posted on ${car.postedDate}</div>
        </div>
      </div>
    </div>
  `;
}

// Function to render active ads
function renderActiveAds() {
  const activeAdsContainer = document.getElementById("active-ads");

  if (activeAdsData.length === 0) {
    activeAdsContainer.innerHTML = `
      <div class="col-12">
        <div class="empty-state">
          <i class="fas fa-car"></i>
          <h4>No Active Ads</h4>
          <p>You don't have any active car listings at the moment.</p>
          <button class="btn btn-primary" onclick="window.location.href='../post-car-ad/post-car-ad.html'">
            Post Your First Ad
          </button>
        </div>
      </div>
    `;
    return;
  }

  let html = "";
  activeAdsData.forEach((car) => {
    html += createCarCard(car, false);
  });

  activeAdsContainer.innerHTML = html;
}

// Function to render expired ads
function renderExpiredAds() {
  const expiredAdsContainer = document.getElementById("expired-ads");

  if (expiredAdsData.length === 0) {
    expiredAdsContainer.innerHTML = `
      <div class="col-12">
        <div class="empty-state">
          <i class="fas fa-clock"></i>
          <h4>No Expired Ads</h4>
          <p>You don't have any expired car listings.</p>
        </div>
      </div>
    `;
    return;
  }

  let html = "";
  expiredAdsData.forEach((car) => {
    html += createCarCard(car, true);
  });

  expiredAdsContainer.innerHTML = html;
}

// Function to show action menu
function showActionMenu(carId) {
  // Create a simple context menu or modal for actions
  const actions = [
    { label: "Edit Ad", action: () => editAd(carId) },
    { label: "View Details", action: () => viewAdDetails(carId) },
    { label: "Promote Ad", action: () => promoteAd(carId) },
    { label: "Delete Ad", action: () => deleteAd(carId) },
  ];

  // For now, just show an alert with options
  const actionText = actions
    .map((action, index) => `${index + 1}. ${action.label}`)
    .join("\n");
  const choice = prompt(
    `Choose an action for car ID ${carId}:\n${actionText}\n\nEnter number (1-4):`
  );

  if (choice && choice >= 1 && choice <= 4) {
    actions[choice - 1].action();
  }
}

// Action functions
function editAd(carId) {
  alert(`Edit ad functionality for car ID: ${carId}`);
  // Redirect to edit page or open edit modal
}

function viewAdDetails(carId) {
  alert(`View details for car ID: ${carId}`);
  // Redirect to car details page
  window.location.href = `../car-details/car-details.html?id=${carId}`;
}

function promoteAd(carId) {
  alert(`Promote ad functionality for car ID: ${carId}`);
  // Open promotion options
}

function deleteAd(carId) {
  if (confirm("Are you sure you want to delete this ad?")) {
    alert(`Delete ad functionality for car ID: ${carId}`);
    // Remove from data and re-render
  }
}

// Sidebar navigation functionality
function initializeSidebar() {
  const sidebarItems = document.querySelectorAll(".sidebar-item");

  sidebarItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all items
      sidebarItems.forEach((i) => i.classList.remove("active"));

      // Add active class to clicked item
      this.classList.add("active");

      // Handle navigation based on the clicked item
      const text = this.querySelector("span").textContent;
      handleSidebarNavigation(text);
    });
  });
}

// Handle sidebar navigation
function handleSidebarNavigation(section) {
  switch (section) {
    case "My Ads":
      // Already on My Ads page
      break;
    case "My Leads":
      window.location.href = "../my-leads/my-leads.html";
      break;
    case "Saved Listings":
      window.location.href = "../saved-listings/saved-listings.html";
      break;
    case "My Account":
      window.location.href = "../my-account/my-account.html";
      break;
    case "Statistics":
      window.location.href = "../statistics/statistics.html";
      break;
    case "My Packages":
      window.location.href = "../my-packages/my-packages.html";
      break;
  }
}

// Initialize page when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Render ads
  renderActiveAds();
  renderExpiredAds();

  // Initialize sidebar
  initializeSidebar();

  // Add click handlers for car cards
  document.addEventListener("click", function (e) {
    const carCard = e.target.closest(".car-card");
    if (carCard && !e.target.closest(".action-menu")) {
      const carId = carCard.getAttribute("data-car-id");
      viewAdDetails(carId);
    }
  });
});

// Responsive sidebar for mobile
function handleMobileView() {
  const sidebar = document.querySelector(".sidebar-menu");
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    sidebar.style.display = "flex";
    sidebar.style.overflowX = "auto";
  } else {
    sidebar.style.display = "block";
    sidebar.style.overflowX = "visible";
  }
}

// Handle window resize
window.addEventListener("resize", handleMobileView);

// Initialize mobile view on load
document.addEventListener("DOMContentLoaded", handleMobileView);
