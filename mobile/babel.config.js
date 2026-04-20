module.exports = function (api) {
  const isTest = api.env('test');
  api.cache(() => isTest);

  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: isTest ? 'react' : 'nativewind' }],
      ...(!isTest ? ['nativewind/babel'] : []),
    ],
    plugins: ['react-native-reanimated/plugin'],
  };
};
