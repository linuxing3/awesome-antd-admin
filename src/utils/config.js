module.exports = {
  siteName: 'Umi Electron Admin',
  copyright: 'Umi Electron Admin  © 2019 linuxing3',
  logoPath: '/logo.svg',
  apiPrefix: '/api/v1',
  fixedHeader: true, // sticky primary layout header

  /* Layout configuration, specify which layout to use for route. */
  layouts: [
    {
      name: 'primary',
      include: [/.*/],
      exlude: [/(\/(en|zh))*\/login/]
    },
    // 1. 在`src/layouts/BaseLayout.js` 文件中
    //    新增 `secondary` 布局组件。
    // 2. 在`src/layouts/` 目录中新增`SecondaryLayout.js` 文件。
    {
      name: 'secondary',
      include: [/(\/(en|zh))*\/secondary\/(.*)/]
    }
  ],

  /* I18n configuration, `languages` and `defaultLanguage` are required currently. */
  i18n: {
    /* Countrys flags: https://www.flaticon.com/packs/countrys-flags */
    languages: [
      {
        key: 'pt-br',
        title: 'Português',
        flag: '/brazil.svg'
      },
      {
        key: 'ja',
        title: '日本语',
        flag: '/japanese.svg'
      },
      {
        key: 'en',
        title: 'English',
        flag: '/america.svg'
      },
      {
        key: 'zh',
        title: '中文',
        flag: '/china.svg'
      }
    ],
    defaultLanguage: 'zh'
  }
}
