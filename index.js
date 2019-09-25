/**
 * @file: 公用工具类
 * @description: 包括入参验证等方法
 * @require model:loadsh
 * @author: 王磊
 * @version 0.0.16
 * @time: 2019年8月26日 10点00分
 * @lastEditTime: 2019年9月25日 09点23分
 * @lastEditors: 王磊
 */
var _ = require('lodash');
var stringify = require('qs').stringify;
var axios = require('axios');

/**
 * @exports wluitls
 * @type {Object}
 */
var wlutils = {
    /**
     * 文件资源访问路径前缀
     *
     * @protected
     * @exports FILERESCOURURL
     */
    FILERESCOURURLPREFIX: '/fileSys/uploadResource',

    /**
     * 判断某个属性是否存在于某个对象中，
     * 注意本方法可能循环原型链，需要传入 参数确定，默认不查询
     *
     * @function
     * @exports objHasOwnProperty
     * @example 
     *          import wlutils from 'idsutil';
     *          var a = {'b': 1};
     *          wlutils.objHasOwnProperty('b', a);  // 应该返回 true
     *
     * @param {string} value    需要检验的key
     * @require model:loadsh
     * @param {Object} obj      需要检验key的对象
     * @param {boolean} isTrue  是否需要查询原型链，默认为false，不查询原型链
     *
     * @return {boolean} 是否存在，true 存在， false 不存在
     *
     */
    objHasOwnProperty(value, obj, isTrue = false) {
        var isExist = this.isNotEmpty(value) && value !== 'undefined' && value !== 'null' && value !== '{}' && value !== '[]'
                && value !== 'object' && value !== 'Object'
                && this.isNotEmpty(obj) && obj !== 'undefined' && obj !== 'null' && obj !== '{}' && obj !== '[]'
                && obj !== 'object' && obj !== 'Object'
                && value in obj && this.isNotEmpty(obj[value]) && obj[value] !== 'undefined' && obj[value] !== 'null'
                && obj[value] !== '{}' && obj[value] !== '[]' && obj[value] !== 'object' && obj[value] !== 'Object'
                || (isTrue === true && Object.prototype.hasOwnProperty.call(obj, value));

            // 排除字符串
            if (isExist === true && typeof obj[value] === 'string') {
                isExist = isExist && obj[value].trim() !== 'undefined' && obj[value].trim() !== 'null'
                    && obj[value].trim() !== '{}' && obj[value].trim() !== '[]'
                    && obj[value].trim() !== 'object' && obj[value].trim() !== 'Object'
                    && obj[value] !== ' ' && obj[value] !== '  '
            }
        return isExist;
    },

    /**
     *
     * 获取对象中的属性
     *
     * @function
     * @exports getObjProperty
     * @example 
     *          import wlutils from 'idsutil';
     *          var a = {'b': 1};
     *          wlutils.getObjProperty('b', a);  // 应该返回 1
     *
     * @param {string} key 对象中的key
     * @param {Object} obj 对象
     * @require model:loadsh
     * @param {Object} defaultValue 如果对象key不存在或没值的话，默认返回值
     *
     * @return {Object} 如果对象中存在那么可以返回属性值，如果不存在就返回 null
     */
    getObjProperty(key, obj, defaultValue = null) {
        // 判断key值是不是带层级，也就是存在 a.b.c.d.e
        if (this.isNotEmpty(key) && this.isNotEmpty(obj)) {

            if (key.indexOf('.') === -1) {
                if (this.objHasOwnProperty(key, obj) === true) {
                    obj = obj[key]
                }else {
                    console.info(`对象${obj}中没有找到属性'${key}'或者该属性为空`);
                    obj = defaultValue
                }
                return obj;
            }
            var keys = key.split('.');
            for (var kesItem of keys) {
                if (this.objHasOwnProperty(kesItem, obj) === true) {
                    obj = obj[kesItem];
                } else {
                    console.info(`对象${obj}中没有找到属性'${key}'或者该属性为空`);
                    return defaultValue;
                }
            }
            return obj;

        }
        return defaultValue;
    },

    /**
     * 入参校验，逻辑上是否为空，包括了判断数组的长度, 和对象是否存在子属性
     *
     * @function
     * @exports isEmpty
     * @require model:loadsh
     * @example 
     *          import wlutils from 'idsutil';
     *          var a = {'b': 1};
     *          wlutils.isEmpty(a);  // 应该返回 false
     * @param {*} value 要判断的参数
     * @return {boolean} 对象是否为空
     */
    isEmpty(value) {
        // return value === undefined || value === null || value === ''
        // || (value instanceof Array && Object.prototype.hasOwnProperty.bind('length', value) && value.length === 0)
        // || (value instanceof Object && Object.keys(value).length === 0);
        var isTrue = _.isNull(value) || _.isEmpty(value) || value === 'undefined' 
            || value === 'null' || value === '[]' || value === '{}'
            || value === 'object' || value === 'Object';

        // 排除字符串
        if (typeof value === 'string') {
            isTrue = isTrue || value.trim() === 'undefined' || value.trim()  === 'null'
                || value.trim() === '{}' || value.trim() === '[]'
                || value.trim() === 'object' || value.trim() === 'Object'
                || value === ' ' || value === '  '
        }

        // 如果是数字
        if (typeof value === 'number') {
            isTrue = value === 0;
        }

        return isTrue;
    },

    /**
     * 入参校验，逻辑上是否不为空，包括了判断数组的长度，和对象是否存在子属性
     *
     * @function
     * @exports isNotEmpty
     * @require model:loadsh
     * @example 
     *          import wlutils from 'idsutil';
     *          var a = {};
     *          wlutils.isNotEmpty(a);  // 应该返回 false
     * @param {*} value 要判断的参数
     * @return {boolean} 对象是否为空
     */
    isNotEmpty(value) {
        return !this.isEmpty(value);
    },

    /**
     * 
     * 内部应用跳转
     * 
     * @function
     * @exports loadMutilview
     * @requires model:cordova.js
     * @example
     *          import wlutils from 'idsutil';
     *          wlutils.loadMutilview('http://school.idealworkshops.com/devserver/student_transcript/1.0.0/#/main/page');
     * @param {string} url 内部应用地址
     * @param {Object} data 请求参数 
     * @param {Function} success 成功回调函数
     * @param {Function} error 失败回调函数
     */
    loadMutilview(url, data, success, error) {
        this.isNotEmpty(PGMultiView) &&  PGMultiView.loadView(url, JSON.stringify(data || {}), success, error);
    },

    /**
     * 根据应用key跳转到应用首页
     * @function
     * @exports goToAppHomeByKey
     * @description 这个方法的type暂时默认是developer，等以后去掉开发者模式 devserver目录的时候需要去掉
     * @requires model:axios
     * @requires model:cordova.js
     * @example
     *          import * as Utils from '@/services/util';
     *          Utils.goToAppHomeByKey(key);        // 直接调转页面
     *          // key 如果不知道是啥，可以访问如下地址，传一个你的 学校id即可
     *          // 根据汉字找到对应app的key
     * @link http://school.idealworkshops.com/server/api/Apps?school_id=J5swpFAatT6ng34sDtK&mode=production 生产环境
     * @link http://124.235.206.62:12392/server/api/Apps?school_id=J5swpFAatT6ng34sDtK&mode=production 开发环境
     * @link http://124.235.206.62:12393/server/api/Apps?school_id=J5swpFAatT6ng34sDtK&mode=production 测试环境
     * @param {string} key 需要跳转应用对应的key
     * @param {string} type 应用类型，'production' 是非开发者模式，'developer' 是开发者模式
     */
    goToAppHomeByKey(key, type='production') {
        if(this.isEmpty(key)){
            console.error("--------------------");
            console.error(`${key} 调用跳转应用首页失败，未接收到key`);
            console.error("--------------------");
            return false;
        }

        /**
         * 跳转的地址
         *
         * @private
         * @type {string}
         */
        var goToAppUrl = '';

        /**
         * 跳转页面成功回调
         * @inner
         * @function
         * @type {Function}
         * @private
         * @param {Object} res http响应数据对象
         */
        var succCallBack = function(res){
            console.log("++++++++++++++++++++");
            console.log(`${key} 调用跳转应用首页成功`);
            console.log(res);
            console.log("++++++++++++++++++++");
        }

        /**
         * 跳转页面失败回调
         * @inner
         * @function
         * @type {Function}
         * @private
         * @param {Object} res http响应数据对象
         */
        var errorCallBack = function(res){
            console.error("--------------------");
            console.error(`${key} 调用跳转应用首页失败`);
            console.error(res);
            console.error("--------------------");
        }
        // S1：获取应用菜单
        axios.get(`http://${window.location.host}/server/api/Apps?school_id=${window.schoolId}&mode=${type}`).then(res => {
            if(this.isNotEmpty(res) && this.isNotEmpty(this.getObjProperty('data', res))){

                // S2：循环找到和 key 相等的菜单
                for (var item of this.getObjProperty('data', res)) {
                    for(var menuItem of this.getObjProperty('apps', item, [])){
                        if (key === this.getObjProperty('key', menuItem)) {
                            goToAppUrl = this.getObjProperty('url', menuItem)
                            break;
                        }
                    }
                }

                // S3：如果找到了菜单就跳转到指定页面
                if(this.isNotEmpty(goToAppUrl)){
                    this.loadMutilview(goToAppUrl, {}, succCallBack, errorCallBack);
                }
            }
        });

    },


    /**
     * 根据应用key跳转app详情页
     * @function
     * @exports goToAppDetailByKey
     * @description 这个方法的type暂时默认是developer，等以后去掉开发者模式 devserver目录的时候需要去掉
     * @requires model:axios
     * @requires model:qs.stringify
     * @requires model:cordova.js
     * @example
     *          import wlutils from 'idsutil';
     *          wlutils.goToAppDetailByKey(key, ruoter);
     *          // key 如果不知道是啥，可以访问如下地址，传一个你的 学校id即可
     *          // 根据汉字找到对应app的key
     * @link http://school.idealworkshops.com/server/api/Apps?school_id=J5swpFAatT6ng34sDtK&mode=production 生产环境
     * @link http://124.235.206.62:12392/server/api/Apps?school_id=J5swpFAatT6ng34sDtK&mode=production 开发环境
     * @link http://124.235.206.62:12393/server/api/Apps?school_id=J5swpFAatT6ng34sDtK&mode=production 测试环境
     * @param {string} key 需要跳转应用对应的key，注意添加app应用的时候key必须和服务器目录名称一致
     * @param {string} router 需要跳转的详细页面的路由地址
     * @param {string} type 应用类型，'production' 是非开发者模式，'developer' 是开发者模式
     */
    goToAppDetailByKey(key, router, param={}, type= 'production') {
        if(this.isEmpty(key) || this.isEmpty(router)){
            console.error("--------------------");
            console.error(`${key} 调用跳转应用详情页失败，未接收到key`);
            console.error("--------------------");
            return false;
        }

        /**
         * 跳转的地址
         *
         * @private
         * @type {string}
         */
        var goToAppUrl = '';

        /**
         * 跳转页面成功回调
         * @inner
         * @function
         * @type {Function}
         * @private
         * @param {Object} res http响应数据对象
         */
        var succCallBack = function(res){
            console.log("++++++++++++++++++++");
            console.log(`${key} 调用跳转应用详情页成功`);
            console.log(res);
            console.log("++++++++++++++++++++");
        }

        /**
         * 跳转页面失败回调
         * @inner
         * @function
         * @type {Function}
         * @private
         * @param {Object} res http响应数据对象
         */
        var errorCallBack = function(res){
            console.error("--------------------");
            console.error(`${key} 调用跳转应用详情页失败`);
            console.error(res);
            console.error("--------------------");
        }
        // S1：获取应用菜单
        axios.get(`http://${window.location.host}/server/api/Apps?school_id=${window.schoolId}&mode=${type}`).then(res => {
            if(this.isNotEmpty(res) && this.isNotEmpty(this.getObjProperty('data', res))){

                // S2：循环找到和 key 相等的菜单
                for (var item of this.getObjProperty('data', res)) {
                    // S3：根据用户类型判断菜单，排除重复key
                    for(var menuItem of this.getObjProperty('apps', item, [])){
                        if (key === this.getObjProperty('key', menuItem)) {
                            goToAppUrl = this.getObjProperty('url', menuItem)
                            
                            // S3：直接跳转
                            // eslint-disable-next-line
                            goToAppUrl = `${window.location.origin}/${type === 'developer' ? 'devserver' : 'appserver' }/${key}/${this.getObjProperty('version', menuItem)}/#${router}${this.isNotEmpty(param) ? '?'+ stringify(params) : ''}`
                            this.loadMutilview(goToAppUrl, {}, succCallBack, errorCallBack);
                            break;
                        }
                    }
                }

            }
        });

        
    },

    /**
     * 根据系统类型获取对应的文件访问地址
     *
     * @function
     * @exports getFileUrl
     * @type {Function}
     * @param {string} url 文件资源地址
     * @param {string} type 系统类型，默认是 'Guanliruanjian'
     * @return {string} 浏览器可以访问的文件地址
     * @example
     *          import wlutils from 'idsutil';
     *          // 在app.js 中添加如下代码，获取原生学校系统配置
     *          // windos.schoolSystemsConf = schoolInfo.systems;        // 学校系统相关配置
     *          var testToArray = {
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
     *          var convertedArray = wlutils.toArrayWithItem(wlutils.getObjProperty('fileUrl', testToArray));
     *          // 返回如下数据：
     *          
     *          var result = [
     *                 {
     *                     key: '/ueditor/file/20190829/1567045335126084955.xlsx',
     *                     text: '2018年学生导入数据模板_20181024142346.xlsx'
     *                 },
     *                 {
     *                     key: '/ueditor/file/20190827/1566897510803049349.docx',
     *                     text: '新平台问题反馈-滕飞老师-回复-改后 .doc'
     *                 }
     *           ];
     * 
     *           var covertUri = wlutils.getFileUrl(wlutils.getObjProperty('0.key', convertedArray));
     *           // 返回如下数据：
     *           var result1 = 'http://124.235.206.62:38110/fileSys/uploadResource/ueditor/file/20190829/1567045335126084955.xlsx';
     */
    getFileUrl(url, type= 'Guanliruanjian'){
        var uri = null;
        // S1：入参校验
        if(this.isEmpty(url) || this.isEmpty(window.apiGateway)){
            console.error("--------------------");
            console.error("请检查资源路径或者window对象中是否存在apiGateway变量！");
            console.error("--------------------");
            return uri;
        }

        // S2：获取原生的学校配置中的资源地址
        // for (var systemConf of this.getObjProperty('schoolSystemsConf', window)) {
            
        //     // S3：根据type获取管理系统还是教学系统还是其他系统
        //     if ( type === this.getObjProperty('name', systemConf)) {
        //         // S4：找到外网地址，如果没有就用对应的内网地址
        //         uri =  this.getObjProperty('host_wan', systemConf,
        //             this.getObjProperty('host_lan', systemConf, ''));
        //         uri += this.FILERESCOURURLPREFIX + url;
        //         return uri;
        //     }
            
        // }
        uri = null;
        if(this.objHasOwnProperty('apiGateway', window)){
            uri = window.apiGateway;
            uri += this.FILERESCOURURLPREFIX + url;

            return uri;
        }
        
        console.error('window 对象中没有设置 apiGateway 属性！！！');
        return uri;
    },

    /**
     * 对象转换成数组，里边每一项都是 key，text组成的对象
     *
     * @function
     * @extends toArrayWithItem
     * @type {Function}
     * @protected
     * @param {object} obj 需要转换的对象
     * @return {Array} 转换后的数组
     *                      [
     *                          {
     *                              key: '',
     *                              value: ''
     *                          },
     *                          ......
     *                      ]
     * @example 
     *          import wlutils from 'idsutil';
     *          var testToArray = {
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
     *          var convertedArray = wlutils.toArrayWithItem(wlutils.getObjProperty('fileUrl', testToArray));
     *          // 返回如下数据：
     *          
     *          var result = [
     *                 {
     *                     key: '/ueditor/file/20190829/1567045335126084955.xlsx',
     *                     text: '2018年学生导入数据模板_20181024142346.xlsx'
     *                 },
     *                 {
     *                     key: '/ueditor/file/20190827/1566897510803049349.docx',
     *                     text: '新平台问题反馈-滕飞老师-回复-改后 .doc'
     *                 }
     *           ];
     *           
     */
    toArrayWithItem(obj){
        var newArray = [];

        // S1：入参校验
        if (this.isEmpty(obj)) {
            console.error("--------------------");
            console.error("没有获取到访问的资源路径！");
            console.error("--------------------");
            return newArray;
        }

        // S2：循环对象吧对象的key和value拆成item对象，放到newArray数组中
        for(var key of Object.keys(obj)){
            newArray.push({
                key: key,
                text: this.objHasOwnProperty(key, obj) === true ? obj[key] : ''
            });
        }

        return newArray;
    }
}
export default wlutils;