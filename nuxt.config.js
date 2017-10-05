module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'research-project-selection',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  mode: 'spa',
  modules: [
    '@nuxtjs/bootstrap-vue', '@nuxtjs/proxy', '@nuxtjs/axios', '@nuxtjs/toast'
  ],
  proxy: [
    ['/api/login', { target: 'http://208.68.36.50:8000/login' }]
  ],
  plugins: [{ src: '~/plugins/localStorage.js', ssr: false}],
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
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
