module.exports = {
  printWidth: 80,
  tabWidth: 2,
  trailingComma: "all",
  singleQuote: false,
  semi: true,
  // sort-imports
  importOrder: ["^@/", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  // tailwind
  tailwindConfig: "./tailwind.config.js",
  plugins: [require("prettier-plugin-tailwindcss")],
};
