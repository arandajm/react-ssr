require("ignore-styles");
// Babel support
require("@babel/register")({
  //options
  ignore: [/(node_modules)/],
  presets: ["@babel/preset-env", "@babel/preset-react"],
});

require("./server");
