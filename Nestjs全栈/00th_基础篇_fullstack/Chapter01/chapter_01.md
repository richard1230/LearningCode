
## 配置npm镜像
```shell
npm config set registry https://registry.npmjs.org/


```

## 设置类库安装目录

```shell
 npm config set prefix $HOME/.node_modules
 echo "export PATH=$HOME/.node_modules/bin:\$PATH" >> ~/.zshrc && source ~/.zshrc
```

## 安装pnpm以及初始化pnpm

```shell
~ npm install -g pnpm
~ pnpm setup && source .zshrc
```

## 配置pnpm镜像

```shell
~ pnpm config set registry https://registry.npmjs.com/
```

## 安装镜像管理工具

```shell
~ pnpm add nrm -g 
```

建议安装一个node版本管理工具比如n或者nvm

>因为我们使用普通用户编程,所以把n的目录通过环境变量改成我们可以操作的目录

```shell
~ pnpm add n -g 
~ echo "export N_PREFIX=\$HOME/.n" >> ~/.zshrc
~ echo "export PATH=\$N_PREFIX/bin:\$PATH" >> ~/.zshrc
~ source ~/.zshrc
# 安装最新的长期支持版
~ n lts_latest && node --version
# 切换回最新版
~ n latest && node --version
```

## 安装nestjs cli
```shell
~ pnpm add @nestjs/cli -g
```



## 创建项目

```shell
mac@192:~/WebstormProjects/fullstack|
⇒  git clone http://git.pincman.com/fullstack/chapter1.git
cd chapter1

#升级所有包到最新版本
mac@192:~/WebstormProjects/fullstack/chapter1|main
⇒  pnpm up -latest


```

这是会报缺少peer建议依赖中webpack的警告,把下面这段添加到package.json中就可以了

```shell
"pnpm": {
    "peerDependencyRules": {
      "ignoreMissing": [
        "webpack"
      ]
    }
  }

```

## 代码风格

```shell
mac@192:~/WebstormProjects/fullstack/chapter1|main⚡
⇒  pnpm add typescript \
eslint \
prettier \
@typescript-eslint/parser \
@typescript-eslint/eslint-plugin \
eslint-config-airbnb-base \
eslint-config-airbnb-typescript \
eslint-config-prettier \
eslint-plugin-import \
eslint-plugin-prettier \
eslint-plugin-unused-imports \
eslint-plugin-jest -D

   ╭──────────────────────────────────────────────────────────────────╮
   │                                                                  │
   │                Update available! 7.5.0 → 7.13.3.                 │
   │   Changelog: https://github.com/pnpm/pnpm/releases/tag/v7.13.3   │
   │              Run "pnpm add -g @pnpm/exe" to update.              │
   │                                                                  │
   │      Follow @pnpmjs for updates: https://twitter.com/pnpmjs      │
   │                                                                  │
   ╰──────────────────────────────────────────────────────────────────╯

Already up-to-date
Progress: resolved 550, reused 370, downloaded 0, added 0, done

```