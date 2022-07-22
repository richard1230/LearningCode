# 3个工具
## 1、byp4xx

`https://github.com/lobuhi/byp4xx`  <br>
安装： <br>

```shell
git clone https://github.com/lobuhi/byp4xx.git
cd byp4xx
chmod u+x byp4xx.py
./byp4xx.py
or
python3 byp4xx.py
```

或者使用pip安装：<br>

`pip install git+https://github.com/lobuhi/byp4xx.git` <br>
使用方法： <br>

`python3 byp4xx.py <cURL options> <target>`
示例： <br>

`python3 byp4xx.py https://www.google.es/test` <br>
byp4xx还自带了一个不错的字典，当使用默认参数测试完毕后，它会询问你是否使用自带的字典再跑一遍： <br>
![img.png](img.png)


## 2、Bypass-403

`https://github.com/iamj0ker/bypass-403`


安装：

```shell
git clone https://github.com/iamj0ker/bypass-403
cd bypass-403
chmod +x bypass-403.sh
sudo apt install figlet  #依赖安装
```


使用方法：

```shell
/bypass-403.sh https://example.com admin
或
./bypass-403.sh website-here path-here
```


## 3、forbinddenpass

`https://github.com/gotr00t0day/forbiddenpass`

安装：

```shell
git clone https://github.com/gotr00t0day/forbiddenpass.git

cd forbiddenpass

pip3 install -r requirements.txt

python3 forbiddenpass.py -h
```


使用方法：

`forbiddenpass.py [-h] [-p domain.com] [-d filename.txt] [-t site.com]`

示例：


```shell
python3 forbiddenpass.py -d domains.txt

python3 forbiddenpass.py -d domains.txt --path login

python3 forbiddenpass.py -t https://site

python3 forbiddenpass.py -t https://site --path login

```







