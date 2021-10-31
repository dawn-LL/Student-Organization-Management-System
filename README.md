# 学生组织管理系统微信小程序

# 第1章 绪论

## 1.1 背景现状

随着科技进步、人民生活水平提高和时代的发展，人们的娱乐方式也呈现多样化，出现了丰富多彩的兴趣活动。大学生作为年轻群体的主力，兴趣活动更是层出不穷，越来越多的兴趣活动出现在学校中，社团数量不断增加，每年新生入学参加社团更是出现“百团大战”的景象。随着社团数量增加，学生间的组织关系逐渐复杂起来，由最开始的年级班级组织增加了各种社团成员组织，又或者学生会组织等等，同学间的组织关系管理也变得复杂起来。

## 1.2 解决思路

高效且便捷地处理组织关系。

### 1.2.1 如何高效？ 

将所有学生作为集合X，所有组织作为集合Y，则X中会含有a=张三、b=李四等等学生，Y中会含有a1=班级、b1=学生会等等，定义二元关系R为属于关系。如图1-1所示：

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wps3dgHUg.jpg) 

图 11 学生组织二元关系

建立R=(X,Y,G(R))关系型数据库来高效地管理学生组织数据。

### 1.2.2 如何便捷？

20世纪30年代的我们已经完全步入移动端时代，手机或其他移动设备成为生活的不可或缺的一部分，主要原因之一就是其便捷。微信APP作为移动端主流应用之一，小程序更是便捷，无需安装其他应用在移动端即可使用。选择微信小程序平台则可直接享受其便捷性。

## 1.3 章节安排

第一章为绪论，介绍学生组织系统提出的背景现状，针对弊端简单提出思路，设计组织系统；

第二章为微信小程序，介绍应用微信小程序相关知识；

第三章为系统设计，介绍组织系统功能设计、数据库设计和小程序逻辑功能的详细设计；

第四章为小程序展示，展示学生组织管理系统小程序具体使用和数据库可视化操作。

 

# 第2章 微信小程序

## 2.1小程序介绍与开发环境

### 2.1.1小程序技术发展历史

随着微信APP的高速发展，其DAU不断增加，用户数量越来越庞大，其WebView逐渐成为了移动端 Web 的一个重要入口，微信官方为了方便自己Web的开发就封装了一些 JS-API 。

在2015年，微信官方打包了一整套关于Web开发的SDK，这套SDK功能十分强大，可以调用很多微信Native原生能力，比如：调用系统硬件能力（录音、拍摄）、微信APP功能（分享、支付、卡券）等等很多；然后微信将这套SDK公开发布，称为JS-SDK，这下给微信的Web开发者打开了一扇大门，让之前很难做到或是做不到的事情都可以轻而易举的实现。

JS-SDK是对微信原先Native与WebView通信工具WeixinJSBrige的一层封装并扩充了更多调用微信Native原生的能力，在微信宣布对其开放之后，SDK的使用量快速上升。随着使用数量的增加，表面上解决了很多Web能力不足的问题，但是移动网页性能的问题并没有改善，特别是Web网页的通病：白屏问题。白屏是很影响用户体验的一个问题，并且受设备性能和网速影响大，当设备低端和网络环境差时，白屏的时长会更明显。

为了解决白屏等性能问题，微信升级了JS-SDK，推出了升级版本的SDK，其中添加了微信 Web 资源离线存储技术，这是面向 Web 开发者提供的基于微信内的 Web 加速方案。

这个加速方案是使用微信Native资源存储能力，不需要每次加载网页时向服务器发送请求Web资源，如果本地有离线的Web资源，则直接从本地读取资源渲染页面即可，省掉了网络请求的耗时，可以缩短白屏时间，优化用户浏览Web页面。

但是这个离线存储方案仍不是完美的，它虽然可以解决一些白屏问题，但是对于那些使用Web资源较多的页面，即使不需要从服务端拉取Web资源，直接从本地读取，依然需要花费较多的时间去加载资源，比如：页面内有很多的CSS或者JavaScript脚本，这些文件就会占用大量的UI线程资源，一定程度上会b阻塞本地资源的读取。也会产生白屏现象，而且这样分文件的本地缓存在代码迭代时成本也是不低的，操作繁琐。

此外，除了白屏这一指标，还有其他JS-SDK没有解决的体验问题，比如一些操作的反馈：页面切换时比较生硬、点击操作的迟滞感等。虽然这些问题

