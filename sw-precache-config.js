module.exports = {
  staticFileGlobs: [
    '!_site/service-worker.js',
    '_site/assets/**/**.*',
    '_site/assets/images/logo/**.*',
    '_site/_data/**.*',
    '_site/_include/**/**.*',
    '_site/_include/**.*',
    '_site/_include/scripts/**/**.*',
    '_site/_layout/**.*',
    '_site/_sass/**.*',
    '_site/screenshots/**.*',
    '_site/_posts/**.*',
    '_site/tools/**.*',
    '_site/**/*.json',
    '_site/*.*',
    '_site/_data/**.*'
  ],
  stripPrefix: '_site'
};