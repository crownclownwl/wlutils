/**
 * @description 用ES6 实现的枚举类
 * @author 王磊（磊皇）
 * @time 2020年4月3日 10点41分
 * @lastEditTime 2020年4月3日 10点41分
 * @lastEditors 王磊（磊皇）
 * 
 * @class
 * @exports EsEnum
 */

export interface IEsEnumItem{
    code: any;
    name: any;
    packageName: any;
}

class EsEnum {
    /**
     * @property
     */
    arr: Array<IEsEnumItem>;
    /**
     * @property
     */
    typeArr: Array<any>;

    /**
     * @constructor
     * @param {Array<any>} arr 自定义数组
     */
    constructor(arr) {
        let typeArr = [];

        if (!Array.isArray(arr)){
            throw 'arr is not an array!';
            return;
        }

        arr.map(element => {
            if(!element.code || !element.name) {
                return;
            }
            // 保存code值组成的数组，方便A.getName(name)类型的调用
            typeArr.push(element.code);
            // 根据code生成不同属性值，以便A.B.name类型的调用
            this[element.code] = element;
        });
        
        // 保存源数组
        this.arr = arr; 
        this.typeArr = typeArr;
    }

    /**
     * @description 根据code得到对象
     * @method
     * @param {} code 
     */
    valueOf(code) {
        return this.arr[this.typeArr.indexOf(code)];
    }

    /**
     * @description 根据code获取name值
     * @method
     * @param {any} code 枚举code
     * @return {any} 枚举code 对应的枚举name值
     */
    getNameByCode(code){
        let prop = this.valueOf(code);
        if (!prop){
            throw 'No enum constant '  + code;
            return;
        }

        return prop.name;
    }

    /**
     * @description 根据name获取name值
     * @method
     * @param {any} name 枚举汉字
     * @return {any} 枚举汉字 对应的枚举name值
     */
    getCoedByName(name){
        let prop = false;
        let cacheKey = "";
        for(let keyItem of this.arr){
            if(keyItem.name === name){
                cacheKey =  keyItem.code;
                prop = true;
            }
        }
        if (!prop){
            throw 'No enum constant '  + name;
            return;
        }

        return cacheKey;
    }


    /**
     * @description 根据name获取packageName值
     * @method
     * @param {any} name 枚举汉字
     * @return {any} 枚举汉字 对应的枚举packageName值
     */
    getPackageNameByName(name){
        let prop = false;
        let packageName = "";
        for(let keyItem of this.arr){
            if(keyItem.name === name){
                packageName =  keyItem.packageName;
                prop = true;
            }
        }
        if (!prop){
            throw 'No enum constant '  + name;
            return;
        }

        return packageName;
    }

    /**
     * @description 根据code获取PackageName值
     * @method
     * @param {any} code 枚举code
     * @return {any} 枚举code 对应的枚举PackageName的值
     */
    getPackageNameByCode(code){
        let prop = false;
        let cacheKey = "";
        for(let keyItem of this.arr){
            if(keyItem.code === code){
                cacheKey =  keyItem.packageName;
                prop = true;
            }
        }
        if (!prop){
            throw 'No enum constant '  + name;
            return;
        }

        return cacheKey;
    }

    /**
     * @description 返回源数组
     * @return {Array<any>} 所有枚举
     */
    getValues() {
        return this.arr;
    }
}

export default EsEnum;