## Project setup
```
asdf install
pnpm install
```

### Compiles and hot-reloads for development
```
pnpm start
```

### Compiles and minifies for production
```
pnpm build
```

### Lints and fixes files
```
pnpm lint
pnpm lint:ts
pnpm lint:style
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Directory Introduction

```
.
├── docs                     # 文档描述
├── loader                   # uni-app-loader的拓展
├── public                   # 第三方资源，这里只存放index.html
├── script                   # node自动化部署相关脚本
├── src                      # 项目主要工程文件夹
│  ├── components            # 公共组件
│  │  └── common             # 基础组件，区别于具体业务组件
│  ├── constants             # 常量
│  ├── fliters               # 过滤器
│  ├── mixins                # mixins
│  ├── plugins               # plugins
│  ├── models                # models api 资源类型&默认数据
│  ├── views                 # 页面
│  ├── assets                # 存放应用引用静态资源（如图片、视频等）的目录，注意：静态资源只能存放于此
│  ├── stores                # 状态管理器，可存放公共数据
│  ├── router                # router 路由配置
│  ├── styles                # 公共样式和mixins样式
│  ├── utils                 # 工具方法
│  ├── App.vue               # 应用配置，用来配置App全局样式以及监听
│  ├── main.js               # Vue初始化入口文件
├── .env                     # 开发环境变量
├── .env.production          # 正式环境变量
├── .env.staging             # 测试环境变量
├── .eslintignore            # 代码检测忽略文件配置
├── .eslintrc.js             # 代码检测规则配置
├── .gitignore               # git忽略文件配置
├── .gitlab-ci.yml           # ci配置
├── package.json             # 依赖包配置
├── postcss.config.js        # postcss配置
├── vue.config.js            # vue拓展配置
└── webpack.config.js        # webpack配置
```
### upload to s3
See [Developer Guide for SDK Version 3](https://docs.aws.amazon.com/zh_cn/sdk-for-javascript/v3/developer-guide/setting-credentials-node.html)

The SDK automatically detects AWS credentials set as variables in your environment and uses them for SDK requests. This eliminates the need to manage credentials in your application. The environment variables that you set to provide your credentials are:
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_SESSION_TOKEN (Optional)
