/* ============================================
   YKS Mobile View — Content Script
   Minimal badge overlay (viewport via debugger)
   ============================================ */

(function () {
  'use strict';

  let badgeEl = null;
  let removeTimeout = null;

  const BADGE_HTML = `
    <style>
      #yks-badge {
        position: fixed;
        bottom: 16px;
        right: 16px;
        z-index: 2147483647;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 16px;
        background: rgba(10, 10, 10, 0.85);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 12px;
        color: #ebebeb;
        pointer-events: none;
        white-space: nowrap;
        box-shadow:
          0 0 20px rgba(255, 0, 255, 0.15),
          0 8px 32px rgba(0, 0, 0, 0.4);
        animation: yks-badge-in 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        transition: opacity 0.3s ease, transform 0.3s ease;
      }
      #yks-badge.yks-hiding {
        opacity: 0;
        transform: translateY(10px) scale(0.95);
      }
      @keyframes yks-badge-in {
        from { opacity: 0; transform: translateY(10px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      #yks-badge .yks-badge-icon {
        width: 18px;
        height: 18px;
        color: #ff00ff;
        flex-shrink: 0;
      }
      #yks-badge .yks-badge-text {
        display: flex;
        flex-direction: column;
        gap: 1px;
      }
      #yks-badge .yks-badge-name {
        font-weight: 600;
        color: #ff00ff;
        font-size: 11px;
        letter-spacing: -0.02em;
      }
      #yks-badge .yks-badge-dims {
        font-family: 'JetBrains Mono', monospace;
        font-size: 10px;
        color: rgba(235, 235, 235, 0.5);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    </style>
    <div id="yks-badge">
      <svg class="yks-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
        <line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
      <div class="yks-badge-text">
        <span class="yks-badge-name"></span>
        <span class="yks-badge-dims"></span>
      </div>
    </div>
  `;

  function showBadge(data) {
    if (removeTimeout) {
      clearTimeout(removeTimeout);
      removeTimeout = null;
    }

    hideBadge();

    const wrapper = document.createElement('div');
    wrapper.id = 'yks-badge-root';
    wrapper.innerHTML = BADGE_HTML;
    document.documentElement.appendChild(wrapper);

    badgeEl = wrapper;

    const nameEl = badgeEl.querySelector('.yks-badge-name');
    const dimsEl = badgeEl.querySelector('.yks-badge-dims');

    if (nameEl) nameEl.textContent = data.deviceName;
    if (dimsEl) dimsEl.textContent = `${data.width} x ${data.height} ${data.orientation}`;
  }

  function hideBadge() {
    if (badgeEl) {
      badgeEl.remove();
      badgeEl = null;
    }
  }

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'showDeviceBadge') {
      showBadge(message);
      sendResponse({ success: true });
    }

    if (message.action === 'hideDeviceBadge') {
      hideBadge();
      sendResponse({ success: true });
    }

    return true;
  });
})();
