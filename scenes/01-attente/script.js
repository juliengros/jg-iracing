const defaultLiveConfig = {
  liveIndex: "001",
  eventName: "SPA 24 PRACTICE",
  carName: "PORSCHE 992 GT3",
  backgroundImageUrl: "",
  startAtIso: null,
};

const liveConfig = {
  ...defaultLiveConfig,
  ...(window.LIVE_CONFIG || {}),
};

function withSurpriseFallback(value) {
  if (typeof value !== "string") return "Surprise!";
  const trimmedValue = value.trim();
  return trimmedValue.length > 0 ? trimmedValue : "Surprise!";
}

function buildCards() {
  const eventName = withSurpriseFallback(liveConfig.eventName);
  const carName = withSurpriseFallback(liveConfig.carName);

  return [
    {
      icon: "../assets/icons/icon-calendar.svg",
      text: `LIVE <strong>#${liveConfig.liveIndex}</strong>`,
    },
    {
      icon: "../assets/icons/icon-track.svg",
      text: `<strong>${eventName}</strong>`,
    },
    {
      icon: "../assets/icons/icon-car.svg",
      text: `<strong>${carName}</strong>`,
    },
  ];
}

function resolveCountdownTarget() {
  if (liveConfig.startAtIso) {
    const parsedDate = new Date(liveConfig.startAtIso);
    if (!Number.isNaN(parsedDate.getTime())) {
      return parsedDate;
    }
  }

  return new Date(Date.now() + 4 * 60 * 1000 + 32 * 1000);
}

const sceneConfig = {
  countdownTarget: resolveCountdownTarget(),
  cards: buildCards(),
};

function isValidHttpUrl(value) {
  if (typeof value !== "string" || value.trim().length === 0) return false;

  try {
    const parsedUrl = new URL(value);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
}

function mountCustomBackground() {
  const backgroundNode = document.querySelector(".scene__background");
  if (!backgroundNode) return;

  const candidateUrl = (liveConfig.backgroundImageUrl || "").trim();
  if (!isValidHttpUrl(candidateUrl)) return;

  backgroundNode.style.backgroundImage = `url("${candidateUrl.replace(/"/g, '\\"')}")`;
}

function renderCards() {
  const cardsContainer = document.getElementById("sessionCards");
  if (!cardsContainer) return;

  cardsContainer.innerHTML = sceneConfig.cards
    .map(
      (card) => `
      <article class="session-card">
        <img src="${card.icon}" class="session-card__icon" alt="" aria-hidden="true" />
        <p class="session-card__text">${card.text}</p>
      </article>
    `
    )
    .join("");
}

function formatCountdown(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function mountCountdown() {
  const countdownNode = document.getElementById("countdownValue");
  if (!countdownNode) return;

  const tick = () => {
    const remaining = sceneConfig.countdownTarget.getTime() - Date.now();

    if (remaining <= 0) {
      countdownNode.textContent = "LIVE";
      return;
    }

    countdownNode.textContent = formatCountdown(remaining);
    window.requestAnimationFrame(() => {
      window.setTimeout(tick, 250);
    });
  };

  tick();
}

mountCustomBackground();
renderCards();
mountCountdown();
