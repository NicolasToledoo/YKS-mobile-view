/* ============================================
   YKS Mobile View — Popup Logic
   Iframe-based mobile simulation
   ============================================ */

(function () {
  'use strict';

  // ── State ──
  let activeDevice = null;
  let currentOrientation = 'portrait';
  let currentCategory = 'all';
  let simulatorActive = false;
  let favoriteDevices = [];

  // ── Init ──
  document.addEventListener('DOMContentLoaded', init);

  async function init() {
    setupListeners();
    await loadSavedState();
    await loadFavorites();
    renderDeviceList();
  }

  // ── Listeners ──
  function setupListeners() {
    document.getElementById('btn-portrait').addEventListener('click', () => setOrientation('portrait'));
    document.getElementById('btn-landscape').addEventListener('click', () => setOrientation('landscape'));
    document.getElementById('btn-reset').addEventListener('click', handleReset);
    document.getElementById('btn-screenshot').addEventListener('click', handleScreenshot);
    document.getElementById('btn-power').addEventListener('click', handleTogglePower);

    document.getElementById('device-search').addEventListener('input', (e) => {
      renderDeviceList(e.target.value);
    });

    document.querySelectorAll('.cat-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentCategory = tab.dataset.category;
        renderDeviceList(document.getElementById('device-search').value);
      });
    });

    document.getElementById('btn-custom-apply').addEventListener('click', handleCustomViewport);
    document.getElementById('custom-w').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') document.getElementById('custom-h').focus();
    });
    document.getElementById('custom-h').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleCustomViewport();
    });
  }

  // ── Load State ──
  async function loadSavedState() {
    return new Promise(resolve => {
      chrome.storage.local.get(['activeDevice', 'orientation', 'simulatorTabId'], (result) => {
        if (result.activeDevice && DEVICE_PRESETS[result.activeDevice]) {
          activeDevice = result.activeDevice;
          currentOrientation = result.orientation || 'portrait';
          simulatorActive = !!result.simulatorTabId;
          updateUI();
        }
        resolve();
      });
    });
  }

  // ── Load Favorites ──
  async function loadFavorites() {
    return new Promise(resolve => {
      chrome.storage.local.get(['favoriteDevices'], (result) => {
        favoriteDevices = result.favoriteDevices || [];
        resolve();
      });
    });
  }

  // ── Toggle Favorite ──
  function toggleFavorite(deviceId, event) {
    event.stopPropagation();
    const index = favoriteDevices.indexOf(deviceId);
    if (index > -1) {
      favoriteDevices.splice(index, 1);
    } else {
      favoriteDevices.push(deviceId);
    }
    chrome.storage.local.set({ favoriteDevices });
    renderDeviceList(document.getElementById('device-search').value);
  }

  // ── Render Device List ──
  function renderDeviceList(filter = '') {
    const list = document.getElementById('device-list');
    list.innerHTML = '';

    const categories = currentCategory === 'all'
      ? Object.entries(DEVICE_CATEGORIES)
      : Object.entries(DEVICE_CATEGORIES).filter(([key]) => key === currentCategory);

    let totalDevices = 0;

    categories.forEach(([key, category]) => {
      let devices = category.devices.filter(id => {
        const device = DEVICE_PRESETS[id];
        return device && device.name.toLowerCase().includes(filter.toLowerCase());
      });

      if (devices.length === 0) return;

      // Sort: favorites first
      devices.sort((a, b) => {
        const aFav = favoriteDevices.includes(a) ? -1 : 0;
        const bFav = favoriteDevices.includes(b) ? -1 : 0;
        return aFav - bFav;
      });

      // Category label
      const catLabel = document.createElement('div');
      catLabel.className = 'category-label';
      catLabel.style.cssText = `
        font-family: 'JetBrains Mono', monospace;
        font-size: 9px;
        font-weight: 500;
        color: rgba(235, 235, 235, 0.35);
        text-transform: uppercase;
        letter-spacing: 0.1em;
        padding: 4px 4px 2px;
      `;
      catLabel.textContent = category.label;
      list.appendChild(catLabel);

      // Device cards
      devices.forEach(deviceId => {
        const device = DEVICE_PRESETS[deviceId];
        const card = createDeviceCard(deviceId, device);
        list.appendChild(card);
        totalDevices++;
      });
    });

    if (totalDevices === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <span>No devices found</span>
        </div>
      `;
    }
  }

  // ── Create Device Card ──
  function createDeviceCard(deviceId, device) {
    const card = document.createElement('button');
    card.className = 'device-card' + (activeDevice === deviceId ? ' active' : '');
    card.dataset.device = deviceId;

    const brandSvg = getBrandSvg(device.brand);
    const isFav = favoriteDevices.includes(deviceId);

    card.innerHTML = `
      <div class="device-left">
        <div class="device-brand-icon">${brandSvg}</div>
        <span class="device-name">${device.name}</span>
      </div>
      <div class="device-right">
        <button class="fav-btn${isFav ? ' active' : ''}" data-fav="${deviceId}" title="Fixar dispositivo">★</button>
        <div class="device-meta">
          <span class="device-res">${device.width}x${device.height}</span>
          <span class="device-scale">@${device.scale}x</span>
        </div>
      </div>
    `;

    card.addEventListener('click', () => handleDeviceClick(deviceId));

    const favBtn = card.querySelector('.fav-btn');
    favBtn.addEventListener('click', (e) => toggleFavorite(deviceId, e));

    return card;
  }

  // ── Brand SVG Icons ──
  function getBrandSvg(brand) {
    const icons = {
      apple: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>`,
      samsung: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.004 5.293L11.996 1l9.001 4.293v4.293c0 5.249-3.86 10.108-9.001 11.414-5.141-1.306-9.001-6.165-9.001-11.414V5.293z"/></svg>`,
      google: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>`,
      xiaomi: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 3C5.56 3 4 4.56 4 6.5v11C4 19.44 5.56 21 7.5 21h9c1.94 0 3.5-1.56 3.5-3.5v-11C20 4.56 18.44 3 16.5 3h-9zM6 6.5C6 5.67 6.67 5 7.5 5h9c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-9c-.83 0-1.5-.67-1.5-1.5v-11z"/><circle cx="12" cy="17" r="1.5"/></svg>`,
      sony: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 4h14v16H5V4zm2 2v12h10V6H7z"/></svg>`,
      oneplus: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><circle cx="12" cy="12" r="3"/></svg>`,
      lenovo: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v12H4V6zm2 2v8h12V8H6z"/></svg>`,
      tcl: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v12H4V6zm2 2v8h12V8H6z"/></svg>`,
      generic: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>`
    };
    return icons[brand] || icons.generic;
  }

  // ── Handle Device Click ──
  async function handleDeviceClick(deviceId) {
    activeDevice = deviceId;
    const device = DEVICE_PRESETS[deviceId];

    updateStatus(`${device.name}`, 'active');

    if (simulatorActive) {
      // Switch device in existing simulator
      chrome.runtime.sendMessage({
        action: 'switchDevice',
        deviceId,
        orientation: currentOrientation
      }, (response) => {
        if (response?.success) {
          updateStatus(`${device.name} applied`, 'success');
        } else {
          updateStatus(`Error: ${response?.error || 'Unknown'}`, 'error');
        }
      });
    } else {
      // Open new simulator
      chrome.runtime.sendMessage({
        action: 'openSimulator',
        deviceId,
        orientation: currentOrientation
      }, (response) => {
        if (response?.success) {
          simulatorActive = true;
          updateStatus(`${device.name} applied`, 'success');
        } else {
          updateStatus(`Error: ${response?.error || 'Unknown'}`, 'error');
        }
      });
    }

    updateUI();
  }

  // ── Orientation ──
  function setOrientation(orientation) {
    if (currentOrientation === orientation) return;
    currentOrientation = orientation;

    document.getElementById('btn-portrait').classList.toggle('active', orientation === 'portrait');
    document.getElementById('btn-landscape').classList.toggle('active', orientation === 'landscape');

    if (activeDevice && simulatorActive) {
      const device = DEVICE_PRESETS[activeDevice];
      updateStatus(`${device.name} — ${orientation}`, 'active');

      chrome.runtime.sendMessage({
        action: 'switchDevice',
        deviceId: activeDevice,
        orientation
      }, (response) => {
        if (!response?.success) {
          updateStatus(`Error: ${response?.error || 'Unknown'}`, 'error');
        }
      });
    }

    chrome.storage.local.set({ orientation });
  }

  // ── Reset (Close Simulator) ──
  async function handleReset() {
    activeDevice = null;
    currentOrientation = 'portrait';
    simulatorActive = false;

    document.getElementById('btn-portrait').classList.add('active');
    document.getElementById('btn-landscape').classList.remove('active');

    updateStatus('Simulator closed', 'success');

    chrome.runtime.sendMessage({ action: 'closeSimulator' });
    updateUI();
  }

  // ── Screenshot ──
  function handleScreenshot() {
    chrome.runtime.sendMessage({ action: 'screenshot' }, (response) => {
      if (response?.success) {
        updateStatus('Screenshot saved', 'success');
      } else {
        updateStatus('Screenshot failed', 'error');
      }
    });
  }

  // ── Toggle Power ──
  function handleTogglePower() {
    if (simulatorActive) {
      handleReset();
    } else {
      handleDeviceClick('pixel-5');
    }
  }

  // ── Custom Viewport ──
  function handleCustomViewport() {
    const w = parseInt(document.getElementById('custom-w').value);
    const h = parseInt(document.getElementById('custom-h').value);

    if (!w || !h || w < 100 || h < 100) {
      updateStatus('Invalid dimensions', 'error');
      return;
    }

    const customDevice = {
      name: `Custom (${w}x${h})`,
      width: w,
      height: h,
      scale: 1,
      type: w >= 768 ? 'tablet' : 'phone',
      brand: 'generic',
      ua: navigator.userAgent
    };

    activeDevice = null;
    updateStatus(`Custom: ${w}x${h}`, 'active');

    if (simulatorActive) {
      chrome.runtime.sendMessage({
        action: 'switchDevice',
        deviceId: '__custom__',
        orientation: currentOrientation,
        customDevice
      }, (response) => {
        if (response?.success) {
          updateStatus(`Custom ${w}x${h} applied`, 'success');
        } else {
          updateStatus(`Error: ${response?.error || 'Unknown'}`, 'error');
        }
      });
    } else {
      chrome.runtime.sendMessage({
        action: 'openSimulator',
        deviceId: '__custom__',
        orientation: currentOrientation,
        customDevice
      }, (response) => {
        if (response?.success) {
          simulatorActive = true;
          updateStatus(`Custom ${w}x${h} applied`, 'success');
        } else {
          updateStatus(`Error: ${response?.error || 'Unknown'}`, 'error');
        }
      });
    }

    updateUI();
  }

  // ── UI Helpers ──
  function updateUI() {
    document.querySelectorAll('.device-card').forEach(card => {
      card.classList.toggle('active', card.dataset.device === activeDevice);
    });

    const powerBtn = document.getElementById('btn-power');
    powerBtn.classList.toggle('active', simulatorActive);
  }

  function updateStatus(text, state = '') {
    const bar = document.getElementById('status-bar');
    bar.textContent = text;
    bar.className = 'status' + (state ? ` ${state}` : '');
  }
})();
