/**
 * ModaStyle - Product Detail
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

  function renderImage(product) {
    var container = document.getElementById('product-image');
    if (!container) return;
    var img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    img.loading = 'lazy';
    container.appendChild(img);
  }

  function renderBadges(container, items, cls) {
    items.forEach(function (text) {
      var span = document.createElement('span');
      span.className = cls;
      span.textContent = text;
      container.appendChild(span);
    });
  }

  function renderSizes(container, sizes) {
    sizes.forEach(function (size) {
      var btn = document.createElement('button');
      btn.className = 'size-btn';
      btn.textContent = size;
      btn.addEventListener('click', function () {
        container.querySelectorAll('.size-btn').forEach(function (b) { b.classList.remove('is-selected'); });
        btn.classList.add('is-selected');
      });
      container.appendChild(btn);
    });
  }

  function renderBenefits(container, benefits) {
    benefits.forEach(function (b) {
      var frag = cloneTemplate('tpl-benefit-item');
      setAttr(frag, '[data-field="benefit-icon"]', 'src', b.icon);
      setText(frag, '[data-field="benefit-title"]', b.title);
      setText(frag, '[data-field="benefit-desc"]', b.text);
      container.appendChild(frag);
    });
  }

  function renderInfo(product) {
    var infoEl = document.getElementById('product-info');
    if (!infoEl) return;
    var frag = cloneTemplate('tpl-product-detail-info');

    setText(frag, '[data-field="category"]', product.category);
    setText(frag, '[data-field="name"]', product.name);
    setText(frag, '[data-field="reviews"]', '(' + product.reviews + ' reseñas)');
    setText(frag, '[data-field="price"]', '$' + product.price.toFixed(2));
    setText(frag, '[data-field="description"]', product.description);
    setText(frag, '[data-field="stock"]', 'Stock: ' + product.stock + ' unidades disponibles');

    var colorsContainer = frag.querySelector('[data-field="colors"]');
    if (colorsContainer) renderBadges(colorsContainer, product.colors, 'color-badge');

    var sizesContainer = frag.querySelector('[data-field="sizes"]');
    if (sizesContainer) renderSizes(sizesContainer, product.sizes);

    var benefitsContainer = frag.querySelector('[data-field="benefits"]');
    if (benefitsContainer) renderBenefits(benefitsContainer, product.benefits);

    infoEl.appendChild(frag);
  }

  function initMobileMenu() {
    var toggle = document.getElementById('menu-toggle');
    var nav = document.getElementById('main-nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', function () { nav.classList.toggle('is-open'); });
  }

  function init() {
    fetchJSON('data/product-detail.json').then(function (product) {
      renderImage(product);
      renderInfo(product);
      document.title = product.name + ' - ModaStyle';
    }).catch(function (err) {
      console.error('Error:', err);
    });
    initMobileMenu();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
