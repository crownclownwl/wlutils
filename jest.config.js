module.exports = {
    testURL: 'http://localhost:8000',
    testMatch: ['**/tests/*.(test.js?(x)|test.ts?(x))', "!**/.history/**"],
    globals: {
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: false, // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
    },
  };
  