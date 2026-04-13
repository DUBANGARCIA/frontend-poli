/**
 * ModaStyle - Favorites Page
 */
(function () {
  'use strict';

  function fetchJSON(url) {
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error('Error cargando ' + url);
      return r.json();
    });
  }

  function cloneTemplate(id) {
    return document.getElementById(id).content.cloneNode(true);
  }

  function setText(f, sel, t) { var e = f.querySelector(sel); if (e) e.textContent = t; }
  function setAttr(f, sel, a, v) { var e = f.querySelector(sel); if (e) e.setAttribute(a, v); }

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

  function render() {
    var grid = document.getElementById('favorites-grid');
    var emptyState = document.getElementById('empty-state');
    var totalEl = document.getElementById('fav-total');
    if (!grid) return;

    fetchJSON('data/catalog.json').then(function (allProducts) {
      var favIds = Favorites.getAll();
      var favProducts = allProducts.filter(function (p) {
        return favIds.indexOf(p.id) !== -1;
      });

      if (totalEl) totalEl.textContent = favProducts.length;

      if (favProducts.length === 0) {
        grid.style.display = 'none';
        if (emptyState) emptyState.style.display = 'block';
        return;
      }

      grid.style.display = '';
      if (emptyState) emptyState.style.display = 'none';
      grid.textContent = '';
      var frag = document.createDocumentFragment();
      favProducts.forEach(function (p) { frag.appendChild(createProductCard(p)); });
      grid.appendChild(frag);
      Favorites.updateAllButtons();
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
    render();
    initMobileMenu();
    // Re-render when a heart is toggled on this page
    document.addEventListener('click', function (e) {
      if (e.target.closest('.product-card__heart')) {
        setTimeout(render, 50);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
