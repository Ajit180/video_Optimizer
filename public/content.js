function createMetricsBar(viewers, watchTime) {
  if (document.getElementById("custom-metrics-bar")) return;

  const bar = document.createElement("div");
  bar.id = "custom-metrics-bar";
  bar.innerHTML = `
    <span>🎥 Viewers: ${viewers}</span>
    <span>⏱ Estimated Watch Time: ${watchTime}</span>
  `;
  document.body.prepend(bar);
}

function parseDuration(durationText) {
  // Convert YouTube time format (e.g., "12:34" or "1:02:03") to total minutes
  const parts = durationText.split(':').map(Number).reverse();
  const seconds = parts[0] || 0;
  const minutes = (parts[1] || 0) + (parts[2] || 0) * 60;
  return minutes + (seconds >= 30 ? 1 : 0); // round up if >30s
}

function extractData() {
  const viewsEl = document.querySelector('.view-count');
  const viewersText = viewsEl?.innerText || "N/A";

  const durationEl = document.querySelector('span.ytp-time-duration');
  const durationText = durationEl?.innerText || "0:00";
  const durationMinutes = parseDuration(durationText);

  let viewCount = 0;
  if (viewersText.includes("watching")) {
    // Live stream — current viewers
    viewCount = viewersText;
  } else {
    // Regular video
    viewCount = viewersText.replace(/[^0-9]/g, "") || "0";
  }

  const watchTime =
    viewersText.includes("watching") || !durationMinutes
      ? "N/A"
      : `${(parseInt(viewCount) * durationMinutes).toLocaleString()} minutes`;

  createMetricsBar(viewCount, watchTime);
}

function waitForYouTubeElementsAndInject() {
  const interval = setInterval(() => {
    const viewsReady = document.querySelector('.view-count');
    if (viewsReady) {
      clearInterval(interval);
      extractData();
    }
  }, 1000);
}

// Detect URL changes (for YouTube SPA)
let lastUrl = location.href;
new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    removeOldBar();
    waitForYouTubeElementsAndInject();
  }
}).observe(document, { subtree: true, childList: true });

function removeOldBar() {
  const oldBar = document.getElementById("custom-metrics-bar");
  if (oldBar) oldBar.remove();
}

// Initial run
waitForYouTubeElementsAndInject();