

https://juejin.cn/post/6946728383711543310


```shell
open .zshrc
```

然后在弹出的文档末尾处添加如下代码


```shell
# open vs code

function code {
    if [[ $# = 0 ]]
    then
        open -a "Visual Studio Code"
    else
        local argPath="$1"
        [[ $1 = /* ]] && argPath="$1" || argPath="$PWD/${1#./}"
        open -a "Visual Studio Code" "$argPath"
    fi
}
```
最后执行
`source .zshrc`  <br>
使操作立即生效，我们就可以愉快的在命令行执行Vs的打开操作啦。 <br>
附终端操作命令  <br>
code  在终端直接打开VsCode    <br>
`code .` 在命令行当前所在目录打开   <br>
code file 特定打开某某文件，如code 1.txt，即用VsCode打开当前目录下的1.txt文件   <br>




