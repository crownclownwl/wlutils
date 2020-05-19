"use strict";

/**
 * @file: 公用工具类
 * @description: 包括入参验证等方法
 * 
 * @author 王磊（磊皇）
 * @version 1.1.60
 * @time 2019年8月26日 10点00分
 * @lastEditTime 2020年3月3日 14点31分
 * @lastEditors 王磊（磊皇）
 */


/**
 * @description 解析json工具
 */
let stringify = require('qs').stringify;
/**
 * @description 发送网络请求工具
 */
import axios from 'axios';
/**
 * @description 一些js工具类
 */
import _ from 'lodash';


// import {stringify} from 'qs';
// import axios from 'axios';
import pinyin from './Pinyin';
import {IApproveFilterItemData, IEsEnumItem, INumberFromatOption, ICacheRequestParam} from './interfaces';
import EsEnum from './EsEnum';


/**
 * 统一的工具类 
 * @author 王磊（磊皇）
 * @time 2020年01月03日 11:33:46
 * @lastEditTime 2020年01月03日 11:33:46
 * @lastEditors 王磊（磊皇）
 * @exports wluitls
 * @module qs,axios,lodash,pinyin
 * @class
 */
class wlutils {
    /**
     * @public
     * @author 王磊（磊皇）
     * @time 2020年01月03日 11:33:46
     * @lastEditTime 2020年01月03日 11:33:46
     * @lastEditors 王磊（磊皇）
     * @property
     */
    FILERESCOURURLPREFIX:string="";

    CACHEENUM: EsEnum=null;

    /**
     * @author 王磊（磊皇）
     * @description 构造函数
     * @time 2020年01月03日 11:33:46
     * @lastEditTime 2020年01月03日 11:33:46
     * @lastEditors 王磊（磊皇）
     * @constructor
     */
    constructor(props){
        console.info("++++++++++++++++++欢迎使用wlutils工具，您的使用是对我的最大鼓励！++++++++++++++++++");
        console.info(`========================   ${props}   =============================`);
        console.info("========================   (●'◡'●) o(*￣▽￣*)ブ   =============================");

        /**
         * 文件资源访问路径前缀
         *
         * @public
         * @property
         * @author 王磊（磊皇）
         * @time 2020年01月03日 11:33:46
         * @lastEditTime 2020年01月03日 11:33:46
         * @lastEditors 王磊（磊皇）
         * @type {string}
         * @exports FILERESCOURURL
         */
        this.FILERESCOURURLPREFIX= '/guanlixitong/fileSys/';

        /**
         * @public
         * @property
         * @author 王磊（磊皇）
         * @description 用来规定字典都有哪些key，方便调用
         * @time 2020年4月3日 10点58分
         * @lastEditTime 2020年4月3日 10点58分
         * @lastEditors 王磊（磊皇）
         * @type {object}
         * @exports CACHEENUM
         * @example 
         *          const cacheEnum:any = wlutils.CACHEENUM;
         *          console.log("缓存枚举如下：", cacheEnum.getValues());
         *          // [
         *               { code: 'Dict', name: '字典' },
         *               { code: 'XgGrade', name: '学年' },
         *               { code: 'XgTerm', name: '学期' },
         *               { code: 'JwProfessional', name: '专业' },
         *              { code: 'XgClass', name: '班级' },
         *               { code: 'JwSubject', name: '课程' }
         *           ]
         *          cacheEnum.Dict.name;              // 字典
         *          cacheEnum.getNameByCode("Dict");  // 字典;
         *          cacheEnum.getCoedByName("字典");  // Dict;
         */
        this.CACHEENUM =  new EsEnum([
            {code: 'Dict', name: "字典", packageName: "sys"},
            {code: 'XgGrade', name: '学年', packageName: "grade"},
            {code: 'XgTerm', name: '学期', packageName: "term"},
            {code: 'JwProfessional', name: '专业', packageName: "dsms"},
            {code: 'XgClass', name: '班级', packageName: "xg.class"},
            {code: 'JwSubject', name: '课程', packageName: "jw"}
        ]);
    }

    /**
     * @public
     * @description 创建一个枚举js对象
     * @exports createEnum
     * @param {Array<IEsEnumItem>} arr 枚举数组
     * @returns {null | Array<IEsEnumItem>} 创建后的枚举
     */
    createEnum(arr:Array<IEsEnumItem>){
        if(this.isNotEmpty(arr)){
            return new EsEnum(arr);
        }
        return null;
    }
    
    /**
     * @author 王磊（磊皇）
     * @time 2020年3月3日 11点52分
     * @lastEditTime 2020年3月3日 11点52分
     * @lastEditors 王磊（磊皇）
     * @description 用来设置文件前缀地址方法
     * @param {string} url 要覆盖的文件前缀地址 
     * @exports setFileSourceURLPerfix
     * @method
     */
    setFileSourceURLPerfix(url:string){
        this.FILERESCOURURLPREFIX = url;
    }

    /**
     * @author 王磊（磊皇）
     * @time 2020年3月3日 11点52分
     * @lastEditTime 2020年3月3日 11点52分
     * @lastEditors 王磊（磊皇）
     * @description 获取文件前缀地址方法
     * @returns {string} 文件前缀地址 
     * @exports getFileSourceURLPerfix
     * @method
     */
    getFileSourceURLPerfix(){
        return this.FILERESCOURURLPREFIX;
    }

    /**
     * @description 判断某个属性是否存在于某个对象中，
     *              注意本方法可能循环原型链，需要传入 参数确定，默认不查询
     *
     * @method
     * @public
     * @author 王磊（磊皇）
     * @time 2020年01月03日 11:33:46
     * @lastEditTime 2020年3月17日 16点46分
     * @lastEditors 王磊（磊皇）
     * @exports objHasOwnProperty
     * @example 
     *          import wlutils from 'idsutil';
     *          let a = {'b': 1};
     *          wlutils.objHasOwnProperty('b', a);  // 应该返回 true
     *
     * @param {string} value    需要检验的key
     * 
     * @param {Object} obj      需要检验key的对象
     * @param {boolean} isTrue  是否需要查询原型链，默认为false，不查询原型链
     * @this {wluitls}
     * @returns {boolean} 是否存在，true 存在， false 不存在
     *
     */
    objHasOwnProperty(value, obj, isTrue = false) {
        let isExist = this.isNotEmpty(value) && value !== 'undefined' && value !== 'null' && value !== '{}' && value !== '[]'
                && value !== 'object' && value !== 'Object'
                && this.isNotEmpty(obj) && obj !== 'undefined' && obj !== 'null' && obj !== '{}' && obj !== '[]'
                && obj !== 'object' && obj !== 'Object'
                && this.isNotEmpty(obj[value]) && value in obj && obj[value] !== 'undefined' && obj[value] !== 'null'
                && obj[value] !== '{}' && obj[value] !== '[]' && obj[value] !== 'object' && obj[value] !== 'Object'
                || (isTrue === true && Object.prototype.hasOwnProperty.call(obj, value));

            // 排除字符串
            if (isExist === true && typeof obj[value] === 'string') {
                let newObj = obj[value].replace(/\s+/g, "");
                isExist = isExist && newObj !== 'undefined' && newObj !== 'null'
                    && newObj !== '{}' && newObj !== '[]'
                    && newObj !== 'object' && newObj !== 'Object'
                    && newObj !== '';
            }

            // 排除 boolean
            if(obj && value && Object.prototype.hasOwnProperty.call(obj, value) && typeof obj[value] === 'boolean'){
                isExist = obj[value];
            }

        return isExist;
    }

