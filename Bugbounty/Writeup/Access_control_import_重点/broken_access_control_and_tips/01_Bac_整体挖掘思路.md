
## tips-01
https://twitter.com/_zwink/status/1532768073052213248
### 10个技巧
When hunting broken access control issues, try this:
1. First use EVERY exposed GUI function available
2. Look for API docs and extract URLs
3. Look for URLs in code
4. Look for URLs in search engines
5. Look for URLs in Wayback Engine
6. Use word lists to fuzz known API paths for additional end points
7. Create two lists of all known object IDs for two different accounts
8. Logged in as account 1, try to access the object IDs of account 2 in all URLs where IDs are used
9. Replay all authenticated requests without the cookies or authorization header present.
10. On high risk endpoints which return PII or sensitive info, try parameter fuzzing to see if IDs are accepted via parameters.  

### 小结

api漏洞系列-broken access control 漏洞技巧

## 技巧合集

- 尝试暴露在外的所有的图像界面的函数

- 寻找API文档

- 寻找在代码中的URLs

- 在搜索引擎中寻找相关的URLs

- 在历史记录(Wayback Engine)网站上面寻找相关的URLs

- 利用相对应的字典对API路径进行模糊测试

- 在测试的时候自己创建两个不同账户的列表，方便进行测试

- 假设账户A的id为id1,账户B的id为id2，尝试用账户B的id登陆账户A

- 在没有cookie或授权header的情况下重放所有经过验证的请求。

- 在返回PII或敏感信息的高风险接口上面，尝试模糊测试。



