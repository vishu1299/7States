// Post Car Ad JavaScript

let currentStep = 1;
const totalSteps = 5;

// Car data for dropdowns
const carData = {
  toyota: {
    models: [
      "Camry",
      "Corolla",
      "Land Cruiser",
      "Prado",
      "RAV4",
      "Hilux",
      "Yaris",
    ],
    variants: {
      Camry: ["2.5L SE", "2.5L XLE", "3.5L XSE"],
      Corolla: ["1.8L L", "1.8L LE", "1.8L XLE"],
      "Land Cruiser": ["4.0L GXR", "4.6L VXR", "5.7L VXR"],
      Prado: ["2.7L TXL", "4.0L VXR"],
      RAV4: ["2.5L LE", "2.5L XLE", "2.5L Limited"],
      Hilux: ["2.7L Single Cab", "2.7L Double Cab", "4.0L Double Cab"],
      Yaris: ["1.3L Sedan", "1.5L Hatchback"],
    },
  },
  honda: {
    models: ["Civic", "Accord", "CR-V", "Pilot", "HR-V", "Fit"],
    variants: {
      Civic: ["1.5L LX", "1.5L Sport", "2.0L Si"],
      Accord: ["1.5L LX", "1.5L Sport", "2.0L EX-L"],
      "CR-V": ["1.5L LX", "1.5L EX", "1.5L Touring"],
      Pilot: ["3.5L LX", "3.5L EX-L", "3.5L Elite"],
      "HR-V": ["1.8L LX", "1.8L EX", "1.8L EX-L"],
      Fit: ["1.5L LX", "1.5L Sport", "1.5L EX-L"],
    },
  },
  nissan: {
    models: ["Altima", "Sentra", "Patrol", "X-Trail", "Kicks", "Maxima"],
    variants: {
      Altima: ["2.5L S", "2.5L SV", "2.5L Platinum"],
      Sentra: ["1.6L S", "1.6L SV", "1.6L SR"],
      Patrol: ["4.0L SE", "5.6L Platinum", "5.6L NISMO"],
      "X-Trail": ["2.5L S", "2.5L SV", "2.5L SL"],
      Kicks: ["1.6L S", "1.6L SV", "1.6L SR"],
      Maxima: ["3.5L S", "3.5L SV", "3.5L Platinum"],
    },
  },
  mercedes: {
    models: ["C-Class", "E-Class", "S-Class", "GLC", "GLE", "A-Class"],
    variants: {
      "C-Class": ["C200", "C300", "C43 AMG"],
      "E-Class": ["E200", "E300", "E53 AMG"],
      "S-Class": ["S450", "S500", "S63 AMG"],
      GLC: ["GLC200", "GLC300", "GLC43 AMG"],
      GLE: ["GLE350", "GLE450", "GLE63 AMG"],
      "A-Class": ["A200", "A250", "A35 AMG"],
    },
  },
  bmw: {
    models: ["3 Series", "5 Series", "7 Series", "X3", "X5", "X7"],
    variants: {
      "3 Series": ["320i", "330i", "M340i"],
      "5 Series": ["520i", "530i", "M550i"],
      "7 Series": ["740i", "750i", "M760i"],
      X3: ["X3 sDrive30i", "X3 xDrive30i", "X3 M40i"],
      X5: ["X5 sDrive40i", "X5 xDrive40i", "X5 M50i"],
      X7: ["X7 xDrive40i", "X7 xDrive50i", "X7 M50i"],
    },
  },
  audi: {
    models: ["A3", "A4", "A6", "Q3", "Q5", "Q7"],
    variants: {
      A3: ["A3 35 TFSI", "A3 40 TFSI", "S3"],
      A4: ["A4 35 TFSI", "A4 40 TFSI", "S4"],
      A6: ["A6 45 TFSI", "A6 55 TFSI", "S6"],
      Q3: ["Q3 35 TFSI", "Q3 40 TFSI", "RS Q3"],
      Q5: ["Q5 45 TFSI", "Q5 55 TFSI", "SQ5"],
      Q7: ["Q7 45 TFSI", "Q7 55 TFSI", "SQ7"],
    },
  },
  lexus: {
    models: ["ES", "LS", "RX", "LX", "NX", "GX"],
    variants: {
      ES: ["ES250", "ES350", "ES300h"],
      LS: ["LS500", "LS500h"],
      RX: ["RX350", "RX450h", "RX350L"],
      LX: ["LX570", "LX600"],
      NX: ["NX200t", "NX300h"],
      GX: ["GX460", "GX470"],
    },
  },
  ford: {
    models: ["Mustang", "Explorer", "F-150", "Edge", "Escape", "Fusion"],
    variants: {
      Mustang: ["EcoBoost", "GT", "Shelby GT500"],
      Explorer: ["Base", "XLT", "Limited"],
      "F-150": ["Regular Cab", "SuperCab", "SuperCrew"],
      Edge: ["SE", "SEL", "Titanium"],
      Escape: ["S", "SE", "Titanium"],
      Fusion: ["S", "SE", "Titanium"],
    },
  },
  chevrolet: {
    models: ["Camaro", "Corvette", "Tahoe", "Suburban", "Equinox", "Malibu"],
    variants: {
      Camaro: ["1LT", "2LT", "SS"],
      Corvette: ["Stingray", "Z06", "ZR1"],
      Tahoe: ["LS", "LT", "Premier"],
      Suburban: ["LS", "LT", "Premier"],
      Equinox: ["L", "LS", "LT"],
      Malibu: ["L", "LS", "LT"],
    },
  },
  hyundai: {
    models: ["Elantra", "Sonata", "Tucson", "Santa Fe", "Accent", "Veloster"],
    variants: {
      Elantra: ["SE", "SEL", "Limited"],
      Sonata: ["SE", "SEL", "Limited"],
      Tucson: ["SE", "SEL", "Limited"],
      "Santa Fe": ["SE", "SEL", "Limited"],
      Accent: ["SE", "SEL"],
      Veloster: ["Base", "Turbo", "N"],
    },
  },
};