    /**
     *
     * @description 获取对象中的属性
     * @author 王磊（磊皇）
     * @time 2020年01月03日 11:33:46
     * @lastEditTime 2020-01-16 11:27:50
     * @lastEditors 王磊（磊皇）
     * @method
     * @exports getObjProperty
     * @example 
     *          import wlutils from 'idsutil';
     *          let a = {'b': 1};
     *          wlutils.getObjProperty('b', a);  // 应该返回 1
     *
     * @param {string} key 对象中的key
     * @param {Object} obj 对象
     * 
     * @param {Object} defaultValue 如果对象key不存在或没值的话，默认返回值
     * @param {boolean | undefined | null} isDebugger 可选参数，是否开启日志打印
     *
     * @returns {Object} 如果对象中存在那么可以返回属性值，如果不存在就返回 null
     */
    getObjProperty(key, obj, defaultValue:any = null, isDebugger?: boolean) {
        // 判断key值是不是带层级，也就是存在 a.b.c.d.e
        if (this.isNotEmpty(key) && this.isNotEmpty(obj)) {

            if (key.indexOf('.') === -1) {
                if (this.objHasOwnProperty(key, obj) === true) {
                    obj = obj[key]
                }else {
                    isDebugger === true || window.H5_Dev === "dev" ? console.info(`对象${JSON.stringify(obj)}\n中没有找到属性'${key}'或者该属性为空`):'';
                    obj = defaultValue
                }
                return obj;
            }
            let keys = key.split('.');
            for (let kesItem of keys) {
                if (this.objHasOwnProperty(kesItem, obj) === true) {
                    obj = obj[kesItem];
                } else {// 如果没有找到
                    // 如果对象是 dom元素的实例
                    if(obj instanceof HTMLElement){
                        isDebugger === true || window.H5_Dev === "dev" ?console.info(`没有从dom元素中找到属性'${key}'或者该属性为空`):'';
                        return defaultValue;
                    }
                    isDebugger === true || window.H5_Dev === "dev" ?console.info(`对象${JSON.stringify(obj)}\n中没有找到属性'${key}'或者该属性为空`):'';
                    return defaultValue;
                }
            }
            return obj;

        }
        return defaultValue;
    }

    /**
     * @description 入参校验，逻辑上是否为空，包括了判断数组的长度, 和对象是否存在子属性
     * @author 王磊（磊皇）
     * @time 2020年01月03日 11:33:46
     * @lastEditTime 2020年3月17日 16点38分
     * @lastEditors 王磊（磊皇）
     * @methodm
     * @exports isEmpty
     * 
     * @example 
     *          import wlutils from 'idsutil';
     *          let a = {'b': 1};
     *          wlutils.isEmpty(a);  // 应该返回 false
     * @param {*} value 要判断的参数
     * @returns {boolean} 对象是否为空
     */
    isEmpty(value) {
        // return value === undefined || value === null || value === ''
        // || (value instanceof Array && Object.prototype.hasOwnProperty.bind('length', value) && value.length === 0)
        // || (value instanceof Object && Object.keys(value).length === 0);
        let isTrue = _.isNull(value) || _.isEmpty(value) || value === 'undefined' 
            || value === 'null' || value === '[]' || value === '{}'
            || value === 'object' || value === 'Object';

        // 排除字符串
        if (typeof value === 'string') {
            let newValue = value.replace(/\s+/g, "");
            isTrue = isTrue || newValue === 'undefined' || newValue  === 'null'
                || newValue === '{}' || newValue === '[]'
                || newValue === 'object' || newValue === 'Object'
                || newValue === '';
        }

        // 如果是数字
        if (typeof value === 'number') {
            isTrue = value === 0;
        }

        // 如果是时间对象
        if(value instanceof Date){
            isTrue = value ? false : true;
        }

        // 如果是boolean类型，防止导致根据 getObjProperty 方法获取boolean 为true
        if (typeof value === 'boolean'){
            isTrue = !value;
        }

        return isTrue;
    }

    /**
     * @description 入参校验，逻辑上是否不为空，包括了判断数组的长度，和对象是否存在子属性
     * @author 王磊（磊皇）
     * @time 2020年01月03日 11:33:46
     * @lastEditTime 2020年01月03日 11:33:46
     * @lastEditors 王磊（磊皇）
     * @method
     * @exports isNotEmpty
     * 
     * @example 
     *          import wlutils from 'idsutil';
     *          let a = {};
     *          wlutils.isNotEmpty(a);  // 应该返回 false
     * @param {*} value 要判断的参数
     * @this {wluitls}
     * @returns {boolean} 对象是否为空
     */
    isNotEmpty(value) {
        return !this.isEmpty(value);
    }

    /**
     * @author 王磊（磊皇）
     * @time 2020年01月03日 11:33:46
     * @lastEditTime 2020年01月03日 11:33:46
     * @lastEditors 王磊（磊皇）
     * @description 对象转换成数组，里边每一项都是 key，text组成的对象
     *
     * @method
     * @extends toArrayWithItem
     * @type {Function}
     * @protected
     * @param {object} obj 需要转换的对象
     * @returns {Array} 转换后的数组
     *                      [
     *                          {
     *                              key: '',
     *                              value: ''
     *                          },
     *                          ......
     *                      ]
     * @example 
     *          import wlutils from 'idsutil';
     *          let testToArray = {
     *              "id":"9sql5RBswhDwZby5fSV",
     *              "createDate":"2019-08-27 17:18:36",
     *              "updateDate":"2019-08-29 10:22:18",
     *              "name":"科研成果-人工智能",
     *              "level":"1",
     *              "uploadUrl":"/ueditor/file/20190827/1566897510803049349.docx_新平台问题反馈-滕飞老师-回复-改后 .docx,/ueditor/file/20190829/1567045335126084955.xlsx_2018年学生导入数据模板_20181024142346.xlsx",
     *              "description":"<p>人工智能</p>",
     *              "fileUrl":{
     *                  "/ueditor/file/20190829/1567045335126084955.xlsx": "2018年学生导入数据模板_20181024142346.xlsx",
     *                  "/ueditor/file/20190827/1566897510803049349.docx": "新平台问题反馈-滕飞老师-回复-改后 .docx"
     *            }
     *          };
     *
     *          let convertedArray = wlutils.toArrayWithItem(wlutils.getObjProperty('fileUrl', testToArray));
     *          // 返回如下数据：
     *          
     *          [
     *                 {
     *                     key: '/ueditor/file/20190829/1567045335126084955.xlsx',
     *                     text: '2018年学生导入数据模板_20181024142346.xlsx'
     *                 },
     *                 {
     *                     key: '/ueditor/file/20190827/1566897510803049349.docx',
     *                     text: '新平台问题反馈-滕飞老师-回复-改后 .doc'
     *                 }
     *          ];
     *  @this {wluitls}
     */
    toArrayWithItem(obj){
        /**
         * @author 王磊（磊皇）
         * @time 2020年01月03日 11:33:46
         * @lastEditTime 2020年01月03日 11:33:46
         * @lastEditors 王磊（磊皇）
         * @description 要返回的数组
         * @inner
         * @property
         */
        let newArray:Array<{key:any, text:string}> = [];

        // S1：入参校验
        if (this.isEmpty(obj)) {
            console.error("--------------------");
            console.error("没有获取到访问的资源路径！");
            console.error("--------------------");
            return newArray;
        }

        // S2：循环对象吧对象的key和value拆成item对象，放到newArray数组中
        for(let key of Object.keys(obj)){
            newArray.push({
                key: key,
                text: this.objHasOwnProperty(key, obj) === true ? obj[key] : ''
            });
        }

        return newArray;
    }

