module.exports = {
  future: {
    webpack5: true,
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  webpack: function (config, options) {
    console.log(options.webpack.version); // 5.18.0
    config.experiments = {};
    return config;
  },
};
