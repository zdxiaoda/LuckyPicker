requirejs.config({
  config: {
    text: {
      useXhr: function (c, d, b, a) {
        return true
      }
    }
  },

  paths: {
    mdui: "./js/mdui.min",
    screenfull: "./js/screenfull",
    vue: "./js/vue.min",
    jquery: "./js/jquery-3.6.0.min",
    name: "./js/name",
    set_fonts: "./js/set-fonts",
    music: "./js/music",
  },

});
requirejs(["jquery", "screenfull", "music", "vue", "name", "set_fonts", "mdui"], function (dependency) { });