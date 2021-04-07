module.exports = {
  future: {
    webpack5: true,
  },
  webpack: function (config, options) {
    console.log(options.webpack.version); // 5.18.0
    config.experiments = {};
    return config;
  },
};
