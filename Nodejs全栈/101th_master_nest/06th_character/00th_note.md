

## 06th_character_28th_class

![img.png](img.png)

![img_1.png](img_1.png)

## 创建模块

```shell
#创建一个名为events的模块
⇒  nest g mo events
```

![img_2.png](img_2.png)



## 35th exception filters

![img_3.png](img_3.png)


## 36th_relations

![img_4.png](img_4.png)

## 37th_one_to_many_有个注意点

Attendee在设置之前:

![img_5.png](img_5.png)

设置之后:(注意:这里如果不设置会报缺少Attendee这个表的元数据的错误!!!)

![img_6.png](img_6.png)

![img_7.png](img_7.png)

注意对比下面这两个情况:

![img_8.png](img_8.png)


![img_9.png](img_9.png)

## 38th_loading related entities

给attendee表填充数据:

```shell


INSERT INTO
    `attendee` (`id`, `name`, `eventId`)
VALUES
    (1, 'Piotr', 1),
    (2, 'John', 1),
    (3, 'Terry', 1),
    (4, 'Bob', 2),
    (5, 'Joe', 2),
    (6, 'Donald', 2),
    (7, 'Harry', 4);

```

## 39th_associating_related_entities

attendee表被编辑之前

![img_10.png](img_10.png)

attendee表被编辑之后:

测试:
```shell
⇒  curl http://localhost:3000/events/practice2
{"id":1}%
```

![img_11.png](img_11.png)

![img_12.png](img_12.png)

![img_13.png](img_13.png)



## 40th_many_to_many

创建模块:

```shell
nest g mo school
```

数据库里面的JoinTable操作对比:

![img_14.png](img_14.png)

![img_15.png](img_15.png)


具体逻辑可以看这里:

https://github.com/richard1230/nest-events-backend/commit/608df9abfdfd53cdafad914d234596995845cd57








