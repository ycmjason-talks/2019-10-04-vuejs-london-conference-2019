module.exports = {
  printWidth: 120,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: '*.ts',
      options: {
        parser: 'babel',
      },
    },
  ],
};
