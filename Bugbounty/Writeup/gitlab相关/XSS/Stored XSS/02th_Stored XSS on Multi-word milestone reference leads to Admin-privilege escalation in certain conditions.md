
https://gitlab.com/gitlab-org/gitlab/-/issues/352392

gitlab漏洞系列-存储型XSS所导致的管理员权限升级

声明：文章中涉及的程序(方法)可能带有攻击性，仅供安全研究与教学之用，读者将其信息做其他用途，由用户承担全部法律及连带责任，文章作者不承担任何法律及连带责任。



## 背景
ryhmnlfj小哥于2022年1月份提交了这个漏洞:
在Markdown中发现了存储型XSS;
在某些条件下:结合此XSS和CVE-2021-22242中的CSP绕过(就是前面一篇,可以放个链接)可以实现权限提升;

## 复现步骤
受害者:

1.以受害者的身份登陆gitlab;

2.创建一个任何人都可以创建issue的公共项目;

3.在创建过issue之后，退出账号;

攻击者:

1.以攻击者的身份登陆gitlab;

2.创建一个私有项目;

3.在创建私有项目之后，从浏览器地址栏中显示的URL记录下[FULL_NAMESPACE]。
![图1](https://user-content.gitlab-static.net/3f5ac61fa8b7da938502cfcc037931a9cee8f474/68747470733a2f2f68312e7365632e6769746c61622e6e65742f612f32323263393237652d326438612d346639382d616564622d3066393938333738643137302f46756c6c2d6e616d6573706163652d6f662d707269766174652d70726f6a6563742e706e67)
4.跳转至 `issue>Milestones`而后点击`New milestone`按钮;
5.用下面的标题创建一个里程碑:
```
New Milestone &lt;script&gt;alert(document.domain)&lt;/script&gt; 
```
![图](https://user-content.gitlab-static.net/d534b1b762692779285c6146269eb33cab64b9d4/68747470733a2f2f68312e7365632e6769746c61622e6e65742f612f34663633623535362d636663612d343932352d396263652d6235343337303861643766642f4372656174652d6e65772d6d696c6573746f6e652e706e67)

6.跳转至受害者上面创建项目的 issue页面;

7.通过替换下面的字符串准备新问题(issue)的描述。
用在攻击者第三步获取的值替换[FULL_NAMESPACE]
```
[FULL_NAMESPACE]%"New Milestone &lt;script&gt;alert(document.domain)&lt;/script&gt;" 
```
替换之后,用这个描述(就是上面一行的描述)创建一个新的issue:
![图](https://user-content.gitlab-static.net/0a75cd5928afc89018b1a59f0ad38ae410e1f807/68747470733a2f2f68312e7365632e6769746c61622e6e65742f612f36366235353738322d363538302d346433652d396331362d3535333333616265333730392f4372656174652d6e65772d69737375655f6d696c6573746f6e652e706e67)
8.登出

victim:

1.再次以受害者的身份登入gitlab;

2.转到攻击者第7步创建的问题页面。XSS将自动执行。
![图](https://user-content.gitlab-static.net/5f4748fee2140e3c84c347eb4b028d26e84e344f/68747470733a2f2f68312e7365632e6769746c61622e6e65742f612f64613432303939352d393462342d346335612d613532332d3263383137336662323838642f5853532d726573756c745f6d696c6573746f6e652e706e67)













