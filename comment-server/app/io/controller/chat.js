/** ****************************************
 *  Author : niuzz niuzz@hotmail.com
 *  Created On : Wed Apr 11 2018
 *  File : chat.js
 *******************************************/
'use strict';
module.exports = app => {
  return async function() {
    // const result = yield ctx.controller.comment.create();
    const message = this.args[0];
    // console.log('chat 控制器打印', message);
    // await this.app.controller.comment.create();
    // await app.controller.comment.create;
    this.server.sockets.emit('chat', message);
  };
};
