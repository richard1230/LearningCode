

https://github.com/shieldfy/API-Security-Checklist/blob/master/README-zh.md


注意OAuth那边几个要点:

## OAuth 授权或认证协议: 

始终在后台验证 redirect_uri，只允许白名单的 URL。 <br>
始终在授权时使用有效期较短的授权码（code）而不是令牌（access_token）（不允许 response_type=token）。 <br>
使用随机哈希数的 state 参数来防止跨站请求伪造（CSRF）。 <br>
对不同的应用分别定义默认的作用域和各自有效的作用域参数。 <br>