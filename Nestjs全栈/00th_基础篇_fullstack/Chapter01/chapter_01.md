[TOC]

## 地址

```shell
~/WebstormProjects/fullstack


```
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

#淘宝镜像
pnpm config set registry https://registry.npmmirror.com/
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

配置内容详细参考这个文件(`.eslintrc.js`):



```shell
...
plugins: ['@typescript-eslint', 'jest', 'prettier', 'import', 'unused-imports'],
extends: [
    // airbnb规范
    'airbnb-base',
    // 兼容typescript的airbnb规范
    'airbnb-typescript/base',
    // typescript的eslint插件
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',

    // 支持jest
    'plugin:jest/recommended',
    // 使用prettier格式化代码
    'prettier',
    // 整合typescript-eslint与prettier
    'plugin:prettier/recommended',
],
```

### 一些重要的规则

也是`.eslintrc.js`这个里面的:

`eslint-plugin-unused-imports`用于自动删除未使用的导入

```shell
...
 'no-unused-vars': 0,
 '@typescript-eslint/no-unused-vars': 0,
 'unused-imports/no-unused-imports': 1,
 'unused-imports/no-unused-vars': [
    'error',
    {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: true,
    },
]
```

`import`插件,`import/order`可以按照自己的需求配置

```shell
// 导入模块的顺序
'import/order': [
     'error',
     {
         pathGroups: [
             {
                 pattern: '@/**',
                 group: 'external',
                 position: 'after',
             },
         ],
         alphabetize: { order: 'asc', caseInsensitive: false },
         'newlines-between': 'always-and-inside-groups',
         warnOnUnassignedImports: true,
     },
],
// 导入的依赖不必一定要在dependencies的文件
'import/no-extraneous-dependencies': [
    'error',
     {
         devDependencies: [
             '**/*.test.{ts,js}',
             '**/*.spec.{ts,js}',
             './test/**.{ts,js}',
             './scripts/**/*.{ts,js}',
         ],
     },
],

```

接下来需要配置一下`.prettierrc`,和`.editorconfig`,并且把一些它们各自需要忽略的目录和文件分别添加到`.eslintignore`和`.prettierignore`
最后把git仓库需要忽略的目录和文件写入`.gitignore`


## Tsconfig配置

`tsconfig.json`文件中添加`ESNEXT`就可以使用最新的ES语法,并且添加一个`@`作为根目录映射符
>添加`**.js` 是为了让`.eslintrc.js` 之类的文件也能被格式化，但是必须要在`tsconfig.build.json` 中排除

```shell
{
    "compilerOptions": {
        // ...
        "paths": {
            "@/*": ["src/*"]
        }
    },
     "include": ["src", "test", "typings/**/*.d.ts", "**.js"]
}
```


tsconfig.build.json

```shell
{
    "extends": "./tsconfig.json",
    "exclude": ["node_modules", "test", "dist", "**.js", "**/*spec.ts"]
}

```