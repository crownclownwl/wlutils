/*
 * @file: 接口文件
 * @description: 主要用来定义类型约束
 * @author: 王磊
 * @time: 2020年01月03日 11:33:46
 * @lastEditTime: Do not edit
 * @lastEditors: 王磊
 */
/**
 * @public
 * @interface
 * @author 王磊（磊皇）
 * @time 2020年01月03日 11:33:46
 * @lastEditTime 2020年01月03日 11:33:46
 * @lastEditors 王磊
 * @exports IApproveFilterItemDataData
 * @description 审批流程的数据
 */
interface IApproveFilterItemDataData{
    /**
     * @property
     * @public
     * @author 王磊（磊皇）
     * @time 2020年01月03日 11:33:46
     * @lastEditTime 2020年01月03日 11:34:37
     * @lastEditors 王磊
     * @description 数据类型，现在仅支持：
     *              date 代表 YYYY-MM-dd(注意后端的年份必须是小写的yyyy，不然会有周跨年bug),
     *              dateTime 代表 YYYY-MM-dd HH:mm:ss
     */
    mode: string;
    /**
     * @property
     * @public
     * @author 王磊（磊皇）
     * @time 2020年01月03日 11:33:46
     * @lastEditTime 2020年01月03日 11:34:37
     * @lastEditors 王磊
     * @description 发送给后台的请求参数名称
     */
    requestName: string;
    /**
     * @property
     * @public
     * @author 王磊（磊皇）
     * @time 2020年01月03日 11:33:46
     * @lastEditTime 2020年01月03日 11:34:37
     * @lastEditors 王磊
     * @description 字段对应显示的汉字
     */
    dataName: string;
    /**
     * @property
     * @public
     * @author 王磊（磊皇）
     * @time 2020年01月03日 11:33:46
     * @lastEditTime 2020年01月03日 11:34:37
     * @lastEditors 王磊
     * @description 字段的值
     */
    value: string;
}
/**
 * @public
 * @interface
 * @author 王磊（磊皇）
 * @time 2020年01月03日 11:33:46
 * @lastEditTime 2020年01月03日 11:33:46
 * @lastEditors 王磊（磊皇）
 * @exports ApproveFilterItemData
 * @interface
 * @description 审批流程的数据的data数据
 */
interface IApproveFilterItemData {
    /**
     * @property
     * @public
     * @author 王磊（磊皇）
     * @time 2020年01月03日 11:33:46
     * @lastEditTime 2020年01月03日 11:36:05
     * @lastEditors 王磊（磊皇）
     * @description 可选属性，是否为时间段，注意这里必须是字符串格式的哦，因为后台给的是字符串
     *              'true' 是
     *              'false' 不是
     */
    StartToEnd? : boolean;
    /**
     * @property
     * @public
     * @author 王磊（磊皇）
     * @time 2020年01月03日 11:33:46
     * @lastEditTime 2020年01月03日 11:38:11
     * @lastEditors 王磊（磊皇）
     * @description 可选属性，只有是时间段或者多个选择的时候才会有这个字段，
     *              用来存储数据源
     */
    data?: Array<IApproveFilterItemDataData>;
    /**
     * @property
     * @public
     * @author 王磊（磊皇）
     * @time 2020年01月03日 11:33:46
     * @lastEditTime 2020年01月03日 11:39:17
     * @lastEditors 王磊（磊皇）
     * @description 可选属性，发送给后台的请求参数名称，
     *              如果是时间段选择，这个字段会在data属性中，所以是可选的
     */
    requestName? : string;
    /**
     * @property
     * @public
     * @author 王磊（磊皇）
     * @time 2020年01月03日 11:33:46
     * @lastEditTime 2020年01月03日 11:36:05
     * @lastEditors 王磊（磊皇）
     * @description 字段对应显示的汉字名称
     */
    name: string;
    /**
     * @property
     * @public
     * @author 王磊（磊皇）
     * @time 2020年01月03日 11:33:46
     * @lastEditTime 2020年01月03日 11:36:05
     * @lastEditors 王磊（磊皇）
     * @description 组件类型，现在仅支持：
     *              DatePicker 代表时间选择（包含时间段的组件）
     *              select 代表是Tag组件（包括多选）
     *              input 代表是输入框组件
     */
    type: string;
    /**
     * @property
     * @public
     * @author 王磊（磊皇）
     * @time 2020年01月03日 11:33:46
     * @lastEditTime 2020年01月03日 11:36:05
     * @lastEditors 王磊（磊皇）
     * @description 可选属性，字段对应的值
     *              如果是DatePicker 组件，那么该值会在data中存储，所以是可选的
     */
    value?: any;
}
/**
 * @global
 * @author 王磊（磊皇）
 * @time 2020年01月03日 11:33:46
 * @lastEditTime 2020年01月03日 11:33:46
 * @lastEditors 王磊（磊皇）
 * @description 定义window 对象的属性和类型
 */