除了白屏，影响 Web 体验的问题还有缺少操作的反馈，主要表现在两个方面：页面切换的生硬和点击的迟滞感。不过这对于一些有经验的开发者来说不是难题，可以其他优秀的框架或者逻辑处理解决掉，不过这样会增加大量的开发成本，产生的KPI是不够的。

所以微信团队为了使其Web功能不再受限于以上问题，设计了一个全新的系统——微信小程序，它具有JS-SDK所不具备的功能：

- 快速的加载

- 更强大的能力

- 原生的体验

- 易用且安全的微信数据开放

- 高效和简单的开发

至此，微信团队开始推广其小程序，小程序开始大放异彩，出现了各种丰富的小程序。

### 2.1.2开发环境

每个小程序都一个AppID，AppID与小程序是一一对应的。AppID需要使用微信账号申请，申请的账号可以管理小程序，是小程序管理员，可以添加协同开发者，只有协同开发者和管理员才可以开发与AppID对应的小程序。

小程序的开发语言层面与传统的Web开发区别不大，但是由于小程序渲染和逻辑分离的运行机制与传统Web开发是不同的，所有无法使用传统网页开发工具。

因此微信推出了小程序开发一站式IDE——微信开发者工具，每个AppID对应小程序的管理员或开发者在微信开发者工具上扫码即可进行开发。

开发者可以借助微信开发者工具完成小程序的代码开发、编译运行、界面和逻辑调试、真机预览和提交发布版本等功能[1]。

## 2.2小程序代码组成

小程序由配置代码JSON文件、模板代码 WXML 文件、样式代码 WXSS文件以及逻辑代码 JavaScript文件组成[1]。

### 2.2.1 JSON配置

JSON 是一种数据格式，并不是编程语言。在小程序中，JSON扮演的静态配置的角色[1]。

### 2.2.2 WXML 模板

WXML 全称是 WeiXin Markup Language，是小程序框架设计的一套标签语言，结合小程序的基础组件、事件系统，可以构建出页面的结构[1]。

### 2.2.3 WXSS 样式

WXSS（WeiXin Style Sheets）是一套用于小程序的样式语言，用于描述WXML的组件样式，也就是视觉上的效果[1]。

WXSS与Web开发中的CSS类似。为了更适合小程序开发，WXSS对CSS做了一些补充以及修改。

### 2.2.4 JavaScript 脚本

小程序的主要开发语言是 JavaScript ，开发者使用 JavaScript 来开发业务逻辑以及调用小程序的 API 来完成业务需求[1]。

## 2.3小程序发布

小程序提供了两种发布模式：全量发布和分阶段发布[1]。全量发布是指当点击发布之后，所有用户访问小程序时都会使用当前最新的发布版本。分阶段发布是指分不同时间段来控制部分用户使用最新的发布版本，分阶段发布我们也称为灰度发布。一般来说，普通小程序发布时采用全量发布即可，当小程序承载的功能越来越多，使用的用户数越来越多时，采用分阶段发布是一个非常好的控制风险的办法。因为随着程序的复杂度提高以及影响面的扩大，新版本的代码改动或多或少会带来Bug，作为服务方当然不希望异常的服务状态一下子扩散到整个用户群体，此时应该通过分阶段发布来逐步观察服务的稳定性，再决定是否进行全量发布。

## 2.4 本章小结

在本章中我们介绍了小程序的发展历史和开发环境，都是基于微信web开发经验逐渐积累演变出现的产物；又介绍了小程序的代码组成，由WXML文件提供UI组件、WXSS提供UI组件样式、JS文件提供数据逻辑支持和JSON文件提供静态配置能力；最后介绍了官方提供了两种小程序发布上线的模式：直接全量和分阶段发布两种。

 

# 第3章 系统设计

## 3.1功能模块概览

从表面上看，学生组织管理系统共由9个页面组成，分别是：登陆界面、组织列表、组织主页、公告列表、成员列表、聊天室、新建组织、新·1建公告、学生主页，不同的页面隶属不同的功能模块，下面看一下不同页面隶属哪个功能模块。

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wpsD9dYxw.jpg) 

图 3-1 功能模块概览图

### 3.1.1登录模块

登录模块是学生组织管理系统的入口，是用户进入系统时首先看到的页面，也是进入组织模块和学生主页模块的入口。

