module.exports = {
  presets: [
    // other presets...
    "@babel/preset-typescript",
    "@babel/preset-react",
    ["@babel/preset-env", { targets: { node: "current" } }],
  ],
  // other options...
};
