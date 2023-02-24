requirejs.config({
  config: {
    text: {
      useXhr: function (url, protocol, hostname, port) {
        return true;
      },
    },
  },
  paths: {
    vue_core: "./js/vue_core",
    call_name: "./js/call_name",
    homepage: "./js/homepage",
    update: "./js/check_update",
    mdui: "./js/mdui",
  },
});

requirejs(
  ["update", "homepage", "call_name", "vue_core", "mdui"],
  function () {}
);