登录模块仅包含一个登陆界面，比较简单。输入正确的学号和密码即可进入系统其他模块。

### 3.1.2 组织模块

组织模块是系统的核心模块，有多个页面组成：

1）组织列表页

列表页面展示登录学生所加入的所有组织，每个组织作为列表的一个单元，类似消息列表，还有新建组织的入口。

2）新建组织

用户在新建组织页面可以添加一个新的组织，输入组织名称和组织名称必要信息，同时会默认将创建者作为管理员并加入组织。

3）组织主页

组织主页展示组织的信息：组织头像、组织名称、组织最新公告、组织负责人、组织成员数量，进入聊天室的入口和退出组织按钮。

点击公告栏、成员数量栏也会相应进入其二级页。

4）成员列表

成员列表是类似通讯录的一个页面，会将成员按字典序分组并排列。在顶部会有成员管理的两个功能：添加成员和移除成员，当然这是属于管理员的权限。

5）公告列表

公告列表记录由公告单元组成，每个公告单元展示着公告内容、发布者以及发布时间；右下角的发布按钮是进入发布页面的入口。

6）新建公告

新建公告页面比较简单，只有输入框和发布按钮，输入框可以多行输入想要发布的新公告，点击发布即可实时发布。这是属于所有组织成员的权利。

7）聊天室

聊天室也是所有组织成员可参与的，是即时通讯，类似微信等通讯类软件，可以实现图片消息和文字消息的实时发送。

### 3.1.3 学生主页模块

学生主页模块仅有学生主页一个页面组成，和消息列表构成组织系统的两个底tab。页面内展示了学生的个人信息：姓名、学号、年级、班级、学院和专业等内容。

## 3.2 数据库设计

数据库是学生组织管理系统用来存储、管理数据的优秀数据结构。

### 3.2.1 微信云开发的数据库

微信云开发提供的能力中包含数据库能力，但提供的数据库不是关系型数据，是新型的JSON文档型数据库，我们可以用它来代替关系型数据库。一个数据库可以有多个集合（相当于关系型数据中的表），集合可看做一个 JSON 数组，数组中的每个对象就是一条记录，记录的格式是 JSON 对象。关系型数据库和 JSON 数据库的概念对应关系如下表：

表格 3-1 关系型数据库与JSON数据库对应关系

| 关系型数据库 | JSON数据库        |
| ------------ | ----------------- |
| 表 table     | 集合 collection   |
| 行 row       | 记录 record / doc |
| 列 column    | 字段 field        |

### 3.2.2 集合设计

1) 将所有学生作为一个集合（表）来存储学生信息，作为学生单元

表格 3-2 student集合（表）设计

| Student（collection / table） |              |
| ----------------------------- | ------------ |
| 字段 field                    | 含义         |
| _id                           | 记录唯一id   |
| _createTime                   | 记录创建时间 |
| _updateTime                   | 记录更新时间 |
| avatar                        | 头像地址     |
| name                          | 姓名         |
| password                      | 密码         |
| student_id                    | 学号         |
| gender                        | 性别         |
| grade                         | 年级         |
| class                         | 班级         |
| specialty                     | 专业         |
| college                       | 学院         |

2）创建一个组织集合，包含所有组织

表格 3-3 组织集合（表）设计

| Organization（collection / table） |                           |
| ---------------------------------- | ------------------------- |
| 字段 field                         | 含义                      |
| _id                                | 记录唯一id                |
| _createTime                        | 记录创建时间              |
| _updateTime                        | 记录更新时间              |
| organization_name                  | 组织名称                  |
| organization_avatar                | 组织头像url               |
| organization_members（JSON数组）   | 组织成员，关联Student._id |
| announcements（JSON数组）          | 组织公告列表              |
| admin                              | 管理员，关联Student._id   |

3）聊天室集合，用于存储聊天室的每条消息

表格 3-4 聊天室集合（表）设计

| Chatroom（collection / table） |                              |
| ------------------------------ | ---------------------------- |
| 字段 field                     | 含义                         |
| _id                            | 记录唯一id                   |
| group_id                       | 组织ID，关联organization._id |
| msg_type                       | 消息类型（text/image）       |
| avatar                         | 发送者头像url                |
| name                           | 发送者姓名                   |
| sendTime                       | 发送时间                     |
| sendTimeTS                     | 发送时间戳                   |
| textContent                    | 文本内容                     |
| imgFileID                      | 图片地址                     |
| user_id                        | 发送者id，关联Student._id    |

