

## 案例

https://xz.aliyun.com/t/11585    <br>
https://nosec.org/home/detail/2187.html <br>
第二个链接里面第一个案例和第一个链接里面一个案例重合，有具体操作步骤！！！很经典！！

https://blog.csdn.net/eason612/category_11839775.html  <br>
不错的学习资源

## tips

https://github.com/HolyBugx/HolyTips/blob/main/Checklist/OAuth.md


## OAuth 授权或认证协议:

始终在后台验证 redirect_uri，只允许白名单的 URL。 <br>
始终在授权时使用有效期较短的授权码（code）而不是令牌（access_token）（不允许 response_type=token）。 <br>
使用随机哈希数的 state 参数来防止跨站请求伪造（CSRF）。 <br>
对不同的应用分别定义默认的作用域和各自有效的作用域参数。 <br>