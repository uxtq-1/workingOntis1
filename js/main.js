document.addEventListener('DOMContentLoaded', function() {
  // Desktop toggles
  var desktopLangToggle = document.getElementById('desktop-language-toggle');
  var desktopThemeToggle = document.getElementById('desktop-theme-toggle');

  if (desktopLangToggle) {
    desktopLangToggle.addEventListener('click', toggleLanguage);
  }
  if (desktopThemeToggle) {
    desktopThemeToggle.addEventListener('click', toggleTheme);
  }

  // Mobile toggles and buttons
  var mobileLangToggle = document.getElementById('mobile-language-toggle');
  var mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  var mobileChatToggle = document.getElementById('mobile-chat-toggle');
  var servicesToggle = document.getElementById('services-toggle');

  if (mobileLangToggle) {
    mobileLangToggle.addEventListener('click', toggleLanguage);
  }
  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', toggleTheme);
  }
  if (mobileChatToggle) {
    mobileChatToggle.addEventListener('click', function() {
      openModal('chat-modal');
    });
  }
  if (servicesToggle) {
    servicesToggle.addEventListener('click', function() {
      var menu = document.getElementById('mobile-services-menu');
      if (menu) {
        menu.classList.toggle('active');
      }
    });
  }

  // Modal close functionality
  var closeButtons = document.querySelectorAll('.close-modal');
  closeButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var modal = this.closest('.modal-overlay');
      if (modal) {
        modal.classList.remove('active');
      }
    });
  });

  // Dummy functions for language and theme toggling
  function toggleLanguage() {
    // Iterate through elements with data attributes and toggle text content
    var elements = document.querySelectorAll('[data-en]');
    elements.forEach(function(el) {
      if (el.innerText.trim() === el.getAttribute('data-en')) {
        el.innerText = el.getAttribute('data-es');
      } else {
        el.innerText = el.getAttribute('data-en');
      }
    });
    console.log("Language toggled");
  }

  function toggleTheme() {
    if (document.body.getAttribute('data-theme') === 'dark') {
      document.body.removeAttribute('data-theme');
    } else {
      document.body.setAttribute('data-theme', 'dark');
    }
    console.log("Theme toggled");
  }

  function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
    }
  }
});
