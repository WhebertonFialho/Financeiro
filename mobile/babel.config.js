module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@contexts': './src/contexts',
            '@DTOs': './src/storage/DTOs',
            '@hooks': './src/hooks',
            '@screens': './src/screens',
            '@services': './src/services',
            '@storage': './src/storage',
            '@theme': './src/theme',
            '@utils': './src/utils',
          }
        }
      ]
    ]
  };
};