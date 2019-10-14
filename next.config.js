const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withCSS = require('@zeit/next-css');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

const setting = withBundleAnalyzer({
  distDir: '.next',
  webpack(config) {
    const prod = process.env.NODE_ENV === 'production';
    const plugins = [
      ...config.plugins,
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
    ];
    if (prod) {
      plugins.push(new CompressionPlugin()); // main.js.gz
    }
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',
      plugins,
    };
  },
});

module.exports = withCSS(setting);