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

  async get(cid, page, limit, status) {
    const sql = this.app.mysql;
    const result = await sql.query('SELECT content, table_comment.id, table_user.username, table_case.casename, table_comment.status, table_comment.createtime  FROM comment as table_comment INNER JOIN user as table_user ON table_comment.uid = table_user.id INNER JOIN cases as table_case ON table_comment.cid = table_case.id WHERE table_comment.status = ' + sql.escape(status) + ' AND table_comment.uid = table_user.id AND table_comment.cid = ' + sql.escape(cid) + ' limit ' + sql.escape(page) + ',' + sql.escape(limit) + '');
    const totalCount = await sql.query('SELECT COUNT(*) FROM comment INNER JOIN user ON comment.uid = user.id INNER JOIN  cases ON comment.cid = cases.id WHERE comment.status = ' + sql.escape(status) + ' AND comment.uid = user.id AND comment.cid = ' + sql.escape(cid) + '');
    if (result.length > 0) {
      return {
        list: result,
        sum: totalCount[0]['COUNT(*)'],
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
