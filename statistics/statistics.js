// Statistics Page JavaScript

// QR Code configuration
const QR_CONFIG = {
  size: '150x150',
  appUrl: 'https://7states.app',
  downloadUrl: 'https://play.google.com/store/apps/details?id=com.7states.app'
};

// Function to generate QR code URL
function generateQRCodeUrl(data, size = '150x150') {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${encodeURIComponent(data)}`;
}

// Function to handle QR code loading
function initializeQRCode() {
  const qrCodeImg = document.querySelector('.qr-code');
  const qrContainer = document.querySelector('.qr-code-container');
  
  if (qrCodeImg && qrContainer) {
    // Add loading state
    qrContainer.classList.add('loading');
    
    // Set QR code source
    const qrUrl = generateQRCodeUrl(QR_CONFIG.appUrl, QR_CONFIG.size);
    qrCodeImg.src = qrUrl;
    
    // Handle load event
    qrCodeImg.addEventListener('load', function() {
      qrContainer.classList.remove('loading');
      console.log('QR code loaded successfully');
    });
    
    // Handle error event
    qrCodeImg.addEventListener('error', function() {
      qrContainer.classList.remove('loading');
      console.error('Failed to load QR code');
      
      // Fallback: show text instead of QR code
      qrCodeImg.style.display = 'none';
      const fallbackText = document.createElement('div');
      fallbackText.className = 'qr-fallback';
      fallbackText.innerHTML = `
        <p style="text-align: center; padding: 20px; border: 2px dashed #ddd; border-radius: 8px; color: #666;">
          <i class="fas fa-mobile-alt" style="font-size: 24px; margin-bottom: 10px; display: block;"></i>
          Visit: 7states.app
        </p>
      `;
      qrContainer.appendChild(fallbackText);
    });
  }
}

// Function to handle app download tracking
function trackAppDownload(source) {
  // In a real app, this would send analytics data
  console.log(`App download initiated from: ${source}`);
  
  // You could send this to Google Analytics, Facebook Pixel, etc.
  if (typeof gtag !== 'undefined') {
    gtag('event', 'app_download_initiated', {
      'source': source,
      'page': 'statistics'
    });
  }
}

// Function to handle QR code click
function handleQRCodeClick() {
  const qrCode = document.querySelector('.qr-code');
  
  if (qrCode) {
    qrCode.addEventListener('click', function() {
      trackAppDownload('qr_code_click');
      
      // On mobile, try to open app store directly
      if (isMobileDevice()) {
        window.open(QR_CONFIG.downloadUrl, '_blank');
      } else {
        // On desktop, show instructions
        showQRInstructions();
      }
    });
  }
}

// Function to detect mobile device
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Function to show QR instructions modal
function showQRInstructions() {
  const modal = document.createElement('div');
  modal.className = 'modal fade';
  modal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Download 7 States App</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body text-center">
          <i class="fas fa-mobile-alt text-primary mb-3" style="font-size: 48px;"></i>
          <h6>Scan with your mobile device</h6>
          <p class="text-muted">Use your phone's camera to scan the QR code and download the 7 States app.</p>
          <div class="mt-3">
            <a href="${QR_CONFIG.downloadUrl}" target="_blank" class="btn btn-primary">
              <i class="fab fa-google-play"></i> Open Play Store
            </a>
          </div>
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

// Function to show notification
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

// Function to handle sidebar navigation
function handleSidebarNavigation() {
  const sidebarItems = document.querySelectorAll('.sidebar-item:not(.active)');
  
  sidebarItems.forEach(item => {
    item.addEventListener('click', function() {
      const span = this.querySelector('span');
      if (span) {
        const page = span.textContent.trim();
        console.log(`Navigating to: ${page}`);
        
        // Track navigation
        if (typeof gtag !== 'undefined') {
          gtag('event', 'sidebar_navigation', {
            'destination': page,
            'source': 'statistics_page'
          });
        }
      }
    });
  });
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Statistics page loaded');
  
  // Initialize QR code
  initializeQRCode();
  
  // Handle QR code interactions
  handleQRCodeClick();
  
  // Handle responsive design
  handleMobileView();
  
  // Handle sidebar navigation
  handleSidebarNavigation();
  
  // Show welcome message for mobile users
  if (isMobileDevice()) {
    setTimeout(() => {
      showNotification('Tap the QR code to download the app directly!', 'info');
    }, 2000);
  }
});

// Handle window resize
window.addEventListener('resize', handleMobileView);

// Handle page visibility change (for analytics)
document.addEventListener('visibilitychange', function() {
  if (document.visibilityState === 'visible') {
    console.log('Statistics page became visible');
  } else {
    console.log('Statistics page became hidden');
  }
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateQRCodeUrl,
    isMobileDevice,
    trackAppDownload
  };
}
