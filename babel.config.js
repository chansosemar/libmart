module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'transform-decorators-legacy',
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@styles': './app/styles',
          '@modules': './app/modules',
          '@components': './app/components',
          '@assets': './app/assets',
          '@router': './app/router',
        },
      },
    ],
  ],
};
