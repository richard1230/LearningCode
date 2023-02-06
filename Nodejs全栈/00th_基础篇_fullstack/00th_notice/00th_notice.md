https://pincman-classroom.feishu.cn/wiki/wikcnlWLMsAHHkYaKi9Ibjbigxd

## 写业务代码的一般逻辑顺序

1. 编写Entity模型
2. 编写Repository
3. 编写订阅者(如果有需要)
4. 编写DTO验证类
5. 编写服务类用于数据操作
6. 编写控制器
7. 在逻辑模块中注册提供者(包括服务类，订阅者等)以及控制器，Entity，Repository
8. 在AppModule中导入逻辑模块

