  /**
   * 以下处理接口加密算法
   */
  //签名算法
  import md5 from 'js-md5';
  import {deepClone} from "@/utils/deepClone";
  function sign(options) {
    var newOption = deepClone(options);
    Object.keys(newOption).forEach((val)=>{
      if(newOption[val] === ''){
        delete newOption[val];
      }
    })
    delete newOption.signkey;
    delete newOption.sign;
    delete newOption.file;
    var nopt = objKeySort(newOption);
    var str = '';
    for (var k in nopt) {
      str += k + '=' + nopt[k] + '&';
    }
    str = str.substring(0, str.length - 1) + options.signkey;
    // console.log(str)
    // options.sign = md5(str);
    return md5(str);
  };
  //对象根据键值字典排序
  function objKeySort(obj) {
    var newkey = Object.keys(obj).sort();
    var newObj = {};
    for (var i = 0; i < newkey.length; i++) {
      newObj[newkey[i]] = obj[newkey[i]];
    }
    return newObj;
  };

  export {
    sign
  }