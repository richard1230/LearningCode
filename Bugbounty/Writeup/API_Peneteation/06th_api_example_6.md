api漏洞系列-一个认证绕过

## 前言

声明：文章中涉及的程序(方法)可能带有攻击性，仅供安全研究与教学之用，读者将其信息做其他用途，由用户承担全部法律及连带责任，文章作者不承担任何法律及连带责任。

## 复现步骤

1.进入你的mopub帐户，在你的网络中创建一个网段。


2.你现在会得到一个segment ID。

![img_17.png](img_17.png)

![img_18.png](img_18.png)


3.现在转到API链接:`https://app.mopub.com/networks/v2/api/segment/%5BSegment_id%5D`  <br>

注意:页面将花费很多时间打开，你的浏览器可能会崩溃,因为响应包含了mohub中有hash键的所有Apps。

4.当页面打开时，你可以在App部分看到所有的App。