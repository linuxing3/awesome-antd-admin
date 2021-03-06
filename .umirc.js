// https://umijs.org/config/
import { resolve, join } from 'path'
import { i18n } from './src/utils/config'
import slash from 'slash';

export default {
  // hash: false,
  // history: 'hash', // browser, memory
  outputPath: `/dist/renderer`, // default dist
  publicPath: '/', // default /
  ignoreMomentLocale: true,
  targets: { ie: 9 },
  treeShaking: true,
  plugins: [
    [
      // https://umijs.org/plugin/umi-plugin-react.html
      'umi-plugin-react',
      {
        dva: { immer: true },
        antd: true,
        dynamicImport: {
          webpackChunkName: true,
          loadingComponent: './components/Loader/Loader',
        },
        routes: {
          exclude: [
            /model\.(j|t)sx?$/,
            /service\.(j|t)sx?$/,
            /models\.(j|t)sx?$/,
            /components\.(j|t)sx?$/,
            /services\.(j|t)sx?$/,
            /chart\/Container\.js$/,
            /chart\/ECharts\/.+Component\.js$/,
            /chart\/ECharts\/.+ComPonent\.js$/,
            /chart\/ECharts\/theme\/.+\.js$/,
            /chart\/highCharts\/.+Component\.js$/,
            /chart\/highCharts\/mapdata\/.+\.js$/,
            /chart\/Recharts\/.+Component\.js$/,
            /chart\/Recharts\/Container\.js$/,
          ],
          update: routes => {
            if (!i18n) return routes

            const newRoutes = []
            for (const item of routes[0].routes) {
              newRoutes.push(item)
              if (item.path) {
                newRoutes.push(
                  Object.assign({}, item, {
                    path:
                      `/:lang(${i18n.languages
                        .map(item => item.key)
                        .join('|')})` + item.path,
                  })
                )
              }
            }
            routes[0].routes = newRoutes

            return routes
          },
        },
        dll: {
          include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch', 'antd/es'],
        },
        // hardSource: /* isMac */ process.platform === 'darwin',
        pwa: {
          manifestOptions: {
            srcPath: 'manifest.json'
          },
        }
      },
    ],
  ],
  // Theme for antd
  // https://ant.design/docs/react/customize-theme
  theme: './config/theme.config.js',
  // Webpack Configuration
  proxy: {
    '/api/v1/weather': {
      target: 'https://api.seniverse.com/',
      changeOrigin: true,
      pathRewrite: { '^/api/v1/weather': '/v3/weather' },
    },
  },
  chainWebpack(config) {
    config.target('web')
    // config.merge({ target: 'electron-renderer'})
  },
  alias: {
    // '@': resolve(__dirname, './src/'),
    components: resolve(__dirname, './src/components'),
    models: resolve(__dirname, './src/models'),
    api: resolve(__dirname, './src/services'),
    services: resolve(__dirname, './src/services'),
    config: resolve(__dirname, './src/utils/config'),
    utils: resolve(__dirname, './src/utils'),
    routes: resolve(__dirname, './src/routes'),
    themes: resolve(__dirname, './src/themes'),
  },
  extraBabelPresets: ['@lingui/babel-preset-react'],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'lodash',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'lodash',
    ],
  ]
}
