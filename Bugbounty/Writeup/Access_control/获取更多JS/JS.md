
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

## Find hidden params in javascript files

```shell

assetfinder *.com | gau | egrep -v '(.css|.svg)' | while read url; do vars=$(curl -s $url | grep -Eo "var [a-zA-Z0-9]+" | sed -e 's,'var','"$url"?',g' -e 's/ //g' | grep -v '.js' | sed 's/.*/&=xss/g'); echo -e "\e[1;33m$url\n\e[1;32m$vars"
```

## Make wordlist from js files

https://gist.github.com/seqrity/d67608eb6372cd6f455bfeeefa77b9c2


