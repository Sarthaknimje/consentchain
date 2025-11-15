const webpack = require('webpack');
const path = require('path');

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};

  Object.assign(fallback, {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    buffer: require.resolve('buffer/'),
    process: require.resolve('process/browser.js'),
    path: require.resolve('path-browserify'),
    os: require.resolve('os-browserify/browser'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    assert: require.resolve('assert/'),
    url: require.resolve('url/'),
    util: require.resolve('util/'),
    constants: require.resolve('constants-browserify'),
  });
  config.resolve.fallback = fallback;
  
  // Add alias for process/browser with explicit .js extension
  config.resolve.alias = {
    ...config.resolve.alias,
    'process/browser': require.resolve('process/browser.js'),
    'process/browser.js': require.resolve('process/browser.js'),
  };
  
  // Add fullySpecified: false to handle ESM imports without extensions
  config.module.rules.push({
    test: /\.m?js$/,
    resolve: {
      fullySpecified: false,
    },
  });
  
  // Fix react-refresh issue - allow imports from node_modules
  // The issue is that react-scripts restricts imports from outside src/
  // We need to modify the ModuleScopePlugin to allow react-refresh
  if (config.resolve && config.resolve.plugins) {
    config.resolve.plugins = config.resolve.plugins.filter(plugin => {
      // Remove ModuleScopePlugin that restricts imports to src/
      return !(plugin.constructor && plugin.constructor.name === 'ModuleScopePlugin');
    });
  }
  
  // Fix PostCSS and CSS loader options - MUST process in separate passes to avoid conflicts
  if (config.module && config.module.rules) {
    // FIRST PASS: Fix PostCSS loader ONLY
    config.module.rules.forEach(rule => {
      if (rule.oneOf) {
        rule.oneOf.forEach(oneOfRule => {
          if (oneOfRule.use && Array.isArray(oneOfRule.use)) {
            for (let i = 0; i < oneOfRule.use.length; i++) {
              const use = oneOfRule.use[i];
              if (use.loader && typeof use.loader === 'string' && use.loader.includes('postcss-loader')) {
                // Extract ONLY the valid PostCSS options
                const postcssOptions = use.options?.postcssOptions || {
                  plugins: [
                    require('tailwindcss'),
                    require('autoprefixer'),
                  ],
                };
                
                // Replace with brand new object with ONLY valid PostCSS Loader properties
                oneOfRule.use[i] = {
                  loader: use.loader,
                  options: {
                    postcssOptions: postcssOptions,
                  },
                };
              }
            }
          }
        });
      }
    });
    
    // SECOND PASS: Fix CSS loader ONLY  
    config.module.rules.forEach(rule => {
      if (rule.oneOf) {
        rule.oneOf.forEach(oneOfRule => {
          if (oneOfRule.use && Array.isArray(oneOfRule.use)) {
            for (let i = 0; i < oneOfRule.use.length; i++) {
              const use = oneOfRule.use[i];
              if (use.loader && typeof use.loader === 'string' && use.loader.includes('css-loader') && !use.loader.includes('postcss')) {
                // Extract valid CSS loader options
                const oldOpts = use.options || {};
                const newOptions = {};
                
                // Copy only specific valid properties we want to keep
                if (oldOpts.importLoaders !== undefined) newOptions.importLoaders = oldOpts.importLoaders;
                if (oldOpts.modules !== undefined) newOptions.modules = oldOpts.modules;
                if (oldOpts.sourceMap !== undefined) newOptions.sourceMap = oldOpts.sourceMap;
                
                // Explicitly set url to false to prevent processing of /grid.svg
                newOptions.url = false;
                
                oneOfRule.use[i] = {
                  loader: use.loader,
                  options: newOptions,
                };
              }
            }
          }
        });
      }
    });
  }
  
  // ignore warning about source map of perawallet/connect
  config.ignoreWarnings = [/Failed to parse source map/];
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.NormalModuleReplacementPlugin(
      /^process$/,
      require.resolve('process/browser.js')
    ),
  ]);
  
  return config;
}; 