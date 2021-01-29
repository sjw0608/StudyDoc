# MySql

## 1. 表

表是一种`结构化的文件`，可以用来存储特定类型的数据。另外表都有特定的名称，而且不能重复。表具有几个概念：`列、行、主键`。列叫做字段（Column），行叫做表中的记录，每一个字段都有：`字段名称/字段数据类型/字段约束/字段长度`

### 1.1 创建表

- 语法格式
  - default 给字段添加默认值

```sql
create table `tableName`(
	emaile varchar(50) default 'm',
  createTime date ,
  ...
  columnName dataType(length),
);
set character_set_results = 'gbk'; // 设置查询结果显示的格式，只对当前对话框有效
```

### 1.2 删除表

```sql
drop table `表` // 这种删除没有表就会报错
```

### 1.3 表的复制

```sql
creat table 新表 as select * from 旧表 WHERE 条件
```

### 1.4 将查询结果插入到某张表中

```sql
creat table 新表 as select * from 旧表 WHERE 条件
insert into 新表 select * from 旧表 WHERE 条件
```

### 1.5 增/删/改 表结构

```sql
// 添加
alter table 表名 add 字段名 字段类型(length)
// 修改某一字段长度等
alter table 表名 modify 字段名 字段类型(length)
// 删除
alter table 表名 drop 字段名 
```



## 2. 数据库的数据类型

- int  
  -  整数型
  - Int(3) 表示最大可以存储 999
- bigint
  - 长整型
- varchar   
  - 可变长度字符串
  - varchar(3) 表示存储的数据不能超过3个字符长度
- char   
  - 定长字符串
  - varchar 和 char 对比
    - 都是字符串类型
    - varchar比较智能，可以根据实际的数据长度分配空间，比较节省空间，但是在分配的时候需要执行相关的判断程序，效率较低
    - char不需要动态分配空间。所以执行效率很高，但是可能会导致空间浪费
    - 若字段中的数据不具备伸缩性，建议采用 char 类型存储
    - 若字段中的数据具备很强伸缩性，建议采用 varchar 类型存储
  - char(3) 表示存储的数据不能超过3个字符长度
- date  
  -  日期类型
  - 在实际开发中为了通用，所以时间类型一般不使用，采用字符串代替日期比较多
- float
  - 浮点型单精度
- dobule   
  - 浮点型双精度
  - dobule(7,2) 7表示7个有效数字，2表示两个小数位
- blob
  - Binary Large Object 二进制大对象
  - 专门存储流媒体等数据
  - 数据库表中存储一个图片很常见，视频一般都是链接地址
- clob
  - Character Large Object 字符大对象
  - 可以存储比较大的文本，4G+的字符串可以存储
- 其他...

## 3. SQL语句分类

- 数据库查询语言 （DQL）
  - 代表关键字：`select(查询)`
- 数据操作语言 （DML）-> 增删改表中的记录
  - 代表关键字：`insert(插入)`、` delete(删除)`、`update(更新)`
- 数据库定义语言（DDL）-> 增删改表的结构
  - 代表关键字：`create(创建)`、`drop（删除）`、`alter（修改）`
- 事务控制语言（TCL）
  - 代表关键字：`commit(提交)`、`rollback(回滚)`
- 数据控制语言（DCL）
  - 代表关键字：`grant()`、`revoke()`

## 4. 完整的DQL语句总结

```sql
select
			...
from
			...
where
			...
group by
			...
having
			...
order by
			...
			
第一：以上的关键字执行顺序不能变，严格遵守
第二：执行顺序
			1、from      从某张表中检索数据
			2、where     经过某条件进行过滤
			3、group by  然后分组
			4、having    分组之后不满意再过滤
			5、select    查询出来
			6、order by  排序输出
```

## 5. 连表查询

### 5.1 连接查询方式

- 内连接
  - 等值连接
  - 非等值连接
  - 自连接
- 外连接
  - 左外连接（左连接）
  - 右外连接（右连接）
- 全连接

### 5.2 多张表连接查询，没有条件进行限制，会发生什么现象？

:warning: 在进行多表连接查询的时候，尽量给表其别名，这样效率高，可读性高

:red_circle: 若两张表进行连接查询的时候没有任何条件限制，最终的查询结果总数是两张表记录条数成积，这种现象被称为`笛卡尔积现象`。为了避免这一现象的发生，必须在进行连表连接的时候添加限制条件。

> 多张表进行表连接的语法格式

```sql
select
			...
from
			a
join
			b
on
			条件
join
			c
on
			条件

原理：a 和 b 表进行连接之后，a 表再和 c 表进行表连接
```

