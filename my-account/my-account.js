// My Account Page JavaScript

// User data (in real app, this would come from backend/localStorage)
let userData = {
  name: "Ahmed Al Mansoori",
  firstName: "Ahmed Al",
  phone: "+971 55 234 4568",
  email: "Ahmed052@gmail.com",
  language: "english",
  password: "Ahmed123#@",
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
};

// Function to toggle password visibility
function togglePassword(inputId) {
  const passwordInput = document.getElementById(inputId);
  const passwordIcon = document.getElementById(inputId + "Icon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    passwordIcon.classList.remove("fa-eye");
    passwordIcon.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";
    passwordIcon.classList.remove("fa-eye-slash");
    passwordIcon.classList.add("fa-eye");
  }
}

// Function to change profile picture
function changeProfilePicture() {
  // Create file input element
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.style.display = "none";

  fileInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showNotification("File size should be less than 5MB", "error");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        showNotification("Please select a valid image file", "error");
        return;
      }

      // Create FileReader to preview image
      const reader = new FileReader();
      reader.onload = function (e) {
        const profileAvatar = document.getElementById("profileAvatar");
        profileAvatar.src = e.target.result;
        userData.avatar = e.target.result;
        showNotification("Profile picture updated successfully", "success");
      };
      reader.readAsDataURL(file);
    }
  });

  // Trigger file selection
  document.body.appendChild(fileInput);
  fileInput.click();
  document.body.removeChild(fileInput);
}

// Function to validate form data
function validateForm(formData) {
  const errors = [];

  // Name validation
  if (!formData.name || formData.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long");
  }

  // Phone validation
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  if (!formData.phone || !phoneRegex.test(formData.phone)) {
    errors.push("Please enter a valid phone number");
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    errors.push("Please enter a valid email address");
  }

  // Password validation
  if (formData.password && formData.password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  // Confirm password validation
  if (formData.password !== formData.confirmPassword) {
    errors.push("Passwords do not match");
  }

  return errors;
}

// Function to handle form submission
function handleFormSubmit(e) {
  e.preventDefault();

  // Get form data
  const formData = {
    name: document.getElementById("fullName").value.trim(),
    phone: document.getElementById("phoneNumber").value.trim(),
    email: document.getElementById("emailAddress").value.trim(),
    language: document.getElementById("language").value,
    password: document.getElementById("changePassword").value,
    confirmPassword: document.getElementById("confirmPassword").value,
  };

  // Validate form
  const errors = validateForm(formData);
  if (errors.length > 0) {
    showNotification(errors.join("<br>"), "error");
    return;
  }

  // Show loading state
  const saveBtn = document.querySelector(".save-btn");
  const originalText = saveBtn.innerHTML;
  saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
  saveBtn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    // Update user data
    userData = { ...userData, ...formData };

    // Update UI
    document.getElementById("userName").textContent =
      formData.name.split(" ")[0];

    // Reset button
    saveBtn.innerHTML = originalText;
    saveBtn.disabled = false;

    // Show success message
    showNotification("Account details updated successfully!", "success");

    // In real app, you would send data to backend here
    console.log("Updated user data:", userData);
  }, 1500);
}

// Function to show notifications
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(
    ".notification-toast"
  );
  existingNotifications.forEach((notification) => notification.remove());

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `alert alert-${
    type === "success" ? "success" : type === "error" ? "danger" : "info"
  } alert-dismissible fade show position-fixed notification-toast`;
  notification.style.cssText =
    "top: 20px; right: 20px; z-index: 9999; min-width: 300px; max-width: 400px;";
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

// Function to load user data into form
function loadUserData() {
  document.getElementById("fullName").value = userData.name;
  document.getElementById("phoneNumber").value = userData.phone;
  document.getElementById("emailAddress").value = userData.email;
  document.getElementById("language").value = userData.language;
  document.getElementById("changePassword").value = userData.password;
  document.getElementById("confirmPassword").value = userData.password;
  document.getElementById("userName").textContent = userData.firstName;
  document.getElementById("profileAvatar").src = userData.avatar;
}

// Initialize page when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Load user data into form
  loadUserData();

  // Add form submit handler
  const accountForm = document.getElementById("accountForm");
  if (accountForm) {
    accountForm.addEventListener("submit", handleFormSubmit);
  }

  // Add language change handler
  const languageSelect = document.getElementById("language");
  if (languageSelect) {
    languageSelect.addEventListener("change", function () {
      const language = this.value;
      const languageNames = {
        english: "English",
        arabic: "العربية",
        hindi: "हिन्दी",
        urdu: "اردو",
      };
      showNotification(
        `Language preference updated to ${languageNames[language]}`,
        "info"
      );
    });
  }
});

// Responsive sidebar for mobile
function handleMobileView() {
  const sidebar = document.querySelector(".sidebar-menu");
  if (sidebar) {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      sidebar.style.display = "flex";
      sidebar.style.overflowX = "auto";
    } else {
      sidebar.style.display = "block";
      sidebar.style.overflowX = "visible";
    }
  }
}

// Handle window resize
window.addEventListener("resize", handleMobileView);

// Initialize mobile view on load
document.addEventListener("DOMContentLoaded", handleMobileView);
