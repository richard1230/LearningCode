
https://hackerone.com/reports/1489077

access-control漏洞系列-绕过阻止预览链接

声明：文章中涉及的程序(方法)可能带有攻击性，仅供安全研究与教学之用，读者将其信息做其他用途，由用户承担全部法律及连带责任，文章作者不承担任何法律及连带责任。


## 背景
encryptsaan123于2022年提交了这个漏洞:
前面这个漏洞已经修复,主要修复的逻辑是在更改storefont密码之前,预览链接就被设置过期,但是这里发现了另外一个接口,泄漏了storefont预览url,它是静态的，可以通过它永久地访问商店;

## 复现步骤
1-` https://shakti-jan2022.myshopify.com/`的管理员邀请只有主题权限的user-a(a用户)。

2-a用户访问`https://shakti-jan2022.myshopify.com/admin/themes`

3-现在检查burp的http历史，你会发现一个请求:
```
POST /admin/online-store/themes?hmac=████&host=c2hha3RpLWphbjIwMjIubXlzaG9waWZ5LmNvbS9hZG1pbg&locale=en-IN&session=███&shop=shakti-jan2022.myshopify.com&timestamp=1645562098&_signed_params=host%2Clocale%2Csession%2Cshop%2Ctimestamp HTTP/1.1
Host: shakti-jan2022.myshopify.com
Connection: close
Content-Length: 581
Cache-Control: max-age=0
sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "macOS"
Upgrade-Insecure-Requests: 1
Origin: null
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: navigate
Sec-Fetch-Dest: iframe
Accept-Encoding: gzip, deflate
Accept-Language: en-GB,en-US;q=0.9,en;q=0.8
Cookie: ████

appShellSessionToken=███████&appShellAttempts=1&appShellReason=
```
其对应的响应为:
```
HTTP/1.1 200 OK
Date: Tue, 22 Feb 2022 20:35:06 GMT
Content-Type: text/html; charset=utf-8
Connection: close
X-Sorting-Hat-PodId: 240
X-Sorting-Hat-ShopId: 62790336753
Vary: Accept-Encoding
X-XSS-Protection: 1; mode=block
X-Download-Options: noopen
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Referrer-Policy: origin-when-cross-origin
Content-Security-Policy: frame-ancestors https://shakti-jan2022.myshopify.com; default-src 'self' https://cdn.shopify.com https://cdn.shopifycdn.net; frame-src https://*; base-uri 'self'; object-src 'none'; img-src 'self' data: https://*; style-src 'self' 'unsafe-inline' https://cdn.shopify.com https://cdn.shopifycdn.net; font-src 'self' https://fonts.shopifycdn.com https://cdn.shopify.com https://cdn.shopifycdn.net; script-src 'self' https://cdn.shopify.com https://cdn.shopifycdn.net 'nonce-555f8cbe-fbc4-4125-9ae1-285b0bd06c9c'; connect-src 'self' online-store-web.shopifyapps.com https://notify.bugsnag.com https://burst.shopify.com wss://argus.shopifycloud.com https://shopify.s3.amazonaws.com monorail-edge.shopifysvc.com
X-Dc: gcp-asia-southeast1,us-east1
X-Request-ID: d9d0bda6-b4bd-489b-9c3c-7384cbba086a
X-Permitted-Cross-Domain-Policies: none
CF-Cache-Status: DYNAMIC
Expect-CT: max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"
Server: cloudflare
CF-RAY: 6e1affb60b3d8577-BOM
alt-svc: h3=":443"; ma=86400, h3-29=":443"; ma=86400
Content-Length: 39792

<!DOCTYPE html><html lang="en-IN"><head><title data-react-html="true">Shopify</title><meta charSet="utf-8"/><meta http-equiv="X-UA-Compatible" content="IE=edge"/><meta name="referrer" content="never"/><meta data-react-html="true" name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no"/><link data-react-html="true" rel="shortcut icon" type="image/x-icon" href="https://online-store-web-cdn.shopifycloud.io/webpack/assets/default-c840ed01a2c3f2cec40da60496e0e174.ico"/><link data-react-html="true" rel="preload" as="image" href="https://cdn.shopify.com/screenshots/shopify/z0069ofg35eaiunlanwztkkvti19n2o-62790336753.shopifypreview.com?height=900&amp;version=b5dc22c6d802d34212a20d2f443e1e570f0759468f4b0022c642916aeb4e3d2c&amp;width=1160"/><link data-react-html="true" rel="preload" as="image" href="https://cdn.shopify.com/screenshots/shopify/z0069ofg35eaiunlanwztkkvti19n2o-62790336753.shopifypreview.com?height=600&amp;version=b5dc22c6d802d34212a20d2f443e1e570f0759468f4b0022c642916aeb4e3d2c&amp;width=350"/><link rel="stylesheet" type="text/css".................
```
注意:有一个图像url:`https://cdn.shopify.com/screenshots/shopify/z0069ofg35eaiunlanwztkkvti19n2o-62790336753.shopifypreview.com?height=600&version=b5dc22c6d802d34212a20d2f443e1e570f0759468f4b0022c642916aeb4e3d2c&width=350`

4-注意图片url的预览url是`z0069ofg35eaiunlanwztkkvti19n2-62790336753.shopifypreview.com`

5-现在导航到admin并检查预览url，它是`https://yok8gcda4v2iypbq-62790336753.shopifypreview.com/`

6-删除user-a并更改存储字体的密码，现在更新的预览url将是`https://b0b27da00akv5xui-62790336753.shopifypreview.com/`

7-检查步骤5的预览url,是`https://yok8gcda4v2iypbq-62790336753.shopifypreview.com`，这将显示会过期。

8-但是导航到你从第4步得到的预览url (`z0069ofg35eaiunlanwztkvti19n2-62790336753.shopifypreview.com`)将被攻击用户获得。

现在你仍然可以通过预览url `z0069ofg35eaiunlanwztkkvti19n2-62790336753.shopifypreview.com`永久访问storefont，即使商店密码被修改，用户也被删除。