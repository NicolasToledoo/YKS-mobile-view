/* ============================================
   YKS Mobile View — Frame Element Spoofer
   Content script injected into ALL frames at
   document_start. Hides frameElement reference
   inside the simulator iframe.
   ============================================ */

(function () {
  'use strict';

  if (window.name.indexOf('yks-mobile-simulator|') !== 0) return;

  try {
    var descriptor = Object.getOwnPropertyDescriptor(window, 'frameElement');
    if (descriptor && descriptor.configurable === false && typeof descriptor.get === 'function') {
      return;
    }

    Object.defineProperty(window, 'frameElement', {
      get: function () { return null; },
      configurable: false
    });
  } catch (e) {}
})();
