
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

把header和payload拿到,按照同样的哈希算法,生成摘要信息,和客户端传过来的进行比较,如果一致则没有发生变化





