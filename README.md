# h5-c-app

C端 app 内嵌页面

# 目录结构

- packages - 项目集合
- scripts - node和其他脚本
- lerna.json - lerna配置



# 指令说明

## npm指令

```sh
# 查看packages下所有项目
npm run list

# 安装所有项目的npm依赖
npm run install

# 删除所有项目的node_modules
npm run clean

# 查看所有项目npm依赖的更新版本
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

  