// Initialize the form
document.addEventListener("DOMContentLoaded", function () {
  initializeForm();
  populateYearDropdown();
  setupEventListeners();
});

function initializeForm() {
  showStep(1);
  updateStepperUI();
}

function populateYearDropdown() {
  const yearSelect = document.getElementById("year");
  const currentYear = new Date().getFullYear();

  for (let year = currentYear; year >= 1990; year--) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  }
}

function setupEventListeners() {
  // Make dropdown change handler
  const makeSelect = document.getElementById("make");
  const modelSelect = document.getElementById("model");
  const variantSelect = document.getElementById("variant");

  console.log("Setting up event listeners...");
  console.log("Make select:", makeSelect);
  console.log("Model select:", modelSelect);
  console.log("Variant select:", variantSelect);

  if (makeSelect) {
    makeSelect.addEventListener("change", function () {
      const make = this.value;
      console.log("Make selected:", make);

      // Clear model and variant dropdowns
      if (modelSelect) {
        modelSelect.innerHTML = '<option value="">Select</option>';
      }
      if (variantSelect) {
        variantSelect.innerHTML = '<option value="">Select</option>';
      }

      if (make && carData[make]) {
        console.log("Found models for", make, ":", carData[make].models);
        carData[make].models.forEach((model) => {
          const option = document.createElement("option");
          option.value = model.toLowerCase().replace(/\s+/g, "-");
          option.textContent = model;
          if (modelSelect) {
            modelSelect.appendChild(option);
          }
        });
      }
    });
  }

  // Model dropdown change handler
  if (modelSelect) {
    modelSelect.addEventListener("change", function () {
      const make = document.getElementById("make").value;
      const model = this.options[this.selectedIndex].text;
      console.log("Model selected:", model, "for make:", make);

      // Clear variant dropdown
      if (variantSelect) {
        variantSelect.innerHTML = '<option value="">Select</option>';
      }

      if (make && model && carData[make] && carData[make].variants[model]) {
        console.log(
          "Found variants for",
          model,
          ":",
          carData[make].variants[model]
        );
        carData[make].variants[model].forEach((variant) => {
          const option = document.createElement("option");
          option.value = variant.toLowerCase().replace(/\s+/g, "-");
          option.textContent = variant;
          if (variantSelect) {
            variantSelect.appendChild(option);
          }
        });
      }
    });
  }

  // Photo upload handlers
  setupPhotoEventListeners();

  // Custom feature input Enter key handler
  const customFeatureInput = document.getElementById("custom-feature");
  if (customFeatureInput) {
    customFeatureInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        addCustomFeature();
      }
    });
  }
}

