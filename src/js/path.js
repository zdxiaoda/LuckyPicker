requirejs.config({
  config: {
    text: {
      useXhr: function (c, d, b, a) {
        return true;
      },
    },
  },

  paths: {
    screenfull: "./js/screenfull",
    vue: "./js/vue.min",
    jquery: "./js/jquery-3.6.3.min",
    name: "./js/name",
    music: "./js/music",
    update: "./js/checkupdate",
    mdui: "./js/mdui.min",
  },
});
requirejs(
  ["update", "music", "screenfull", "name", "jquery", "vue", "mdui"],
  function (dependency) {}
);
