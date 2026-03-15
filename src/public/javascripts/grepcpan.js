/**
 * grepcpan.js — grep.metacpan.org application logic
 *
 * Extracted from the monolithic bundled JS. Contains only
 * the code that this application actually uses.
 */

/* Loading overlay shown while search is in progress.
 * Safari stops rendering once form submission starts, so we must
 * ensure the overlay is painted BEFORE navigation begins.
 * Strategy: prevent default submit, show overlay, wait for paint
 * via requestAnimationFrame, then submit programmatically.
 */
function doGrepping() {
  var container = document.getElementById('firstcontainer');
  var overlay = document.getElementById('overlay');
  if (container) container.style.display = 'none';
  if (overlay) {
    overlay.style.display = 'block';
    overlay.style.opacity = '1';
  }

  /* Find the form and defer submission so the browser can paint first */
  var form = document.getElementById('search-form')
    || document.querySelector('form[action="/search"]');
  if (form) {
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        form.submit();
      });
    });
    return false; /* prevent default submission; we submit after paint */
  }
  return true; /* fallback: submit normally if form not found */
}

/* Application namespace */
var MetaCPANGrep = {
  defaultIgnoreList: "*.PL, /t/*, ppport.h, META.*, /inc/*, /local/*, *.md, *.json, *.ya?ml, *.conf, cpanfile*, LICENSE, MANIFEST*, INSTALL, Changes, Copying, *.SKIP, *.ini, README, *.xml, *.js, .git*",
  defaultFilterList: "*.pm, *.t",

  homepageSetup: function() {
    var qft = document.getElementById('qft');
    var ignoreInput = document.getElementById('ignore-files-input');
    if (qft) qft.value = this.defaultFilterList;
    if (ignoreInput) ignoreInput.placeholder = this.defaultIgnoreList;
  },

  setupIgnoreList: function() {
    var ignoreInput = document.getElementById('ignore-files-input');
    if (!ignoreInput) return;
    if (this.isDefaultIgnoreList(ignoreInput.value)) {
      ignoreInput.value = "";
    } else {
      ignoreInput.value = this.defaultIgnoreList;
    }
  },

  updateIgnoreListCheckbox: function() {
    var ignoreInput = document.getElementById('ignore-files-input');
    var checkbox = document.getElementById('ci-default-excludes');
    if (ignoreInput && checkbox) {
      checkbox.checked = this.isDefaultIgnoreList(ignoreInput.value);
    }
  },

  isDefaultIgnoreList: function(currentValue) {
    return currentValue === this.defaultIgnoreList;
  },

  inputSelectors: [
    'ignore-files-input',
    'only-files-input',
    'search-input',
    'qft',
    'qd',
    'qifl',
  ],

  globalSetup: function() {
    this.inputSelectors.forEach(function(id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.setAttribute('autocomplete', 'off');
      el.setAttribute('autocorrect', 'off');
      el.setAttribute('autocapitalize', 'off');
      el.setAttribute('spellcheck', 'false');
    });
    var qft = document.getElementById('qft');
    if (qft) qft.placeholder = this.defaultFilterList;
  },
};

/* Keyboard shortcut: press 's' to focus search input */
document.addEventListener('keydown', function(e) {
  /* Don't intercept if user is typing in an input/textarea */
  var tag = e.target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
  if (e.key === 's' || e.keyCode === 83) {
    var searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.focus();
      e.preventDefault();
    }
  }
});

/* Initialize on DOM ready */
document.addEventListener('DOMContentLoaded', function() {
  MetaCPANGrep.globalSetup();
  MetaCPANGrep.updateIgnoreListCheckbox();

  var ignoreInput = document.getElementById('ignore-files-input');
  if (ignoreInput) {
    ignoreInput.addEventListener('input', function() {
      MetaCPANGrep.updateIgnoreListCheckbox();
    });
  }

  var excludeCheckbox = document.getElementById('ci-default-excludes');
  if (excludeCheckbox) {
    excludeCheckbox.addEventListener('change', function() {
      var input = document.getElementById('ignore-files-input');
      if (!input) return;
      input.value = this.checked ? MetaCPANGrep.defaultIgnoreList : '';
    });
  }

  /* Persist search size preference */
  var searchSize = document.getElementById('search-size');
  if (searchSize) {
    var savedSize = localStorage.getItem('search_size');
    if (savedSize) searchSize.value = savedSize;
  }
});
