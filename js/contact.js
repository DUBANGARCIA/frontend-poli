/**
 * ModaStyle - Contact Form with Validations
 */
(function () {
  'use strict';

  var rules = {
    name:    { required: true, minLength: 2 },
    email:   { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    phone:   { required: false, pattern: /^[\d\s\+\-\(\)]{7,20}$/ },
    subject: { required: true, minLength: 3 },
    message: { required: true, minLength: 10 }
  };

  function getField(name) { return document.getElementById(name); }
  function getError(name) { return document.getElementById(name + '-error'); }

  function showError(name) {
    var field = getField(name);
    var error = getError(name);
    if (field) field.classList.add('is-invalid');
    if (error) error.classList.add('is-visible');
  }

  function clearError(name) {
    var field = getField(name);
    var error = getError(name);
    if (field) field.classList.remove('is-invalid');
    if (error) error.classList.remove('is-visible');
  }

  function validateField(name) {
    var field = getField(name);
    if (!field) return true;
    var value = field.value.trim();
    var rule = rules[name];
    if (!rule) return true;

    if (rule.required && !value) { showError(name); return false; }
    if (!rule.required && !value) { clearError(name); return true; }
    if (rule.minLength && value.length < rule.minLength) { showError(name); return false; }
    if (rule.pattern && !rule.pattern.test(value)) { showError(name); return false; }

    clearError(name);
    return true;
  }

  function validateAll() {
    var valid = true;
    Object.keys(rules).forEach(function (name) {
      if (!validateField(name)) valid = false;
    });
    return valid;
  }

  function initForm() {
    var form = document.getElementById('contact-form');
    var success = document.getElementById('form-success');
    if (!form) return;

    // Real-time validation on blur
    Object.keys(rules).forEach(function (name) {
      var field = getField(name);
      if (!field) return;
      field.addEventListener('blur', function () { validateField(name); });
      field.addEventListener('input', function () {
        if (field.classList.contains('is-invalid')) validateField(name);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateAll()) return;

      // Simulate submission
      if (success) success.classList.add('is-visible');
      form.reset();
      Object.keys(rules).forEach(clearError);

      setTimeout(function () {
        if (success) success.classList.remove('is-visible');
      }, 5000);
    });
  }

  function initMobileMenu() {
    var toggle = document.getElementById('menu-toggle');
    var nav = document.getElementById('main-nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', function () { nav.classList.toggle('is-open'); });
  }

  function init() {
    Favorites.init();
    initForm();
    initMobileMenu();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
