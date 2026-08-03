/* ============================================
   YKS Mobile View — Background Service Worker
   Iframe-based mobile simulation
   ============================================ */

importScripts('../shared/devices.js', '../shared/utils.js');

// ── State ──
let simulatorTabId = null;
let currentDeviceId = null;
let currentOrientation = 'portrait';
let targetUrl = null;

// ── Installation ──
chrome.runtime.onInstalled.addListener(async () => {
  await YKSUtils.setStorage({
    activeDevice: null,
    orientation: 'portrait',
    simulatorTabId: null,
    targetUrl: null
  });
  buildContextMenu();

  // Clear service workers to remove cached responses with original headers
  try {
    await chrome.browsingData.remove({}, { serviceWorkers: true });
  } catch (e) {
    console.error('YKS: Failed to clear service workers:', e);
  }
});

// ── Restore state after service worker restart ──
async function restoreStateOnWake() {
  const state = await YKSUtils.getStorage([
    'activeDevice', 'orientation', 'simulatorTabId', 'targetUrl'
  ]);

  if (state.activeDevice && state.simulatorTabId) {
    try {
      const tab = await chrome.tabs.get(state.simulatorTabId);
      if (tab && tab.url && tab.url.includes('simulator.html')) {
        simulatorTabId = state.simulatorTabId;
        currentDeviceId = state.activeDevice;
        currentOrientation = state.orientation || 'portrait';
        targetUrl = state.targetUrl;
        return;
      }
    } catch (e) {
      // Tab no longer exists
    }
  }

  simulatorTabId = null;
  currentDeviceId = null;
  targetUrl = null;
  await YKSUtils.removeStorage(['activeDevice', 'orientation', 'simulatorTabId', 'targetUrl']);
}

restoreStateOnWake();

// ── Context Menu ──
function buildContextMenu() {
  chrome.contextMenus.removeAll(() => {
    const phones = Object.entries(DEVICE_PRESETS).filter(([, d]) => d.type === 'phone');
    const tablets = Object.entries(DEVICE_PRESETS).filter(([, d]) => d.type === 'tablet');

    chrome.contextMenus.create({ id: 'yks-header-phones', title: '📱 Smartphones', contexts: ['page', 'frame'], enabled: false });
    phones.forEach(([id, device]) => {
      chrome.contextMenus.create({
        id: `yks-device-${id}`,
        title: `  ${device.name} (${device.width}×${device.height})`,
        contexts: ['page', 'frame']
      });
    });

    chrome.contextMenus.create({ id: 'yks-sep-1', type: 'separator', contexts: ['page', 'frame'] });
    chrome.contextMenus.create({ id: 'yks-header-tablets', title: '📲 Tablets', contexts: ['page', 'frame'], enabled: false });
    tablets.forEach(([id, device]) => {
      chrome.contextMenus.create({
        id: `yks-device-${id}`,
        title: `  ${device.name} (${device.width}×${device.height})`,
        contexts: ['page', 'frame']
      });
    });

    chrome.contextMenus.create({ id: 'yks-sep-2', type: 'separator', contexts: ['page', 'frame'] });
    chrome.contextMenus.create({ id: 'yks-screenshot', title: '📸 Take Screenshot', contexts: ['page', 'frame'] });
    chrome.contextMenus.create({ id: 'yks-reset', title: '↩ Close Simulator', contexts: ['page', 'frame'] });
  });
}

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!tab?.id) return;

  if (info.menuItemId === 'yks-reset') return closeSimulator();
  if (info.menuItemId === 'yks-screenshot') return takeScreenshot();

  const match = info.menuItemId.match(/^yks-device-(.+)$/);
  if (match) {
    const device = DEVICE_PRESETS[match[1]];
    if (device) {
      const url = info.pageUrl || tab.url;
      await openSimulator(match[1], 'portrait', url);
    }
  }
});

// ── Core: Open Simulator ──
async function openSimulator(deviceId, orientation, url) {
  const device = DEVICE_PRESETS[deviceId];
  if (!device) return { success: false, error: 'Device not found' };

  if (!url) {
    const tab = await YKSUtils.getActiveTab();
    if (!tab) return { success: false, error: 'No active tab' };
    url = tab.url;
  }

  if (!url || url.startsWith('chrome://') || url.startsWith('chrome-extension://') || url.startsWith('about:')) {
    return { success: false, error: 'Cannot simulate this page' };
  }

  targetUrl = url;
  currentDeviceId = deviceId;
  currentOrientation = orientation;

  if (simulatorTabId) {
    try {
      const existingTab = await chrome.tabs.get(simulatorTabId);
      if (existingTab) {
        const simulatorUrl = buildSimulatorUrl(deviceId, orientation, url, simulatorTabId);
        await chrome.tabs.update(simulatorTabId, { url: simulatorUrl, active: true });

        await YKSUtils.setStorage({
          activeDevice: deviceId,
          orientation,
          simulatorTabId,
          targetUrl: url
        });

        return { success: true, tabId: simulatorTabId };
      }
    } catch (e) {
      simulatorTabId = null;
    }
  }

  const simulatorUrl = buildSimulatorUrl(deviceId, orientation, url, null);

  try {
    const tab = await chrome.tabs.create({
      url: simulatorUrl,
      active: true
    });

    simulatorTabId = tab.id;

    const finalUrl = buildSimulatorUrl(deviceId, orientation, url, tab.id);
    await chrome.tabs.update(tab.id, { url: finalUrl });

    await YKSUtils.setStorage({
      activeDevice: deviceId,
      orientation,
      simulatorTabId: tab.id,
      targetUrl: url
    });

    return { success: true, tabId: tab.id };
  } catch (error) {
    console.error('YKS: openSimulator failed:', error);
    return { success: false, error: error.message };
  }
}

