// My Packages Page JavaScript

// Package data
const packages = [
  {
    id: 'premium-365',
    title: 'Post more ads and auto boost',
    features: [
      'Post more ads and ads get boosted to the top every few days',
      'Package available for 365 days'
    ],
    boost: 'Post Ads & Auto boost every 5 days',
    reach: 'Reach up to 6 times more buyers',
    adsCount: 600,
    duration: 365,
    price: 6000,
    currency: 'AED'
  },
  {
    id: 'premium-180',
    title: 'Post more ads and auto boost',
    features: [
      'Post more ads and ads get boosted to the top every few days',
      'Package available for 180 days'
    ],
    boost: 'Post Ads & Auto boost every 5 days',
    reach: 'Reach up to 6 times more buyers',
    adsCount: 300,
    duration: 180,
    price: 3200,
    currency: 'AED'
  },
  {
    id: 'standard-180',
    title: 'Post more ads and auto boost',
    features: [
      'Post more ads and ads get boosted to the top every few days',
      'Package available for 180 days'
    ],
    boost: 'Post Ads & Auto boost every 5 days',
    reach: 'Reach up to 6 times more buyers',
    adsCount: 300,
    duration: 180,
    price: 3200,
    currency: 'AED'
  },
  {
    id: 'premium-365-alt',
    title: 'Post more ads and auto boost',
    features: [
      'Post more ads and ads get boosted to the top every few days',
      'Package available for 365 days'
    ],
    boost: 'Post Ads & Auto boost every 5 days',
    reach: 'Reach up to 6 times more buyers',
    adsCount: 600,
    duration: 365,
    price: 6000,
    currency: 'AED'
  }
];

// Function to handle package purchase
function buyPackage(packageId, price) {
  const packageData = packages.find(pkg => pkg.id === packageId);
  
  if (!packageData) {
    showNotification('Package not found', 'error');
    return;
  }

  // Show loading state
  const buyBtn = event.target;
  const originalText = buyBtn.innerHTML;
  buyBtn.classList.add('loading');
  buyBtn.disabled = true;

  // Simulate purchase process
  setTimeout(() => {
    // Reset button
    buyBtn.classList.remove('loading');
    buyBtn.disabled = false;
    buyBtn.innerHTML = originalText;

    // Show purchase confirmation
    showPurchaseModal(packageData);
    
    // Track purchase
    trackPackagePurchase(packageData);
  }, 2000);
}

// Function to show purchase confirmation modal
function showPurchaseModal(packageData) {
  const modal = document.createElement('div');
  modal.className = 'modal fade';
  modal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <i class="fas fa-check-circle text-success"></i>
            Purchase Confirmation
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body text-center">
          <div class="mb-3">
            <i class="fas fa-box text-primary mb-3" style="font-size: 48px;"></i>
            <h6>Package Selected</h6>
            <p class="text-muted">${packageData.title}</p>
          </div>
          <div class="package-details mb-3">
            <div class="row">
              <div class="col-6">
                <strong>Ads Count:</strong><br>
                <span class="text-primary">${packageData.adsCount} Ads</span>
              </div>
              <div class="col-6">
                <strong>Duration:</strong><br>
                <span class="text-primary">${packageData.duration} Days</span>
              </div>
            </div>
          </div>
          <div class="price-summary mb-3">
            <h5>Total: ${packageData.currency} ${packageData.price}</h5>
          </div>
          <p class="text-muted small">
            You will be redirected to the payment gateway to complete your purchase.
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-success" onclick="proceedToPayment('${packageData.id}')">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  const bsModal = new bootstrap.Modal(modal);
  bsModal.show();
  
  // Remove modal from DOM when hidden
  modal.addEventListener('hidden.bs.modal', function() {
    document.body.removeChild(modal);
  });
}

