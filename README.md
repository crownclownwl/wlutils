## 更新历史 - releases

[API]

### 1.1.61
**王磊** Deployed for branch `develop` in `2020年6月10日 14点10分`
#### 修改模块 - Update Model
- 删除`axios`依赖
- 删除`loadsh` 依赖用 `underscorejs` 代替
- 修复 `Pinyin.js` 和 EsEnum.ts `eslint` 警告bug

### 1.1.60
**王磊** Deployed for branch `develop` in `2020年5月19日 22点04分`
#### 修改模块 - Update Model
- 删除一些无法使用的方法

### 1.1.59
**王磊** Deployed for branch `develop` in `2020年5月12日 13点40分`
#### 追加模块 - Add Model
- 追加获取文件名后缀的方法`extFileNameWithString (filename: string)`

### 1.1.58
**王磊** Deployed for branch `develop` in `2020年5月12日 08点12分`
#### 追加模块 - Add Model
- 追加可以转义html特殊字符方法`htmlEncodeByRegExp (str: string)`
- 追加可以解密html转义字符方法`htmlDecodeByRegExp (str: string)`

### 1.1.44 ~ 1.1.57
**王磊** Deployed for branch `develop` in `2020年4月23日 11点50分`
#### 修改模块 - Update Model
- 修改 `getXgClassLinkageByCache` 方法实现

#### 追加模块 - Add Model
- 新增 ES6 set 实现数组去重方法 `dedupeWithArray(array:Array<any>) `

### 1.1.43
**王磊** Deployed for branch `develop` in `2020年4月17日 11点57分`
#### 修改模块 - Update Model
- 修改获取缓存`getXgClassLinkageByCache` 和 `getGlobalCacheByKey`参数列表， isDebugger，支持开启关闭log功能；
- 修改获取对象属性方法 `getObjProperty` 参数列表，isDebugger，支持开启关闭log功能；
#### 追加模块 - Add Model
- 追加可以同时获取多个缓存的方法`getGlobalCacheByKeys(requestObj:Array<ICacheRequestParam>, succCallBack:Function, errorCallBack: Function, isDebugger?:boolean)`


### 1.1.35
**王磊** Deployed for branch `develop` in `2020年4月3日 15点40分`
#### 修改模块 - Update Model
- 追加说明文档，支持类型说明跳转

### 1.1.11
**王磊** Deployed for branch `develop` in `2020年4月3日 15点40分`
#### 修改模块 - Update Model
- 修复计数 `counts` 问题

### 1.1.10
**王磊** Deployed for branch `develop` in `2020年4月3日 15点40分`
#### 修改模块 - Update Model
- 修改 `getGlobalCacheByKey(key:any, modeName: string)` 获取缓存方法，支持学年、学期、专业、班级

#### 追加模块 - Add Model
- 新增 ES6 语法实现Java 枚举功能 `EsEnum.js`
- 新增缓存数据的枚举对象 `CACHEENUM`,帮助使用者获取指定字典值
- 新增创建 `EsEnum` 枚举对象的方法 `createEnum(arr:Array<IEsEnumItem>)`

### 1.1.9
**王磊** Deployed for branch `develop` in `2020年4月2日 15点28分`
#### 修改模块 - Update Model
- 修复 `objHasOwnProperty(value, obj, isTrue = false) ` 方法判断对象中是否存在某个属性时候报错bug

### 1.1.7
**王磊** Deployed for branch `develop` in `2020年3月17日 16点47分`
#### 追加模块 - Add Model
- 追加从地址栏中获取参数的方法 `getQueryVariable(variable?)`

### 1.1.5
**王磊** Deployed for branch `develop` in `2020年3月17日 16点47分`
#### 修改模块 - Update Model
- 修复 `objHasOwnProperty(true)` 导致返回值是 `false` bug 

### 1.1.3 、1.1.4、
**王磊** Deployed for branch `develop` in `2020年3月17日 14点01分`
#### 修改模块 - Update Model
- 修复 `isEmpty` 函数中调用 `loadsh.isEmpty()` 导致的 `boolean` 类型一直返回 true 的bug；

