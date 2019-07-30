import Vue from 'vue'

import VeeValidate, {
  Validator
} from 'vee-validate'
import zh_CN from "vee-validate/dist/locale/zh_CN";
Validator.localize("zh_CN", zh_CN);
Vue.use(VeeValidate);

const formatFileSize = function (size) {
  let units = ["Byte", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let threshold = 1024;
  size = Number(size) * threshold;
  let i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(threshold));
  return (size / Math.pow(threshold, i)).toFixed(2) * 1 + " " + units[i];
};
const fieldName = ""; //原来的i18n的fieldName会显示绑定的name值，就是英文，实际项目中不需要

Validator.localize("zh_CN", {
  name: "zh_CN",
  attributes: {},
  messages: {
    _default: () => `${fieldName}无效`,
    after: (field, [target]) => `${fieldName}必须在${target}之后`,
    alpha_dash: () => `${fieldName}能够包含字母数字字符、破折号和下划线`,
    alpha_num: () => `${fieldName}只能包含字母数字字符`,
    alpha_spaces: () => `${fieldName}只能包含字母字符和空格`,
    alpha: () => `${fieldName}只能包含字母字符`,
    before: (field, [target]) => `${fieldName}必须在${target}之前`,
    between: (field, [min, max]) => `${fieldName}必须在${min}与${max}之间`,
    confirmed: (field, [confirmedField]) =>
      `${fieldName}不能和${confirmedField}匹配`,
    credit_card: () => `${fieldName}格式错误`,
    date_between: (field, [min, max]) => `${fieldName}必须在${min}和${max}之间`,
    date_format: (field, [format]) => `${fieldName}必须符合${format}格式`,
    decimal: (field, [decimals = "*"] = []) =>
      `${fieldName}必须是数字，且能够保留${
          decimals === "*" ? "" : decimals
        }位小数`,
    digits: (field, [length]) =>
      `${fieldName}必须是数字，且精确到${length}位数`,
    dimensions: (field, [width, height]) =>
      `${fieldName}必须在${width}像素与${height}像素之间`,
    email: () => `${fieldName}不是一个有效的邮箱`,
    ext: () => `${fieldName}不是一个有效的文件`,
    image: () => `${fieldName}不是一张有效的图片`,
    included: () => `${fieldName}不是一个有效值`,
    integer: () => `${fieldName}必须是整数`,
    ip: () => `${fieldName}不是一个有效的地址`,
    length: (field, [length, max]) => {
      if (max) {
        return `${fieldName}长度必须在${length}到${max}之间`;
      }
      return `${fieldName}长度必须为${length}`;
    },
    max: (field, [length]) => `${fieldName}不能超过${length}个字符`,
    max_value: (field, [max]) => `${fieldName}必须小于或等于${max}`,
    mimes: () => `${fieldName}不是一个有效的文件类型`,
    min: (field, [length]) => `${fieldName}必须至少有${length}个字符`,
    min_value: (field, [min]) => `${fieldName}必须大于或等于${min}`,
    excluded: () => `${fieldName}不是一个有效值`,
    numeric: () => `${fieldName}只能包含数字字符`,
    regex: () => `${fieldName}格式无效`,
    required: () => `${fieldName}不能为空`,
    size: (field, [size]) => `${fieldName}必须小于${formatFileSize(size)}`,
    url: () => `${fieldName}不是一个有效的url`
  }
});

function IdentityCodeValid(code) {
  var city = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外 "
  };
  //var tip = "";
  var pass = true;

  //判断格式是否正确
  if (
    !code ||
    !/^\d{2}(0[1-9]|[1-9][0-9])\d{2}((((1[6-9]|[2-9]\d)\d{2})(0[13578]|1[02])(0[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})(0[13456789]|1[012])(0[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})02(0[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))0229))\d{3}(\d|x|X)$/i.test(
      code
    )
  ) {
    //tip = "身份证号格式错误";
    pass = false;
  }
  //判断前两位的地址编码是否正确
  else if (!city[code.substr(0, 2)]) {
    //tip = "地址编码错误";
    pass = false;
  } else {
    //18位身份证需要验证最后一位校验位
    if (code.length == 18) {
      code = code.split("");
      //∑(ai×Wi)(mod 11)
      //加权因子
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //校验位
      var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++) {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }
      var last = parity[sum % 11];
      if (parity[sum % 11] != code[17]) {
        //tip = "校验位错误";
        pass = false;
      }
    }
  }
  return pass;
}
// 手机号码验证
Validator.extend("mobile", {
  getMessage: () => `请输入正确的手机号码`,
  validate: value =>
    value.length === 11 &&
    /^(((13[0-9]{1})|(14[57]{1})|(15[012356789]{1})|(17[03678]{1})|(18[0-9]{1})|(19[89]{1})|(16[6]{1}))+\d{8})$/.test(
      value
    )
});
Validator.extend("email", {
  getMessage: () => `请输入正确的邮箱`,
  validate: value =>
    /^([a-zA-Z0-9]{1,63}|[a-zA-Z0-9][a-zA-Z0-9-_.]{0,62}[a-zA-Z0-9])@(([a-zA-Z0-9]+|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.){0,3}((com)|(net)|(org)|(gov\.cn)|(info)|(cc)|(com\.cn)|(net\.cn)|(org\.cn)|(name)|(biz)|(tv)|(cn)|(mobi)|(name)|(sh)|(ac)|(io)|(tw)|(com\.tw)|(hk)|(com\.hk)|(ws)|(travel)|(us)|(tm)|(la)|(me\.uk)|(org\.uk)|(ltd\.uk)|(plc\.uk)|(in)|(eu)|(it)|(jp))$/.test(
      value
    )
});
Validator.extend("email", {
  getMessage: () => `请输入正确的邮箱`,
  validate: value =>
    /^([a-zA-Z0-9]{1,63}|[a-zA-Z0-9][a-zA-Z0-9-_.]{0,62}[a-zA-Z0-9])@(([a-zA-Z0-9]+|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.){0,3}((com)|(net)|(org)|(gov\.cn)|(info)|(cc)|(com\.cn)|(net\.cn)|(org\.cn)|(name)|(biz)|(tv)|(cn)|(mobi)|(name)|(sh)|(ac)|(io)|(tw)|(com\.tw)|(hk)|(com\.hk)|(ws)|(travel)|(us)|(tm)|(la)|(me\.uk)|(org\.uk)|(ltd\.uk)|(plc\.uk)|(in)|(eu)|(it)|(jp))$/.test(
      value
    )
});
// https://form-validate.github.io/form-validate/
Validator.extend("identitycode", {
  getMessage: () => `请输入正确的身份证号`,
  validate: value =>
    IdentityCodeValid(value)
});
