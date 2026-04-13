/**
 * ModaStyle - Catálogo
 * Filtros, búsqueda y ordenamiento
 */

(function () {
  'use strict';

  var allProducts = [];

  // ===== Data =====

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

  // ===== Render =====

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

  function renderProducts(products) {
    var grid = document.getElementById('catalog-grid');
    if (!grid) return;
    grid.textContent = '';
    var frag = document.createDocumentFragment();
    products.forEach(function (p) {
      frag.appendChild(createProductCard(p));
    });
    grid.appendChild(frag);

    var showingEl = document.getElementById('showing-count');
    if (showingEl) showingEl.textContent = products.length;
  }

  // ===== Filters =====

  function getFilteredProducts() {
    var search = (document.getElementById('search-input').value || '').toLowerCase();
    var category = document.getElementById('category-filter').value;
    var sort = document.getElementById('sort-filter').value;

    var filtered = allProducts.filter(function (p) {
      var matchSearch = !search ||
        p.name.toLowerCase().indexOf(search) !== -1 ||
        p.description.toLowerCase().indexOf(search) !== -1 ||
        p.category.toLowerCase().indexOf(search) !== -1;
      var matchCategory = !category || p.category === category;
      return matchSearch && matchCategory;
    });

    filtered.sort(function (a, b) {
      switch (sort) {
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        default: return 0;
      }
    });

    return filtered;
  }

  function applyFilters() {
    renderProducts(getFilteredProducts());
  }

  function populateCategories(products) {
    var select = document.getElementById('category-filter');
    if (!select) return;
    var categories = [];
    products.forEach(function (p) {
      if (categories.indexOf(p.category) === -1) {
        categories.push(p.category);
      }
    });
    categories.sort();
    categories.forEach(function (cat) {
      var option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      select.appendChild(option);
    });
  }

  // ===== Events =====

  function initFilters() {
    var searchInput = document.getElementById('search-input');
    var categoryFilter = document.getElementById('category-filter');
    var sortFilter = document.getElementById('sort-filter');

    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
    if (sortFilter) sortFilter.addEventListener('change', applyFilters);
  }

  function initFavorites() {
    document.addEventListener('click', function (e) {
      var heartBtn = e.target.closest('.product-card__heart');
      if (!heartBtn) return;
      e.preventDefault();
      heartBtn.classList.toggle('is-active');
    });
  }

  function initMobileMenu() {
    var toggle = document.getElementById('menu-toggle');
    var nav = document.getElementById('main-nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', function () {
      nav.classList.toggle('is-open');
    });
  }

  // ===== Init =====

  function init() {
    fetchJSON('data/catalog.json').then(function (products) {
      allProducts = products;
      var totalEl = document.getElementById('total-count');
      if (totalEl) totalEl.textContent = products.length;
      populateCategories(products);
      renderProducts(products);
    }).catch(function (err) {
      console.error('Error cargando catálogo:', err);
    });

    initFilters();
    initFavorites();
    initMobileMenu();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
