// ==================================================================
// Wait for the DOM to fully load before executing code
// ==================================================================
document.addEventListener('DOMContentLoaded', function() {
  // ==================================================================
  // Theme Toggle Functionality
  // ==================================================================
  const themeToggleButton = document.getElementById('theme-toggle');
  const bodyElement = document.body;
  // Retrieve the saved theme from localStorage (default to 'light')
  const savedTheme = localStorage.getItem('theme') || 'light';
  // Set the body's data-theme attribute to the saved theme
  bodyElement.setAttribute('data-theme', savedTheme);
  // Update the toggle button text based on the current theme
  themeToggleButton.textContent = savedTheme === 'light' ? 'Dark' : 'Light';

  // Toggle theme on button click
  themeToggleButton.addEventListener('click', function(){
    const currentTheme = bodyElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
      bodyElement.setAttribute('data-theme', 'dark');
      themeToggleButton.textContent = 'Light';
      localStorage.setItem('theme', 'dark');
    } else {
      bodyElement.setAttribute('data-theme', 'light');
      themeToggleButton.textContent = 'Dark';
      localStorage.setItem('theme', 'light');
    }
  });
  // ==================================================================
  // Language Toggle Functionality
  // ==================================================================
  const languageToggleButton = document.getElementById('language-toggle');
  // Get the saved language or default to 'en'
  let currentLanguage = localStorage.getItem('language') || 'en';
  // Set the toggle button text (if language is English, show 'ES' to switch)
  languageToggleButton.textContent = currentLanguage === 'en' ? 'ES' : 'EN';
  // Set the document language attribute
  document.body.setAttribute('lang', currentLanguage);
  // Function to update text content and placeholders based on language
  function updateLanguage(){
    const translationElements = document.querySelectorAll('[data-en]');
    translationElements.forEach(function(element){
      // If language is English, use data-en; otherwise, data-es
      element.textContent = element.getAttribute(currentLanguage === 'en' ? 'data-en' : 'data-es');
    });
    const placeholderElements = document.querySelectorAll('[data-en-placeholder]');
    placeholderElements.forEach(function(element){
      element.placeholder = element.getAttribute(currentLanguage === 'en' ? 'data-en-placeholder' : 'data-es-placeholder');
    });
    const submitButtons = document.querySelectorAll('button[type="submit"]');
    submitButtons.forEach(function(button){
      button.textContent = button.getAttribute(currentLanguage === 'en' ? 'data-en' : 'data-es');
    });
  }
  // Initialize language translations
  updateLanguage();
  // Toggle language on button click
  languageToggleButton.addEventListener('click', function(){
    // Toggle between English and Spanish
    currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
    languageToggleButton.textContent = currentLanguage === 'en' ? 'ES' : 'EN';
    document.body.setAttribute('lang', currentLanguage);
    updateLanguage();
    localStorage.setItem('language', currentLanguage);
  });
  // ==================================================================
  // Modal Functionality
  // ==================================================================
  const modalOverlayElements = document.querySelectorAll('.modal-overlay');
  const closeModalButtons = document.querySelectorAll('[data-close]');
  const floatingIcons = document.querySelectorAll('.floating-icon');
  // Add event listeners for each floating icon (to open modals)
  floatingIcons.forEach(function(icon){
    icon.addEventListener('click', function(){
      const modalId = icon.getAttribute('data-modal');
      const modalElement = document.getElementById(modalId);
      if (modalElement) {
        modalElement.classList.add('active');
        modalElement.focus();
      }
    });
    // Allow opening modals using keyboard (Enter or Space)
    icon.addEventListener('keydown', function(event){
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
        event.preventDefault();
        const modalId = icon.getAttribute('data-modal');
        const modalElement = document.getElementById(modalId);
        if (modalElement) {
          modalElement.classList.add('active');
          modalElement.focus();
        }
      }
    });
  });
  // Add event listeners to close buttons within modals
  closeModalButtons.forEach(function(button){
    button.addEventListener('click', function(){
      const modalElement = button.closest('.modal-overlay');
      if (modalElement) {
        modalElement.classList.remove('active');
      }
    });
    // Allow closing modals using keyboard (Enter or Space)
    button.addEventListener('keydown', function(event){
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
        event.preventDefault();
        const modalElement = button.closest('.modal-overlay');
        if (modalElement) {
          modalElement.classList.remove('active');
        }
      }
    });
  });
  // Allow clicking outside the modal content or pressing Escape to close modals
  modalOverlayElements.forEach(function(overlay){
    overlay.addEventListener('click', function(event){
      if (event.target === overlay) {
        overlay.classList.remove('active');
      }
    });
    overlay.addEventListener('keydown', function(event){
      if (event.key === 'Escape') {
        overlay.classList.remove('active');
      }
    });
  });
  // ==================================================================
  // Register Service Worker for PWA Functionality
  // ==================================================================
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function(){
      navigator.serviceWorker.register('/service-worker.js')
        .then(function(registration){
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(function(error){
          console.error('Service Worker registration failed:', error);
        });
    });
  } else {
    console.log('Service workers are not supported in this browser.');
  }
});
// ==================================================================
// Mobile Services Menu Toggle (Separate DOMContentLoaded listener)
// ==================================================================
document.addEventListener("DOMContentLoaded", function() {
  var servicesToggle = document.getElementById("services-toggle");
  var mobileServicesMenu = document.getElementById("mobile-services-menu");
  // Toggle the 'active' class on the mobile services menu when clicking the Services button
  servicesToggle.addEventListener("click", function() {
    mobileServicesMenu.classList.toggle("active");
  });
});