declare global{
    /**
     * @author 王磊（磊皇）
     * @time 2020年01月03日 11:33:46
     * @lastEditTime 2020年01月03日 11:33:46
     * @lastEditors 王磊（磊皇）
     * @override Window
     * @exports Window
     */
    interface Window {
        /**
         * @author 王磊（磊皇）
         * @description 学校id
         * @time 2020年01月03日 11:33:46
         * @lastEditTime 2020年01月03日 11:33:46
         * @lastEditors 王磊（磊皇）
         * @property
         * @type {string}
         */
        schoolId: string;

        /**
         * @author 王磊（磊皇）
         * @description 用来标识是开发模式还是生产模式
         * @time 2020年4月17日 08点58分
         * @lastEditTime 2020年4月17日 08点58分
         * @lastEditors 王磊（磊皇）
         * @property
         * @type {string}
         */
        H5_Dev: string;

        /**
         * @author 王磊（磊皇）
         * @description 用来跳转应用的
         * @time 2020年01月03日 11:33:46
         * @lastEditTime 2020年01月03日 11:33:46
         * @lastEditors 王磊（磊皇）
         * @description 网关地址，业务中必备的参数，每个学校的网关是不一样的
         * @property
         * @type {string}
         */
        apiGateway: string;
         /**
         * @author 王磊（磊皇）
         * @description 原生的PGMultiView
         * @time 2020年01月03日 11:33:46
         * @lastEditTime 2020年01月03日 11:33:46
         * @lastEditors 王磊（磊皇）
         * @override Window
         * @exports Window
         */
        PGMultiView: {
            /**
             * @property
             * @method
             * @author 王磊（磊皇）
             * @description 用来跳转应用的
             * @time 2020年01月03日 11:33:46
             * @lastEditTime 2020年01月03日 11:33:46
             * @lastEditors 王磊（磊皇）
             * @type {Function}
             */
            loadView: Function;
        }
    }
}

/**
 * @interface
 * @description 规定枚举里的属性
 * @exports IEsEnumItem
 */
interface IEsEnumItem{
    code: any;
    name: any;
    packageName: any;
}

/**
 * @interface
 * @description 数字格式化的配置项
 * @exports INumberFromatOption
 */
interface INumberFromatOption{
    /**
     * @description 保留几位小数，会四舍五入的，默认是2
     */
    precision:number;
    /**
     * @description 小数点符号，默认是'.'
     */
    decimal:string;     

    /**
     * @description 千分位符号，默认是','
     */
    thousand:string;    
    /**
     * @description 格式化数字显示单位，默认￥（人民币单位）
     */
    symbol:string;
    /**
     * @description 设置按照几位分隔，默认是3
     */
    grouping:number;
}

/**
 * @interface
 * @description 获取多个缓存数据的请求参数
 * @exports ICacheRequestParam
 */
interface ICacheRequestParam{
    /**
     * @description 可选属性，规定数据的筛选条件
     */
    key?: any;
    /**
     * @description 必填属性，规定数据类型，具体请查看枚举类型
     */
    modelName: any;
}

export {
    IApproveFilterItemData,
    IApproveFilterItemDataData,
    IEsEnumItem,
    INumberFromatOption,
    ICacheRequestParam,
}