// ── Build Simulator URL ──
function buildSimulatorUrl(deviceId, orientation, targetUrl, tabId) {
  const base = chrome.runtime.getURL('simulator/simulator.html');
  const hash = new URLSearchParams({
    device: deviceId,
    orientation: orientation,
    url: encodeURIComponent(targetUrl)
  }).toString();
  const tabParam = tabId ? `?tabId=${tabId}` : '';
  return `${base}${tabParam}#${hash}`;
}

// ── Core: Close Simulator ──
async function closeSimulator() {
  if (simulatorTabId) {
    try {
      await chrome.tabs.remove(simulatorTabId);
    } catch (e) {
      // Tab already closed
    }
  }

  simulatorTabId = null;
  currentDeviceId = null;
  targetUrl = null;

  await YKSUtils.removeStorage(['activeDevice', 'orientation', 'simulatorTabId', 'targetUrl']);
}

// ── Core: Switch Device ──
async function switchDevice(deviceId, orientation) {
  if (!simulatorTabId) {
    return openSimulator(deviceId, orientation, null);
  }

  const device = DEVICE_PRESETS[deviceId];
  if (!device) return { success: false, error: 'Device not found' };

  currentDeviceId = deviceId;
  currentOrientation = orientation || currentOrientation;

  try {
    await chrome.tabs.sendMessage(simulatorTabId, {
      action: 'updateDevice',
      deviceId,
      orientation: currentOrientation
    });
  } catch (e) {
    const url = targetUrl || '';
    const simulatorUrl = buildSimulatorUrl(deviceId, currentOrientation, url, simulatorTabId);
    await chrome.tabs.update(simulatorTabId, { url: simulatorUrl });
  }

  await YKSUtils.setStorage({
    activeDevice: deviceId,
    orientation: currentOrientation
  });

  return { success: true };
}

// ── Screenshot ──
async function takeScreenshot() {
  try {
    const tabId = simulatorTabId || (await YKSUtils.getActiveTab())?.id;
    if (!tabId) return;

    const dataUrl = await chrome.tabs.captureVisibleTab(null, { format: 'png' });
    const filename = YKSUtils.generateScreenshotFilename();
    const blob = await (await fetch(dataUrl)).blob();
    const url = URL.createObjectURL(blob);
    chrome.downloads.download({ url, filename, saveAs: true });
  } catch (error) {
    console.error('YKS: Screenshot failed:', error);
  }
}

// ── Keyboard Shortcuts ──
chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'toggle-emulation') {
    const tab = await YKSUtils.getActiveTab();
    if (!tab?.id) return;

    if (simulatorTabId) {
      await closeSimulator();
    } else {
      await openSimulator('pixel-5', 'portrait', tab.url);
    }
  }

  if (command === 'take-screenshot') {
    await takeScreenshot();
  }
});

// ── Tab Close: cleanup ──
chrome.tabs.onRemoved.addListener(async (tabId) => {
  if (simulatorTabId === tabId) {
    simulatorTabId = null;
    currentDeviceId = null;
    targetUrl = null;
    await YKSUtils.removeStorage(['activeDevice', 'orientation', 'simulatorTabId', 'targetUrl']);
  }
});

// ── Message Handling (from popup and simulator) ──
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'openSimulator') {
    openSimulator(message.deviceId, message.orientation, message.url)
      .then(result => sendResponse(result))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (message.action === 'switchDevice') {
    switchDevice(message.deviceId, message.orientation)
      .then(result => sendResponse(result))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (message.action === 'closeSimulator') {
    closeSimulator()
      .then(() => sendResponse({ success: true }))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (message.action === 'iframeReady') {
    handleIframeReady(message, sender)
      .then(() => sendResponse({ success: true }))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (message.action === 'getPresets') {
    sendResponse({ presets: DEVICE_PRESETS, categories: DEVICE_CATEGORIES });
    return true;
  }

  if (message.action === 'getStatus') {
    sendResponse({
      activeDevice: currentDeviceId,
      orientation: currentOrientation,
      simulatorTabId,
      targetUrl
    });
    return true;
  }

  if (message.action === 'screenshot') {
    takeScreenshot()
      .then(() => sendResponse({ success: true }))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (message.action === 'orientationChanged') {
    currentOrientation = message.orientation;
    YKSUtils.setStorage({ orientation: message.orientation });
    sendResponse({ success: true });
    return true;
  }
});

// ── Handle Iframe Ready: inject spoofer ──
async function handleIframeReady(message, sender) {
  const simulatorTabId = sender.tab?.id;
  if (!simulatorTabId) return;

  const frames = await chrome.webNavigation.getAllFrames({ tabId: simulatorTabId });
  const iframeFrame = frames.find(f => f.url && f.url !== 'about:blank' && !f.url.includes('simulator.html'));

  if (!iframeFrame) return;

  const deviceConfig = {
    device: message.device,
    orientation: message.orientation
  };

  try {
    await chrome.scripting.executeScript({
      target: { tabId: simulatorTabId, frameIds: [iframeFrame.frameId] },
      world: 'MAIN',
      files: ['shared/spoofer.js'],
      args: [deviceConfig]
    });
  } catch (e) {
    console.error('YKS: Failed to inject spoofer:', e);
  }
}