### 3.2.3 数据模型E-R图

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wpsz34yNQ.jpg) 

图 3-2 组织数据模型E-R图

图中实体有3个：学生、组织和聊天室

主要说一下实体之间的联系：

学生与组织之间存在隶属的联系，1个组织可能有n个学生成员；

学生与聊天室之间存在参与关系，n个学生使用n个聊天室功能进行聊天；

聊天室与组织之间存在拥有关系，1个组织拥有1个聊天室。

## 3.3 小程序逻辑设计

按功能模块部分讲述不同页面的数据和逻辑流程。

### 3.3.1登录页面

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wpsCIZbph.jpg) 

图 33 登录流程图

学生在登录界面输入学号和密码即可请求登录，会调用腾讯云服务的login云函数[1]（无需自己部署服务器，只需编写业务代码），login云函数会在student集合中查询学号等于用户输入的，对比学号对应的密码是否与登录者相同，相同则登录成功。login云函数代码见附录。

### 3.3.2组织列表

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wpsj2CB1B.jpg) 

图 34 组织列表渲染流程

组织列表页面属于数据驱动渲染页面，需要拿到数据后才会进行页面渲染，没有数据时会处于骨架屏loading状态。

学生在首次登录进入组织列表、从其他页面返回或者在列表页面内下拉请求刷新时，都会获取全局userInfo用户数据，然后调用云函数get-organization-list并把userInfo作为函数的参数传入，云函数会在organization集合中查询组织成员中包含userInfo.id的组织，然后返回所有符合查询条件的组织列表；小程序拿到列表（JSON数组）后调用setData给页面设置数据。因为页面是数据驱动的方式，所以在设置数据后会驱动页面刷新UI重新渲染，结束骨架屏loading状态。

### 3.3.3新建组织

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wpsddZF2q.jpg) 

图 35 新建组织流程

新建组织页面无需数据驱动渲染，进入这个页面后输入组织的名称和选择组织的头像既可以创建新的组织。选择组织头像分两种情况：一是选择系统默认头像，这样的话图片资源的url是系统已知的，另一种情况就是用户选择自己上传系统头像，这样需要先调用微信的接口wx.chooseImage()上传设备相册图片或者拍照，再通过wx.uploadFile()接口上传图片至云端获取url。当组织名称和图片url输入完整后就可以向数据库organization集合中添加一条新的记录作为一个新的组织；添加成功后会返回组织列表页自动刷新即可看见新建的组织。

### 3.3.4组织主页

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wpsJAU5T1.jpg) 

图 36 组织页面加载流程

组织主页也属于数据驱动渲染页面,所以页面渲染需要数据，没有数据时会处于骨架屏loading状态。

页面的大部分数据是通过路由参数带入的，比如：组织名称、组织头像url、组织id、组织公告、组织管理员id和成员的数量，页面需要显示的是管理员姓名不是id，所以做一次student表的查询，拿到管理员姓名后设置页面数据即可进行渲染，结束loading状态。

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wpsxDrROT.jpg) 

图 37 退出组织流程

退出组织是在组织主页的一个按钮，分两种情况：一是组织管理员id等于全局userInfo.id，意思是登录用户为当前组织的管理员，退出的话就会解散组织，再点击退出就会解散组织，从organization表中删除当前组织的记录；另一种情况就是登录用户只是组织的普通成员，退出组织操作仅会将其student集合的记录id从组织的成员数组中删掉。

### 3.3.5公告列表

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wpsex8N8R.jpg) 

图 38组织列表加载流程 

公告列表页面也属于数据驱动渲染页面，但是未使用骨架屏，默认样式是暂无公告，加载数据后再展示公告列表。

公告列表进入后从路由参数中取组织id，然后调用云函数get-organization-info来在数据库organization集合中查询组织id等于路由参数的记录并返回组织信息，从组织信息中取公告列表数据再调用setData设置页面数据进行页面渲染。

### 3.3.6新建公告

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wps95Pqbl.jpg) 

图 39创建公告流程图

创建公告页面无需数据驱动渲染，获取路由参数后即渲染公告输入框和发布按钮。用户在完成输入公告内容后点击发布，就会调用云函数add-organization-announcement，在数据库organization集合的organization_id记录中的announcements数组添加公告。

云函数执行完成后更新视图栈中的上一级页面公告列表页数据，重新渲染；再更新上上级页面组织主页公告栏数据，重新渲染。发布完成，跳转回到公告列表页面。