### 1.1.2
**王磊** Deployed for branch `develop` in `2020年3月3日 12点01分`
#### 追加模块 - Add Model
- 追加获取缓存变量方法`getGlobalCacheByKey(key:any, modeName: string)`
#### 修改模块 - Update Model
- 修改 `ApproveFilterItemData` 中的属性 `StartToEnd` 从 `string` 改为`boolean`

### 1.1.0
**王磊** Deployed for branch `develop` in `2020年3月3日 12点01分`
#### 修改模块 - Update Model
- 文件采用js 严格模式 `"use strict";`
- 修复ts 变量类型约束报错bug
- 删除所有var 改成 let定义
- 修改 `testFunction.test.ts` 添加对方法 `setFileSourceURLPerfix` 和 `getFileSourceURLPerfix` 的测试用例
- 更新API文档
#### 追加模块 - Add Model
- 追加获取变量`FILERESCOURURLPREFIX`的方法`getFileSourceURLPerfix()`；
- 追加设置变量`FILERESCOURURLPREFIX`的方法`setFileSourceURLPerfix(url:string)`；

### 1.0.3
**王磊** Deployed for branch `develop` in `2020年01月03日 12:09:36`
#### 修改模块 - Update Model
- 修复getObjProperty函数的
#### 追加模块 - Add Model
- 追加 typedoc 版本为 3.7
- 重新生成 api文档

### 1.0.2
**王磊** Deployed for branch `develop` in `2020年01月03日 12:09:36`
#### 修改模块 - Update Model
- 追加interface的注解

### 1.0.1
**王磊** Deployed for branch `develop` in `2020年01月03日 09:51:39`
#### 修改模块 - Update Model
- 修改方法 getApproveFilterReqParam ,返回值从数组改成对象

### 1.0.0


**王磊** Deployed for branch `develop` in `2020年01月02日 15:00:03`
#### 追加模块 - Add Model
- 追加根据后台响应数据获取审批流列表filter过滤的请求参数名称集合
- 追加把汉字转换成首字母大写的全拼方法
- 追加把汉字转换成大写首字母
- 修改babel支持 typescript
- 修改testFunction.test.js
- 整个项目改版成ts语法，工具累从对象改成class
- 整个项目使用typedoc生成文档

### 0.0.28
[API]

**王磊** Deployed for branch `develop` in `2019年12月14日 12点00分`

### 0.0.27
[API]


**王磊** Deployed for branch `develop` in `2019年12月14日 12点00分`
#### 文件改动 - Files Update
- 修改了 package.json 文件，修改了版本号码；
- 修改了 README.md 文件，追加了本次修改记录；
- 修改了 index.js 文件
- 追加 index.ts 文件
- 追加 jest.config.js 文件
- 追加 index.d.ts 文件
- 追加 tests 目录
- 追加 .gitigore 文件

### 更新模块 - Update Model
- 修复 objHasOwnProperty 方法，添加正则表达式过滤字符串的任意空格（包括前置和后置以及字符串中间的空格字符）
- 修复 isEmpty 方法，添加正则表达式过滤字符串的任意空格（包括前置和后置以及字符串中间的空格字符）

### 0.0.26
**王磊** Deployed for branch `master` in `2019年11月30日 17点12分`
#### 文件改动 - Files Update
- 修改了 package.json 文件，修改了版本号码；
- 修改了 README.md 文件，追加了本次修改记录；
- 修改了 index.js 修复bug

### 更新模块 - Update Model
- 修复 objHasOwnProperty 方法，添加正则表达式过滤字符串的任意空格（包括前置和后置以及字符串中间的空格字符）
- 修复 isEmpty 方法，添加正则表达式过滤字符串的任意空格（包括前置和后置以及字符串中间的空格字符）


### 0.0.22
**王磊** Deployed for branch `master` in `2019年11月25日 17点12分`
#### 文件改动 - Files Update
- 修改了 package.json 文件，修改了版本号码；
- 修改了 README.md 文件，追加了本次修改记录；
- 修改了 index.js 修复bug

