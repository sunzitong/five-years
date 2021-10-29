module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 7'],
    },
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 375,
      unitPrecision: 5,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 2,
      mediaQuery: false,
      replace: true,
      exclude: [],
      landscape: false,
      landscapeUnit: 'vw',
      landscapeWidth: 375,
    },
    // 'postcss-pxtorem': {
    //   rootValue: 100,
    //   propList: ['*'],
    //   selectorBlackList: ['active', 'distpicker-address-wrapper'],
    // },
  },
};
