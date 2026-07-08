const defaultLiveConfig = {
  eventName: "SESSION TERMINEE",
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

function mountThanksScene() {
  const kickerNode = document.getElementById("thanksKicker");
  const subtitleNode = document.getElementById("thanksSubtitle");
  const signatureTextNode = document.getElementById("signatureText");

  if (!kickerNode || !subtitleNode || !signatureTextNode) return;

  const eventName = withFallback(liveConfig.eventName, defaultLiveConfig.eventName);
  const teamName = withFallback(liveConfig.teamName, defaultLiveConfig.teamName);

  kickerNode.textContent = eventName;
  subtitleNode.textContent = "RENDEZ-VOUS AU PROCHAIN LIVE";
  signatureTextNode.textContent = teamName;
}

mountThanksScene();
