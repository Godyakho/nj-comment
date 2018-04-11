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
    };
    return { comment };
  }

  async get(username, casename, offset, status) {
    const innerOffset = offset || 0; // 分页开始
    const innerStatus = status || 2; // 默认返回待审
    const result = await this.app.mysql.select('comment', { // 搜索 post 表
      where: { status: innerStatus }, // WHERE 条件
      orders: [[ 'createtime', 'desc' ]], // 排序方式
      limit: 20, // 返回数据量
      offset: innerOffset, // 数据偏移量
    });
    if (result.length > 0) {
      return result;
    }
    return null;
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
