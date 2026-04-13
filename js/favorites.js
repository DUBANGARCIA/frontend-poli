/**
 * ModaStyle - Módulo de Favoritos
 * Persistencia con localStorage
 */
var Favorites = (function () {
  'use strict';

  var STORAGE_KEY = 'modastyle_favorites';

  function getAll() {
    try {
      var data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function save(ids) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch (e) { /* silently fail */ }
  }

  function isFavorite(id) {
    return getAll().indexOf(Number(id)) !== -1;
  }

  function toggle(id) {
    id = Number(id);
    var ids = getAll();
    var idx = ids.indexOf(id);
    if (idx === -1) {
      ids.push(id);
    } else {
      ids.splice(idx, 1);
    }
    save(ids);
    return idx === -1; // true = added, false = removed
  }

  function count() {
    return getAll().length;
  }

  function updateAllButtons() {
    document.querySelectorAll('.product-card__heart').forEach(function (btn) {
      var id = btn.getAttribute('data-id');
      if (isFavorite(id)) {
        btn.classList.add('is-active');
      } else {
        btn.classList.remove('is-active');
      }
    });
    updateBadge();
  }

  function updateBadge() {
    var badge = document.getElementById('fav-count');
    if (!badge) return;
    var c = count();
    badge.textContent = c;
    badge.style.display = c > 0 ? 'flex' : 'none';
  }

  function init() {
    document.addEventListener('click', function (e) {
      var heartBtn = e.target.closest('.product-card__heart');
      if (!heartBtn) return;
      e.preventDefault();
      var id = heartBtn.getAttribute('data-id');
      var added = toggle(id);
      heartBtn.classList.toggle('is-active', added);
      updateBadge();
    });
    updateAllButtons();
  }

  return { getAll: getAll, isFavorite: isFavorite, toggle: toggle, count: count, init: init, updateAllButtons: updateAllButtons };
})();
