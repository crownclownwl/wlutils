/**
 * @description 测试类
 * @author 王磊（磊皇）
 * @time 2019年8月15日 14点32分
 * @lastEditTime 2020年3月3日 14点32分
 * @lastEditors 王磊（磊皇）
 */
import Enzyme from 'enzyme'
import wlutils from '../index';
import { exportAllDeclaration } from '@babel/types';
// const {shallow,mount,render}=Enzyme;

/**
 * describe块称为"测试套件"（test suite），
 * 表示一组相关的测试。它是一个函数，
 * 第一个参数是测试套件的名称（"add"），
 * 第二个参数是一个实际执行的函数。
 *
 * it块称为"测试用例"（test case），
 * 表示一个单独的测试，是测试的最小单位。
 * 是一个函数，第一个参数是测试用例的名称（"6 + 7 = 13"），
 * 第二个参数是一个实际执行的函数。
 * 
 * @function
 * @param {string} args1 用来描述测试分组描述
 * @param {Function} args2 用来执行的测试分组函数
 */
describe("Enzyme get static variable test", function () {
    
    // 测试获取的文件资源路径是否正确
    it("Enzyme get file source's path test", function () {
        const filePath = wlutils.FILERESCOURURLPREFIX;
        expect(filePath).toBe("/guanlixitong/fileSys/");
    });

    // 测试获取的
    it("Enzyme get cache data test", function () {
        const cacheEnum:any = wlutils.CACHEENUM;
        console.log("缓存枚举如下：", cacheEnum.getValues());
        expect(cacheEnum.Dict.name).toBe("字典");
        expect(cacheEnum.getNameByCode("Dict")).toBe("字典");
        expect(cacheEnum.getCoedByName("字典")).toBe("Dict");
    });

    // 测试设置的文件资源路径是否正确
    it("Enzyme set file source's path test", function () {
        wlutils.setFileSourceURLPerfix("testURL");
        const filePath = wlutils.FILERESCOURURLPREFIX;
        expect(filePath).toBe("testURL");
    });

    // 测试获取的文件资源路径是否正确
    it("Enzyme get file source's path with method test", function () {
        wlutils.setFileSourceURLPerfix("/guanlixitong/fileSys/");
        const filePath = wlutils.getFileSourceURLPerfix();
        expect(filePath).toBe("/guanlixitong/fileSys/");
    });
})

/**
 * 测试定义的通用的工具类函数
 * @function
 * @param {string} args1 用来描述测试分组描述
 * @param {Function} args2 用来执行的测试分组函数
 */
