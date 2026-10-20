const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');

class AutoExtensionPlugin {
  apply(resolver) {
    resolver.getHook('resolve').tapAsync('AutoExtensionPlugin', (request, resolveContext, callback) => {
      if (!request.request || request.path === undefined) {
        return callback();
      }
      const originalPath = request.path;
      const requestPath = request.request;
      
      // Try to add extensions if file not found
      if (requestPath && !path.extname(requestPath)) {
        const extensions = ['.jsx', '.js', '.json'];
        for (const ext of extensions) {
          const fullPath = path.join(originalPath, requestPath + ext);
          if (fs.existsSync(fullPath)) {
            request.request = requestPath + ext;
            break;
          }
        }
      }
      return callback();
    });
  }
};

module.exports = {
  entry: './src/main.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    fullySpecified: false,
    preferRelative: true,
    preferAbsolute: false
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              ['@babel/preset-react', { runtime: 'automatic' }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new (require('html-webpack-plugin'))({
      template: 'index.html',
      filename: 'index.html'
    }),
    new (require('webpack')).DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    })
  ],
  devServer: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    },
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    fullySpecified: false,
    preferRelative: true,
    preferAbsolute: false
  }
};
