
[TOC]

## tools

1. Finding js file with taser(github.com/m8r0wn/taser)    

2. OneLiner to download js from WaybackMachine
`waybackurls $DOMAIN | grep "\.js"| anew |rush -j 50 'wget -P js/ {} '`

https://github.com/tomnomnom/waybackurls
https://github.com/tomnomnom/anew
https://github.com/shenwei356/rush



## 从JS文件中提取接口
```shell
🧨cat file.js | grep -aoP "(?<=(\"|\'|\`))\/[a-zA-Z0-9_?&=\/\-\#\.]*(?=(\"|\'|\`))" | sort -u 🔥
```
