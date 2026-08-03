/* ============================================
   YKS Mobile View — Iframe Spoofer
   Injected into iframe MAIN world to spoof
   mobile device properties.
   Config is read from window.name.
   ============================================ */

(function () {
  'use strict';

  var nameStr = window.name || '';
  if (nameStr.indexOf('yks-mobile-simulator|') !== 0) return;

  var configStr = nameStr.substring('yks-mobile-simulator|'.length);
  var config;
  try {
    config = JSON.parse(configStr);
  } catch (e) {
    return;
  }

  if (!config || !config.device) return;

  var device = config.device;
  var orientation = config.orientation || 'portrait';

  var vw = orientation === 'portrait' ? device.width : device.height;
  var vh = orientation === 'portrait' ? device.height : device.width;
  var angle = orientation === 'portrait' ? 0 : 90;
  var orientType = orientation === 'portrait' ? 'portrait-primary' : 'landscape-primary';

  // ── Override navigator.userAgent ──
  try {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: device.ua,
      writable: false,
      configurable: true
    });
  } catch (e) {}

  // ── Override navigator.platform ──
  try {
    var platform = device.ua.indexOf('iPhone') !== -1 || device.ua.indexOf('iPad') !== -1
      ? 'iPhone'
      : device.ua.indexOf('Android') !== -1 ? 'Linux armv8l' : 'Win32';
    Object.defineProperty(window.navigator, 'platform', {
      value: platform,
      writable: false,
      configurable: true
    });
  } catch (e) {}

  // ── Override navigator.appVersion ──
  try {
    var appVer = device.ua.substring(device.ua.indexOf('/') + 1);
    Object.defineProperty(window.navigator, 'appVersion', {
      value: appVer,
      writable: false,
      configurable: true
    });
  } catch (e) {}

  // ── Override navigator.userAgentData ──
  try {
    var isIOS = device.ua.indexOf('iPhone') !== -1 || device.ua.indexOf('iPad') !== -1;
    var uaData;

    if (!isIOS) {
      var brands = [];
      if (device.brand === 'google') brands.push({ brand: 'Google Chrome', version: '120' });
      else if (device.brand === 'samsung') brands.push({ brand: 'Samsung Internet', version: '23' });
      else brands.push({ brand: 'Chromium', version: '120' });

      var realUAData = navigator.userAgentData;
      if (realUAData) {
        uaData = new Proxy(realUAData, {
          get: function (target, prop) {
            if (prop === 'brands') return brands;
            if (prop === 'mobile') return true;
            if (prop === 'platform') return device.ua.indexOf('Android') !== -1 ? 'Android' : 'Unknown';
            if (prop === 'getHighEntropyValues') {
              return function () {
                return Promise.resolve({
                  brands: brands,
                  mobile: true,
                  platform: device.ua.indexOf('Android') !== -1 ? 'Android' : 'Unknown',
                  platformVersion: '14.0.0',
                  architecture: 'arm',
                  bitness: '64',
                  model: '',
                  uaFullVersion: '120.0.6099.144'
                });
              };
            }
            var val = target[prop];
            return typeof val === 'function' ? val.bind(target) : val;
          }
        });
      } else {
        uaData = { brands: brands, mobile: true, platform: 'Android' };
      }
    }

    Object.defineProperty(Navigator.prototype, 'userAgentData', {
      get: function () { return uaData; },
      configurable: true
    });
  } catch (e) {}

  // ── Override devicePixelRatio ──
  try {
    Object.defineProperty(window, 'devicePixelRatio', {
      value: device.scale,
      writable: false,
      configurable: true
    });
  } catch (e) {}

  // ── Override outerWidth/outerHeight ──
  try {
    Object.defineProperty(window, 'outerWidth', { value: vw, writable: false, configurable: true });
    Object.defineProperty(window, 'outerHeight', { value: vh, writable: false, configurable: true });
  } catch (e) {}

  // ── Override screen dimensions ──
  try {
    Object.defineProperty(window.screen, 'width', { value: vw, writable: false, configurable: true });
    Object.defineProperty(window.screen, 'height', { value: vh, writable: false, configurable: true });
    Object.defineProperty(window.screen, 'availWidth', { value: vw, writable: false, configurable: true });
    Object.defineProperty(window.screen, 'availHeight', { value: vh, writable: false, configurable: true });
    Object.defineProperty(window.screen, 'colorDepth', { value: 24, writable: false, configurable: true });
    Object.defineProperty(window.screen, 'pixelDepth', { value: 24, writable: false, configurable: true });
  } catch (e) {}

  // ── Override screen.orientation ──
  try {
    Object.defineProperty(window.screen.orientation, 'angle', { value: angle, writable: false, configurable: true });
    Object.defineProperty(window.screen.orientation, 'type', { value: orientType, writable: false, configurable: true });
  } catch (e) {}

  // ── Override window.open to prevent _top/_parent escape ──
  try {
    var originalOpen = window.open;
    window.open = function (url, target, features) {
      if (target === '_top' || target === '_parent') target = '_self';
      return originalOpen.call(window, url, target, features);
    };
  } catch (e) {}

  // ── Fix viewport meta tag ──
  try {
    var metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      var content = metaViewport.getAttribute('content') || '';
      var parts = content.split(',').map(function (s) { return s.trim(); });

      var declaredWidth = null;
      var widthPart = parts.find(function (p) { return p.indexOf('width=') === 0; });
      if (widthPart) {
        declaredWidth = parseFloat(widthPart.replace('width=', ''));
      }

      var declaredScale = null;
      var scalePart = parts.find(function (p) { return p.indexOf('initial-scale=') === 0; });
      if (scalePart) {
        declaredScale = parseFloat(scalePart.replace('initial-scale=', ''));
      }

      var zoom = 1;
      if (declaredWidth && declaredWidth > 0) {
        zoom = vw / declaredWidth;
      } else if (declaredScale && declaredScale !== 1) {
        zoom = declaredScale;
      } else {
        var html = document.documentElement;
        if (html && html.scrollWidth > 0) {
          var ratio = vw / html.scrollWidth;
          if (ratio < 0.7) zoom = ratio;
        }
      }

      if (zoom > 0 && zoom <= 3) {
        var style = document.createElement('style');
        style.setAttribute('data-yks-injected', 'viewport-zoom');
        style.textContent = 'html { zoom: ' + (zoom * 100) + '% !important; }';
        document.documentElement.appendChild(style);
      }
    }
  } catch (e) {}

  try {
    window.__yksMobileSimulator = true;
  } catch (e) {}

})();
