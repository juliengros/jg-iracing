const defaultLiveConfig = {
  liveIndex: "003",
  eventName: "GARAGE SESSION",
  carName: "SETUP EN COURS",
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

function mountStatusTicker() {
  const statusNode = document.getElementById("garageStatus");
  if (!statusNode) return;

  const messages = [
    "SECURISATION DES REGLAGES...",
    "VALIDATION AERODYNAMIQUE...",
    "AJUSTEMENT DIFFERENTIEL...",
    "CONTROLE TELEMETRIE...",
  ];

  let currentIndex = 0;

  const rotate = () => {
    currentIndex = (currentIndex + 1) % messages.length;
    statusNode.textContent = messages[currentIndex];
  };

  window.setInterval(rotate, 2200);
}

mountTopStrip();
mountStatusTicker();
