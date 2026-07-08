const defaultConfig = {
  title: "THANKS FOR FOLLOWING",
  user: "@new_follower",
};

function readQueryConfig() {
  const params = new URLSearchParams(window.location.search);
  const title = params.get("title") || defaultConfig.title;
  const user = params.get("user") || defaultConfig.user;

  return {
    title: title.trim() || defaultConfig.title,
    user: user.trim() || defaultConfig.user,
  };
}

function mountFollowAlert() {
  const config = readQueryConfig();
  const titleNode = document.getElementById("followTitle");
  const userNode = document.getElementById("followUser");

  if (!titleNode || !userNode) return;

  titleNode.textContent = config.title;
  userNode.textContent = config.user;
}

mountFollowAlert();
