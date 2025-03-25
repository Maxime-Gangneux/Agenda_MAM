module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Désactiver le source-map-loader
      webpackConfig.module.rules = webpackConfig.module.rules.filter(
        (rule) => rule.loader !== 'source-map-loader'
      );
      
      // Ajouter les polyfills nécessaires
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        process: require.resolve('process/browser'),
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
        buffer: require.resolve('buffer'),
        util: require.resolve('util/'),
      };

      return webpackConfig;
    },
  },
};
