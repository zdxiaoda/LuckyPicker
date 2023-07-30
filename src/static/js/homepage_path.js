requirejs.config({
  config: {
    text: {
      useXhr: function (url, protocol, hostname, port) {
        return true;
      },
    },
  },
  paths: {
    vue: "./static/js/vue_core",
    homepage: "./static/js/homepage",
    mdui: "./static/js/mdui",
  },
});

requirejs(["homepage", "vue", "mdui"], function () {});