## 6. 子查询

### 6.1 什么是子查询

- select 语句嵌套 select 语句

### 6.2 子查询可以出现在哪儿

```sql
select 
			..(select).
from
			..(select).
where 
			..(select).
```

## 7. SQL 增删改表中数据操作

### 7.1 插入数据 insert

:red_circle: 字段和值必须一一对应，个数必须相同，数据类型必须一直，当一张表创建之后，没有指定约束的话，可以为NULL，并且没有指定任何默认值的话，默认值就是NULL，这里的默认值NULL表示：若插入数据的时候没有给改字段任何数据，默认插入NULL值

:red_circle: insert 语句字段的名字可以省略，但是插入的数量必须跟字段数量保持一致（不建议使用）

```sql
insert into tableName (columnName1...) values (value1...);
```

### 7.2 更新数据 update

:warning: update 语句没有条件，会讲一张表中所有数据全部更新

```sql
update 表名 set 字段名=字段值,字段名=字段值 where 条件
```

### 7.3 删除数据 delete

:warning: 若没有条件，会将整个表中数据全部删除

```sql
delete from 表名 where 条件
```

## 8. 约束

### 8.1 什么是约束

- 约束对应的单词：constraint
- 约束实际上就是表中数据的限制条件
- 表在设计的时候加入约束的木碧就是为了保证表中的记录完整和有效

### 8.2 约束包括哪些？

	- 非空约束    not null
	- 唯一性约束  unique
	- 主键约束      primary key 简称 PK
	- 外键约束      foreign key 简称 FK
	- 检查约束     【目前不支持MYSQL，Oracle数据库支持】

### 8.3 非空约束

- not null 约束的字段，不能为 NULL 值，必须给定具体的数据
- 创建表，给字段添加非空约束 【创建用户表,用户不能为空】

```sql
create table user(
	id int(10),
  name varchar(32) not null,
  email varchar(123)
);
```

### 8.4 唯一约束

- unique 约束的字段具有唯一性
- unique 约束的字段不能重复，但是可以为 NULL
- 创建表，保证邮箱地址唯一

```sql
// 列级约束
create table t_user(
	id int(10),
  name varchar(32) not null,
  email varchar(123) unique
);

// 表级别约束，表级约束还可以给约束起名字
// 使用表约束可以给多个字段联合添加约束
drop table t_user
create table t_user(
	id int(10),
  name varchar(32) not null,
  email varchar(123),
  constraint t_user_emaile_unique unique(email)
);
```

### 8.5 not null 和 unique 可以联合使用吗？

- 可以联合使用
- 被not null unique 约束的字段，既不能为空，也不能重复

### 8.6 主键约束 `primary key 简称 PK`

#### 8.6.1 主键涉及到的术语

	-	主键约束
	-	主键字段
	-	主键值

#### 8.6.2 以上的主键约束、主键字段、主键值的关系？

> 表中的某个字段添加主键约束之后，改字段被称为主键字段，主键字段中出现的每一个数据都被称为主键值

#### 8.6.3 主键的作用

> 给某个字段添加主键约束之后，改字段不能重复，并且不能为空，效果和 `not null unique`约束相同，但是本质不同，主键约束除了可以做到 `not null unique`之外，主键字段还可以默认添加索引`index`

- 一张表应该有主键字段，若没有，表示这张表是无效的

- `主键值` 是当前行数据的唯一标识符。`主键值` 是当前行数据的身份证号
- 即使表中的两行记录相关的数据是相同的，但是由于主键值不同，我们认为这是两行完全不同的水据

- 给一个字段添加主键约束，被称为单一主键
- 给多个字段联合添加一个主键约束，被称为符合主键
- 无论是单一主键还是复合主键，一张表主键约束只能有一个

#### 8.6.4 主键根据性质分类

- 自然主键
  - 主键值若失一个自然数，这个自然数跟当前表的业务没有任何关系，这种主键叫做自然主键
- 业务主键
  - 主键值若和当前表中业务紧密相关的，那么这种主键被称为业务主键，当业务数据发生改变的时候，主键值通常会收到影响，所以业务主键使用较少。大部分都是使用自然主键。

#### 8.6.5 自增

在MYSQL数据库管理系统中提供了一个自增的数字，专门用来生成主键值。主键值不需要用户维护，也不需要用户提供了，自动生成。这个自增的数字默认从1开始，以1递增：1，2，3，4，5...



### 8.7 外键约束 `foreign key 简称 FK`

#### 8.7.1 外键涉及的术语

- 外键约束
- 外键字段
- 外键值

