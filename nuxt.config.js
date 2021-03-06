module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'yt-randomizer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Scada:400,700&display=swap' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
  },

  plugins: [
    '~plugins/modal.js',
    '~plugins/checkbox.js',
    '~plugins/window-size.js',
    { src: '~/plugins/notifications-server', mode: 'server' },
    { src: '~/plugins/notifications-client', mode: 'client' }
  ],
  modules: ['@nuxtjs/style-resources'],
  css: ['~assets/main.scss', '../node_modules/vue-js-modal/dist/styles.css'],
  styleResources: {
    scss: [
      '~assets/main.scss',
    ]
  },
  env: {
    YT_API_KEY: 'AIzaSyAdDpRSjpgTkCVBrL2Sigqj-nWFeo5XSmk'
  },
  server: {
    host: '0.0.0.0' // default: localhost
  }
}

