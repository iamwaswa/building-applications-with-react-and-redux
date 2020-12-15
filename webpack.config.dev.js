const webpack = require(`webpack`);
const path = require(`path`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);

// To ensure this webpack config is run in development mode by any clients
process.env.NODE_ENV = `development`;

module.exports = {
  // Execute this config in development mode
  mode: `development`,
  // Produce output targetted to run in the browser
  target: `web`,
  // Creates source maps so we can see our original code in the browser
  // and not just the compiled output the browser receives
  devtool: `cheap-module-source-map`,
  // Entry point for the application
  entry: `./src/index`,
  // Output for the application
  // which in development just shows a path to a file in memory
  // however, no actual files are generated in development
  output: {
    path: path.resolve(__dirname, `build`),
    publicPath: `/`,
    filename: `bundle.js`,
  },
  // Create a development server to run the build locally
  devServer: {
    // Show minimal output when running in development
    stats: `minimal`,
    // Display errors that appear on the server when running in the browser
    overlay: true,
    // Ensures all requests will be sent to index.html 
    // to allow for deep-linking handled by React Router
    historyApiFallback: true,
    // The following are intended to counteract an issue in Chrome
    disableHostCheck: true,
    headers: { [`Access-Control-Allow-Origin`]: `*` },
    https: false,
  },
  // Plugins to use for compilation of files
  plugins: [
    new HtmlWebpackPlugin({
      // Where to find html template
      template: `src/index.html`,
      // Where to find favicon
      favicon: `src/favicon.ico`,
    }),
  ],
  // Let Webpack know which files to handle
  module: {
    rules: [
      // Javascript/JSX files
      {
        // Files to match
        test: /\.(js|jsx)$/,
        // Files to ignore
        exclude: /node_modules/,
        // Run linting through these files
        // Run babel through these files and webpack will bundle the files into one bundle
        use: [`babel-loader`, `eslint-loader`]
      },
      // CSS Files
      {
        // Files to match
        test: /(\.css)$/,
        // What to run these files through from last to first
        // Allows us to import css and allow webpack to bundle these css files into a single file
        use: [`style-loader`, `css-loader`]
      },
    ]
  }
};