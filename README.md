# h5-c-app

C端 app 内嵌页面


# 新建项目配置【重要】

【重要】 配置 `package.json` 的 `build` 和 `postinstall` 命令。

参考 `cli-vue2` 项目，以新建项目 **`myProject`** 为例：

1. 在`packages`中新建项目

   1. 新建 /packages/myProject 作为项目目录
   2. 修改 /packages/myProject/package.json 的 name 字段 为 myProject
   3. 修改编译输出目录为 ../../dist/myProject
   4. SPA项目修改publicPath
   5. 以上要保持一致, 否则会出现找不到对应项目的情况

   ```sh
   # 可以快捷生成项目模板再修改
   npm run create myProject
   ```

   

2. 在`package.json`的`scripts`中添加/修改指令, 此步骤只针对线上devops, 可以在交付时配置

   同时上线多个项目等特殊情况, 需要看具体的流水线配置

   ```json
   "scripts": {
       "postinstall": "npm-run-all install:myProject", // 修改
       "build": "npm-run-all build:myProject", // 修改
       "install:myProject": "lerna bootstrap --scope=myProject", // 新增
       "build:myProject": "lerna run build --scope=myProject", // 新增
   },
   ```

3. 本地开发

   ```sh
   # 非特殊情况建议直接打开具体项目进行开发
   cd packages/myProject
   code .
   ```

   

# 目录结构

- packages - 项目集合
- scripts - node和其他脚本
- lerna.json - lerna配置



# 指令说明【参考】

## npm指令

```sh
# 查看packages下所有项目
npm run list

# 安装所有项目的npm依赖
npm run bootstrap

# 删除所有项目的node_modules
npm run clean

# 查看所有项目npm依赖的版本更新
npm run ncu
```

## 部分lerna指令说明



```sh
npx lerna -h
```

*lerna的命令都可以通过 --scope= 来指定匹配项目，也可以通过lerna.json配置lerna命令的参数。*

#### packages

- **create**  [name]  [loc]

  Create a new lerna-managed package

  创建pacakge

- **import** [dir]

  Import a package into the monorepo with commit history

  导入一个package

- **clean**

  Remove the node_modules directory from all packages

  删除package node_modules

- **list**

  List local packages

  [aliases: ls, la, ll]

  查看包列表

#### 依赖

- **add** [pkg] [globs..]

  Add a single dependency to matched packages

  添加依赖到package中

- **bootstrap**

  Link local packages together and install remaining package dependencies

  安装package依赖

- **link**

  Symlink together all packages that are dependencies of each other

  链接相互引用的依赖

#### 执行命令

- **exec** [cmd] [args..]

  Execute an arbitrary command in each package

  在每个package中执行命令

- **run** [script]

  Run an npm script in each package that contains that script

  在每个包中执行npm命令