// Function to proceed to payment
function proceedToPayment(packageId) {
  // Close modal
  const modal = document.querySelector('.modal.show');
  if (modal) {
    bootstrap.Modal.getInstance(modal).hide();
  }
  
  // Show payment processing
  showNotification('Redirecting to payment gateway...', 'info');
  
  // In a real app, this would redirect to payment gateway
  setTimeout(() => {
    showNotification('Payment gateway integration coming soon!', 'info');
  }, 1500);
}

// Function to handle package filtering
function handlePackageFilters() {
  const form = document.getElementById('packageFilters');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const category = document.getElementById('categorySelect').value;
      const subCategory = document.getElementById('subCategorySelect').value;
      const location = document.getElementById('locationInput').value;
      
      // Show loading state
      const searchBtn = document.querySelector('.search-btn');
      const originalText = searchBtn.innerHTML;
      searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
      searchBtn.disabled = true;
      
      // Simulate search
      setTimeout(() => {
        // Reset button
        searchBtn.innerHTML = originalText;
        searchBtn.disabled = false;
        
        // Filter packages (in real app, this would be an API call)
        filterPackages({ category, subCategory, location });
        
        // Show results
        showNotification(`Found ${packages.length} packages for your criteria`, 'success');
      }, 1000);
    });
  }
}

// Function to filter packages
function filterPackages(filters) {
  console.log('Filtering packages with:', filters);
  
  // In a real app, this would filter the packages based on criteria
  // For now, we'll just show all packages
  
  // You could implement actual filtering logic here
  // const filteredPackages = packages.filter(pkg => {
  //   // Apply filters
  //   return true;
  // });
  
  // Update packages display
  // updatePackagesDisplay(filteredPackages);
}

// Function to track package purchase
function trackPackagePurchase(packageData) {
  console.log('Package purchase tracked:', packageData);
  
  // In a real app, send to analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', 'package_purchase_initiated', {
      'package_id': packageData.id,
      'package_price': packageData.price,
      'package_duration': packageData.duration,
      'ads_count': packageData.adsCount
    });
  }
}

// Function to show notifications
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification-toast');
  existingNotifications.forEach(notification => notification.remove());
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} alert-dismissible fade show position-fixed notification-toast`;
  notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px; max-width: 400px;';
  notification.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
}

// Function to handle responsive sidebar
function handleMobileView() {
  const sidebar = document.querySelector('.sidebar-menu');
  if (sidebar) {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      sidebar.style.display = 'flex';
      sidebar.style.overflowX = 'auto';
    } else {
      sidebar.style.display = 'block';
      sidebar.style.overflowX = 'visible';
    }
  }
}

// Function to handle category change
function handleCategoryChange() {
  const categorySelect = document.getElementById('categorySelect');
  const subCategorySelect = document.getElementById('subCategorySelect');
  
  if (categorySelect && subCategorySelect) {
    categorySelect.addEventListener('change', function() {
      const category = this.value;
      
      // Update subcategory options based on category
      const subCategories = {
        cars: ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible'],
        motorcycles: ['Sport', 'Cruiser', 'Touring', 'Off-road'],
        trucks: ['Pickup', 'Heavy Duty', 'Commercial'],
        boats: ['Sailboat', 'Motorboat', 'Yacht', 'Jet Ski']
      };
      
      // Clear existing options
      subCategorySelect.innerHTML = '<option value="">Select Sub Category</option>';
      
      // Add new options
      if (category && subCategories[category]) {
        subCategories[category].forEach(subCat => {
          const option = document.createElement('option');
          option.value = subCat.toLowerCase();
          option.textContent = subCat;
          subCategorySelect.appendChild(option);
        });
      }
    });
  }
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('My Packages page loaded');
  
  // Handle package filters
  handlePackageFilters();
  
  // Handle category changes
  handleCategoryChange();
  
  // Handle responsive design
  handleMobileView();
  
  // Show welcome message
  setTimeout(() => {
    showNotification('Select your category and location to see available packages', 'info');
  }, 1000);
});

// Handle window resize
window.addEventListener('resize', handleMobileView);

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    buyPackage,
    filterPackages,
    packages
  };
}
