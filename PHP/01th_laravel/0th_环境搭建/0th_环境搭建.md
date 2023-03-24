


## 环境搭建

### mac

```shell
⇒ curl -s "https://laravel.build/ProjectName" | bash
⇒ cd ProjectName
./vendor/bin/sail up

```

php中的包管理工具composer(类似于node中的npm,java中的maven)


### windows

在你的 Windows 机器上创建新的 Laravel 应用程序之前，请确保安装Docker Desktop (https://www.docker.com/products/docker-desktop/)。接下来，您应该确保已安装并启用 [Windows Subsystem for Linux 2](https://learn.microsoft.com/en-us/windows/wsl/install)。WSL 允许您在 Windows 10 上本地运行 Linux 二进制可执行文件。有关如何安装和启用 WSL2 的信息可以在 Microsoft 的开发人员环境文档 (opens new window)中找到。

>安装并启用 WSL2 后，应确保将 Docker Desktop配置为使用 [WSL2 后端](https://docs.docker.com/desktop/windows/wsl/)

接下来，您已准备好创建您的第一个 Laravel 项目。启动Windows 终端 (opens new window)并为您的 WSL2 Linux 操作系统开始一个新的终端会话。接下来，您可以使用一个简单的终端命令来创建一个新的 Laravel 项目。例如，要在名为“example-app”的目录中创建一个新的 Laravel 应用程序，您可以在终端中运行以下命令：

```shell
curl -s https://laravel.build/example-app | bash
```
当然，您可以将此 URL 中的“example-app”更改为您喜欢的任何内容，只需确保应用程序名称仅包含字母数字字符、破折号和下划线。Laravel 应用程序的目录将在您执行命令的目录中创建。

创建项目后，您可以导航到应用程序目录并启动 Laravel Sail。Laravel Sail 提供了一个简单的命令行界面，用于与 Laravel 的默认 Docker 配置进行交互：

```shell
cd example-app
 
./vendor/bin/sail up
```


### Linux

如果你在 Linux 上开发并且已经安装了Docker Compose (opens new window)，你可以使用一个简单的终端命令来创建一个新的 Laravel 项目。例如，要在名为“example-app”的目录中创建一个新的 Laravel 应用程序，您可以在终端中运行以下命令：

当然，您可以将此 URL 中的“example-app”更改为您喜欢的任何内容，只需确保应用程序名称仅包含字母数字字符、破折号和下划线。Laravel 应用程序的目录将在您执行命令的目录中创建。

创建项目后，您可以导航到应用程序目录并启动 Laravel Sail。Laravel Sail 提供了一个简单的命令行界面，用于与 Laravel 的默认 Docker 配置进行交互：

```shell
cd example-app
 
./vendor/bin/sail up
```


## sail 基本命令

```shell
#采取后台的方式运行
./vendor/bin/sail up -d

#查看容器中php的版本
⇒  ./vendor/bin/sail  php --version
PHP 8.2.1 (cli) (built: Jan 13 2023 10:43:08) (NTS)
Copyright (c) The PHP Group
Zend Engine v4.2.1, Copyright (c) Zend Technologies
    with Zend OPcache v8.2.1, Copyright (c), by Zend Technologies
    with Xdebug v3.2.0, Copyright (c) 2002-2022, by Derick Rethans
```

为了方便书写:
```shell
alias sail='[ -f sail ] && sh sail || sh vendor/bin/sail'
#示例:
⇒  sail shell
sail@3ec99872d7b3:/var/www/html$ php --version
PHP 8.2.1 (cli) (built: Jan 13 2023 10:43:08) (NTS)
Copyright (c) The PHP Group

```


## 选择sail服务

通过 Sail 创建新的 Laravel 应用程序时，您可以使用with查询字符串变量来选择应在新应用程序的docker-compose.yml文件中配置哪些服务。可用服务包括mysql、pgsql、mariadb、redis、memcached、meilisearch、minio、selenium和mailhog：

```shell
curl -s "https://laravel.build/example-app?with=mysql,redis" | bash
```

如果您未指定要配置的服务，则会默认配置mysql、redis、meilisearch、mailhog和selenium`。

您可以通过将参数添加到 URL 来指示 Sail 安装默认的Devcontainer ：devcontainer


```shell
curl -s "https://laravel.build/example-app?with=mysql,redis&devcontainer" | bash
```