### 3.3.7成员列表

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wpseFfmbg.jpg) 

图 310成员列表加载流程

成员列表页面也是数据驱动渲染页面，需要在获取到组织成员列表后才能渲染，在拿到数据之前展示骨架屏loading态。

成员列表页面从路由参数中获取组织id，根据id请求get-student-list云函数，云函数会返回按字典序分组并排列好的成员数据列表方便小程序进行渲染。

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wpsnV4uvj.jpg) 

图 311 get-student-list云函数流程

get-student-list云函数比其他云函数复杂一些，不只是简单的数据库查询操作：

1）首先它是根据参数组织id查询organization集合的记录，取出组织成员列表；

2）这时的成员只是一堆student集合的记录id，而且是无序的，需要再在student集合中查询每个id对应的name值；

3）做完id到name转换后，需要将name按字典序分组排列，这时用到了第三方库《汉字拼音转换工具》，通过此组件可以将中文转换成拼音；

4）再将拼音列表按照字典序排序并分组就是比较简单的了。

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wpsOmR2LR.jpg) 

图 312成员管理流程图

成员管理功能分为两种：添加成员和移除成员。

添加成员功能和移除成员流程类似，点击后都会提示微信模态弹窗，提醒输入待添加或移除的成员的学号，再在student集合中查询学号对应的id，然后在organization集合中对于当前记录的组织成员数组添加或移除之前查询的student集合id。

### 3.3.8聊天室

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wpsFslH5f.jpg) 

图 313聊天室初始化流程

传入聊天室所需的数据：聊天室集合、聊天室id（groupID）、用户信息和环境id，来进行聊天室模块的初始化。

在数据库传入的集合中查询传入groupID的记录，并取出按时间顺序排序的20条消息，设置给页面数据并渲染消息，再继续监听集合数据变化。

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wpszF0DFf.jpg) 

图 3-14新消息接收流程

新消息接受基于微信数据库提供的实时消息推送能力：给定查询条件，每当数据库更新而导致查询条件对应的查询结果发生变更时，小程序可收到一个更新事件，其中可获取更新内容和更新后的查询结果快照。

接受变化的快照后，在当前消息列表中查询是否存在相同id，如果有的话，替换消息；如果没有的话说明是新消息插入到消息列表；再将数组按时间戳顺序排序，设置页面数据渲染聊天页面。

如果是自己新发的消息或者其他人的消息将聊天列表滚动到底部方便用户使用。

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wps6nE4sy.jpg) 

图 3-15发送消息流程

用户在输入框中输入消息，点击发送就会生成消息信息，包含：消息id、发送时间戳、消息类型、消息内容、发送者姓名、发送者头像url、发送者id、聊天室groupID；这时将消息状态置为发送中，再在数据库collection消息集合中添加记录，完成后的回调将消息类型置为发送完成，页面将发送中的消息渲染为发送完成的消息，一条消息就发送完成了。

### 3.3.9学生主页

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wpsiDdfTl.jpg) 

图 3-16学生主页加载流程图

学生主页属于数据驱动渲染页面，会在获取全局数据userInfo后请求云函数get-student-info返回学生个人信息，再调用setData设置页面数据，驱动页面进行渲染。

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wpsCY8f04.jpg) 

图 3-17退出登录流程

学生主页包含一个退出登录按钮，点击可以退出组织管理系统。其流程比较简单：点击退出后会弹一个确认视图，点击确认后会清空全局用户数据userInfo和所有页面，然后回到登录页面。

### 3.3.10 逻辑测试

系统测试账号：2017201918

系统测试密码：123456

测试环境：微信开发者工具打开组织系统小程序项目，编译即可。

 

## 3.4 本章小结

在本章中我们介绍了学生组织管理系统的功能设计、数据库设计和逻辑设计。功能设计介绍了组织管理系统的三大模块：登录、组织和学生主页模块，就每个模块所包含的页面以及各个模块页面包含的功能作了陈述；数据库设计则是介绍了采用的微信官方提供的JSON数据库，它与关系型数据库的对应关系，并用它实现了关系型数据库的功能，以及学生组织管理系统的三个集合（表）设计，通过E-R图来更直观地展示了数据模型；最后逻辑设计则是按功能设计模块的划分，分别介绍了各个功能的逻辑数据流程，通过流程图来直观地展现，还有测试环境，将项目使用开发者工具打开编译即可运行测试。 

 

