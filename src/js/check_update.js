const localVersion = require("../package.json").version;
const versionUrl =
  "https://cdn.zhangda.xyz/random-roll-call-system/version.json";

fetch(versionUrl)
  .then((response) => response.json())
  .then((cloudVersion) => {
    if (localVersion < cloudVersion.latest_version) {
      window.open(
        "./showupdate.html",
        "_blank",
        "width=521,height=325,frame=false,nodeIntegration=true,contextIsolation=false,enableRemoteModule=true"
      );
    }
  })
  .catch((error) => {
    console.error(`Failed to fetch version information: ${error}`);
  });
