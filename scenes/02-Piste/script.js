const defaultLiveConfig = {
	liveIndex: "002",
	eventName: "SPA 24 PRACTICE",
	carName: "PORSCHE 992 GT3",
	teamName: "FR RACING TEAM",
};

const liveConfig = {
	...defaultLiveConfig,
	...(window.LIVE_CONFIG || {}),
};

function mountTopStrip() {
	const liveLabel = document.getElementById("liveLabel");
	const eventLabel = document.getElementById("eventLabel");
	const carLabel = document.getElementById("carLabel");
	const teamLabel = document.getElementById("teamLabel");

	if (!liveLabel || !eventLabel || !carLabel || !teamLabel) return;

	liveLabel.textContent = `LIVE #${liveConfig.liveIndex}`;
	eventLabel.textContent = liveConfig.eventName;
	carLabel.textContent = liveConfig.carName;
	teamLabel.textContent = liveConfig.teamName;
}

mountTopStrip();
