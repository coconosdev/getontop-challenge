const config = {
  tabWidth: 2,
  trailingComma: "all",
  singleAttributePerLine: true,
  bracketSameLine: true,
  overrides: [
    {
      files: "*.html",
      options: {
        parser: "angular",
      },
    },
  ],
};

module.exports = config;
