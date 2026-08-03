/* ============================================
   YKS Mobile View — Shared Utilities
   ============================================ */

const YKSUtils = {
  getDeviceDimensions(device, orientation) {
    const isLandscape = orientation === 'landscape';
    return {
      width: isLandscape ? device.height : device.width,
      height: isLandscape ? device.width : device.height
    };
  },

  async getActiveTab() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab || null;
  },

  async getStorage(keys) {
    return new Promise(resolve => {
      chrome.storage.local.get(keys, resolve);
    });
  },

  async setStorage(data) {
    return new Promise(resolve => {
      chrome.storage.local.set(data, resolve);
    });
  },

  async removeStorage(keys) {
    return new Promise(resolve => {
      chrome.storage.local.remove(keys, resolve);
    });
  },

  async sendMessageToTab(tabId, message) {
    try {
      return await chrome.tabs.sendMessage(tabId, message);
    } catch {
      return null;
    }
  },

  formatDeviceLabel(device, orientation) {
    const dim = this.getDeviceDimensions(device, orientation);
    return `${device.name} — ${dim.width} x ${dim.height}`;
  },

  generateScreenshotFilename() {
    const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    return `yks-mobile-view-${ts}.png`;
  }
};


