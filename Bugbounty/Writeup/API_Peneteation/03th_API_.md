## 前言

声明：文章中涉及的程序(方法)可能带有攻击性，仅供安全研究与教学之用，读者将其信息做其他用途，由用户承担全部法律及连带责任，文章作者不承担任何法律及连带责任。


## 主要业务逻辑
Zopim仪表板帐户的所有者具有创建代理和禁用代理的能力，当禁用代理时，它限制用户访问他登录到仪表板(这是可以的)，但没有使`access_token`过期。如果access_tokens被重用，我们就可以再次获得对帐户的访问权!

想象一下这样一种情况:所有者创建代理并提供管理访问权，当所有者知道其攻击者配置文件时，他只禁用它!但是在这里禁用帐户似乎不安全，帐户可以通过`access_token`使用。

## 复现步骤

1.登录到所有者(Owner)帐户并创建具有管理员权限的代理

2.现在打开另一个浏览器并登录到代理帐户

3.在代理帐户中创建一个客户端，执行授权并获取`access_token`

4.现在转到所有者帐户并禁用代理

5.现在使用这个请求
```shell
curl https://www.zopim.com/api/v2/agents \
-d '{ "email": "attacker@attacker.com", \ "password": "secretpassword", \ "first_name": "attacker", \ "last_name": "Anon", \ "display_name": "Mr Robot",
\ "enabled": 1, \ "im_server_id": "smith", \ }' \
-v /
-X POST -H "Authorization: Bearer `access_token_here`"

```

6.发现成功创建了一个账户

## 确认

1.登录Agent帐号，打开` https://victim2- 80.terminal.com/zopadmin.html`

2.现在点击Done have access_token? Click Here

3.它提示“允许或拒绝”，点击“允许”

4.现在它会显示你的“访问令牌”，复制一下

5.现在打开所有者帐户并禁用代理帐户

6.再次跳转至 `https://victim2-80.terminal.com/zopadmin.html` 

7.然后将access_token粘贴至此，单击Submit

8.帐户将创建,邮箱密码为:` email = lol@gmail.com & password=csrfcsrf`


## 小结

客户端禁用,但是终端仍然可以利用命令行访问(利用`access_token`)
