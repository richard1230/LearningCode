
## Nest introduction

![img.png](img.png)

![img_2.png](img_2.png)


![img_1.png](img_1.png)


## REST API

![img_3.png](img_3.png)

![img_4.png](img_4.png)

### controllers总结

![img_6.png](img_6.png)

![img_5.png](img_5.png)

### resource controller

![img_7.png](img_7.png)

![img_8.png](img_8.png)


![img_9.png](img_9.png)


### route parameters

![img_10.png](img_10.png)


![img_11.png](img_11.png)

![img_12.png](img_12.png)


### request body and response

![img_13.png](img_13.png)

![img_14.png](img_14.png)

![img_15.png](img_15.png)

![img_16.png](img_16.png)


## Database basic

```shell
#在docker-compose.yml(就是项目)目录下执行
cd ~/WebstormProjects/fullstack/nest-events-backend

docker-compose up

```



![img_18.png](img_18.png)

系统:MySQL
服务器:mysql
用户名:root
密码为默认: example

utf8mb4_unicode_520_ci


![img_19.png](img_19.png)

![img_20.png](img_20.png)


![img_21.png](img_21.png)

![img_22.png](img_22.png)


## 小结
```shell
#开启容器
cd ~/WebstormProjects/fullstack/nest-events-backend

docker-compose up -d

#停止
docker-compose stop
```

## ORMs
![img_23.png](img_23.png)


![img_24.png](img_24.png)


```shell
pnpm add --save @nestjs/typeorm typeorm mysql
```

开启数据库

```shell
mac@192:~/WebstormProjects/fullstack/nest-events-backend|main⚡ 
⇒  docker-compose up -d

[+] Running 3/3
 ⠿ Container nest-events-backend-adminer-1   Started                                                                                           1.2s
 ⠿ Container nest-events-backend-mysql-1     Started                                                                                           1.2s
 ⠿ Container nest-events-backend-postgres-1  Started  
 
# 开启服务
pnpm dev

 ```

登陆数据库管理页面:

![img_25.png](img_25.png)



![img_26.png](img_26.png)

删除一个表:

![img_27.png](img_27.png)

## 21th——entity

代码见:

https://github.com/richard1230/nest-events-backend/commit/e1b446a5610e0fb38dc5c2bb52945b6e225284f5#diff-089f4f2474b64391c42b6e66aed33977e132058d92108f0a63234a7862e1f8b8

app.module.ts:主要负责连接数据库

event.entity.ts : 主要创建一个event的表,里面一定要有主键

前提需要有数据库服务,这里是利用docker起mysql这个服务的,编写了一个docker-compose.yml文件(具体操作见上)



## 22th-23th_respository pattern

![img_28.png](img_28.png)

![img_29.png](img_29.png)



![img_30.png](img_30.png)


![img_31.png](img_31.png)

#填充数据

```sql

SET NAMES utf8mb4;

INSERT INTO `event` (`id`, `description`, `when`, `address`, `name`) VALUES
(1,	'Let\'s meet together.',	'2021-02-15 21:00:00',	'Office St 120',	'Team Meetup'),
(2,	'Let\'s learn something.',	'2021-02-17 21:00:00',	'Workshop St 80',	'Workshop'),
(3,	'Let\'s meet with big bosses',	'2021-02-17 21:00:00',	'Boss St 100',	'Strategy Meeting'),
(4,	'Let\'s try to sell stuff',	'2021-02-11 21:00:00',	'Money St 34',	'Sales Pitch'),
(5,	'People meet to talk about business ideas',	'2021-02-12 21:00:00',	'Invention St 123',	'Founders Meeting');
```

![img_32.png](img_32.png)


![img_33.png](img_33.png)

![img_34.png](img_34.png)

控制器中的方法顺序很重要,先定义的优先!!!