function nextStep() {
  if (validateCurrentStep()) {
    if (currentStep < totalSteps) {
      currentStep++;
      showStep(currentStep);
      updateStepperUI();

      if (currentStep === 5) {
        populateReviewData();
      }
    }
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
    updateStepperUI();
  }
}

function showStep(step) {
  // Hide all step contents
  document.querySelectorAll(".step-content").forEach((content) => {
    content.classList.remove("active");
  });

  // Show current step content
  document.getElementById(`step-${step}`).classList.add("active");
}

function updateStepperUI() {
  document.querySelectorAll(".step").forEach((step, index) => {
    const stepNumber = index + 1;
    step.classList.remove("active", "completed");

    if (stepNumber === currentStep) {
      step.classList.add("active");
    } else if (stepNumber < currentStep) {
      step.classList.add("completed");
    }
  });
}

function validateCurrentStep() {
  const currentStepElement = document.getElementById(`step-${currentStep}`);
  const requiredFields = currentStepElement.querySelectorAll("[required]");
  let isValid = true;

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      field.classList.add("is-invalid");
      isValid = false;
    } else {
      field.classList.remove("is-invalid");
    }
  });

  if (!isValid) {
    alert("Please fill in all required fields before proceeding.");
  }

  return isValid;
}

function populateReviewData() {
  // Get form values
  const make =
    document.getElementById("make").options[
      document.getElementById("make").selectedIndex
    ].text;
  const model =
    document.getElementById("model").options[
      document.getElementById("model").selectedIndex
    ].text;
  const year = document.getElementById("year").value;
  const mileage = document.getElementById("mileage").value;
  const fuelType =
    document.getElementById("fuelType").options[
      document.getElementById("fuelType").selectedIndex
    ].text;
  const transmission =
    document.getElementById("transmission").options[
      document.getElementById("transmission").selectedIndex
    ].text;
  const price = document.getElementById("price").value;
  const location =
    document.getElementById("location").options[
      document.getElementById("location").selectedIndex
    ].text;
  const contactName = document.getElementById("contactName").value;
  const contactPhone = document.getElementById("contactPhone").value;
  const contactEmail = document.getElementById("contactEmail").value;

  // Populate review section
  document.getElementById("review-make-model").textContent = `${make} ${model}`;
  document.getElementById("review-year").textContent = year;
  document.getElementById("review-mileage").textContent = mileage;
  document.getElementById("review-fuel").textContent = fuelType;
  document.getElementById("review-transmission").textContent = transmission;
  document.getElementById("review-price").textContent = `AED ${parseInt(
    price
  ).toLocaleString()}`;
  document.getElementById("review-location").textContent = location;
  document.getElementById("review-contact-name").textContent = contactName;
  document.getElementById("review-contact-phone").textContent = contactPhone;
  document.getElementById("review-contact-email").textContent = contactEmail;
}

function addCustomFeature() {
  const input = document.getElementById("custom-feature");
  const featureText = input.value.trim();

  if (featureText) {
    const customFeaturesList = document.getElementById("custom-features-list");
    const featureTag = document.createElement("div");
    featureTag.className = "custom-feature-tag";
    featureTag.innerHTML = `
      ${featureText}
      <button type="button" class="custom-feature-remove" onclick="removeCustomFeature(this)">
        <i class="fas fa-times"></i>
      </button>
    `;

    customFeaturesList.appendChild(featureTag);
    input.value = "";
  }
}

function removeCustomFeature(button) {
  button.parentElement.remove();
}

// Photo management functions
let currentPhotoElement = null;
let currentPhotoId = null;