#### 8.7.2 以上的外键约束、外键字段、外键值的关系？

- 某个字段添加外键约束之后，改字段成为外键字段
- 外键字段中的每一个数据都是外键值

#### 8.7.3 外键也分为：

- 单一外键 【给一个字段添加外键约束】
- 复合外键 【给多个字段联合添加一个外键约束】

#### 8.7.4 一张表可以有多个外键字段

#### 8.7.5 分析场景

请设计数据库表用来存粗学生和班级信息，给出两种解决方案：

- 第一种方案：将学生信息和班级信息存储到一张表中

```sql
// 学生信息表 t_student
sno(pk)  sname  classno   cname
1				 jack   100       北京...高三一班
2				 zhan   100       北京...高三一班

// 以上设计的缺点：数据冗余
```

- 第二种解决方案：将学生信息和班级信息分开两张表存储，学生表 + 班级表

```sql
// 学生表 t_student
sno(pk) sname  classno(fk)
1       jack	 100

// 班级表 t_class
cno(pk) cnane
100     北京...高三一班
200     北京...高三二班

// 为了保证 t_student表中的classno字段中的数据必须来自于 t_class 表中的数据，有必要给 t_student 表中的classno字段添加外键约束，classno字段被称为外键字段，改字段中的100 200 被称为外键值。classno这里是一个单一外键字段。
```

:warning:  注意

	-  外键值可以为NULL。

- 外键字段去引用一张表的某个字段的时候，被引用的字段必须具有 unique 约束。
- 有了外键引用之后，表分为父表和子表，以上父表是：班级表，子表是：学生表，创建的时候先创建父表，在创建子表；删除数据的时候先删除子表中的数据，在删除父表中的数据；插入数据的时候先插入父表中的数据，在插入子表中的数据。

```sql
// 班级表
create table t_class(
	cno int(3) primary key,
  cname varchar(128) not null unique
)
// 学生表
create table t_student(
  sno int(3) primary key,
  sname varchar(128) not null,
  classno int(3),
  constraint t_student_classno_fk foreign key(classno) references t_class(cno)
)

// 插入数据
insert into t_class(cno,cname) values (100,'1班')
insert into t_class(cno,cname) values (200,'2班')

insert into t_student (sno,sname,classno) values(1,'jack',100)
insert into t_student (sno,sname,classno) values(2,'mark',100)
```

:red_circle: 典型的一对多设计，再多的地方加外键

## 9. 级联更新和删除

- 添加级联更新和级联删除的时候需要在外键约束后面添加

- 在删除父表中数据的时候，级联删除子表中的数据 `on delete cascade`

  - 删除外键约束

  ```sql
  alter table t_student drop foreign key t_student_classno_fk;
  ```

  - 添加外键约束

  ```sql
  alter table t_student add constraint t_student_classno_fk foreign key(classno) references t_class(cno) on delete cascade;
  ```

- 在更新父表中数据的时候，级联更新子表中的数据`on update cascade`

  - 删除外键约束

  ```sql
  alter table t_student drop foreign key t_student_classno_fk;
  ```

  - 添加外键约束

  ```sql
  alter table t_student add constraint t_student_classno_fk foreign key(classno) references t_class(cno) on update cascade;
  ```

- 以上的级联更新和级联删除谨慎使用，因为级联操作会将数据改变或者删除

## 10. 事务

### 10.1 事务的四个特性(ACID)

- 原子性(A)
  - 事务是最小的工作单元，不可再分
- 一致性(C)
  - 事务要求所有的DML语句操作的时候，必须保证同时成功或者同时失败
- 隔离型(I)
  - 事务A 和 事务B 之间具有隔离型
- 持久性(D)
  - 是事务的保证，事务终结的标志【内存中的数据持久到硬盘文件中】

### 10.2 关于一些术语

- 开启事务
  - start transaction
- 事务结束
  - end transaction
- 提交事务
  - commit transaction
- 回滚事务
  - Rollback transaction

### 10.3 和事务有关的两条重要的SQL语句【TCL】

- commit   提交
- rollback 回滚

### 10.4 事务开启/结束的标志

- 开始的标志
  - 任何一条DML语句执行，标志事务的开启
- 结束的标志
  - 提交或者回滚
  - 提交：成功的结束，将所有的DML语句操作历史记录和底层硬盘文件中的数据来一次同步
  - 回滚：失败的结束，将所有的DML语句操作历史记录全部清空

