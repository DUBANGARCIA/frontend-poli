/**
 * ModaStyle - App principal
 * Vanilla JS sin frameworks
 * Usa <template> + cloneNode para evitar innerHTML
 */

(function () {
  'use strict';

  // ===== Data Fetching =====

  function fetchJSON(url) {
    return fetch(url).then(function (res) {
      if (!res.ok) throw new Error('Error cargando ' + url);
      return res.json();
    });
  }

  // ===== Template Helpers =====

  function cloneTemplate(id) {
    var tpl = document.getElementById(id);
    return tpl.content.cloneNode(true);
  }

  function setText(fragment, selector, text) {
    var el = fragment.querySelector(selector);
    if (el) el.textContent = text;
  }

  function setAttr(fragment, selector, attr, value) {
    var el = fragment.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  }

  // ===== Render Functions =====

  function createProductCard(product) {
    var fragment = cloneTemplate('tpl-product-card');

    setAttr(fragment, '[data-field="image"]', 'src', product.image);
    setAttr(fragment, '[data-field="image"]', 'alt', product.name);
    setAttr(fragment, '.product-card__heart', 'data-id', product.id);
    setText(fragment, '[data-field="category"]', product.category);
    setText(fragment, '[data-field="name"]', product.name);
    setText(fragment, '[data-field="description"]', product.description);
    setText(fragment, '[data-field="price"]', '$' + product.price.toFixed(2));
    setText(fragment, '[data-field="stock"]', 'Stock: ' + product.stock);

    if (!product.featured) {
      var badge = fragment.querySelector('[data-field="badge"]');
      if (badge) badge.remove();
    }

    return fragment;
  }

  function createTestimonialCard(testimonial) {
    var fragment = cloneTemplate('tpl-testimonial-card');

    setText(fragment, '[data-field="text"]', '\u201C' + testimonial.text + '\u201D');
    setText(fragment, '[data-field="author"]', testimonial.author);
    setAttr(fragment, '.testimonial-card__stars img', 'alt', testimonial.stars + ' estrellas');

    return fragment;
  }

  function renderProducts(products) {
    var grid = document.getElementById('products-grid');
    if (!grid) return;
    var frag = document.createDocumentFragment();
    products.forEach(function (product) {
      frag.appendChild(createProductCard(product));
    });
    grid.appendChild(frag);
  }

  function renderTestimonials(testimonials) {
    var grid = document.getElementById('testimonials-grid');
    if (!grid) return;
    var frag = document.createDocumentFragment();
    testimonials.forEach(function (testimonial) {
      frag.appendChild(createTestimonialCard(testimonial));
    });
    grid.appendChild(frag);
  }

  // ===== Event Handlers =====

  function initMobileMenu() {
    var toggle = document.getElementById('menu-toggle');
    var nav = document.getElementById('main-nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', function () {
      nav.classList.toggle('is-open');
    });
  }

  function initFavorites() {
    document.addEventListener('click', function (e) {
      var heartBtn = e.target.closest('.product-card__heart');
      if (!heartBtn) return;
      e.preventDefault();
      heartBtn.classList.toggle('is-active');
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // ===== Init =====

  function init() {
    Promise.all([
      fetchJSON('data/products.json'),
      fetchJSON('data/testimonials.json')
    ]).then(function (results) {
      renderProducts(results[0]);
      renderTestimonials(results[1]);
    }).catch(function (err) {
      console.error('Error cargando datos:', err);
    });

    initMobileMenu();
    initFavorites();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
