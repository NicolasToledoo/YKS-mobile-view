/* ============================================
   YKS Mobile View — Simulator Logic
   Clean iframe viewport, device spoofing
   ============================================ */

(function () {
  'use strict';

  // ── State ──
  let currentDevice = null;
  let currentOrientation = 'portrait';
  let targetUrl = '';
  let simulatorTabId = null;

  // ── DOM References ──
  const viewport = document.getElementById('sim-viewport');
  const iframe = document.getElementById('sim-iframe');
  const tbDeviceName = document.getElementById('tb-device-name');

  // ── Init ──
  function init() {
    parseHash();
    setupListeners();

    if (!targetUrl || !currentDevice) {
      showError('No device or URL specified');
      return;
    }

    renderDevice();
    loadUrl();
  }

  // ── Parse Hash Parameters ──
  function parseHash() {
    const hash = window.location.hash.slice(1);
    const params = new URLSearchParams(hash);

    const deviceId = params.get('device');
    const url = params.get('url');
    const orientation = params.get('orientation') || 'portrait';

    if (deviceId && DEVICE_PRESETS[deviceId]) {
      currentDevice = { id: deviceId, ...DEVICE_PRESETS[deviceId] };
    }

    if (url) {
      targetUrl = decodeURIComponent(url);
    }

    currentOrientation = orientation;
  }

  // ── Render Device ──
  function renderDevice() {
    if (!currentDevice) return;

    const isLandscape = currentOrientation === 'landscape';
    const viewportW = isLandscape ? currentDevice.height : currentDevice.width;
    const viewportH = isLandscape ? currentDevice.width : currentDevice.height;

    // Set viewport (iframe) size
    viewport.style.width = viewportW + 'px';
    viewport.style.height = viewportH + 'px';
    iframe.style.width = viewportW + 'px';
    iframe.style.height = viewportH + 'px';

    // Set viewport class
    viewport.className = 'sim-viewport';
    if (isLandscape) viewport.classList.add('landscape');

    // Scale viewport to fit screen
    scaleViewport(viewportW, viewportH);

    // Update top bar
    tbDeviceName.textContent = currentDevice.name;
  }

  // ── Scale Viewport to Fit ──
  function scaleViewport(viewportW, viewportH) {
    const maxW = window.innerWidth * 0.85;
    const maxH = (window.innerHeight - 140) * 0.95;
    const scaleW = maxW / viewportW;
    const scaleH = maxH / viewportH;
    const scale = Math.min(1, Math.min(scaleW, scaleH));

    viewport.style.transform = `scale(${scale})`;
  }

  // ── Load URL in Iframe ──
  function loadUrl() {
    if (!targetUrl) return;

    viewport.classList.add('loading');
    iframe.src = targetUrl;

    iframe.addEventListener('load', function onLoad() {
      viewport.classList.remove('loading');
      iframe.removeEventListener('load', onLoad);

      // Notify background that iframe is ready for spoofing
      chrome.runtime.sendMessage({
        action: 'iframeReady',
        iframeUrl: targetUrl,
        device: currentDevice,
        orientation: currentOrientation,
        simulatorTabId: simulatorTabId
      });
    });
  }

  // ── Show Error ──
  function showError(msg) {
    tbDeviceName.textContent = 'YKS Mobile View — ' + msg;
  }

  // ── Listeners ──
  function setupListeners() {
    // Close button
    document.getElementById('btn-close').addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'closeSimulator' });
      window.close();
    });

    // Orientation buttons
    document.getElementById('btn-portrait').addEventListener('click', () => setOrientation('portrait'));
    document.getElementById('btn-landscape').addEventListener('click', () => setOrientation('landscape'));

    // Screenshot
    document.getElementById('btn-screenshot').addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'screenshot' });
    });

    // Window resize
    window.addEventListener('resize', () => {
      if (currentDevice) {
        const isLandscape = currentOrientation === 'landscape';
        const viewportW = isLandscape ? currentDevice.height : currentDevice.width;
        const viewportH = isLandscape ? currentDevice.width : currentDevice.height;
        scaleViewport(viewportW, viewportH);
      }
    });

    // Listen for messages from background
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'updateDevice') {
        currentDevice = { id: message.deviceId, ...DEVICE_PRESETS[message.deviceId] };
        currentOrientation = message.orientation || 'portrait';
        renderDevice();
        sendResponse({ success: true });
      }

      if (message.action === 'updateOrientation') {
        currentOrientation = message.orientation;
        renderDevice();
        sendResponse({ success: true });
      }

      if (message.action === 'reloadIframe') {
        viewport.classList.add('loading');
        iframe.src = iframe.src;
        sendResponse({ success: true });
      }

      return true;
    });
  }

  // ── Set Orientation ──
  function setOrientation(orientation) {
    if (currentOrientation === orientation) return;
    currentOrientation = orientation;

    document.getElementById('btn-portrait').classList.toggle('active', orientation === 'portrait');
    document.getElementById('btn-landscape').classList.toggle('active', orientation === 'landscape');

    renderDevice();

    // Notify background
    chrome.runtime.sendMessage({
      action: 'orientationChanged',
      orientation
    });
  }

  // ── Get Simulator Tab ID from URL ──
  function getTabIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('tabId')) || null;
  }

  // ── Start ──
  simulatorTabId = getTabIdFromUrl();
  document.addEventListener('DOMContentLoaded', init);
})();