> :red_circle: 重点：
>
>在事务进行过程中，未结束之前，DML 语句是不会更改底层数据库文件的数据。
>
>知识将历史操作记录一下，在内存中完成记录。只有在事务技术的时候，而且是成功的结束的时候才会需改底层硬盘文件中的数据

### 10.5 在MYSQL数据库管理系统中，事务的提交和回滚的演示

- 在MYSQL数据库管理系统中，默认情况下，事务是自动提交的，也就是说，只要执行一条DML语句，开启了事务，并且提交了事务

- 这种自动提交机制是可以关闭的：【关闭的第一种方式】

  ```sql
  - start transaction  手动开启事务
  - DML语句。。。
  - DML语句。。。
  - 。。。
  - commit  手动提交事务【事务成功的结束】
  - 
  - start transaction  手动开启事务
  - DML语句。。。
  - DML语句。。。
  - 。。。
  - rsollback  手动回滚事务【事务失败的结束】
  ```

- 关闭自动提交的第二种方式

  ```sql
  set autocommit = off
  // 或
  set session autocommit =off
  ```

- 打开自动提交

  ```sql
  set autocommit = on
  // 或
  set session autocommit =on
  
  // 以上关闭和打开自动提交机制，只对当前会话有效
  ```

  

### 10.6 事务的四个特性之一: 隔离性（isolation）

- 事务A 和事务B 之间具有一定的隔离性
- 隔离性有隔离级别（4个）
  - Read uncommitted 读未提交
    - 事务A 和事务B ，事务A未提交的数据，事务B可以读取到
    - 这里读取到的数据可以叫做‘脏数据’或者叫做‘Dirty Read’
    - 这种隔离级别是最低级别，这种级别一般都是在理论上存在的，数据库默认的隔离级别一般都高于该隔离级别
  - Read committed 读已提交
    - 事务A和事务B，事务A提交的数据，事务B才能读取到
    - 这种隔离级别高于上面的读未提交
    - 换句话说：对方事务提交之后的数据，我当前事务才能够读取到
    - 这种隔离级别可以避免脏数据
    - 这种隔离级别会导致：‘不可重复读取’
    - oracle数据库管理系统默认的隔离级别就是：读已提交
  - Repeatable read 可重复读
    - 事务A和事务B，事务A提交之后的数据，事务B读取不到
    - 事务B是可重复读取数据的
    - 这种隔离级别高于读已提交
    - 换句话说：对方提交之后的数据我还是读取不到
    - 这种隔离级别可以避免‘不可重复读取’，达到可重复读取
    - MYSQL 数据库管理系统默认的隔离级别就是：可重复读
    - 虽然可以达到‘可重复读’的效果，但是会导致：‘幻象读’
  - Serializable  串行化
    - 事务A和事务B，事务A在操作数据库中数据的时候，事务B只能排队
    - 这种食物隔离级别一般很少用，吞吐量太低。用户体验不好
    - 这种隔离级别可以避免‘幻象读’，么一次读取的时候都是数据库表中真实的记录
    - 事务A和事务B不再并发

### 10.7 设置事务的隔离级别

- 第一种方式：修改`my.ini`配置文件

```ini
[mysqld]
transaction-isolation = READ-COMMITTED
```

- 第二种范式：使用命令方式设置事务的隔离级别

```sql
可选值：
- READ UNCOMMITTED
- READ COMMITTED
- REPEATABLE READ
- SERIALIZABLE

命令格式:
set transaction isolation level <isolation-level>;

设置事务的隔离级别适用于全局：
set global transaction isolation level ;<level>
设置事务的隔离级别适用于当前会话：
set transaction isolation level <level>;
或
set session transaction isolation level <level>;
```

### 10.8 查看隔离级别

```sql
// 查看当前会话的隔离级别
select @@tx isolation;
select @@session.tx isolation;

//查看全局的事务隔离级别：
select @@global.tx isolation;
```



## 11. 数据库设计规范

### 11.1 数据库设计三范式

> 设计数据库表的时候所依据的规范

- 第一范式
  - 要求有主键，并且要求每一个字段原子性不可再分
- 第二范式
  - 要求所有非主键字段完全依赖主键，不能产生部分依赖
- 第三范式
  - 所有非主键字段和主键字段之间不能产生传递依赖

### 11.2 几个经典的设计

- 一对一
  - 第一种方案：分两张表存储，共享主键
  - 第二种方案：分两张表存储，外键唯一
- 一对多
  - 分两张表存储
  - 在多的一方添加外键，这个外键字段引用一方中的主键字段
- 多对多
  - 分三张表存储
  - 在学生表中存储学生信息，在课程表中存储课程信息，在学生选课表中存储学生和课程的关系信息

