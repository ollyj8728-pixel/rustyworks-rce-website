/* Theme + install helpers ("Add to home screen" button in the footer). */
(function () {
  var deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
  });

  function isStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;
  }

  if (isStandalone()) document.documentElement.setAttribute('data-app', '');

  function steps() {
    var ua = navigator.userAgent || '';
    if (/iPhone|iPad|iPod/i.test(ua)) return 'Tap the Share button, then choose "Add to Home Screen".';
    if (/Android/i.test(ua)) return 'Open the browser menu (⋮), then choose "Install app" or "Add to Home screen".';
    return 'Open your browser menu, then choose "Install app" or "Add to Home screen".';
  }

  window.RWTheme = {
    isStandalone: isStandalone,
    install: {
      /* Returns a promise: true when the browser install prompt was used. */
      help: function () {
        if (deferredPrompt) {
          var prompt = deferredPrompt;
          deferredPrompt = null;
          return prompt.prompt().then(function () { return true; });
        }
        if (isStandalone()) {
          window.alert('RustyWorks is already running as an app.');
        } else {
          window.alert('Install RustyWorks on this device:\n\n' + steps());
        }
        return Promise.resolve(false);
      }
    }
  };
})();
