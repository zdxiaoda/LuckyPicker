requirejs.config({
  config: {
    text: {
      useXhr: function (url, protocol, hostname, port) {
        return true;
      },
    },
  },
  paths: {
    screenfull: "./js/screenfull",
    vue: "./js/vue",
    jquery: "./js/jquery-3.6.3",
    name: "./js/name",
    music: "./js/music",
    update: "./js/checkupdate",
    mdui: "./js/mdui",
  },
});

requirejs(
  ["update", "music", "screenfull", "name", "jquery", "vue", "mdui"],
  function () {}
);
