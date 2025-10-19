/** @format */
module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        "babel-preset-expo",
        {
          jsxImportSource: "nativewind",
        },
      ],
      // "nativewind/babel", // Eliminar o comentar este preset si no es necesario
    ],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],

          alias: {
            "@": "./",
            "tailwind.config": "./tailwind.config.js",
          },
        },
      ],
      "react-native-reanimated/plugin",
      // "react-native-worklets/plugin", // Eliminar si está referenciado en algún momento
    ],
  };
};
