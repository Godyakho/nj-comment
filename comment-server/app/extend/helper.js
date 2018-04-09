/** ****************************************
 *  Author : niuzz niuzz@hotmail.com
 *  Created On : Mon Apr 09 2018
 *  File : helper.js
 *******************************************/
'use strict';
const moment = require('moment');

// 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD hh:mm:ss');

// 处理成功响应
exports.success = ({ ctx, res = null, code = 1000, msg = '请求成功' }) => {
  ctx.body = {
    code,
    data: res,
    msg,
  };
  ctx.status = 200;
};