function showPhotoMenu(button, photoId) {
  const menu = document.getElementById("photo-context-menu");
  const rect = button.getBoundingClientRect();

  currentPhotoElement = button.closest(
    ".photo-upload-item, .cover-photo-upload"
  );
  currentPhotoId = photoId;

  menu.style.display = "block";
  menu.style.left = rect.left - 100 + "px";
  menu.style.top = rect.bottom + 5 + "px";

  // Close menu when clicking outside
  setTimeout(() => {
    document.addEventListener("click", closePhotoMenu);
  }, 100);
}

function closePhotoMenu() {
  const menu = document.getElementById("photo-context-menu");
  menu.style.display = "none";
  document.removeEventListener("click", closePhotoMenu);
}

function replacePhoto() {
  if (currentPhotoElement) {
    const input = currentPhotoElement.querySelector('input[type="file"]');
    if (input) {
      input.click();
    }
  }
  closePhotoMenu();
}

function setCoverPhoto() {
  if (currentPhotoElement && currentPhotoId !== "cover") {
    // Get the current photo data
    const currentImg = currentPhotoElement.querySelector("img");
    const coverPhotoElement = document.getElementById("cover-photo");
    const coverInput = document.getElementById("cover-photo-input");

    if (currentImg && coverPhotoElement) {
      // Move the image to cover photo
      const coverUploadArea = coverPhotoElement.querySelector(".upload-area");
      coverUploadArea.innerHTML = `<img src="${currentImg.src}" alt="Cover Photo" style="width: 100%; height: 100%; object-fit: cover;">`;

      // Show cover photo actions
      const coverActions = coverPhotoElement.querySelector(".photo-actions");
      if (coverActions) {
        coverActions.style.display = "block";
      }

      // Reset the original photo slot
      resetPhotoSlot(currentPhotoElement, currentPhotoId);
    }
  }
  closePhotoMenu();
}

function deletePhoto() {
  if (currentPhotoElement) {
    resetPhotoSlot(currentPhotoElement, currentPhotoId);
  }
  closePhotoMenu();
}

function resetPhotoSlot(element, photoId) {
  const uploadArea = element.querySelector(".upload-area");
  const actions = element.querySelector(".photo-actions");

  if (photoId === "cover") {
    uploadArea.innerHTML = `
      <i class="fas fa-camera"></i>
      <p>Click to upload cover photo</p>
    `;
  } else {
    uploadArea.innerHTML = `
      <i class="fas fa-camera"></i>
      <p>Add Photo</p>
    `;
  }

  if (actions) {
    actions.style.display = "none";
  }
}

function addPhotoSlot() {
  // Convert add photo slot to regular photo upload slot
  const addSlots = document.querySelectorAll(".add-photo-slot");
  if (addSlots.length > 0) {
    const slot = addSlots[0];
    const photosGrid = slot.parentElement;
    const photoIndex =
      photosGrid.querySelectorAll(".photo-upload-item").length + 1;

    slot.outerHTML = `
      <div class="photo-upload-item" data-photo-index="${photoIndex}">
        <div class="upload-area" onclick="document.getElementById('photo-${photoIndex}').click()">
          <i class="fas fa-camera"></i>
          <p>Add Photo</p>
        </div>
        <input type="file" id="photo-${photoIndex}" accept="image/*" style="display: none;" />
        <div class="photo-actions" style="display: none;">
          <button type="button" class="photo-menu-btn" onclick="showPhotoMenu(this, '${photoIndex}')">
            <i class="fas fa-ellipsis-h"></i>
          </button>
        </div>
      </div>
    `;

    // Re-setup event listeners for the new photo input
    setupPhotoEventListeners();
  }
}

function setupPhotoEventListeners() {
  const photoInputs = document.querySelectorAll('input[type="file"]');
  photoInputs.forEach((input) => {
    // Remove existing event listeners to avoid duplicates
    input.removeEventListener("change", handlePhotoUpload);
    input.addEventListener("change", handlePhotoUpload);
  });
}

