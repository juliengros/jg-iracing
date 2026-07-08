const defaultLiveConfig = {
  liveIndex: "001",
  eventName: "SPA 24 PRACTICE",
  carName: "PORSCHE 992 GT3",
  startAtIso: null,
};

const liveConfig = {
  ...defaultLiveConfig,
  ...(window.LIVE_CONFIG || {}),
};

function buildCards() {
  return [
    {
      icon: "../assets/icons/icon-calendar.svg",
      text: `LIVE <strong>#${liveConfig.liveIndex}</strong>`,
    },
    {
      icon: "../assets/icons/icon-track.svg",
      text: `<strong>${liveConfig.eventName}</strong>`,
    },
    {
      icon: "../assets/icons/icon-car.svg",
      text: `<strong>${liveConfig.carName}</strong>`,
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

renderCards();
mountCountdown();