### 更新模块 - Update Model
- 注释 removeItemInObjWithDeepCopy，setItemInObjWithDeepCopy， 等深度拷贝方法，防止导入umijs 项目后webview报错，es6展开符压缩过程中会报错


### 0.0.20
**王磊** Deployed for branch `master` in `2019年11月16日 17点12分`
#### 文件改动 - Files Update
- 修改了 package.json 文件，修改了版本号码；
- 修改了 README.md 文件，追加了本次修改记录；
- 修改了 index.js 添加新功能

### 新增模块 - Add Model
- 追加针对数组和对象的深拷贝的增删改操作方法

### 0.0.16
**王磊** Deployed for branch `master` in `2019年9月25日 09点29分`
#### 文件改动 - Files Update
- 修改了 package.json 文件，修改了版本号码；
- 修改了 README.md 文件，追加了本次修改记录；
- 修改了 index.js 修复bug

### 修改模块 - Update Model
- 修改获取文件路径方法

### 0.0.11
**王磊** Deployed for branch `master` in `2019年9月7日 14点24分`
#### 文件改动 - Files Update
- 修改了 package.json 文件，修改了版本号码；
- 修改了 README.md 文件，追加了本次修改记录；
- 修改了 index.js 修复获取属性判断空bug;

### 0.0.1
**王磊** Deployed for branch `master` in `2019年8月20日 20点25分`

## 目录结构 - Directory
```shell
    .   # 根目录   
    │  ├─coverage
    │  ├─docs           # typedoc文档目录
    │  │  ├─assets          #静态文件
    │  │  │  ├─css          #样式文件夹
    │  │  │  ├─images       #图片图标文件夹
    │  │  │  ├─js           #js文件夹
    │  │  ├─classes         #导出的class文件夹
    │  │  │  └─wlutils.html    # wlutils说明文档页面
    │  │  ├─interfaces         #ts类型约束说明目录
    │  │  ├─modules            #ts依赖说明目录
    │  │  ├─globals.html       #ts依赖说明页面
    │  │  ├─index.html         #文档首页
    │  ├─oldDocs           # jsdoc文档目录
    │  │  ├─0.0.31           # 文档版本目录
    │  │  │  ├─fonts
    │  │  │  ├─scripts
    │  │  │  ├─styles
    │  │  │  └─index.html    # 文档主页
    │  │  ├─0.0.28           # 文档版本目录
    │  │  │  ├─fonts
    │  │  │  ├─scripts
    │  │  │  ├─styles
    │  │  │  └─index.html    # 文档主页
    │  │  ├─0.0.27           # 文档版本目录
    │  │  │  ├─fonts
    │  │  │  ├─scripts
    │  │  │  ├─styles
    │  │  │  └─index.html    # 文档主页
    │  ├─node_modules       # 项目依赖
    │  ├─tests             # 项目单元测试
    │  │  └─testFunction.test             # 项目单元测试文件
    │  ├─index.d.ts         # ts 类型约束文件
    │  ├─index.js           # 普通js工具源码文件，方便不是ts 环境的项目导入，方法与 index.ts文件一致
    │  ├─index.ts           # ts 类型的工具源码文件
    │  ├─jest.config.js     # 单元测试配置文件
    │  ├─jsdoc-conf.json    # jsdoc 配置文件
    │  ├─declarations.d.ts  # 排除某些不是typescript的组件不校验
    │  ├─babel.config.js    # babel配置文件
    │  ├─.gitignore         # git忽略的目录
    │  ├─CHANGELOG          # 修改记录
    │  ├─package-lock.json  # 项目依赖配置
    │  ├─package.json       # 项目依赖配置
    │  ├─yarn.lock          # 项目依赖配置
    │  ├─yarn-error.log     # yarn 命令报错记录
    │  └─README.md          # git 说明文档
```

