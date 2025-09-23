// Saved Listings Page JavaScript

// Sample data for saved listings
const savedListingsData = [
  {
    id: 1,
    title: "Audi A3 Sedan 2023",
    year: "2024",
    price: "AED 84,500",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&h=200&fit=crop",
    specs: {
      year: "2024",
      location: "Dubai",
      mileage: "4,000km",
    },
    savedDate: "12 September 2025",
  },
  {
    id: 2,
    title: "Audi A3 Sedan 2023",
    year: "2024",
    price: "AED 84,500",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&h=200&fit=crop",
    specs: {
      year: "2024",
      location: "Dubai",
      mileage: "4,000km",
    },
    savedDate: "12 September 2025",
  },
  {
    id: 3,
    title: "Audi A3 Sedan 2023",
    year: "2024",
    price: "AED 84,500",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&h=200&fit=crop",
    specs: {
      year: "2024",
      location: "Dubai",
      mileage: "4,000km",
    },
    savedDate: "12 September 2025",
  },
  {
    id: 4,
    title: "Audi A3 Sedan 2023",
    year: "2024",
    price: "AED 84,500",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&h=200&fit=crop",
    specs: {
      year: "2024",
      location: "Dubai",
      mileage: "4,000km",
    },
    savedDate: "12 September 2025",
  },
];

// Function to create saved listing card HTML
function createSavedListingCard(listing) {
  return `
    <div class="saved-listing-card" data-listing-id="${listing.id}">
      <img src="${listing.image}" alt="${listing.title}" class="car-image" onerror="this.src='https://via.placeholder.com/300x200/cccccc/666666?text=Car+Image'">
      
      <div class="car-details">
        <h3 class="car-title">${listing.title}</h3>
        <p class="car-year">${listing.year}</p>
        <p class="car-price">${listing.price}</p>
        
        <div class="car-specs">
          <div class="spec-item">
            <i class="fas fa-calendar"></i>
            <span>${listing.specs.year}</span>
          </div>
          <div class="spec-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>${listing.specs.location}</span>
          </div>
          <div class="spec-item">
            <i class="fas fa-tachometer-alt"></i>
            <span>${listing.specs.mileage}</span>
          </div>
        </div>
        
        <div class="saved-date">
          Saved on: ${listing.savedDate}
        </div>
      </div>
      
      <div class="action-buttons">
        <a href="../car-details/car-details.html" class="view-details-btn">
          <i class="fas fa-eye"></i>
          View Details
        </a>
        <button class="remove-btn" onclick="removeSavedListing(${listing.id})">
          <i class="fas fa-trash"></i>
          Remove
        </button>
      </div>
    </div>
  `;
}

// Function to render saved listings
function renderSavedListings() {
  const savedListingsContainer = document.getElementById(
    "saved-listings-container"
  );

  if (savedListingsData.length === 0) {
    savedListingsContainer.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-heart"></i>
        <h4>No Saved Listings</h4>
        <p>You haven't saved any car listings yet. Browse cars and save your favorites!</p>
        <button class="btn btn-primary" onclick="window.location.href='../used-cars/used-cars.html'">
          Browse Cars
        </button>
      </div>
    `;
    return;
  }

  let html = "";
  savedListingsData.forEach((listing) => {
    html += createSavedListingCard(listing);
  });

  savedListingsContainer.innerHTML = html;
}

// Function to remove a saved listing
function removeSavedListing(listingId) {
  const listing = savedListingsData.find((l) => l.id === listingId);
  if (!listing) return;

  // Show confirmation dialog
  const confirmed = confirm(
    `Are you sure you want to remove "${listing.title}" from your saved listings?`
  );

  if (confirmed) {
    // Remove from data array
    const index = savedListingsData.findIndex((l) => l.id === listingId);
    if (index > -1) {
      savedListingsData.splice(index, 1);
    }

    // Re-render the listings
    renderSavedListings();

    // Show success message
    showNotification("Listing removed from saved items", "success");
  }
}

// Function to show notifications
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `alert alert-${
    type === "success" ? "success" : "info"
  } alert-dismissible fade show position-fixed`;
  notification.style.cssText =
    "top: 20px; right: 20px; z-index: 9999; min-width: 300px;";
  notification.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;

  // Add to page
  document.body.appendChild(notification);

  // Auto remove after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 3000);
}

// Sidebar navigation functionality
function initializeSidebar() {
  const sidebarItems = document.querySelectorAll(".sidebar-item");

  sidebarItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Don't change active state if it's a navigation item with onclick
      if (this.onclick) return;

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
      window.location.href = "../my-ads/my-ads.html";
      break;
    case "My Leads":
      window.location.href = "../my-leads/my-leads.html";
      break;
    case "Saved Listings":
      // Already on Saved Listings page
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

// Function to filter saved listings (for future enhancement)
function filterSavedListings(filterType) {
  // This can be enhanced to filter by price, brand, etc.
  console.log("Filter saved listings by:", filterType);
}

// Function to search saved listings (for future enhancement)
function searchSavedListings(searchTerm) {
  const filteredListings = savedListingsData.filter(
    (listing) =>
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.year.includes(searchTerm) ||
      listing.specs.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Re-render with filtered results
  renderFilteredSavedListings(filteredListings);
}

// Function to render filtered saved listings
function renderFilteredSavedListings(listings) {
  const savedListingsContainer = document.getElementById(
    "saved-listings-container"
  );

  if (listings.length === 0) {
    savedListingsContainer.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-search"></i>
        <h4>No Matching Listings</h4>
        <p>No saved listings match your search criteria.</p>
        <button class="btn btn-secondary" onclick="renderSavedListings()">
          Show All Saved Listings
        </button>
      </div>
    `;
    return;
  }

  let html = "";
  listings.forEach((listing) => {
    html += createSavedListingCard(listing);
  });

  savedListingsContainer.innerHTML = html;
}

// Function to view listing details
function viewListingDetails(listingId) {
  // Navigate to car details page with listing ID
  window.location.href = `../car-details/car-details.html?id=${listingId}`;
}

// Function to add listing to saved (for integration with other pages)
function addToSavedListings(listingData) {
  // Check if already saved
  const existingListing = savedListingsData.find(
    (l) => l.id === listingData.id
  );
  if (existingListing) {
    showNotification("This listing is already in your saved items", "info");
    return;
  }

  // Add to saved listings
  savedListingsData.push({
    ...listingData,
    savedDate: new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  });

  // Re-render if on saved listings page
  if (document.getElementById("saved-listings-container")) {
    renderSavedListings();
  }

  showNotification("Listing added to saved items", "success");
}

// Initialize page when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Render saved listings
  renderSavedListings();

  // Initialize sidebar
  initializeSidebar();

  // Add click handlers for listing cards (excluding buttons)
  document.addEventListener("click", function (e) {
    const listingCard = e.target.closest(".saved-listing-card");
    if (listingCard && !e.target.closest(".action-buttons")) {
      const listingId = listingCard.getAttribute("data-listing-id");
      viewListingDetails(listingId);
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

// Export functions for use in other pages
window.savedListingsManager = {
  addToSavedListings,
  removeSavedListing,
  getSavedListings: () => savedListingsData,
};
