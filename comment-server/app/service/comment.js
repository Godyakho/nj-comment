/** ****************************************
 *  Author : niuzz niuzz@hotmail.com
 *  Created On : Tue Apr 10 2018
 *  File : comment.js
 *******************************************/
'use strict';

const Service = require('egg').Service;

class CommentService extends Service {
  async create(uid, cid, content) {
    const date = new Date();
    const createtime = date.getTime().toString();
    // 状态 1通过, 2待审, 3驳回
    const status = 2;
    const result = await this.app.mysql.insert('comment', { uid, cid, content, createtime, status });
    const comment = {
      comid: result.insertId,
      uid,
      cid,
      content,
      createtime,
    };
    return { comment };
  }

  async update(comid, status) {
    const row = {
      id: comid,
      status,
    };
    const result = await this.app.mysql.update('comment', row);
    if (result.changedRows) {
      return result;
    }
    return null;
  }

  async getIo() {
    // 派发成功
    const message = this.ctx.req.args[0];
    this.ctx.server.sockets.emit('res', message);
  }
}

module.exports = CommentService;
