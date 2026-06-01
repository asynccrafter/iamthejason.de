// Cookie-Banner für Google Fonts Consent
(function () {
  const COOKIE_NAME = 'google-fonts-consent';
  const COOKIE_EXPIRY_DAYS = 365;

  // Cookies auslesen
  function getCookie(name) {
    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length);
      }
    }
    return null;
  }

  // Cookie setzen
  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + date.toUTCString();
    document.cookie = name + '=' + value + '; ' + expires + '; path=/; SameSite=Lax';
  }

  // Google Fonts laden
  function loadGoogleFonts() {
    // Preconnect Links
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnect1);

    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'anonymous';
    document.head.appendChild(preconnect2);

    // Fonts laden
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:ital,wght@0,400;0,600;1,400&family=Playfair+Display:ital,wght@0,400;1,700&display=swap';
    document.head.appendChild(fontLink);
  }

  // Banner anzeigen
  function showBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.style.display = 'block';
    }
  }

  // Banner verstecken
  function hideBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.style.display = 'none';
    }
  }

  // Zustimmung akzeptieren
  function acceptCookies() {
    setCookie(COOKIE_NAME, 'accepted', COOKIE_EXPIRY_DAYS);
    loadGoogleFonts();
    hideBanner();
  }

  // Zustimmung ablehnen
  function rejectCookies() {
    setCookie(COOKIE_NAME, 'rejected', COOKIE_EXPIRY_DAYS);
    hideBanner();
  }

  // Beim Laden prüfen
  document.addEventListener('DOMContentLoaded', function () {
    const consent = getCookie(COOKIE_NAME);

    if (consent === 'accepted') {
      // User hat bereits akzeptiert - Fonts laden
      loadGoogleFonts();
      hideBanner();
    } else if (consent === 'rejected') {
      // User hat abgelehnt - Fonts nicht laden
      hideBanner();
    } else {
      // Keine Entscheidung getroffen - Banner anzeigen
      showBanner();
    }
  });

  // Button-Event-Listener
  window.addEventListener('DOMContentLoaded', function () {
    const acceptBtn = document.getElementById('cookie-accept');
    const rejectBtn = document.getElementById('cookie-reject');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', acceptCookies);
    }
    if (rejectBtn) {
      rejectBtn.addEventListener('click', rejectCookies);
    }
  });
})();