## 运行测试 - Run Test
```shell
    # 执行如下命令：即可执行 单元测试用例
    $ yarn test # 或者 npm test

    # 效果如下：
    yarn run v1.22.0
$ jest --coverage
 PASS  tests/testFunction.test.ts (6.805s)
  Enzyme get static variable test
    √ Enzyme get file source's path test (3ms)
    √ Enzyme get cache data test (6ms)
    √ Enzyme set file source's path test (1ms)
    √ Enzyme get file source's path with method test
  Enzyme universal function in wlutils test
    √ Enzyme create Enum  test (1ms)
    √ Enzyme is there a property in the object test (1ms)
    √ Enzyme is empty test (1ms)
    √ Enzyme is not empty test
    √ Enzyme get a property in the object test (1ms)
    √ Enzyme get a property in the object with null string test (1ms)
    √ Enzyme get a property in the object with space string test (1ms)
    √ Enzyme get a property in the object with null object test
    √ Enzyme get a property in the object with null array test (1ms)
    √ Enzyme get a property in the object with 'null' test
    √ Enzyme get a property not in the object test (1ms)
    √ Enzyme get file Uri test (3ms)
    √ Enzyme property of string in object test (1ms)
    √ Enzyme add item in the array with deep copy test (2ms)
    √ Enzyme update item in the array with deep copy test (1ms)
    √ Enzyme remove item in the array with deep copy test (1ms)
    √ Enzyme format string by number's string  test (2ms)
    √ Enzyme is array for object test (1ms)
    √ Enzyme is object for object test (1ms)
    √ Enzyme is number for object test (7ms)
    √ Enzyme is string for object test (1ms)
    √ Enzyme get string of requestName in response data's select data test (9ms)
    √ Enzyme get string with all capital letters test (1ms)
    √ Enzyme get string with capital letters test
    √ Enzyme encode html string by regExp test (1ms)
    √ Enzyme decode html string by regExp test (1ms)
    √ Enzyme get file extension string  test (1ms)

    console.info index.ts:69
    ++++++++++++++++++欢迎使用wlutils工具，您的使用是对我的最大鼓励！++++++++++++++++++

    console.info index.ts:70
    ========================   磊皇天下第一！！！   =============================

    console.info index.ts:71
    ========================   (●'◡'●) o(*￣▽￣*)ブ   =============================

    console.log tests/testFunction.test.ts:39
      缓存枚举如下： [
        { code: 'Dict', name: '字典', packageName: 'sys' },
        { code: 'XgGrade', name: '学年', packageName: 'grade' },
        { code: 'XgTerm', name: '学期', packageName: 'term' },
        { code: 'JwProfessional', name: '专业', packageName: 'dsms' },
        { code: 'XgClass', name: '班级', packageName: 'xg.class' },
        { code: 'JwSubject', name: '课程', packageName: 'jw' }
      ]

    console.info tests/testFunction.test.ts:213
      http://124.235.206.62:9808/guanlixitong/fileSys/ueditor/file/20190923/1569205002340032551.doc

    console.log tests/testFunction.test.ts:482
      {
        RiQiXuanZeKaiShiShiJian: 'startDate',
        RiQiXuanZeJieShuShiJian: 'endDate',
        ShiXiangBiaoShu: 'remarks',
        ShenPiZhuangTai: 'status'
      }

    -----------|----------|----------|----------|----------|-------------------|
    File       |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
    -----------|----------|----------|----------|----------|-------------------|
    All files  |    66.43 |    44.04 |    61.76 |    67.37 |                   |
    EsEnum.ts  |    43.75 |       40 |       75 |    43.75 |... 42,143,144,147 |
    Pinyin.js  |    63.51 |    54.17 |      100 |    67.74 |... 06,109,113,120 |
    index.ts   |    68.27 |    43.57 |    51.02 |    68.96 |... 1867,1871,2304 |
    -----------|----------|----------|----------|----------|-------------------|
    Test Suites: 1 passed, 1 total
    Tests:       31 passed, 31 total
    Snapshots:   0 total
    Time:        7.568s
    Ran all test suites.
    Done in 9.59s.
```

## 运行生成 `JsDoc` 文档 - Run Generation JSDocs
```shell
    $ yarn jsdoc

    # 效果如下：
    yarn run v1.21.0
    $ jsdoc index.ts -c jsdoc-conf.json
    Done in 0.56s.
```



[API]: https://github.com/crownclownwl/wlutils/blob/master/oldDocs/idsutil/1.1.60/index.html