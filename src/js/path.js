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
    name: "./js/name.min",
    set_fonts: "./js/set-fonts.min",
    music: "./js/music",
  },

});
requirejs(["mdui", "screenfull", "jquery", "vue", "name", "set_fonts", "music"], function (dependency) { });