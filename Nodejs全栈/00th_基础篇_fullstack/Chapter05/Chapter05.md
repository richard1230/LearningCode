https://pincman-classroom.feishu.cn/wiki/wikcnqxlONJIago7itkvNUVRpWe


![img.png](img.png)

图中LocalStrategy是在LocalAuthGuard中的;(注意:这个图里面是违反jwt原则的)

一个普通的登录方式:使用凭证(邮箱或者手机号)与密码，那这个凭证凭证可以是那个手机号，还有邮箱这些对吧。然后或者用户名。然后登录之后然后就是首先我们会发一个登录请求进去然后再进行一个操作。这个登录流程的话是这张图。那我们先讲这里然后是否允许有那个匿名访问，我们进行一个操作的时候对吧，我们会去那个是否一个允许匿名访问，如果不允许的话，那我们就返回401。但是我们登录操作是允许匿名访问的对吧？我们登录操作是那本来还没登录，然后需要登录之后才能进行操作

