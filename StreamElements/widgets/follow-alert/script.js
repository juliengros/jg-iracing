const defaultConfig = {
  title: "BIENVENUE DANS LE PADDOCK",
  user: "@new_follower",
  logoUrl: "https://raw.githubusercontent.com/juliengros/jg-iracing/main/StreamElements/assets/logo-jg.svg",
  soundUrl:
    window.location.protocol === "file:" || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
      ? "../../assets/follow-alert.wav"
      : "https://raw.githubusercontent.com/juliengros/jg-iracing/main/StreamElements/assets/follow-alert.wav",
};

const followEventListeners = new Set([
  "follower-latest",
  "follower",
  "follow-latest",
  "follow",
]);

function createFollowSoundPlayer(soundUrl) {
  if (typeof soundUrl !== "string" || soundUrl.trim().length === 0) return null;

  const audio = new Audio(soundUrl.trim());
  audio.preload = "auto";
  audio.volume = 0.8;

  return audio;
}

function playFollowSound(soundPlayer) {
  if (!soundPlayer) return;

  soundPlayer.pause();
  soundPlayer.currentTime = 0;
  soundPlayer.play().catch(() => {});
}

function replayAlertAnimation() {
  const alertNode = document.getElementById("alertRoot");
  if (!alertNode) return;

  alertNode.classList.remove("alert--follow-highlight");
  void alertNode.offsetWidth;
  alertNode.classList.add("alert--follow-highlight");
}

function readQueryConfig() {
  const params = new URLSearchParams(window.location.search);
  const title = params.get("title") || defaultConfig.title;
  const user = params.get("user") || defaultConfig.user;
  const logoUrl = params.get("logoUrl") || defaultConfig.logoUrl;
  const soundUrl = params.get("soundUrl") || defaultConfig.soundUrl;

  return {
    title: title.trim() || defaultConfig.title,
    user: user.trim() || defaultConfig.user,
    logoUrl: logoUrl.trim() || defaultConfig.logoUrl,
    soundUrl: soundUrl.trim() || defaultConfig.soundUrl,
  };
}

function readFollowerNameFromEvent(detail) {
  const eventPayload = detail?.event ?? detail?.payload ?? detail?.data ?? detail;
  if (!eventPayload || typeof eventPayload !== "object") return null;

  const candidateFields = [
    eventPayload.user,
    eventPayload.username,
    eventPayload.userName,
    eventPayload.displayName,
    eventPayload.display_name,
    eventPayload.name,
    eventPayload.from,
    eventPayload.sender,
  ];

  const candidate = candidateFields.find((value) => typeof value === "string" && value.trim().length > 0);
  if (!candidate) return null;

  return candidate.trim();
}

function applyAlertContent({ title, user, logoUrl }) {
  const titleNode = document.getElementById("followTitle");
  const userNode = document.getElementById("followUser");
  const logoNode = document.querySelector(".alert__brand-logo");

  if (!titleNode || !userNode || !logoNode) return;

  titleNode.textContent = title;
  userNode.textContent = user;
  logoNode.src = logoUrl;
}

function mountFollowAlert() {
  const config = readQueryConfig();
  const soundPlayer = createFollowSoundPlayer(config.soundUrl);
  applyAlertContent(config);

  window.addEventListener("onEventReceived", (event) => {
    const detail = event?.detail;
    if (!detail || !followEventListeners.has(detail.listener)) return;

    const followerName = readFollowerNameFromEvent(detail);
    if (!followerName) return;

    applyAlertContent({
      title: config.title,
      user: followerName,
      logoUrl: config.logoUrl,
    });

    replayAlertAnimation();
    playFollowSound(soundPlayer);
  });
}

mountFollowAlert();
