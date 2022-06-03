https://gitlab.com/gitlab-org/gitlab/-/issues/340537

gitlab漏洞系列-试用许可证越权可以在gitlab.com上创建项目访问令牌

声明：文章中涉及的程序(方法)可能带有攻击性，仅供安全研究与教学之用，读者将其信息做其他用途，由用户承担全部法律及连带责任，文章作者不承担任何法律及连带责任。


## 背景
根据文档:`https://docs.gitlab.com/ee/user/project/settings/project_access_tokens.html`，项目访问令牌可以在gitlab.com上获得，但只对付费团体有效，对试用许可证无效。
`https://gitlab.com/gitlab-org/gitlab/-/merge_requests/43190`也提到了,现在将这个功能扩展到gitlab.com的付费帐户(以防止滥用)-这意味着试用许可证的用户是不可以的!
然而，我在gitlab.com上找到了一种使用试用许可证的用户能够创建项目访问令牌的方法!

## 复现步骤
1.在gitlab.com上创建两个组:这里使用实例`Group1` &` Group2`。

2.在Group2中创建一个项目作为Project1;

3.现在通过进入Group2`的`https://gitlab.com/groups/Group2/-/edit`来完成在Group1中传输Group2,

4.现在Group2和它的项目Project1都在Group1中，我们现在可以通过`https://gitlab.com/groups/Group1/-/billings`向Group1申请试用许可证。

5.一旦你向Group1申请了试用许可证，转到Project1——>` https://gitlab.com/Group1/Group2/Project1`，然后单击设置菜单。你应该在选项中看到Access token！



![图一](https://user-content.gitlab-static.net/7c7241c5aabac85ae511d8cce4d00b8587e6af8c/68747470733a2f2f68312e7365632e6769746c61622e6e65742f612f33613435303134392d613638372d343165622d623437632d6133393063653736353061372f53637265656e5f53686f745f323032312d30382d33315f61745f312e31372e30335f504d2e706e67)



