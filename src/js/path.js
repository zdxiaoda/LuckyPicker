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
    mdui: "./js/mdui.min",
    update: "./js/checkupdate",
  },
});
requirejs(
  ["update", "music", "screenfull", "name", "jquery", "mdui", "vue"],
  function (dependency) {}
);