    /**
     * @author 王磊（磊皇）
     * @time 2020年01月03日 11:33:46
     * @lastEditTime 2020年01月03日 11:33:46
     * @lastEditors 王磊（磊皇）
     * @description 不修改原数组（深拷贝）情况下，向指定数组中添加元素
     * @method
     * @protected
     * @example 
     *          import wlutils from 'idsutil';
     *          let a = [
     *                      {
     *                          name: "wanglei",
     *                      }
     *                  ];
     *          wlutils.addItemInArrayWithDeepCopy(a, 0, {name: "秦仙媃"});  // 应该返回来修改后的新对象
     * 
     * @param {Array} array 目标数组
     * @param {*} item 需要添加的元素
     * @returns {Array} 新的数组
     * @this {wluitls}
     */
    addItemInArrayWithDeepCopy(array, item){
        if(this.isEmpty(array) || !(array instanceof Array) || this.isEmpty(item)){
            return array;
        }

        return array.concat(item);
    }

    /**
     * @author 王磊（磊皇）
     * @time 2020年01月03日 11:33:46
     * @lastEditTime 2020年01月03日 11:33:46
     * @lastEditors 王磊（磊皇）
     * @description 不修改原数组（深拷贝）情况下，更新数组数组中指定索引位置的元素
     * @method
     * @protected
     * @example 
     *          import wlutils from 'idsutil';
     *          let a = [
     *                      {
     *                          name: "wanglei",
     *                      }
     *                  ];
     *          wlutils.updateItemInArrayWithDeepCopy(a, 0, {name: "秦仙媃"});  // 应该返回来修改后的新对象
     * 
     * @param {Array} array 目标数组
     * @param {number | string} index 目标元素的索引
     * @param {*} item 需要更改成的元素
     * 
     * @returns {Array} 新的数组
     * @this {wluitls}
     */
    updateItemInArrayWithDeepCopy(array, index, item){
        let regPos = /^\d+|0$/; // 非负整数
        if(this.isEmpty(array) || !(array instanceof Array) || !regPos.test(index) || this.isEmpty(item)){
            return array;
        }

        return [
            ...array.slice(0, index),
            item,
            ...array.slice(index + 1)
        ];
    }

    /**
     * @author 王磊（磊皇）
     * @time 2020年01月03日 11:33:46
     * @lastEditTime 2020年01月03日 11:33:46
     * @lastEditors 王磊（磊皇）
     * @description 不修改原数组（深拷贝）情况下，删除指定索引位置的元素
     * @method
     * @protected
     * @example 
     *          import wlutils from 'idsutil';
     *          let a = [
     *                      {
     *                          name: "wanglei",
     *                      }
     *                  ];
     *          wlutils.removeItemInArrayWithDeepCopy(a, 0);  // 应该返回删除后的新对象
     * 
     * @param {Array} array 目标数组
     * @param {number | string} index 目标元素的索引
     * 
     * @returns {Array} 新的数组
     */
    removeItemInArrayWithDeepCopy(array, index){
        let regPos = /^\d+|0$/; // 非负整数
        if(this.isEmpty(array) || !(array instanceof Array) || !regPos.test(index)){
            return array;
        }

        return [
            ...array.splice(0, index),
            ...array.splice(index + 1),
        ];
    }

    // /**
    //  * 不修改原数组（深拷贝）情况下，设置对象中的属性
    //  * @method
    //  * @protected
    //  * @example 
    //  *          import wlutils from 'idsutil';
    //  *          let a = {name: "wanglei",};
    //  *          wlutils.setItemInObjWithDeepCopy(a, {name: "秦仙媃"});  // 应该返回修改后的新对象
    //  *          wlutils.setItemInObjWithDeepCopy(a, {name: "秦仙媃", age: 25}); // 应该返回一个修改后的新对象
    //  * 
    //  * @param {object} oldObj 目标对象
    //  * @param {object} item 需要追加或者修改的对象属性的对象
    //  *
    //  * @returns {object} 新的对象
    //  */
    // setItemInObjWithDeepCopy(oldObj, item){
    //     if(this.isEmpty(oldObj) || !(oldObj instanceof Object) || this.isEmpty(item)){
    //         return oldObj;
    //     }

    //     return {
    //         ...oldObj,
    //         ...item,
    //     };
    // },

    // /**
    //  * 不修改原数组（深拷贝）情况下，删除对象中的指定的属性
    //  * @method
    //  * @protected
    //  * @example 
    //  *          import wlutils from 'idsutil';
    //  *          let a = {'b': 1};
    //  *          wlutils.removeItemInObjWithDeepCopy(a, 'b');  // 应该返回删除 b 属性的一个新的对象
    //  * 
    //  * @param {object} oldObj 目标对象
    //  * @param {string | number} filedName 目标对象中的属性
    //  * 
    //  * @returns {object} 新的对象
    //  */
    // removeItemInObjWithDeepCopy(oldObj, filedName){
    //     if(this.isEmpty(oldObj) || !(oldObj instanceof Object) || this.isEmpty(filedName)){
    //         return oldObj;
    //     }

    //     return Object.keys(oldObj).reduce((obj, key) => {
    //         if(filedName !== key){
    //             return {...obj, [key]: oldObj[key]}
    //         }

    //         return obj;
    //     }, {});
    // },
    /**
     * @author 王磊（磊皇）
     * @time 2020年01月03日 11:33:46
     * @lastEditTime 2020年4月14日 09点37分
     * @lastEditors 王磊（磊皇）
     * @description 格式化数字并返回
     * @method
     * @author 王磊（磊皇）
     * @param {any} number 要格式化的数字字符串
     * @param {INumberFromatOption} option 配置参数
     * @returns {string} 格式化后的字符串
     * @extends INumberFromatOption
     * @example 
     *           const accountingNumberOptions = {
     *                  decimal: ".",        // 设置小数点占位符
     *                  thousand: " ",       // 设置千分位占位符
     *                  precision: 0,        // 设置保留几位小数，会四舍五入的，默认是2
     *                  grouping: 4,         // 设置按照几位分隔
     *          };
     *          
     *          // 结果为 ：    138 4447 6434
     *          wlutils.numberFormat("13844476434", accountingNumberOptions);
     *
     * */
     numberFormat(number:any, option:INumberFromatOption) {

        if (number == "") {
            return number;
        }
    
        if (number == null) {
            return number;
        }
    
        if (isNaN(number)) {
            return "";
        }
    
        number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    
        let precision = 2;      //保留几位小数，会四舍五入的
        let decimal = ".";      //小数点符号
        let thousand = ",";    //千分位符号
        let symbol = "￥";      //格式化数字显示单位，默认￥
        let grouping = 3;    //设置按照几位分隔
    
        //设置参数列表, 确保每个参数都有值
        if (option) {
            precision = option.precision !==null && option.precision !== undefined ? option.precision : precision;
            decimal = option.decimal ? option.decimal : decimal;
            thousand = option.thousand != null && option.thousand != undefined ? option.thousand : thousand;
            symbol = option.symbol != null && option.thousand != undefined ? option.symbol : symbol;
            grouping = option.grouping ? option.grouping : grouping;
        }
    
        // 函数用于检查其参数是否是无穷大
        let n = !isFinite(+number) ? 0 : + number;
        let prec = !isFinite(+precision) ? 0 : Math.abs(precision);
        let s:any = '';

        /**
         * 保留几位小数，并返回字符串
         * @inner
         * @method
         * @param {number} n 小数位数
         * @param {number} prec 保留目标数值
         * 
         * @returns {string} 保留小数后的字符串
         */
        let toFixedFix = function (n, prec) {
            let k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        let re = new RegExp('(-?\\d+)(\\d{' + grouping + '})');
        let spacethousand = '' === thousand ? "," : thousand;
        while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + spacethousand + "$2");
        }
    
