const defaultLiveConfig = {
  liveIndex: "005",
  eventName: "COURTE PAUSE",
  carName: "REPRISE IMMINENTE",
  teamName: "FR RACING TEAM",
};

const liveConfig = {
  ...defaultLiveConfig,
  ...(window.LIVE_CONFIG || {}),
};

function withFallback(value, fallback) {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

function mountTopStrip() {
  const liveLabel = document.getElementById("liveLabel");
  const eventLabel = document.getElementById("eventLabel");
  const carLabel = document.getElementById("carLabel");
  const teamLabel = document.getElementById("teamLabel");

  if (!liveLabel || !eventLabel || !carLabel || !teamLabel) return;

  liveLabel.textContent = `LIVE #${withFallback(liveConfig.liveIndex, defaultLiveConfig.liveIndex)}`;
  eventLabel.textContent = withFallback(liveConfig.eventName, defaultLiveConfig.eventName);
  carLabel.textContent = withFallback(liveConfig.carName, defaultLiveConfig.carName);
  teamLabel.textContent = withFallback(liveConfig.teamName, defaultLiveConfig.teamName);
}

function mountPauseStatusCycle() {
  const statusNode = document.getElementById("pauseStatus");
  if (!statusNode) return;

  const messages = [
    "HYDRATATION PILOTE EN COURS",
    "VERIFICATION TECHNIQUE DU SETUP",
    "ANALYSE TELEMETRIE ET PRESSIONS",
    "DEBRIEF INGENIEUR AVANT REPRISE",
  ];

  let index = 0;
  window.setInterval(() => {
    index = (index + 1) % messages.length;
    statusNode.textContent = messages[index];
  }, 2600);
}

mountTopStrip();
mountPauseStatusCycle();
