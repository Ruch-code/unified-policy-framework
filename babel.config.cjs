module.exports = {
  presets: [
    ['@babel/preset-env', { targets: 'defaults' }],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ],
  plugins: [
    ['babel-plugin-module-resolver', {
      root: ['.'],
      extensions: ['.js', '.jsx', '.json'],
      alias: {
        '@': './src'
      }
    }]
  ]
};
