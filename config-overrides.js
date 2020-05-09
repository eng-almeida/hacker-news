const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('antd', {
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@text-color': '#020202',
      '@text-color-secondary': '#2a13bd',
      '@primary-color': '#2a13bd',
      '@layout-body-background': '#f6f6f6',
      '@table-header-bg': '#f6f6f6',
      '@font-size-base': '12px',
      "@font-family": "'Poppins', sans-serif"
    },
  }),
);