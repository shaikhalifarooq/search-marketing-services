// ============================================================
// Search Marketing Services — Google Tracking Layer
// ============================================================
// BEFORE GOING LIVE replace these placeholder IDs:
//   GTM-XXXXXXX      → your GTM Container ID
//   AW-18141674968    → your Google Ads Conversion ID
//   G-XXXXXXXXXX     → your GA4 Measurement ID
//   CONV_LABEL_FORM  → your Google Ads conversion label for contact form
// ============================================================

(function () {
  window.dataLayer = window.dataLayer || [];

  // ----------------------------------------------------------
  // Scroll depth milestones — pushed to dataLayer for GTM
  // ----------------------------------------------------------
  var scrollFired = {};
  var SCROLL_MARKS = [25, 50, 75, 90];

  function onScroll() {
    var scrolled = window.scrollY || window.pageYOffset;
    var total = document.documentElement.scrollHeight - window.innerHeight;
    if (total <= 0) return;
    var pct = Math.round((scrolled / total) * 100);
    SCROLL_MARKS.forEach(function (mark) {
      if (!scrollFired[mark] && pct >= mark) {
        scrollFired[mark] = true;
        window.dataLayer.push({
          event: 'scroll_depth',
          scroll_percentage: mark,
          page_path: window.location.pathname
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ----------------------------------------------------------
  // Time on page milestones — pushed to dataLayer for GTM
  // ----------------------------------------------------------
  [30, 60, 120, 300].forEach(function (sec) {
    setTimeout(function () {
      window.dataLayer.push({
        event: 'time_on_page',
        seconds_spent: sec,
        page_path: window.location.pathname
      });
    }, sec * 1000);
  });

  // ----------------------------------------------------------
  // Outbound link tracking
  // ----------------------------------------------------------
  document.addEventListener('click', function (e) {
    var el = e.target.closest('a[href]');
    if (!el) return;
    var href = el.getAttribute('href');
    if (href && href.startsWith('http') && !href.includes(window.location.hostname)) {
      window.dataLayer.push({
        event: 'outbound_click',
        link_url: href,
        link_text: el.textContent.trim()
      });
    }
  });
})();

// ----------------------------------------------------------
// CTA click tracker — called by onclick on key buttons
// Usage: trackCTA('cta_click', 'Label', '/destination/')
// ----------------------------------------------------------
function trackCTA(eventName, label, destination) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    cta_label: label,
    cta_destination: destination,
    page_path: window.location.pathname
  });
  if (typeof gtag === 'function') {
    gtag('event', eventName, {
      event_category: 'CTA',
      event_label: label,
      value: 1
    });
  }
}
