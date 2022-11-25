
https://www.youtube.com/watch?v=7Q17ubqLfaM

https://www.bilibili.com/video/BV1PZ4y1t7Bj/?vd_source=0aa76d6c0cefdf813dbf5b083daafb6a

https://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html



![img.png](img.png)

要点:

- 服务端创建了JWT(就是json对象),并使用密钥对其进行签名(防止数据被篡改),

- 服务端可以对 `客户端发向服务端的JWT` 进行校验,查看数据有没被篡改


header:包含签名算法以及token类型(一般为JWT)

payload:存储在token中的所有信息(用来存放实际需要传递的数据)

signature:对前两部分签名，防止数据篡改(需要密钥的配合,密钥只能是服务器知道)

服务端怎么验证数据有没篡改？

把header和payload拿到,按照同样的哈希算法,生成摘要信息,和客户端传过来的进行比较(服务端这边需要密钥),如果一致则没有发生变化



看一个实例:

Python生成Jwt Web Token：

```shell

import time
import jwt

 #头信息
head = {
     "alg":"HS256",
     "typ":"jwt"
 }

 #payload
payload = {
     "iat":time.time(),
     "name":"admin"
 }
 #调用jwt库，生成json web token
 #                              秘钥      加密算法
jwt_token = jwt.encode(payload,"1121",algorithm="HS256",headers=head)

 #输出
print(jwt_token)

```

Python解密JWT：

```shell

import jwt

 #需要解码的token
#  jwt_token = "eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTUwNzM1NDguNjcyNzk2LCJuYW1lIjoiYWRtaW4ifQ.m_f32qmeuFTCugdPBfMA1jGmpkXWoI3Vjt-sY30_xrw"
jwt_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6Imp3dCJ9.eyJpYXQiOjE2NjkzODM1MTcuOTgyMzE1LCJuYW1lIjoiYWRtaW4ifQ.rvpMR39gz73ewSU-fmSfcb7pGRfvwh0N2t75l9OSdJ8"

data = None

try:
     #                           秘钥
    #jwt.decode(ncoded_str, secret, algorithms)
    data = jwt.decode(jwt_token,"1121","HS256")
except Exception as e:
    print(e)

print(data)
```