describe("Enzyme universal function in wlutils test", function () {
    
    // 测试创建枚举对象
    it("Enzyme create Enum  test", function(){
        let tetsArray = [
            {code: 'WAIT_APPROVE', name: "未审核"},
            {code: 'ENABLED', name: '启用'},
            {code: 'REFUSED', name: '审核未通过'},
            {code: 'DISABLED', name: '停用'}
        ];

        const resultData:any = wlutils.createEnum(tetsArray);
        expect(resultData.getNameByCode('ENABLED')).toBe("启用");
        expect(resultData.getCoedByName('启用')).toBe("ENABLED");

    });

    // 测试对象中是否存在某个属性
    it("Enzyme is there a property in the object test", function(){
        let foo = {
            // 覆盖（重写）js中的函数
            // 模拟没有属性
            hasOwnProperty: function() {
                return false;
            },
            bar: 'Here be dragons'
          };

        const isTrue = wlutils.objHasOwnProperty('bar', foo, true);
        expect(isTrue).toBeTruthy();

        const isTrue1 = wlutils.objHasOwnProperty('bar', foo, false);
        expect(isTrue1).toBeTruthy();
        
    });

    // 判断是否为空
    it("Enzyme is empty test", function(){
        let foo = " ";

        const isTure = wlutils.isEmpty(foo);
        expect(isTure).toBeTruthy();

        const isTrue1 = wlutils.isEmpty(new Date());
        expect(isTrue1).toBeFalsy();

        const isTrue2 = wlutils.isEmpty(false);
        expect(isTrue2).toBeTruthy();
    });

    // 判断是否不为空
    it("Enzyme is not empty test", function(){
        let foo = " sd ";
        let foo1 = "       ";

        const isTure = wlutils.isNotEmpty(foo);
        const isTure1 = wlutils.isNotEmpty(foo1);

        expect(isTure).toBeTruthy();
        expect(isTure1).not.toBeTruthy();
    });

    // 从某个对象中获取属性，并设置默认值
    it("Enzyme get a property in the object test", function(){
        let foo = {
            a: "我是",
        };

        const testGetA = wlutils.getObjProperty('a', foo);
        expect(testGetA).toBe("我是");

    });

    it("Enzyme get a property in the object with null string test", function () {

        let foo = {
          
            b: "",
        };
        const testGetB = wlutils.getObjProperty('b', foo, "b");
        expect(testGetB).toBe("b");
    });

    // 从某个对象中获取属性，并设置默认值
    it("Enzyme get a property in the object with space string test", function(){
        let foo = {
            
            c: " ",
        };

        const testGetC = wlutils.getObjProperty('c', foo, "c");
        expect(testGetC).toBe("c");

    });


    // 从某个对象中获取属性，并设置默认值
    it("Enzyme get a property in the object with null object test", function(){
        let foo = {
            d: "{}",
        };

        const testGetD = wlutils.getObjProperty('d', foo, "d");
        expect(testGetD).toBe("d");

    });


    // 从某个对象中获取属性，并设置默认值
    it("Enzyme get a property in the object with null array test", function(){
        let foo = {
            e: "[]",
        };

        const testGetE = wlutils.getObjProperty('e', foo, "e");
        expect(testGetE).toBe("e");

    });

    // 从某个对象中获取属性，并设置默认值
    it("Enzyme get a property in the object with 'null' test", function(){
        let foo = {
            f: "null",
        };

        const testGetF = wlutils.getObjProperty('f', foo, "f");
        expect(testGetF).toBe("f");

    });

    // 从某个对象中获取属性，并设置默认值
    it("Enzyme get a property not in the object test", function(){
        let foo = {
            g: "null",
        };

        const testGetA = wlutils.getObjProperty('g', foo);
        expect(testGetA).toBe(null);

    });

    // 测试把某个对象中的字符串属性转成数组
    it("Enzyme property of string in object test", function(){
        var testToArray = {
            "id":"9sql5RBswhDwZby5fSV",
            "createDate":"2019-08-27 17:18:36",
            "updateDate":"2019-08-29 10:22:18",
            "name":"科研成果-人工智能",
            "level":"1",
            "uploadUrl":"/ueditor/file/20190827/1566897510803049349.docx_新平台问题反馈-滕飞老师-回复-改后 .docx,/ueditor/file/20190829/1567045335126084955.xlsx_2018年学生导入数据模板_20181024142346.xlsx",
            "description":"<p>人工智能</p>",
            "fileUrl":{
                "/ueditor/file/20190829/1567045335126084955.xlsx": "2018年学生导入数据模板_20181024142346.xlsx",
                "/ueditor/file/20190827/1566897510803049349.docx": "新平台问题反馈-滕飞老师-回复-改后 .docx"
              }
        };
        var convertedArray = wlutils.toArrayWithItem(wlutils.getObjProperty('fileUrl', testToArray));
        expect(convertedArray.hasOwnProperty('length')).toBeTruthy();
        expect(convertedArray.length > 0).toBeTruthy();
    });

    // 测试用深拷贝方式，向数组中追加元素
    it("Enzyme add item in the array with deep copy test", function(){
        let testArray = [
            {
                name: "wanglei",
            }
        ];

        const testNewArray = wlutils.addItemInArrayWithDeepCopy(testArray, {name: 'wanglei1'});
        expect(testArray).not.toBe(testNewArray);
        expect(testNewArray[1].name).toEqual('wanglei1');

    });

    // 测试用深拷贝方式，修改数组指定索引上的元素
    it("Enzyme update item in the array with deep copy test", function(){
        let testArray = [
            {
                name: "wanglei",
            }
        ];

        const testNewArray = wlutils.updateItemInArrayWithDeepCopy(testArray, 0, {name: "秦仙媃"});
        expect(testArray).not.toBe(testNewArray);
        expect(testNewArray[0].name).toEqual('秦仙媃');

    });

    // 测试用深拷贝方式，删除数组指定索引上的元素
    it("Enzyme remove item in the array with deep copy test", function(){
        let testArray = [
            {
                name: "wanglei",
            }
        ];

        const testNewArray = wlutils.removeItemInArrayWithDeepCopy(testArray, 0);
        expect(testArray).not.toBe(testNewArray);
        expect(testNewArray.length).toEqual(0);

    });

    // 测试用深拷贝方式，设置对象的属性
    // it("Enzyme set item in the object with deep copy test", function(){
    //     let testObje = {
    //             name: "wanglei",
    //     };

    //     let testNewObje = wlutils.setItemInObjWithDeepCopy(testObje, {name: "秦仙媃"});
    //     expect(testObje).not.toBe(testNewObje);
    //     expect(testNewObje.name).toEqual("秦仙媃");

    //     testNewObje = wlutils.setItemInObjWithDeepCopy(testObje, {name: "秦仙媃", age: 25});
    //     expect(testObje).not.toBe(testNewObje);
    //     expect(testNewObje.age).toEqual(25);

    // });

    // 测试用深拷贝方式，删除对象中的属性
    // it("Enzyme remove item in the object with deep copy test", function(){
    //     let testObje = {
    //             name: "wanglei",
    //             age: 25,
    //     };

    //     const testNewObje = wlutils.removeItemInObjWithDeepCopy(testObje, "age");
    //     expect(testObje).not.toBe(testNewObje);
    //     expect(testNewObje.age).toBeUndefined();

    // });

    // 测试格式化数字字符串
    it("Enzyme format string by number's string  test", function(){
        const accountingNumberOptions = {
            decimal: ".",
            thousand: " ",
            symbol:"",
            precision: 0,
            grouping: 4,
        };

        const testFormartText = wlutils.numberFormat("13844476434", accountingNumberOptions);
        expect(testFormartText).toBe("138 4447 6434");

    });

    // 测试判断是不是一个数组
    it("Enzyme is array for object test", function(){
        const obj = [];

        // 断言是数组
        const testIsArrayWithoutEmpty = wlutils.isArray(obj);
        expect(testIsArrayWithoutEmpty).toBeTruthy();

        // 断言是数组，但是为空，所以返回false
        const testIsArrayWithEmpty = wlutils.isArray(obj, true);
        expect(testIsArrayWithEmpty).toBe(false);
    });

    // 测试判断是不是一个对象
    it("Enzyme is object for object test", function(){
        const array = [];
        const obj = {};

        // 断言不是对象
        const testIsNotObj = wlutils.isObject(array);
        expect(testIsNotObj).toBe(false);

        // 断言是对象
        const testIsObjectWithoutEmpty = wlutils.isObject(obj);
        expect(testIsObjectWithoutEmpty).toBeTruthy();

        // 断言是对象，但由于对象是空，所以返回值是false
        const testIsObjectWithEmpty = wlutils.isObject(obj, true);
        expect(testIsObjectWithEmpty).toBe(false);
    });

    // 测试判断是不是一个dom对象
    // it("Enzyme is object for isHTMLDom test", function(){
    //     const array = [];
    //     const obj = {};
    //     const 

    //     // 断言数组不是dom对象
    //     const testIsNotObj = wlutils.isHTMLDom(array);
    //     expect(testIsNotObj).not.toBeTruthy();

    //     // 断言对象不是dom对象
    //     const testIsObjectWithoutEmpty = wlutils.isHTMLDom(obj);
    //     expect(testIsObjectWithoutEmpty).toBeTruthy();

    //     // 断言是dom对象，但由于对象是空，所以返回值是false
    //     const testIsObjectWithEmpty = wlutils.isHTMLDom(obj, true);
    //     expect(testIsObjectWithEmpty).not().toBeTruthy();
    // });

    // 测试判断是不是一个数字
    it("Enzyme is number for object test", function(){
        const strT = "1";
        const intT = 1;
        const floatT = 1.50;

        // 断言不是数字
        const testIsNotNumber = wlutils.isNumber(strT);
        expect(testIsNotNumber).toBe(false);

        // 断言整数是数字
        const testIsNumberWithoutEmpty1 = wlutils.isNumber(intT);
        expect(testIsNumberWithoutEmpty1).toBeTruthy();

        // 断言小数是数字
        const testIsNumberWithoutEmpty2 = wlutils.isNumber(floatT);
        expect(testIsNumberWithoutEmpty2).toBeTruthy();
    });


    // 判断是不是一个字符串
    it("Enzyme is string for object test", function(){
        const strT = "1";
        const emptyStrT = "";
        const intT = 1;
        const floatT = 1.50;

        // 断言是字符串
        const testIsStringWithoutEmpty = wlutils.isString(strT);
        expect(testIsStringWithoutEmpty).toBeTruthy();

        // 断言是字符串，但是由于字符串为空，所以返回false
        const testIsStringWithEmpty = wlutils.isString(emptyStrT, true);
        expect(testIsStringWithEmpty).toBe(false);

        // 断言整数不是字符串
        const testIsNotStringWithInteger = wlutils.isString(intT);
        expect(testIsNotStringWithInteger).toBe(false);

        // 断言小数不是数字
        const testIsNotStringWithFloat = wlutils.isString(floatT);
        expect(testIsNotStringWithFloat).toBe(false);
    });

    // 获取审批筛选条件的请求参数名称
    it("Enzyme get string of requestName in response data's select data test", function(){
        let selectData = [
            {
              "StartToEnd": true,
              "data": [
                {
                  "mode": "date",
                  "requestName": "startDate",
                  "dataName": "开始时间",
                  "value": ""
                },
                {
                  "mode": "date",
                  "requestName": "endDate",
                  "dataName": "结束时间",
                  "value": ""
                }
              ],
              "name": "日期选择",
              "type": "DatePicker"
            },
            {
              "requestName": "remarks",
              "name": "事项表述",
              "type": "input",
              "value": ""
            },
            {
              "requestName": "status",
              "whetherSelect": "false",
              "data": [
                {
                  "id": "1",
                  "selectName": "待审批",
                  "selected": false
                },
                {
                  "id": "2",
                  "selectName": "已审批",
                  "selected": false
                },
                {
                  "id": "3",
                  "selectName": "驳回",
                  "selected": false
                },
                {
                  "id": "4",
                  "selectName": "审批完成",
                  "selected": false
                },
                {
                  "id": "5",
                  "selectName": "撤回",
                  "selected": false
                }
              ],
              "name": "审批状态",
              "type": "select"
            }
        ];
        // 断言是字符串
        const testIsStringReqParam:any = wlutils.getApproveFilterReqParam(selectData);
        console.log(testIsStringReqParam);
        const resultObj:any = {"RiQiXuanZeKaiShiShiJian": "startDate", "RiQiXuanZeJieShuShiJian": "endDate","ShiXiangBiaoShu": "remarks", "ShenPiZhuangTai": "status"};
        expect(testIsStringReqParam).toEqual(resultObj);
    });

    // 测试汉字转成首字母大写的全拼
    it("Enzyme get string with all capital letters test", function(){
        let testChinese = "我爱你磊皇";
        const covertStr = wlutils.getFullChars(testChinese);
        expect(covertStr).toBe("WoAiNiLeiHuang");
    });

    // 测试汉字转成首字母大写的缩写
    it("Enzyme get string with capital letters test", function(){
        let testChinese = "我爱你磊皇";
        const covertStr = wlutils.getCamelChars(testChinese);
        expect(covertStr).toBe("WANLH");
    });

     // 测试从缓存中获取数据
    //  it("Enzyme get data by key and model with cache data test", function(){
        
    //     // 测试获取Dict 的 考勤类型字典值
    //     const filrteredData = wlutils.getGlobalCacheByKey("attend_punch_type",wlutils.CACHEENUM.getCoedByName("字典"));
    //     expect(filrteredData[0].label).toBe("正常上班");

    //     // 测试获取学年
    //     const filrteredData1 = wlutils.getGlobalCacheByKey("1828ffde3e8946fbbe8869c323baa2fe",wlutils.CACHEENUM.getCoedByName("专业"));
    //     console.log(filrteredData1, 111111);
    // });


    it("Enzyme encode html string by regExp test", function(){
        let testStr = '<>?·';

        testStr = wlutils.htmlEncodeByRegExp(testStr);

        expect(testStr).toBe("&lt;&gt;&iexcl;&middot;");
    });

    it("Enzyme decode html string by regExp test", function(){
        
        let testStr2 = '&lt;&gt;&iexcl;&middot;';

        testStr2 = wlutils.htmlDecodeByRegExp(testStr2);

        expect(testStr2).toBe("<>?·");
    });

    it("Enzyme get file extension string  test", function(){
        
        let testFile = 'a.b.c.d.f.e.f发射点发生士大夫手动。sdf .pdf.img.png';

        testFile = wlutils.extFileNameWithString(testFile);

        expect(testFile).toBe("png");
    });
});

/**
 * 测试定义的带有axios 请求的工具类函数
 * @function
 * @param {string} args1 用来描述测试分组描述
 * @param {Function} args2 用来执行的测试分组函数
 */
// describe("Enzyme function of axios in wlutils test", function () {
    
// });
