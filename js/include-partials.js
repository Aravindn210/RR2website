// include-partials.js
// Usage: add <div data-include="navbar.html"></div> or <div data-include="footer.html"></div>
// This script will fetch the file and replace the element's innerHTML with the fetched content.

document.addEventListener('DOMContentLoaded', function () {
  const includes = document.querySelectorAll('[data-include]');
  includes.forEach(el => {
    const path = el.getAttribute('data-include');
    if (!path) return;
    fetch(path)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load ' + path);
        return res.text();
      })
      .then(html => {
        el.innerHTML = html;
        // Initialize Bootstrap dropdowns inside included content if needed
        const dropdownElList = el.querySelectorAll('.dropdown-toggle');
        if (dropdownElList.length) {
          dropdownElList.forEach(dd => new bootstrap.Dropdown(dd));
        }
      })
      .catch(err => {
        console.error(err);
      });
  });
});