        if ((s[1] || '').length < prec) {
    
        if ('' === thousand) {
            s[0] = s[0].replace(/,/g, '');
        }
    
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
        }
    
        return symbol ? (symbol + s.join(decimal)) : s.join(decimal);
    }

    /**
     * @author 王磊（磊皇）
     * @time 2020年01月03日 11:33:46
     * @lastEditTime 2020年01月03日 11:33:46
     * @lastEditors 王磊（磊皇）
     * @description 判断对象是不是一个数组
     * @method
     * @author 王磊（磊皇）
     * @param {object} obj 目标对象
     * @param {boolean} isEmpty 是否开启开启空判断，true 是开启，false禁用（默认） 
     * @this {wluitls}
     * @returns {boolean}  true 代表是数组对象，false 代表不是数组对象
     *
     * */
    isArray(obj, isEmpty=false){
        return (isEmpty === true 
            ? this.isNotEmpty(obj) && Object.prototype.toString.call(obj) == '[object Array]'
            : Object.prototype.toString.call(obj) == '[object Array]');
    }

    /**
     * @author 王磊（磊皇）
     * @time 2020年01月03日 11:33:46
     * @lastEditTime 2020年01月03日 11:33:46
     * @lastEditors 王磊（磊皇）
     * @description 判断对象是不是一个object
     * @method
     * @author 王磊（磊皇）
     * @param {object} obj 目标对象
     * @param {boolean} isEmpty 是否开启空判断，true 是开启，false禁用（默认）
     * @returns {boolean}  true 代表是object，false 代表不是object
     * @this {wluitls}
     * */
    isObject(obj, isEmpty=false){
        return (isEmpty === true 
            ? this.isNotEmpty(obj) && Object.prototype.toString.call(obj)== '[object Object]'
            : Object.prototype.toString.call(obj)== '[object Object]');
    }

    /**
     * @author 王磊（磊皇）
     * @time 2020年01月03日 11:33:46
     * @lastEditTime 2020年01月03日 11:33:46
     * @lastEditors 王磊（磊皇）
     * @description 判断对象是不是一个 dom 元素
     * @method
     * @author 王磊（磊皇）
     * @param {object} obj 目标对象
     * @param {boolean} isEmpty 是否开启空判断，true 是开启，false禁用（默认）
     * @returns {boolean}  true 代表是object，false 代表不是object
     * @this {wluitls}
     * */
    isHTMLDom(obj, isEmpty=false){
        return (isEmpty === true 
            ? this.isNotEmpty(obj) && Object.prototype.toString.call(obj)== '[object HTMLCollection]'
            : Object.prototype.toString.call(obj)== '[object HTMLCollection]');
    }

    /**
     * @author 王磊（磊皇）
     * @time 2020年01月03日 11:33:46
     * @lastEditTime 2020年01月03日 11:33:46
     * @lastEditors 王磊（磊皇）
     * @description 判断对象是不是一个数字
     * @method
     * @author 王磊（磊皇）
     * @param {object} nubmer 目标对象
     * @param {boolean} isEmpty 是否开启空判断和无穷大，true 是开启，false禁用（默认）
     * @returns {boolean}  true 代表是数字，false 代表不是数字
     * @this {wluitls}
     * */
    isNumber(number, isEmpty=false){
        return (isEmpty === true 
            ? this.isNotEmpty(number) && isFinite(Number(number)) && Object.prototype.toString.call(number)== '[object Number]'
            : Object.prototype.toString.call(number)== '[object Number]') ;
    }

    /**
     * @author 王磊（磊皇）
     * @time 2020年01月03日 11:33:46
     * @lastEditTime 2020年01月03日 11:33:46
     * @lastEditors 王磊（磊皇）
     * @description 判断对象是不是一个字符
     * @method
     * @param {object} str 目标对象
     * @param {boolean} isEmpty 是否开启空判断，true 是开启，false禁用（默认）
     * @returns {boolean}  true 代表是字符串，false 代表不是字符串
     * @this {wluitls}
     *
     * */
    isString(str, isEmpty=false){
        return (isEmpty === true 
            ? this.isNotEmpty(str) && Object.prototype.toString.call(str)== '[object String]'
            : Object.prototype.toString.call(str)== '[object String]') ;
    }
    /**
     * @method
     * @author 王磊（磊皇）
     * @time 2020年01月03日 11:33:46
     * @lastEditTime 2020年01月03日 11:33:46
     * @lastEditors 王磊（磊皇）
     * @description 获取审批列表查询条件的请求参数名称，现已支持 DatePicker、input、select
     * @exports getApproveFilterReqParam
     * @example
     *          import wlutils from 'idsutil';
     * 
     *          let selectData = [
     *          {
     *              "StartToEnd": "true",
     *              "data": [
     *                  {
     *                      "mode": "date",
     *                      "requestName": "startDate",
     *                      "dataName": "开始时间",
     *                      "value": ""
     *                  },
     *                  {
     *                      "mode": "date",
     *                      "requestName": "endDate",
     *                      "dataName": "结束时间",
     *                      "value": ""
     *                  }
     *              ],
     *              "name": "日期选择",
     *              "type": "DatePicker"
     *          },
     *          {
     *              "requestName": "remarks",
     *              "name": "事项表述",
     *              "type": "input",
     *              "value": ""
     *          },
     *          {
     *              "requestName": "status",
     *              "whetherSelect": "false",
     *              "data": [
     *                  {
     *                  "id": "1",
     *                  "selectName": "待审批",
     *                  "selected": false
     *                  },
     *                  {
     *                      "id": "2",
     *                      "selectName": "已审批",
     *                      "selected": false
     *                  },
     *                  {
     *                      "id": "3",
     *                      "selectName": "驳回",
     *                      "selected": false
     *                  },
     *                  {
     *                      "id": "4",
     *                      "selectName": "审批完成",
     *                      "selected": false
     *                  },
     *                  {
     *                      "id": "5",
     *                      "selectName": "撤回",
     *                      "selected": false
     *                  }
     *              ],
     *              "name": "审批状态",
     *              "type": "select"
     *              }
     *          ];
     *          // 应该返回 startDate,endDate,remarks,status
     *          wlutils.getApproveFilterReqParam("requestName", resData);
     * 
     * @param {Array<IApproveFilterItemData> | any} resData 后台返回的filter数据
     * @returns {string | null}  返回请求参数的名称
     * @this {wluitls}
     * */
    getApproveFilterReqParam(resData: Array<IApproveFilterItemData | any>){
        

        /**
         * @author 王磊（磊皇）
         * @time 2020年01月03日 11:33:46
         * @lastEditTime 2020年01月03日 11:33:46
         * @lastEditors 王磊（磊皇）
         * @description 内部函数，用来获取请求的参数名称
         * @private
         * @inner
         * @function
         * @param {IApproveFilterItemData} item 请求参数对象
         * @returns {object} 追加后的请求参数对象
         */
        function getParamName (item: IApproveFilterItemData, that){
            let requestParamName = {};
            switch(item.type){
                // 日期组件
                case "DatePicker":
                    if(item.StartToEnd === true){
                        // 时间段
                        if(item.data && item.data.length === 2 
                            && item.data[0].requestName
                            && item.data[1].requestName){
                                let nameObj1 = {
                                    [that.getFullChars(item.name+"开始时间")]: item.data[0].requestName,
                                }
                                let nameObj2 = {
                                    [that.getFullChars(item.name+"结束时间")]: item.data[1].requestName,
                                }
                                requestParamName = Object.assign(nameObj1, nameObj2);
                        }else{
                            console.error("获取时间段的日期数据失败了");
                        }
                        
                    }else if(item.StartToEnd===false){
                        // 单个时间

                        if(item.data && item.data.length === 1 
                            && item.data[0].requestName){
                            let nameObj1 = {
                                [that.getFullChars(item.data[0].dataName)]: item.data[0].requestName,
                            }
                            requestParamName = nameObj1;

                        }else{
                            console.error("获取单个日期数据失败了");
                        }
                    }
                    break;

                // 输入框
                case "input":
                    if(item.requestName){
                        let nameObj1 = {
                            [that.getFullChars(item.name)]: item.requestName,
                        }
                        requestParamName = nameObj1;
                    }else{
                        console.error("获取输入框数据失败了");
                    }
                    break;
                
                // 单选
                case "select":
                    if(item.requestName){
                        let nameObj1 = {
                            [that.getFullChars(item.name)]: item.requestName,
                        }
                        requestParamName = nameObj1;
                    }else{
                        console.error("获取单项下拉框数据失败了");
                    }
                    break;
            }
            
            return requestParamName; 
        }
        let requestParamName1 = {};
        for(let item of resData){
            
            requestParamName1 = Object.assign(requestParamName1, getParamName(item, this));
            
        }

        // 去掉末尾的逗号
        // if(requestParamName1.endsWith(",")){
        //     requestParamName1 = requestParamName1.substr(0, requestParamName1.length-1);
        // }

        return requestParamName1;
    }

    /**
     * @author 王磊（磊皇）
     * @time 2020年01月03日 11:33:46
     * @lastEditTime 2020年01月03日 11:33:46
     * @lastEditors 王磊（磊皇）
     * @description 把汉字转成拼音且首字母大写
     * @exports getFullChars
     * @module pinyin 依赖pinyin对象
     * @param {string} str 汉字
     * @returns {string} 首字母大写的汉字全拼
     * 
     */
    getFullChars(str:string){
        return pinyin.getFullChars(str);
    }

     /**
     * @author 王磊（磊皇）
     * @time 2020年01月03日 11:33:46
     * @lastEditTime 2020年01月03日 11:33:46
     * @lastEditors 王磊（磊皇）
     * @description 把汉字转成大写的首字母
     * @exports getFullChars
     * @module pinyin 依赖pinyin对象
     * @param {string} str 汉字
     * @returns {string} 大写的首字母
     */
    getCamelChars(str:string){
        return pinyin.getCamelChars(str);
    }


    /**
     * @author 王磊（磊皇）
     * @time 2020年4月22日 14点04分
     * @lastEditTime 2020年4月22日 14点04分
     * @lastEditors 王磊（磊皇）
     * @description 数组去重
     * @exports dedupeWithArray
     * @method
     *          
     * @example
     *          import wlutils from 'idsutil';
     *          let test = [1,2,2,4,5,5,6];
     *          wlutils.dedupeWithArray(test); // 将返回去重后的数组
     *          
     * @returns {Array<any>} 去重后的数组
     */

    dedupeWithArray(array:Array<any>) {
        if(this.isNotEmpty(array)){
            return Array.from(new Set(array));
        }
        return array;
    }

   
    
    // /**
    //  * @author 王磊（磊皇）
    //  * @time 2020年4月22日 10点59分
    //  * @lastEditTime 2020年4月22日 10点59分
    //  * @lastEditors 王磊（磊皇）
    //  * @description 指定格式通过递归返回n层嵌套数组的方法
    //  * @param {Array<any>} root 需要转换的数据源
    //  *                      [{
    //  *                          data: [],    // 数据
    //  *                          isRoot: false,  // 是否是根节点，true是，false不是(默认)
    //  *                          parentIdName: '',   // 如果是子节点，该字段指定跟父节点字段关联的字段名称 
    //  *                          childIdName: '',   // 如果有子节点，该字段指定跟子节点字段关联的字段名称
    //  *                          labelName: '',      // label 对应的字段名称
    //  *                          valuelName: '',      // value 对应的字段名称
    //  *                      }]
    //  * @param {any} options 转换相关的设置
    //  *                      {
    //  *                          label: 'label',    // 页面显示的名称的字段名称
    //  *                          value: 'value',    // 后台接口需要的值的字段名称
    //  *                          children: 'children',  // 子节点挂载的字段名称
    //  *                      }
    //  * @returns {Array<any>} 转换后的数组对象
    //  */
    // covertPickerDataByRecursion(root, children, options?){
    //     // 如果没有传入设置，就启动默认设置
    //     if(this.isEmpty(options)){
    //         options = {
    //             label: 'label',    // 页面显示的名称的字段名称
    //             value: 'value',    // 后台接口需要的值的字段名称
    //             childre: 'children',  // 子节点挂载的字段名称
    //         }
    //     }

    //     let result = [];

    //     // 开始拼接 结构
    //     for(const rItem of root){

    //         // 根节点的直接子节点
    //         let rChildren = [];
    //         // 根节点
    //         result.push({
    //             [options.label]: root.data[rItem.labelName],
    //             [options.value]: root.data[rItem.value],
    //             [options.children]: rChildren,
    //         });

    //         // 循环子节点
    //         for(const cItem of children){
    //             if(this.isNotEmpty(cItem.data)){

    //             }
    //         }
    //     }

    //     return result;
    // }

    /**
     * @author 王磊（磊皇）
     * @time 2020年3月26日 10点22分
     * @lastEditTime 2020年3月26日 10点22分
     * @lastEditors 王磊（磊皇）
     * @description 获取地址栏中的请求参数，注意如果存在两个问好传参，只能识别第一个
     * @exports getQueryVariable
     * @param {any} variable 要获取数据参数名称
     * @returns {any} 如果没有variable参数，就返回所有地址栏参数的一个对象；如果有variable参数就返回指定的参数的值
     */
    getQueryVariable(variable?){
        let obj = {};
        let query = window.location.search.substring(1);

        if(this.isEmpty(query)){
            return obj;
        }

        let vars = query.split("&");
        
        for (let index=0;index<vars.length;index++) {
                let pair = vars[index].split("=");
                obj[pair[0]] = pair[1];

                if(this.isNotEmpty(variable)){
                    if(pair[0] == variable){return pair[1];}
                }
        }
        
        return obj;
    }

    /**
     * 
     * @author 王磊（磊皇）
     * @time 2020年5月11日 15点27分
     * @lastEditTime 2020年5月11日 15点27分
     * @lastEditors 王磊（磊皇）
     * @description 把html转义字符，转成&iexcl; 这种编码
     * @param {string} str 要转义的字符
     * @returns {string} 转义后的字符串
     * @exports htmlEncodeByRegExp
     * @example
     *          import wlutils from 'idsutil'; 
     *          let testStr = "<>?·";
     *          wlutils.htmlEncodeByRegExp(testStr);  // 应该返回：'&lt;&gt;&iexcl;&middot;'
     */
    htmlEncodeByRegExp (str: string){ 
        let temp = "";
        if(str.length == 0) return "";
        temp = str.replace(/\?/g,"&iexcl;");
        temp = temp.replace(/￠/g,"&cent;");
        temp = temp.replace(/￡/g,"&pound;");
        temp = temp.replace(/¤/g,"&curren;");
        temp = temp.replace(/￥/g,"&yen;");
        temp = temp.replace(/§/g,"&sect;");
        temp = temp.replace(/¨/g,"&uml;");
        temp = temp.replace(/©/g,"&copy;");
        temp = temp.replace(/\?/g,"&laquo;");
        temp = temp.replace(/\?/g,"&not;");
        temp = temp.replace(/\/x7f/g,"&shy;");
        temp = temp.replace(/®/g,"&reg;");
        temp = temp.replace(/ˉ/g,"&macr;");
        temp = temp.replace(/°/g,"&deg;");
        temp = temp.replace(/±/g,"&plusmn;");
        temp = temp.replace(/′/g,"&acute;");
        temp = temp.replace(/μ/g,"&micro;");
        temp = temp.replace(/\?/g,"&para;");
        temp = temp.replace(/·/g,"&middot;");
        temp = temp.replace(/\?/g,"&cedil;");
        temp = temp.replace(/\?/g,"&raquo;");
        temp = temp.replace(/\?/g,"&frac14;");
        temp = temp.replace(/\?/g,"&frac12;");
        temp = temp.replace(/\?/g,"&frac34;");
        temp = temp.replace(/À/g,"&Agrave;");
        temp = temp.replace(/Á/g,"&Aacute;");
        temp = temp.replace(/Â/g,"&circ;");
        temp = temp.replace(/Ã/g,"&Atilde;");
        temp = temp.replace(/Ä/g,"&Auml;");
        temp = temp.replace(/Å/g,"&ring;");
        temp = temp.replace(/Æ/g,"&AElig;");
        temp = temp.replace(/Ç/g,"&Ccedil;");
        temp = temp.replace(/È/g,"&Egrave;");
        temp = temp.replace(/É/g,"&Eacute;");
        temp = temp.replace(/Ê/g,"&Ecirc;");
        temp = temp.replace(/Ë/g,"&Euml;");
        temp = temp.replace(/Ì/g,"&Igrave;");
        temp = temp.replace(/Í/g,"&Iacute;");
        temp = temp.replace(/Î/g,"&Icirc;");
        temp = temp.replace(/Ï/g,"&Iuml;");
        temp = temp.replace(/Ð/g,"&ETH;");
        temp = temp.replace(/Ñ/g,"&Ntilde;");
        temp = temp.replace(/Ò/g,"&Ograve;");
        temp = temp.replace(/Ó/g,"&Oacute;");
        temp = temp.replace(/Ô/g,"&Ocirc;");
        temp = temp.replace(/Õ/g,"&Otilde;");
        temp = temp.replace(/Ö/g,"&Ouml;");
        temp = temp.replace(/&times;/g,"&times;");
        temp = temp.replace(/Ø/g,"&Oslash;");
        temp = temp.replace(/Ù/g,"&Ugrave;");
        temp = temp.replace(/Ú/g,"&Uacute;");
        temp = temp.replace(/Û/g,"&Ucirc;");
        temp = temp.replace(/Ü/g,"&Uuml;");
        temp = temp.replace(/Ý/g,"&Yacute;");
        temp = temp.replace(/Þ/g,"&THORN;");
        temp = temp.replace(/ß/g,"&szlig;");
        temp = temp.replace(/à/g,"&agrave;");
        temp = temp.replace(/á/g,"&aacute;");
        temp = temp.replace(/â/g,"&acirc;");
        temp = temp.replace(/ã/g,"&atilde;");
        temp = temp.replace(/ä/g,"&auml;");
        temp = temp.replace(/å/g,"&aring;");
        temp = temp.replace(/æ/g,"&aelig;");
        temp = temp.replace(/ç/g,"&ccedil;");
        temp = temp.replace(/è/g,"&egrave;");
        temp = temp.replace(/é/g,"&eacute;");
        temp = temp.replace(/ê/g,"&ecirc;");
        temp = temp.replace(/ë/g,"&euml;");
        temp = temp.replace(/ì/g,"&igrave;");
        temp = temp.replace(/í/g,"&iacute;");
        temp = temp.replace(/î/g,"&icirc;");
        temp = temp.replace(/ï/g,"&iuml;");
        temp = temp.replace(/ð/g,"&ieth;");
        temp = temp.replace(/ñ/g,"&ntilde;");
        temp = temp.replace(/ò/g,"&ograve;");
        temp = temp.replace(/ó/g,"&oacute;");
        temp = temp.replace(/ô/g,"&ocirc;");
        temp = temp.replace(/õ/g,"&otilde;");
        temp = temp.replace(/ö/g,"&ouml;");
        temp = temp.replace(/÷/g,"&divide;");
        temp = temp.replace(/ø/g,"&oslash;");
        temp = temp.replace(/ù/g,"&ugrave;");
        temp = temp.replace(/ú/g,"&uacute;");
        temp = temp.replace(/û/g,"&ucirc;");
        temp = temp.replace(/ü/g,"&uuml;");
        temp = temp.replace(/ý/g,"&yacute;");
        temp = temp.replace(/þ/g,"&thorn;");
        temp = temp.replace(/ÿ/g,"&yuml;");
        temp = temp.replace(/</g,"&lt;");
        temp = temp.replace(/>/g,"&gt;");
        temp = temp.replace(/\s/g,"&nbsp;");

        temp = temp.replace(/ƒ/g,"&fnof;");
        temp = temp.replace(/Γ/g,"&Gamma;");
        temp = temp.replace(/Δ/g,"&Delta;");
        temp = temp.replace(/Θ/g,"&Theta;");
        temp = temp.replace(/Λ/g,"&Lambda;");
        temp = temp.replace(/Ξ/g,"&Xi;");
        temp = temp.replace(/Π/g,"&Pi;");
        temp = temp.replace(/Σ/g,"&Sigma;");
        temp = temp.replace(/×/g,"&times;");
        temp = temp.replace(/Φ/g,"&Phi;");
        temp = temp.replace(/Ψ/g,"&Psi;");
        temp = temp.replace(/Ω/g,"&Omega;");
        temp = temp.replace(/α/g,"&alpha;");
        temp = temp.replace(/β/g,"&beta;");
        temp = temp.replace(/δ/g,"&delta;");
        temp = temp.replace(/ε/g,"&epsilon;");
        temp = temp.replace(/ζ/g,"&zeta;");
        temp = temp.replace(/η/g,"&eta;");
        temp = temp.replace(/θ/g,"&theta;");
        temp = temp.replace(/ι/g,"&iota;");
        temp = temp.replace(/λ/g,"&lambda;");
        temp = temp.replace(/ξ/g,"&xi;");
        temp = temp.replace(/π/g,"&pi;");
        temp = temp.replace(/ρ/g,"&rho;");
        temp = temp.replace(/ς/g,"&sigmaf;");
        temp = temp.replace(/σ/g,"&sigma;");
        temp = temp.replace(/φ/g,"&phi;");
        temp = temp.replace(/ψ/g,"&psi;");
        temp = temp.replace(/ω/g,"&omega;");
        temp = temp.replace(/…/g,"&hellip;");
        temp = temp.replace(/•/g,"&bull;");
        temp = temp.replace(/℘/g,"&weierp;");
        temp = temp.replace(/ℑ/g,"&image;");
        temp = temp.replace(/ℜ/g,"&real;");
        temp = temp.replace(/™/g,"&trade;");
        temp = temp.replace(/ℵ/g,"&alefsym;");
        temp = temp.replace(/⇐/g,"&lArr;");
        temp = temp.replace(/⇑/g,"&uArr;");
        temp = temp.replace(/⇒/g,"&rArr;");
        temp = temp.replace(/⇓/g,"&dArr;");
        temp = temp.replace(/⇔/g,"&hArr;");
        temp = temp.replace(/∀/g,"&forall;");
        temp = temp.replace(/∂/g,"&part;");
        temp = temp.replace(/∃/g,"&exist;");
        temp = temp.replace(/∅/g,"&empty;");
        temp = temp.replace(/∇/g,"&nabla;");
        temp = temp.replace(/∈/g,"&isin;");
        temp = temp.replace(/∉/g,"&notin;");
        temp = temp.replace(/∋/g,"&ni;");
        temp = temp.replace(/∏/g,"&prod;");
        temp = temp.replace(/∑/g,"&sum;");
        temp = temp.replace(/−/g,"&minus;");
        temp = temp.replace(/∗/g,"&lowast;");
        temp = temp.replace(/√/g,"&radic;");
        temp = temp.replace(/∝/g,"&prop;");
        temp = temp.replace(/∞/g,"&infin;");
        temp = temp.replace(/∠/g,"&ang;");
        temp = temp.replace(/∧/g,"&and;");
        temp = temp.replace(/∨/g,"&or;");
        temp = temp.replace(/∩/g,"&cap;");
        temp = temp.replace(/∪/g,"&cup;");
        temp = temp.replace(/∫/g,"&int;");
        temp = temp.replace(/∴/g,"&there4;");
        temp = temp.replace(/∼/g,"&sim;");
        temp = temp.replace(/∝/g,"&cong;");
        temp = temp.replace(/≈/g,"&asymp;");
        temp = temp.replace(/≠/g,"&ne;");
        temp = temp.replace(/≡/g,"&equiv;");
        temp = temp.replace(/≥/g,"&ge;");
        temp = temp.replace(/≤/g,"&le;");
        temp = temp.replace(/⊂/g,"&sub;");
        temp = temp.replace(/⊃/g,"&sup;");
        temp = temp.replace(/⊄/g,"&nsub;");
        temp = temp.replace(/⊆/g,"&sube;");
        temp = temp.replace(/⊇/g,"&supe;");
        temp = temp.replace(/⊕/g,"&oplus;");
        temp = temp.replace(/⊗/g,"&otimes;");
        temp = temp.replace(/◊/g,"&loz;");
        temp = temp.replace(/♠/g,"&spades;");
        temp = temp.replace(/♣/g,"&clubs;");
        temp = temp.replace(/♥/g,"&hearts;");
        temp = temp.replace(/♦/g,"&diams;");
        temp = temp.replace(/œ/g,"&oelig;");
        temp = temp.replace(/Š/g,"&Scaron;");
        temp = temp.replace(/š/g,"&scaron;");
        temp = temp.replace(/ˆ/g,"&circ;");
        temp = temp.replace(/˜/g,"&tilde;");
        temp = temp.replace(/€/g,"&euro;");
        temp = temp.replace(/‰/g,"&permil;");
        
        

        temp = temp.replace(/\"/g,"&quot;");
        return temp;
   }

   
    /**
     * 
     * @author 王磊（磊皇）
     * @time 2020年5月11日 15点27分
     * @lastEditTime 2020年5月11日 15点27分
     * @lastEditors 王磊（磊皇）
     * @description 把&iexcl，转成html转义字符; 这种编码
     * @param {string} str 要转义的字符
     * @returns {string} 转义后的字符串
     * @exports htmlDecodeByRegExp
     * @example
     *          import wlutils from 'idsutil'; 
     *          let testStr = '&lt;&gt;&iexcl;&middot;';
     *          wlutils.htmlDecodeByRegExp(testStr);  // 应该返回："<>?·"
     */
    htmlDecodeByRegExp (str: string){ 
        let temp = "";
        if(str.length == 0) return "";
        temp = str.replace(/&iexcl;/g,"\?");
        temp = temp.replace(/&cent;/g,"￠");
        temp = temp.replace(/&pound;/g,"￡");
        temp = temp.replace(/&curren;/g,"¤");
        temp = temp.replace(/&yen;/g,"￥");
        temp = temp.replace(/&sect;/g,"§");
        temp = temp.replace(/&uml;/g,"¨");
        temp = temp.replace(/&copy;/g,"©");
        temp = temp.replace(/&laquo;/g,"\?");
        temp = temp.replace(/&not;/g,"\?");
        temp = temp.replace(/&shy;/g,"\/x7f");
        temp = temp.replace(/&reg;/g,"®");
        temp = temp.replace(/&macr;/g,"ˉ");
        temp = temp.replace(/&deg;/g,"°");
        temp = temp.replace(/&plusmn;/g,"±");
        temp = temp.replace(/&acute;/g,"′");
        temp = temp.replace(/&micro;/g,"μ");
        temp = temp.replace(/&para;/g,"\?");
        temp = temp.replace(/&middot;/g,"·");
        temp = temp.replace(/&cedil;/g,"\?");
        temp = temp.replace(/&raquo;/g,"\?");
        temp = temp.replace(/&frac14;/g,"\?");
        temp = temp.replace(/&frac12;/g,"\?");
        temp = temp.replace(/&frac34;/g,"\?");
        temp = temp.replace(/&Agrave;/g,"À");
        temp = temp.replace(/&Aacute;/g,"Á");
        temp = temp.replace(/&circ;/g,"Â");
        temp = temp.replace(/&Atilde;/g,"Ã");
        temp = temp.replace(/&Auml;/g,"Ä");
        temp = temp.replace(/&ring;/g,"Å");
        temp = temp.replace(/&AElig;/g,"Æ");
        temp = temp.replace(/&Ccedil;/g,"Ç");
        temp = temp.replace(/&Egrave;/g,"È");
        temp = temp.replace(/&Eacute;/g,"É");
        temp = temp.replace(/&Ecirc;/g,"Ê");
        temp = temp.replace(/&Euml;/g,"Ë");
        temp = temp.replace(/&Igrave;/g,"Ì");
        temp = temp.replace(/&Iacute;/g,"Í");
        temp = temp.replace(/&Icirc;/g,"Î");
        temp = temp.replace(/&Iuml;/g,"Ï");
        temp = temp.replace(/&ETH;/g,"Ð");
        temp = temp.replace(/&Ntilde;/g,"Ñ");
        temp = temp.replace(/&Ograve;/g,"Ò");
        temp = temp.replace(/&Oacute;/g,"Ó");
        temp = temp.replace(/&Ocirc;/g,"Ô");
        temp = temp.replace(/&Otilde;/g,"Õ");
        temp = temp.replace(/&Ouml;/g,"Ö");
        temp = temp.replace(/&times;/g,"&times;");
        temp = temp.replace(/&Oslash;/g,"Ø");
        temp = temp.replace(/&Ugrave;/g,"Ù");
        temp = temp.replace(/&Uacute;/g,"Ú");
        temp = temp.replace(/&Ucirc;/g,"Û");
        temp = temp.replace(/&Uuml;/g,"Ü");
        temp = temp.replace(/&Yacute;/g,"Ý");
        temp = temp.replace(/&THORN;/g,"Þ");
        temp = temp.replace(/&szlig;/g,"ß");
        temp = temp.replace(/&agrave;/g,"à");
        temp = temp.replace(/&aacute;/g,"á");
        temp = temp.replace(/&acirc;/g,"â");
        temp = temp.replace(/&atilde;/g,"ã");
        temp = temp.replace(/&auml;/g,"ä");
        temp = temp.replace(/&aring;/g,"å");
        temp = temp.replace(/&aelig;/g,"æ");
        temp = temp.replace(/&ccedil;/g,"ç");
        temp = temp.replace(/&egrave;/g,"è");
        temp = temp.replace(/&eacute;/g,"é");
        temp = temp.replace(/&ecirc;/g,"ê");
        temp = temp.replace(/&euml;/g,"ë");
        temp = temp.replace(/&igrave;/g,"ì");
        temp = temp.replace(/&iacute;/g,"í");
        temp = temp.replace(/&icirc;/g,"î");
        temp = temp.replace(/&iuml;/g,"ï");
        temp = temp.replace(/&ieth;/g,"ð");
        temp = temp.replace(/&ntilde;/g,"ñ");
        temp = temp.replace(/&ograve;/g,"ò");
        temp = temp.replace(/&oacute;/g,"ó");
        temp = temp.replace(/&ocirc;/g,"ô");
        temp = temp.replace(/&otilde;/g,"õ");
        temp = temp.replace(/&ouml;/g,"ö");
        temp = temp.replace(/&divide;/g,"÷");
        temp = temp.replace(/&oslash;/g,"ø");
        temp = temp.replace(/&ugrave;/g,"ù");
        temp = temp.replace(/&uacute;/g,"ú");
        temp = temp.replace(/&ucirc;/g,"û");
        temp = temp.replace(/&uuml;/g,"ü");
        temp = temp.replace(/&yacute;/g,"ý");
        temp = temp.replace(/&thorn;/g,"þ");
        temp = temp.replace(/&yuml;/g,"ÿ");
        temp = temp.replace(/&lt;/g,"<");
        temp = temp.replace(/&gt;/g,">");
        temp = temp.replace(/&nbsp;/g," ");
        temp = temp.replace(/&quot;/g,"\"");


        temp = temp.replace(/&fnof;/g,"ƒ");
        temp = temp.replace(/&Gamma;/g,"Γ");
        temp = temp.replace(/&Delta;/g,"Δ");
        temp = temp.replace(/&Theta;/g,"Θ");
        temp = temp.replace(/&Lambda;/g,"Λ");
        temp = temp.replace(/&Xi;/g,"Ξ");
        temp = temp.replace(/&Pi;/g,"Π");
        temp = temp.replace(/&Sigma;/g,"Σ");
        temp = temp.replace(/&times;/g,"×");
        temp = temp.replace(/&Phi;/g,"Φ");
        temp = temp.replace(/&Psi;/g,"Ψ");
        temp = temp.replace(/&Omega;/g,"Ω");
        temp = temp.replace(/&alpha;/g,"α");
        temp = temp.replace(/&beta;/g,"β");
        temp = temp.replace(/&delta;/g,"δ");
        temp = temp.replace(/&epsilon;/g,"ε");
        temp = temp.replace(/&zeta;/g,"ζ");
        temp = temp.replace(/&eta;/g,"η");
        temp = temp.replace(/&theta;/g,"θ");
        temp = temp.replace(/&iota;/g,"ι");
        temp = temp.replace(/&lambda;/g,"λ");
        temp = temp.replace(/&xi;/g,"ξ");
        temp = temp.replace(/&pi;/g,"π");
        temp = temp.replace(/&rho;/g,"ρ");
        temp = temp.replace(/&sigmaf;/g,"ς");
        temp = temp.replace(/&sigma;/g,"σ");
        temp = temp.replace(/&phi;/g,"φ");
        temp = temp.replace(/&psi;/g,"ψ");
        temp = temp.replace(/&omega;/g,"ω");
        temp = temp.replace(/&hellip;/g,"…");
        temp = temp.replace(/&bull;/g,"•");
        temp = temp.replace(/&weierp;/g,"℘");
        temp = temp.replace(/&image;/g,"ℑ");
        temp = temp.replace(/&real;/g,"ℜ");
        temp = temp.replace(/&trade;/g,"™");
        temp = temp.replace(/&alefsym;/g,"ℵ");
        temp = temp.replace(/&lArr;/g,"⇐");
        temp = temp.replace(/&uArr;/g,"⇑");
        temp = temp.replace(/&rArr;/g,"⇒");
        temp = temp.replace(/&dArr;/g,"⇓");
        temp = temp.replace(/&hArr;/g,"⇔");
        temp = temp.replace(/&forall;/g,"∀");
        temp = temp.replace(/&part;/g,"∂");
        temp = temp.replace(/&exist;/g,"∃");
        temp = temp.replace(/&empty;/g,"∅");
        temp = temp.replace(/&nabla;/g,"∇");
        temp = temp.replace(/&isin;/g,"∈");
        temp = temp.replace(/&notin;/g,"∉");
        temp = temp.replace(/&ni;/g,"∋");
        temp = temp.replace(/&prod;/g,"∏");
        temp = temp.replace(/&sum;/g,"∑");
        temp = temp.replace(/&minus;/g,"−");
        temp = temp.replace(/&lowast;/g,"∗");
        temp = temp.replace(/&radic;/g,"√");
        temp = temp.replace(/&prop;/g,"∝");
        temp = temp.replace(/&infin;/g,"∞");
        temp = temp.replace(/&ang;/g,"∠");
        temp = temp.replace(/&and;/g,"∧");
        temp = temp.replace(/&or;/g,"∨");
        temp = temp.replace(/&cap;/g,"∩");
        temp = temp.replace(/&cup;/g,"∪");
        temp = temp.replace(/&int;/g,"∫");
        temp = temp.replace(/&there4;/g,"∴");
        temp = temp.replace(/&sim;/g,"∼");
        temp = temp.replace(/&cong;/g,"∝");
        temp = temp.replace(/&asymp;/g,"≈");
        temp = temp.replace(/&ne;/g,"≠");
        temp = temp.replace(/&equiv;/g,"≡");
        temp = temp.replace(/&ge;/g,"≥");
        temp = temp.replace(/&le;/g,"≤");
        temp = temp.replace(/&sub;/g,"⊂");
        temp = temp.replace(/&sup;/g,"⊃");
        temp = temp.replace(/&nsub;/g,"⊄");
        temp = temp.replace(/&sube;/g,"⊆");
        temp = temp.replace(/&supe;/g,"⊇");
        temp = temp.replace(/&oplus;/g,"⊕");
        temp = temp.replace(/&otimes;/g,"⊗");
        temp = temp.replace(/&loz;/g,"◊");
        temp = temp.replace(/&spades;/g,"♠");
        temp = temp.replace(/&clubs;/g,"♣");
        temp = temp.replace(/&hearts;/g,"♥");
        temp = temp.replace(/&diams;/g,"♦");
        temp = temp.replace(/&oelig;/g,"œ");
        temp = temp.replace(/&Scaron;/g,"Š");
        temp = temp.replace(/&scaron;/g,"š");
        temp = temp.replace(/&circ;/g,"ˆ");
        temp = temp.replace(/&tilde;/g,"˜");
        temp = temp.replace(/&euro;/g,"€");
        temp = temp.replace(/&permil;/g,"‰");

        return temp;
   }


   /**
     * 
     * @author 王磊（磊皇）
     * @time 2020年5月12日 13点33分
     * @lastEditTime 2020年5月12日 13点33分
     * @lastEditors 王磊（磊皇）
     * @description 获取文件名称的后缀名
     * @param {string} filename 文件路径字符串或者文件名称字符串
     * @returns {string} 文件的后缀字符串，如：png
     * @exports extFileNameWithString
     * @example
     *          import wlutils from 'idsutil'; 
     *          let testFile = 'a.b.c.d.f.e.f发射点发生士大夫手动。sdf .pdf.img.png';
     *          wlutils.extFileNameWithString(testStr);  // 应该返回："png"
     */
   extFileNameWithString(filename: string){
    if(!filename||typeof filename!='string'){
       return '';
    };
    let a = filename.split('').reverse().join('');
    let b = a.substring(0,a.search(/\./)).split('').reverse().join('');
    return b;
  };

}
export default new wlutils("磊皇天下第一！！！");