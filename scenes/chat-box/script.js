const defaultLiveConfig = {
  chatBox: {
    enabled: true,
    title: "TWITCH CHAT",
    mode: "twitch",
    twitchChannel: "",
    twitchUsePopout: true,
    parentDomains: ["localhost"],
    twitchChatUrl: "",
    maxMessages: 6,
    intervalMs: 2400,
    messages: [
      { author: "RaceControl", text: "Green flag in 2 minutes" },
      { author: "TwitchFR", text: "Let's go team JG!" },
      { author: "PitWall", text: "Fuel target set for opening stint" },
      { author: "Overtake44", text: "Sound is clean, stream quality top" },
      { author: "ClipHunter", text: "Car looks planted in sector 2" },
    ],
  },
};

const liveConfig = {
  ...defaultLiveConfig,
  ...(window.LIVE_CONFIG || {}),
};

function normalizeParentDomains(value) {
  const rawDomains = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(",")
      : [];

  return rawDomains
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter((item) => item.length > 0);
}

function buildTwitchChatUrl(chatConfig) {
  if (typeof chatConfig.twitchChatUrl === "string" && chatConfig.twitchChatUrl.trim().length > 0) {
    return chatConfig.twitchChatUrl.trim();
  }

  const channel =
    typeof chatConfig.twitchChannel === "string" ? chatConfig.twitchChannel.trim() : "";
  if (channel.length === 0) return "";

  const forcePopout = chatConfig.twitchUsePopout === true;
  const isFileProtocol = window.location.protocol === "file:";

  if (forcePopout || isFileProtocol) {
    return `https://www.twitch.tv/popout/${encodeURIComponent(channel)}/chat?popout=`;
  }

  const inferredParent =
    typeof window.location.hostname === "string" ? window.location.hostname.trim() : "";
  const configuredParents = normalizeParentDomains(chatConfig.parentDomains);
  const parentDomains = configuredParents.length > 0 ? configuredParents : inferredParent ? [inferredParent] : [];
  if (parentDomains.length === 0) return "";

  const params = new URLSearchParams();
  params.set("darkpopout", "true");

  for (const domain of parentDomains) {
    params.append("parent", domain);
  }

  return `https://www.twitch.tv/embed/${encodeURIComponent(channel)}/chat?${params.toString()}`;
}

function normalizeChatMessage(entry) {
  if (typeof entry === "string") {
    const trimmed = entry.trim();
    if (trimmed.length === 0) return null;
    return { author: "Viewer", text: trimmed };
  }

  if (!entry || typeof entry !== "object") return null;

  const author = typeof entry.author === "string" ? entry.author.trim() : "Viewer";
  const text = typeof entry.text === "string" ? entry.text.trim() : "";

  if (text.length === 0) return null;

  return {
    author: author.length > 0 ? author : "Viewer",
    text,
  };
}

function renderMockMessages(chatListNode, chatConfig) {
  const normalizedMessages = (Array.isArray(chatConfig.messages) ? chatConfig.messages : [])
    .map(normalizeChatMessage)
    .filter(Boolean);

  if (normalizedMessages.length === 0) {
    chatListNode.innerHTML = "";
    const emptyNode = document.createElement("li");
    emptyNode.className = "chat-line";
    emptyNode.textContent = "Aucun message disponible";
    chatListNode.appendChild(emptyNode);
    return;
  }

  const maxMessages = Number.isFinite(chatConfig.maxMessages)
    ? Math.max(1, Math.min(12, Math.floor(chatConfig.maxMessages)))
    : 6;

  const intervalMs = Number.isFinite(chatConfig.intervalMs)
    ? Math.max(600, Math.floor(chatConfig.intervalMs))
    : 2400;

  let messageIndex = 0;

  const appendMessage = () => {
    const message = normalizedMessages[messageIndex % normalizedMessages.length];
    messageIndex += 1;

    const itemNode = document.createElement("li");
    itemNode.className = "chat-line chat-line--enter";

    const authorNode = document.createElement("span");
    authorNode.className = "chat-line__author";
    authorNode.textContent = `${message.author}:`;

    const textNode = document.createElement("span");
    textNode.className = "chat-line__text";
    textNode.textContent = message.text;

    itemNode.appendChild(authorNode);
    itemNode.appendChild(textNode);

    chatListNode.appendChild(itemNode);

    while (chatListNode.children.length > maxMessages) {
      chatListNode.removeChild(chatListNode.firstElementChild);
    }
  };

  for (let i = 0; i < Math.min(maxMessages, normalizedMessages.length); i += 1) {
    appendMessage();
  }

  window.setInterval(appendMessage, intervalMs);
}

function mountChatSource() {
  const chatBoxNode = document.getElementById("chatBox");
  const chatTitleNode = document.getElementById("chatTitle");
  const chatListNode = document.getElementById("chatMessages");
  const chatEmbedNode = document.getElementById("chatEmbed");

  if (!chatBoxNode || !chatTitleNode || !chatListNode || !chatEmbedNode) return;

  const chatConfig = {
    ...defaultLiveConfig.chatBox,
    ...(liveConfig.chatBox || {}),
  };

  if (chatConfig.enabled === false) {
    chatBoxNode.style.display = "none";
    return;
  }

  chatTitleNode.textContent =
    typeof chatConfig.title === "string" && chatConfig.title.trim().length > 0
      ? chatConfig.title.trim()
      : "TWITCH CHAT";

  const mode = typeof chatConfig.mode === "string" ? chatConfig.mode.trim().toLowerCase() : "twitch";

  if (mode === "twitch") {
    const twitchUrl = buildTwitchChatUrl(chatConfig);

    if (twitchUrl.length > 0) {
      chatListNode.style.display = "none";
      chatEmbedNode.style.display = "block";
      chatEmbedNode.src = twitchUrl;
      return;
    }
  }

  chatEmbedNode.style.display = "none";
  chatEmbedNode.removeAttribute("src");
  chatListNode.style.display = "flex";
  renderMockMessages(chatListNode, chatConfig);
}

mountChatSource();
