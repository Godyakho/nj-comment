/** ****************************************
 *  Author : niuzz niuzz@hotmail.com
 *  Created On : Wed Apr 11 2018
 *  File : chat.js
 *******************************************/
'use strict';
module.exports = app => {
  return function* () {
    const message = this.args[0];
    console.log('chat 控制器打印', app);
    // this.socket.emit('chat', `Hi! I've got your message: ${message}`);
    this.server.sockets.emit('chat', message);
  };
};
