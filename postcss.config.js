// https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md

module.exports = () => {
  return {
    plugins: {
      'postcss-px-to-viewport': {
        unitToConvert: 'px',
        viewportWidth: 1920, // 暂时改动，具体后续定
        unitPrecision: 5,
        propList: ['*'],
        viewportUnit: 'rem',
        fontViewportUnit: 'rem',
        selectorBlackList: [],
        minPixelValue: 1,
        mediaQuery: true,
        replace: true,
        exclude: [/node_modules/],
        include: undefined,
        landscape: false,
      }
    }
  };
};