# 第4章 小程序展示

## 4.1小程序码

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wpsNvk9tg.png)       ![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wpsmSegNE.jpg)

图 4-1小程序码             图 4-2 小程序体验二维码

发布后，微信扫一扫小程序码即可进入小程序。未发布时体验组成员可以扫描体验二维码进入。

## ![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wpscjW9W1.jpg)![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wpsj7eaoD.png)4.2 登录

输入学号和密码即可登录系统。

## 4.3 组织列表页

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wpsYCzy82.jpg) 

图 4-4组织列表

组织列表页展示登录用户已加入的所有组织，下拉可以刷新页面。每个组织cell展示组织头像、组织名称和最新公告。

## 4.4学生主页

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wps0mUJZg.jpg)  ![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wpsT5AvRh.jpg)

图 4-5退出登录                   图 4-6学生主页

学生主页展示学生个人信息，并且有退出系统按钮，点击可以退出登录。退出登录，返回未登录状态。

## 4.4 创建组织

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wpsGfcarW.jpg) 

图 4-7创建组织

输入组织名称和选择组织头像后即可创建一个新的组织。头像可以选择默认的或者自定义从相册和拍照选择。

 

 

 

 

 

 

## 4.5 组织主页

### 4.5.1 组织主页列表

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wpsjFKCvb.jpg) 

图 4-8组织主页

组织主页展示组织信息：头像、名称、最新公告、负责人、成员数量。公告栏可以跳转至公告页面，成员栏可以跳转至成员列表页，退出按钮可以退出组织。

### 4.5.2 退出组织

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wpsem0ZuV.jpg)     ![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wps2HBRJT.jpg)

图 4-9管理员退出组织            图 4-10非管理员退出组织

区分用户是否是管理员，是管理员会解散组织，不是管理员则仅退出组织。

 

 

 

 

 

 

 

 

 

## 4.6 公告

### 4.6.1 公告列表

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wpsm15F1G.jpg) 

图 4-11公告列表

公告列表展示组织所有发布过的公告，以及创建者和时间。

### 4.6.2 创建公告

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wpsyjfCp8.jpg) 

图 4-12创建公告

在输入框输入公告内容即可发布，作为组织最新公告。

## 4.7 组织成员

### 4.7.1 成员列表

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wpssHCblS.jpg) 

图 4-13成员列表

成员列表展示组织内所有成员，并按字典序分组排了，而且有成员管理入口。

### 4.7.2 成员管理

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wps0VBlgE.jpg)     ![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wps68VFOe.jpg)

图 4-14移除成员          图 4-15添加成员

添加、移除成员在弹窗内输入要操作的学号就可以添加或移除了。

## 4.8 聊天室

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wpsP0JCLi.jpg) 

图 4-16聊天室

聊天室界面，可以与组织内成员进行即时通信；而且支持图片消息类型。

 

 

 

 

 

 

 

 

 

 

 

 

## 4.9 数据库管理

微信提供了可视化内容管理平台方便我们管理数据库模型，无需编码即可使用，方便使用。组织系统使用内容平台管理student集合和organization集合。

可以实现批量导入学生数据。

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wpsN0eqhn.png) 

图 4-17可视化数据库student模型

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wpsD8PYHf.png) 

图 4-18可视化数据库student集合

![img](file:////private/var/folders/7l/d0s8nvwj51n6m0hqrc1_c27c0000gp/T/com.kingsoft.wpsoffice.mac/wps-bytedance/ksohtml/wps2rWori.png) 

图 4-19 可视化数据库student集合添加记录

## 4.10 本章小结

本章先给出了学生组织系统微信小程序的小程序码，待发布后即可扫码进入系统；然后详细地展示了系统的各个页面，简单地对页面内功能进行了阐述；最后展示了如何方便地向数据库导入学生信息。

 

# 结束语

本文就繁琐难以处理的学生组织关系，提出了学生组织管理系统微信小程序设计，用来高效便捷处理组织关系；然后介绍微信小程序开发的相关知识，阐述了小程序的诞生、发展以及小程序开发和发布的相关知识；再介绍了小程序的系统设计，包括功能设计、数据库设计和逻辑设计；最后演示了小程序的各个功能的页面和数据库可视化操作。

小程序体验版功能测试正常，可以正常实现功能设计模块中的功能。