
<p align="center">
  <a href="http://github.com/zuiidea/antd-admin">
    <img alt="antd-admin" height="64" src="./docs/_media/logo.svg">
  </a>
</p>

<h1 align="center">AntD Admin</h1>

<div align="center">

一套优秀的中后台前端解决方案

[![antd](https://img.shields.io/badge/antd-^3.10.0-blue.svg?style=flat-square)](https://github.com/ant-design/ant-design)
[![umi](https://img.shields.io/badge/umi-^2.2.1-orange.svg?style=flat-square)](https://github.com/umijs/umi)
</div>

[English](./README.md) | 简体中文

## 特性

- 国际化，源码中抽离翻译字段，按需加载语言包
- 动态权限，不同权限对应不同菜单
- 优雅美观，Ant Design 设计体系
- Mock 数据，本地数据调试


## 使用

1. 下载项目代码。

```bash
git clone https://github.com/linuxing3/awesome-antd-admin.git my-project
cd my-project
```

2. 进入目录安装依赖

```bash
yarn install
```

或者

```bash
npm install
```

3. 启动本地服务器。

```bash
npm run start
```

4. 启动完成后打开浏览器访问 [http://localhost:7000](http://localhost:7000)，如果需要更改启动端口，可在 `.env` 文件中配置。

5. 使用electron

`config/build`目录下，`webpack.main.config.js`生成`dist/main/main.js`

`package.json`文件中，`main`字段指向`dist/main/main.js`

`package.json`文件中，`electron:dev`字段调用`electron dist/main/main.js`

```bash
# generate main file
yarn electron:main:dev
# generate the render in dev server
yarn electron:renderer
# run electron with dist/main/main/js
yarn electron:dev
```

6. 使用typescript
  


> 更多信息请参考 [使用文档](https://doc.antd-admin.zuiidea.com/#/zh-cn/)。


## 支持环境

现代浏览器。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- | 
|IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions

## 参与贡献  

我们非常欢迎你的贡献，你可以通过以下方式和我们一起共建 :smiley:
- 在你的公司或个人项目中使用 AntD Admin。
- 通过 [Issue](http://github.com/zuiidea/antd-admin/issues) 报告 bug 或进行咨询。
- 提交 [Pull Request](http://github.com/zuiidea/antd-admin/pulls) 改进代码。

> 强烈推荐阅读 [《提问的智慧》](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way)、[《如何向开源社区提问题》](https://github.com/seajs/seajs/issues/545) 和 [《如何有效地报告 Bug》](http://www.chiark.greenend.org.uk/%7Esgtatham/bugs-cn.html)、[《如何向开源项目提交无法解答的问题》](https://zhuanlan.zhihu.com/p/25795393)，更好的问题更容易获得帮助。
