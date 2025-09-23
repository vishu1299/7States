// My Leads Page JavaScript

// Sample data for leads
const leadsData = [
  {
    id: 1,
    name: "Ahmed Al Mansoori",
    phoneNumber: "+971 55 234 6789",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    interestedCar: "2021 Toyota Land Cruiser VXR",
    leadDate: "14 Sept 2025",
  },
  {
    id: 2,
    name: "Mohamed Khalid",
    phoneNumber: "+971 55 234 6789",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    interestedCar: "2020 Nissan Patrol Platinum",
    leadDate: "14 Sept 2025",
  },
  {
    id: 3,
    name: "Ramesh Gupta",
    phoneNumber: "+971 55 234 6789",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    interestedCar: "2019 BMW X5 xDrive40i",
    leadDate: "14 Sept 2025",
  },
  {
    id: 4,
    name: "Fatima Noor",
    phoneNumber: "+971 55 234 6789",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    interestedCar: "2022 Hyundai Tucson GLS",
    leadDate: "14 Sept 2025",
  },
];

// Function to create lead card HTML
function createLeadCard(lead) {
  return `
    <div class="col-lg-6 col-md-12 mb-4">
      <div class="lead-card" data-lead-id="${lead.id}">
        <div class="lead-header">
          <div class="lead-profile">
            <img src="${lead.avatar}" alt="${
    lead.name
  }" class="profile-avatar" onerror="this.src='https://via.placeholder.com/50x50/cccccc/666666?text=${lead.name.charAt(
    0
  )}'">
            <div class="profile-info">
              <h5>${lead.name}</h5>
              <p class="phone-number">${lead.phoneNumber}</p>
            </div>
          </div>
          <button class="call-btn" onclick="makeCall('${lead.phoneNumber}', '${
    lead.name
  }')">
            <i class="fas fa-phone"></i>
            Call
          </button>
        </div>
        
        <div class="lead-details">
          <div class="detail-item">
            <span class="detail-label">Phone Number</span>
            <span class="detail-value">${lead.phoneNumber}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Interested Car</span>
            <span class="detail-value">${lead.interestedCar}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Lead Date</span>
            <span class="detail-value">${lead.leadDate}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Function to render leads
function renderLeads() {
  const leadsContainer = document.getElementById("leads-container");

  if (leadsData.length === 0) {
    leadsContainer.innerHTML = `
      <div class="col-12">
        <div class="empty-state">
          <i class="fas fa-users"></i>
          <h4>No Leads Yet</h4>
          <p>You don't have any leads for your car listings at the moment.</p>
          <button class="btn btn-primary" onclick="window.location.href='../post-car-ad/post-car-ad.html'">
            Post Your First Ad
          </button>
        </div>
      </div>
    `;
    return;
  }

  let html = "";
  leadsData.forEach((lead) => {
    html += createLeadCard(lead);
  });

  leadsContainer.innerHTML = html;
}

// Function to handle phone calls
function makeCall(phoneNumber, name) {
  // Check if device supports tel: links
  if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
    // Mobile device - initiate call
    window.location.href = `tel:${phoneNumber}`;
  } else {
    // Desktop - show call options
    const options = [
      `Call ${name} at ${phoneNumber}`,
      "Copy phone number to clipboard",
      "Send WhatsApp message",
      "Cancel",
    ];

    const choice = prompt(
      `Choose an action:\n${options
        .map((opt, i) => `${i + 1}. ${opt}`)
        .join("\n")}\n\nEnter number (1-4):`
    );

    switch (choice) {
      case "1":
        // Try to initiate call anyway
        window.location.href = `tel:${phoneNumber}`;
        break;
      case "2":
        // Copy to clipboard
        copyToClipboard(phoneNumber);
        alert(`Phone number ${phoneNumber} copied to clipboard!`);
        break;
      case "3":
        // Open WhatsApp
        const whatsappUrl = `https://wa.me/${phoneNumber.replace(
          /[^0-9]/g,
          ""
        )}?text=Hi ${name}, I saw your interest in my car listing on 7 States. Let's discuss!`;
        window.open(whatsappUrl, "_blank");
        break;
      case "4":
      default:
        // Cancel - do nothing
        break;
    }
  }
}

// Function to copy text to clipboard
function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    // Use modern clipboard API
    navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
  }
}

// Sidebar navigation functionality
function initializeSidebar() {
  const sidebarItems = document.querySelectorAll(".sidebar-item");

  sidebarItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Don't change active state if it's a navigation item
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
      // Already on My Leads page
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

// Function to filter leads (for future enhancement)
function filterLeads(filterType) {
  // This can be enhanced to filter leads by date, car type, etc.
  console.log("Filter leads by:", filterType);
}

// Function to search leads (for future enhancement)
function searchLeads(searchTerm) {
  const filteredLeads = leadsData.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.interestedCar.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phoneNumber.includes(searchTerm)
  );

  // Re-render with filtered results
  renderFilteredLeads(filteredLeads);
}

// Function to render filtered leads
function renderFilteredLeads(leads) {
  const leadsContainer = document.getElementById("leads-container");

  if (leads.length === 0) {
    leadsContainer.innerHTML = `
      <div class="col-12">
        <div class="empty-state">
          <i class="fas fa-search"></i>
          <h4>No Matching Leads</h4>
          <p>No leads match your search criteria.</p>
          <button class="btn btn-secondary" onclick="renderLeads()">
            Show All Leads
          </button>
        </div>
      </div>
    `;
    return;
  }

  let html = "";
  leads.forEach((lead) => {
    html += createLeadCard(lead);
  });

  leadsContainer.innerHTML = html;
}

// Initialize page when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Render leads
  renderLeads();

  // Initialize sidebar
  initializeSidebar();

  // Add click handlers for lead cards
  document.addEventListener("click", function (e) {
    const leadCard = e.target.closest(".lead-card");
    if (leadCard && !e.target.closest(".call-btn")) {
      const leadId = leadCard.getAttribute("data-lead-id");
      showLeadDetails(leadId);
    }
  });
});

// Function to show lead details (for future enhancement)
function showLeadDetails(leadId) {
  const lead = leadsData.find((l) => l.id == leadId);
  if (lead) {
    alert(
      `Lead Details:\nName: ${lead.name}\nPhone: ${lead.phoneNumber}\nInterested in: ${lead.interestedCar}\nLead Date: ${lead.leadDate}`
    );
  }
}

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
