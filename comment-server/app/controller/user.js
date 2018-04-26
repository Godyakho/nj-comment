/** ****************************************
 *  Author : niuzz niuzz@hotmail.com
 *  Created On : Mon Apr 09 2018
 *  File : user.js
 *******************************************/
'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async create() {
    const ctx = this.ctx;
    const username = ctx.request.body.username;
    const casename = ctx.request.body.casename;
    const casedata = await ctx.service.case.getcase(casename);
    if (!casedata) {
      const res = null;
      const code = 4000;
      const msg = '没有相关活动，请检查活动名';
      ctx.helper.success({ ctx, res, code, msg });
      return;
    }
    const user = await ctx.service.user.get(username, casedata.id);
    if (user) {
      const res = null;
      const code = 4000;
      const msg = '用户名重复不能创建';
      ctx.helper.success({ ctx, res, code, msg });
    } else {
      const res = await ctx.service.user.create(username, casedata.id);
      ctx.helper.success({ ctx, res });
    }

  }
  async get() {
    const { ctx } = this;
    const username = ctx.request.body.username;
    const casename = ctx.request.body.casename;
    const res = await ctx.service.user.get(username, casename);
    if (!res) {
      const code = 4000;
      const msg = '无相关信息';
      ctx.helper.success({ ctx, res, code, msg });
      return;
    }
    ctx.helper.success({ ctx, res });
  }
}
module.exports = UserController;