function handlePhotoUpload(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const uploadArea = e.target.previousElementSibling;
      const photoActions = e.target.nextElementSibling;

      // Create image preview
      uploadArea.innerHTML = `
        <img src="${event.target.result}" alt="Uploaded Photo"
             style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
      `;

      // Show photo actions (3 dots menu)
      if (photoActions && photoActions.classList.contains("photo-actions")) {
        photoActions.style.display = "block";
      }
    };
    reader.readAsDataURL(file);
  }
}

function submitListing(event) {
  // Prevent any default form submission
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  console.log("Submit button clicked - showing modal");

  // Force stop any navigation
  window.onbeforeunload = function () {
    return "Are you sure you want to leave?";
  };

  // Show success modal with force
  const successModal = document.getElementById("success-modal");
  if (successModal) {
    successModal.style.display = "flex";
    successModal.style.position = "fixed";
    successModal.style.top = "0";
    successModal.style.left = "0";
    successModal.style.width = "100%";
    successModal.style.height = "100%";
    successModal.style.zIndex = "9999";
    console.log("Modal should be visible now");
  } else {
    console.error("Success modal not found!");
    alert(
      "Success modal not found! But your listing was submitted successfully!"
    );
  }

  // Hide the main form content
  const formContainer = document.querySelector(".form-container");
  if (formContainer) {
    formContainer.style.display = "none";
  }

  // Remove the beforeunload after 1 second
  setTimeout(() => {
    window.onbeforeunload = null;
  }, 1000);

  return false;
}

function goToStep(stepNumber) {
  // Navigate to specific step
  currentStep = stepNumber;
  showStep(currentStep);
}

function viewListing() {
  // Close modal and redirect to used cars page
  document.getElementById("success-modal").style.display = "none";
  window.location.href = "../used-cars/used-cars.html";
}

function boostListing() {
  // Close modal and show boost options
  document.getElementById("success-modal").style.display = "none";
  alert("Boost feature coming soon! Your listing is already live.");
  window.location.href = "../index.html";
}

// Add CSS for invalid fields
const style = document.createElement("style");
style.textContent = `
  .form-control.is-invalid,
  .form-select.is-invalid {
    border-color: #dc3545;
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
  }
`;
document.head.appendChild(style);

// Photo Menu Functions
function togglePhotoMenu(button) {
  const menu = button.nextElementSibling;
  const allMenus = document.querySelectorAll(".photo-menu");

  // Close all other menus
  allMenus.forEach((m) => {
    if (m !== menu) {
      m.style.display = "none";
    }
  });

  // Toggle current menu
  menu.style.display = menu.style.display === "none" ? "block" : "none";
}

function replacePhoto(photoId) {
  console.log("Replace photo:", photoId);
  // Trigger file input
  const fileInput =
    document.getElementById(`photo-${photoId}`) ||
    document.getElementById(`${photoId}-photo-input`);
  if (fileInput) {
    fileInput.click();
  }
  closeAllMenus();
}

function setCoverPhoto(photoId) {
  console.log("Set cover photo:", photoId);
  // Logic to set as cover photo
  alert(`Photo ${photoId} set as cover photo!`);
  closeAllMenus();
}

function deletePhoto(photoId) {
  console.log("Delete photo:", photoId);
  if (confirm("Are you sure you want to delete this photo?")) {
    const photoItem = document.querySelector(`[data-photo-index="${photoId}"]`);
    if (photoItem) {
      // Reset to empty state
      photoItem.classList.remove("uploaded");
      photoItem.classList.add("empty");
      photoItem.innerHTML = `
        <div class="upload-area" onclick="document.getElementById('photo-${photoId}').click()">
          <i class="fas fa-plus"></i>
        </div>
        <input type="file" id="photo-${photoId}" accept="image/*" style="display: none" />
      `;
    }
  }
  closeAllMenus();
}

function closeAllMenus() {
  const allMenus = document.querySelectorAll(".photo-menu");
  allMenus.forEach((menu) => {
    menu.style.display = "none";
  });
}

// Close menus when clicking outside
document.addEventListener("click", function (event) {
  if (!event.target.closest(".photo-menu-container")) {
    closeAllMenus();
  }
});
