/** ****************************************
 *  Author : niuzz niuzz@hotmail.com
 *  Created On : Tue Apr 10 2018
 *  File : comment.js
 *******************************************/
'use strict';

const Controller = require('egg').Controller;

class CommentController extends Controller {
  async create() {
    const ctx = this.ctx;
    const username = ctx.request.body.username;
    const casename = ctx.request.body.casename;
    const content = ctx.request.body.content;
    const casedata = await ctx.service.case.getcase(casename);
    if (!casedata) {
      const res = null;
      const code = 4000;
      const msg = '没有相关活动，请检查活动名';
      ctx.helper.success({ ctx, res, code, msg });
      return;
    }
    const user = await ctx.service.user.get(username, casedata.id);
    if (!user) {
      const res = null;
      const code = 4000;
      const msg = '没有相关用户，请检查用户名';
      ctx.helper.success({ ctx, res, code, msg });
      return;
    }
    if (!content) {
      const res = null;
      const code = 4000;
      const msg = '内容不能为空';
      ctx.helper.success({ ctx, res, code, msg });
      return;
    }
    const res = await ctx.service.comment.create(user.id, casedata.id, content);
    ctx.helper.success({ ctx, res });
  }

  async get() {
    const { ctx } = this;
    const cid = ctx.request.body.cid || 2;
    const page = (ctx.request.body.page - 1) * 10 || 0;
    const status = ctx.request.body.status || 2;
    const limit = ctx.request.body.limit || 10;
    const res = await ctx.service.comment.get(cid, page, limit, status);
    if (!res) {
      const code = 4000;
      const msg = '无相关信息';
      ctx.helper.success({ ctx, res, code, msg });
      return;
    }
    ctx.helper.success({ ctx, res });
  }

  async update() {
    const { ctx } = this;
    const comid = ctx.request.body.comid;
    const status = ctx.request.body.status;
    const res = await ctx.service.comment.update(comid, status);
    if (!res) {
      const code = 4000;
      const msg = '更新失败';
      ctx.helper.success({ ctx, res, code, msg });
      return;
    }
    ctx.helper.success({ ctx, res });
  }

  async getIo() {
    const { ctx } = this;
    await ctx.service.comment.getIo();
  }
}
module.exports = CommentController;
