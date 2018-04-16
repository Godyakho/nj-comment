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

  async get(uid = '', cid = '', username = '', casename = '', offset = 0, status = 2) {
    let whereObj = {};
    if (!uid && !cid) {
      whereObj = { status };
    } else {
      !uid ? whereObj = { status, cid } : whereObj = { status, uid, cid };
    }
    const result = await this.app.mysql.select([ 'comment' ], {
      where: whereObj, // WHERE 条件
      columns: [ 'id', 'content', 'status', 'createtime' ],
      orders: [[ 'comment.createtime', 'desc' ]], // 排序方式
      limit: 20, // 返回数据量
      offset, // 数据偏移量
    });
    const totalCount = await this.app.mysql.count('comment', whereObj);
    const newResult = result.map(function(item) {
      item.username = username;
      item.casename = casename;
      return item;
    });
    if (result.length > 0) {
      return {
        list: newResult,
        sum: totalCount,
      };
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
